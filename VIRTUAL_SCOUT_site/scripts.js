document.querySelectorAll('#partners-section').forEach((section) => {
  section.addEventListener('mouseenter', () => {
    section.style.transform = 'scale(1.02)';
    section.style.transition = 'transform 0.3s ease-in-out';
  });

  section.addEventListener('mouseleave', () => {
    section.style.transform = 'scale(1)';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.linha_cards');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const cardWidth = container.querySelector('.card_equipe').offsetWidth + 20; // Card width + gap
  const cardWidthMobile = container.querySelector('.card_equipe').offsetWidth + 35; // Card width + gap

  // Função para determinar se o dispositivo é mobile
  const isMobile = () => window.innerWidth <= 768;

  // Calcula o número de itens a rolar
  const getScrollAmount = () => {
    return isMobile() ? cardWidthMobile : cardWidth * 3; // 1 card em mobile, 3 cards em desktop
  };

  // Event listeners para os botões
  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Gerenciamento de estados dos botões
  const updateButtonStates = () => {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    prevBtn.disabled = container.scrollLeft === 0;
    nextBtn.disabled = container.scrollLeft >= maxScrollLeft;
  };

  // Atualiza o estado dos botões ao rolar o container
  container.addEventListener('scroll', updateButtonStates);

  // Inicializa o estado dos botões
  updateButtonStates();

  // Recalcula os estados e valores em caso de redimensionamento da tela
  window.addEventListener('resize', () => {
    updateButtonStates();
  });
});

$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true, // Permite o loop contínuo do carrossel
    margin: 10, // Margem entre os slides
    nav: true, // Adiciona botões de navegação (anterior/próximo)
    autoplay: true, // Ativa a reprodução automática
    autoplayTimeout: 5000, // Tempo entre cada slide (5 segundos)
    autoplayHoverPause: true, // Pausa o autoplay quando o mouse estiver sobre o banner
    responsive: {
      0: {
        items: 1, // Exibe 1 item em telas pequenas
      },
      768: {
        items: 1, // Exibe 1 item em tablets
      },
      1024: {
        items: 1, // Exibe 1 item em telas maiores
      },
    },
  });
});
