// Função para gerar o SVG com cacos de vidro
function generateGlassShards(numShards) {
  // Cria o elemento SVG
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('xmlns', svgNS);

  // Dimensões da área do SVG
  const svgWidth = 1000;
  const svgHeight = 1000;
  svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

  // Loop para gerar cada caco
  for (let i = 0; i < numShards; i++) {
    // Cria um polígono
    const polygon = document.createElementNS(svgNS, 'polygon');

    // Gera pontos aleatórios para o caco
    const points = generateRandomPoints();
    polygon.setAttribute('points', points);

    // Define uma cor branca semi-transparente para o efeito de vidro
    const opacity = Math.random() * 0.15 + 0.05; // Opacidade entre 0.05 e 0.2
    polygon.setAttribute('fill', `rgba(255, 255, 255, ${opacity})`);

    // Gera posições aleatórias para distribuir os cacos
    const translateX = Math.random() * svgWidth;
    const translateY = Math.random() * svgHeight;

    // Cria uma animação de flutuação leve
    const animateTransform = document.createElementNS(
      svgNS,
      'animateTransform'
    );
    animateTransform.setAttribute('attributeName', 'transform');
    animateTransform.setAttribute('type', 'translate');
    animateTransform.setAttribute('dur', `${Math.random() * 5 + 8}s`); // Duração entre 8 e 13 segundos
    animateTransform.setAttribute(
      'values',
      `${translateX},${translateY}; ${translateX},${
        translateY - (Math.random() * 30 + 10)
      }; ${translateX},${translateY}`
    );
    animateTransform.setAttribute('repeatCount', 'indefinite');

    // Adiciona a animação ao polígono
    polygon.appendChild(animateTransform);

    // Adiciona o polígono ao SVG
    svg.appendChild(polygon);
  }

  // Adiciona o SVG ao fundo do body
  document.body.style.backgroundImage = `url('data:image/svg+xml,${encodeURIComponent(
    new XMLSerializer().serializeToString(svg)
  )}')`;
  document.body.style.backgroundSize = '100%';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';
}

// Função auxiliar para gerar pontos aleatórios para o polígono
function generateRandomPoints() {
  const points = [];
  for (let i = 0; i < 4; i++) {
    // Gera um valor aleatório para x entre -100 e 100
    const x =
      (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 100) + 50);
    const y = Math.floor(Math.random() * 150) + 50; // Altura aleatória ajustada
    points.push(`${x},${y}`);
  }

  return points.join(' ');
}

// Chama a função para gerar 10 cacos de vidro (ou ajuste para o número desejado)
generateGlassShards(100);
