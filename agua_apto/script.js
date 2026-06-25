const firebaseConfig = {
	apiKey: 'AIzaSyAc79JexXEtT62yqOceGL47064cgk-Di9w',
	authDomain: 'agua-apto.firebaseapp.com',
	projectId: 'agua-apto',
	storageBucket: 'agua-apto.firebasestorage.app',
	messagingSenderId: '1085051233638',
	appId: '1:1085051233638:web:3e75011830b08b037614a7',
};

const firebaseConfigurado = !Object.values(firebaseConfig).some((value) =>
	String(value).includes('SEU_') || String(value).includes('XXXXXX') || String(value).includes('SUA_')
);

let db = null;
let firestoreApi = null;

async function inicializarFirebase() {
	if (!firebaseConfigurado || db) return db;

	const [{ initializeApp }, firestore] = await Promise.all([
		import('https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js'),
		import('https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js'),
	]);

	const app = initializeApp(firebaseConfig);
	db = firestore.getFirestore(app);
	firestoreApi = firestore;

	return db;
}

/* ============================
   Tabela ARSAE-COPASA 2026
   Residencial: agua + esgoto dinamico
   Vigencia: volumes a partir de 22/01/2026
   ============================ */
const FIXA = 44.84;
const FAIXAS = [
	{ label: '0-5 m³', limite: 5, preco: 4.67 },
	{ label: '5-10 m³', limite: 5, preco: 9.282 },
	{ label: '10-15 m³', limite: 5, preco: 14.018 },
	{ label: '15-20 m³', limite: 5, preco: 18.844 },
	{ label: '20-40 m³', limite: 20, preco: 23.764 },
	{ label: 'Acima de 40 m³', limite: Infinity, preco: 28.777 },
];

function calcularContaCopasa(consumo, fixa = FIXA) {
	let restante = Math.max(0, Number(consumo) || 0);
	let subtotal = 0;
	const distribuicao = [];

	for (const faixa of FAIXAS) {
		if (restante <= 0) {
			distribuicao.push({ ...faixa, usado: 0, valor: 0 });
			continue;
		}

		const usado = Math.min(restante, faixa.limite);
		const valor = usado * faixa.preco;
		subtotal += valor;
		distribuicao.push({ ...faixa, usado, valor });
		restante -= usado;
	}

	const total = +(subtotal + fixa).toFixed(2);

	return {
		fixa: +fixa.toFixed(2),
		subtotal: +subtotal.toFixed(2),
		total,
		distribuicao: distribuicao.map((f) => ({
			label: f.label,
			limite: f.limite,
			preco: +f.preco.toFixed(3),
			usado: +(+f.usado).toFixed(3),
			valor: +f.valor.toFixed(2),
		})),
	};
}

const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtM3 = (n) => `${Number(n).toFixed(3)} m³`;
const getEl = (id) => document.getElementById(id);

function mostrarMensagem(texto, tipo = 'info') {
	const status = getEl('firebaseStatus');
	status.textContent = texto;
	status.dataset.type = tipo;
}

function renderHistoricoVazio(mensagem) {
	const lista = getEl('historico');
	lista.innerHTML = `<li class="history-empty">${mensagem}</li>`;
}

function mensagemFirebaseErro(e, acao) {
	if (e?.code === 'permission-denied') {
		return `Sem permissão para ${acao}. Publique as regras do Firestore.`;
	}

	if (e?.code === 'failed-precondition') {
		return `Firestore precisa de ajuste para ${acao}. Veja o console.`;
	}

	if (e?.code === 'unavailable') {
		return 'Firebase indisponível no momento. Tente novamente.';
	}

	return `Erro ao ${acao} no Firebase. Veja o console.`;
}

if (!firebaseConfigurado) {
	mostrarMensagem('Firebase não configurado. O cálculo funciona, mas o histórico não será salvo.', 'warn');
	getEl('calcular').textContent = 'Calcular';
	renderHistoricoVazio('Configure o Firebase para salvar leituras.');
}

