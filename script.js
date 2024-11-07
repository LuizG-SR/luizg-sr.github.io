document.addEventListener('DOMContentLoaded', function () {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const network = document.getElementById('network');
	network.appendChild(canvas);

	let width, height;
	const particles = [];
	const maxParticles = 100;
	const mouseParticle = { x: null, y: null, vx: 0, vy: 0, isMouse: true }; // Representa o mouse

	// Redimensiona o canvas conforme a janela
	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}

	// Inicializa as partículas com posições e velocidades aleatórias
	function initParticles() {
		particles.length = 0;
		for (let i = 0; i < maxParticles; i++) {
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 1,
				vy: (Math.random() - 0.5) * 1,
			});
		}
	}

	// Captura a posição do mouse
	document.addEventListener('mousemove', (event) => {
		mouseParticle.x = event.clientX;
		mouseParticle.y = event.clientY;
	});

	document.addEventListener('mouseleave', () => {
		mouseParticle.x = null;
		mouseParticle.y = null;
	});

	// Desenha as partículas e as linhas entre elas
	function draw() {
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = '#ffffff';
		particles.forEach((particle) => {
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
			ctx.fill();
		});

		// Adiciona a partícula do mouse para o desenho das linhas
		if (mouseParticle.x && mouseParticle.y) {
			particles.forEach((p) => {
				const dist = Math.hypot(mouseParticle.x - p.x, mouseParticle.y - p.y);
				if (dist < 100) {
					ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
					ctx.beginPath();
					ctx.moveTo(mouseParticle.x, mouseParticle.y);
					ctx.lineTo(p.x, p.y);
					ctx.stroke();
				}
			});
		}

		// Conecta as partículas entre si
		particles.forEach((p1, index) => {
			for (let i = index + 1; i < particles.length; i++) {
				const p2 = particles[i];
				const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
				if (dist < 100) {
					ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.stroke();
				}
			}
		});
	}

	// Atualiza as posições das partículas
	function update() {
		particles.forEach((p) => {
			p.x += p.vx;
			p.y += p.vy;

			// Faz as partículas reaparecerem ao atravessar as bordas
			if (p.x > width) p.x = 0;
			if (p.x < 0) p.x = width;
			if (p.y > height) p.y = 0;
			if (p.y < 0) p.y = height;
		});
	}

	// Loop de animação
	function animate() {
		draw();
		update();
		requestAnimationFrame(animate);
	}

	// Inicializa o canvas e a animação
	window.addEventListener('resize', resize);
	resize();
	initParticles();
	animate();
});
