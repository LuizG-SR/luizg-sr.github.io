import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	orderBy,
	query,
} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

// 🔥 Configuração Firebase (substitua pelos seus dados)
const firebaseConfig = {
	apiKey: 'SUA_API_KEY',
	authDomain: 'SEU_PROJETO.firebaseapp.com',
	projectId: 'SEU_PROJETO',
	storageBucket: 'SEU_PROJETO.appspot.com',
	messagingSenderId: 'XXXXXX',
	appId: 'XXXXXX',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ============================
   Tabela ARSAE–COPASA
   ============================ */
const FIXA = 39.31; // água + esgoto fixa
const FAIXAS = [
	{ label: '0–5 m³', limite: 5, preco: 4.07 },
	{ label: '5–10 m³', limite: 5, preco: 8.677 },
	{ label: '10–15 m³', limite: 5, preco: 13.445 },
	{ label: '15–20 m³', limite: 5, preco: 18.355 },
	{ label: '20–40 m³', limite: 20, preco: 23.347 },
];

// Calcula conta com faixas progressivas
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

// Helpers simples
const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtM3 = (n) => `${Number(n).toFixed(3)} m³`;

// Cálculo e salvamento
document.getElementById('calcular').addEventListener('click', async () => {
	const anterior = parseFloat(document.getElementById('leituraAnterior').value);
	const atual = parseFloat(document.getElementById('leituraAtual').value);
	const data = document.getElementById('dataLeitura').value;

	if (isNaN(anterior) || isNaN(atual) || !data) {
		alert('Preencha todos os campos corretamente.');
		return;
	}

	const consumo = +(atual - anterior).toFixed(3);
	if (consumo < 0) {
		alert('A leitura atual não pode ser menor que a anterior.');
		return;
	}

	// ✅ cálculo progressivo real (com fixa)
	const conta = calcularContaCopasa(consumo);

	// Renderiza resultado com detalhamento por faixa
	const linhas = conta.distribuicao
		.filter((f) => f.usado > 0) // mostra só faixas usadas
		.map(
			(f) => `
      <tr>
        <td>${f.label}</td>
        <td>${fmtM3(f.usado)} / ${f.limite} m³</td>
        <td>${fmtBRL(f.preco)}</td>
        <td>${fmtBRL(f.valor)}</td>
      </tr>
    `
		)
		.join('');

	document.getElementById('resultado').innerHTML = `
    <p><strong>Consumo:</strong> ${fmtM3(consumo)}</p>
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#eef">
          <th style="text-align:left;padding:6px">Faixa</th>
          <th style="text-align:left;padding:6px">Usado</th>
          <th style="text-align:left;padding:6px">R$/m³</th>
          <th style="text-align:left;padding:6px">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
        <tr>
          <td colspan="3" style="padding:6px;border-top:1px solid #ccc"><strong>Subtotal (sem fixa)</strong></td>
          <td style="padding:6px;border-top:1px solid #ccc"><strong>${fmtBRL(
											conta.subtotal
										)}</strong></td>
        </tr>
        <tr>
          <td colspan="3" style="padding:6px">Fixa (água + esgoto)</td>
          <td style="padding:6px">${fmtBRL(conta.fixa)}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding:6px;border-top:1px solid #000"><strong>Total estimado</strong></td>
          <td style="padding:6px;border-top:1px solid #000"><strong>${fmtBRL(
											conta.total
										)}</strong></td>
        </tr>
      </tbody>
    </table>
  `;

	// Salva no Firestore (inclui detalhamento por faixa)
	try {
		await addDoc(collection(db, 'leituras_agua'), {
			dataLeitura: data,
			leituraAnterior: anterior,
			leituraAtual: atual,
			consumo, // m³
			fixa: conta.fixa, // R$
			subtotal: conta.subtotal, // R$ (sem fixa)
			total: conta.total, // R$ (com fixa)
			distribuicao: conta.distribuicao, // array de faixas (usado, preco, valor)
			criadoEm: new Date(),
		});
		alert('Leitura salva com sucesso!');
		carregarHistorico();
	} catch (e) {
		console.error('Erro ao salvar:', e);
		alert('Erro ao salvar no Firebase. Veja o console.');
	}
});

// Carregar histórico (mostra total já com fixa)
async function carregarHistorico() {
	const lista = document.getElementById('historico');
	lista.innerHTML = '';

	const qy = query(collection(db, 'leituras_agua'), orderBy('dataLeitura', 'desc'));
	const snapshot = await getDocs(qy);
	snapshot.forEach((doc) => {
		const d = doc.data();
		const li = document.createElement('li');
		li.textContent = `${d.dataLeitura} — ${d.consumo.toFixed(3)} m³ — ${fmtBRL(d.total)}`;
		lista.appendChild(li);
	});
}

carregarHistorico();