getEl('calcular').addEventListener('click', async () => {
	const anterior = parseFloat(getEl('leituraAnterior').value);
	const atual = parseFloat(getEl('leituraAtual').value);
	const data = getEl('dataLeitura').value;

	if (isNaN(anterior) || isNaN(atual) || !data) {
		mostrarMensagem('Preencha todos os campos corretamente.', 'error');
		return;
	}

	const consumo = +(atual - anterior).toFixed(3);
	if (consumo < 0) {
		mostrarMensagem('A leitura atual não pode ser menor que a anterior.', 'error');
		return;
	}

	const conta = calcularContaCopasa(consumo);

	const linhas = conta.distribuicao
		.filter((f) => f.usado > 0)
		.map(
			(f) => `
				<tr>
					<td>${f.label}</td>
					<td>${fmtM3(f.usado)}${Number.isFinite(f.limite) ? ` / ${f.limite} m³` : ''}</td>
					<td>${fmtBRL(f.preco)}</td>
					<td>${fmtBRL(f.valor)}</td>
				</tr>
			`
		)
		.join('');

	const resultado = getEl('resultado');
	resultado.classList.remove('empty');
	resultado.innerHTML = `
		<div class="result-summary">
			<div>
				<span>Consumo</span>
				<strong>${fmtM3(consumo)}</strong>
			</div>
			<div>
				<span>Total estimado</span>
				<strong>${fmtBRL(conta.total)}</strong>
			</div>
		</div>

		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th>Faixa</th>
						<th>Usado</th>
						<th>R$/m³</th>
						<th>Subtotal</th>
					</tr>
				</thead>
				<tbody>
					${linhas}
				</tbody>
				<tfoot>
					<tr>
						<td colspan="3">Subtotal sem fixa</td>
						<td>${fmtBRL(conta.subtotal)}</td>
					</tr>
					<tr>
						<td colspan="3">Fixa água + esgoto dinâmico</td>
						<td>${fmtBRL(conta.fixa)}</td>
					</tr>
					<tr class="total-row">
						<td colspan="3">Total estimado</td>
						<td>${fmtBRL(conta.total)}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	`;

	if (!firebaseConfigurado) {
		mostrarMensagem('Cálculo feito. Configure o Firebase para salvar no histórico.', 'warn');
		return;
	}

	try {
		await inicializarFirebase();
		await firestoreApi.addDoc(firestoreApi.collection(db, 'leituras_agua'), {
			dataLeitura: data,
			leituraAnterior: anterior,
			leituraAtual: atual,
			consumo,
			fixa: conta.fixa,
			subtotal: conta.subtotal,
			total: conta.total,
			distribuicao: conta.distribuicao.map((faixa) => ({
				...faixa,
				limite: Number.isFinite(faixa.limite) ? faixa.limite : null,
			})),
			tabelaTarifaria: 'ARSAE-MG 217/2025 - vigente a partir de 22/01/2026',
			criadoEm: firestoreApi.serverTimestamp(),
		});
		mostrarMensagem('Leitura salva com sucesso.', 'success');
		carregarHistorico();
	} catch (e) {
		console.error('Erro ao salvar:', e);
		mostrarMensagem(mensagemFirebaseErro(e, 'salvar'), 'error');
	}
});

async function carregarHistorico() {
	if (!firebaseConfigurado) return;

	const lista = getEl('historico');
	lista.innerHTML = '';

	try {
		await inicializarFirebase();
		const qy = firestoreApi.query(
			firestoreApi.collection(db, 'leituras_agua'),
			firestoreApi.orderBy('dataLeitura', 'desc')
		);
		const snapshot = await firestoreApi.getDocs(qy);

		if (snapshot.empty) {
			renderHistoricoVazio('Nenhuma leitura salva ainda.');
			return;
		}

		snapshot.forEach((doc) => {
			const d = doc.data();
			const li = document.createElement('li');
			li.innerHTML = `
				<span>${d.dataLeitura}</span>
				<strong>${Number(d.consumo).toFixed(3)} m³</strong>
				<em>${fmtBRL(d.total)}</em>
			`;
			lista.appendChild(li);
		});
	} catch (e) {
		console.error('Erro ao carregar histórico:', e);
		renderHistoricoVazio(mensagemFirebaseErro(e, 'carregar histórico'));
	}
}

carregarHistorico();
