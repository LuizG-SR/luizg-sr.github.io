document.querySelectorAll("#partners-section").forEach((section) => {
  section.addEventListener("mouseenter", () => {
    section.style.transform = "scale(1.02)";
    section.style.transition = "transform 0.3s ease-in-out";
  });

  section.addEventListener("mouseleave", () => {
    section.style.transform = "scale(1)";
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.linha_cards');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const cardWidth = container.querySelector('.card_equipe').offsetWidth + 20; // Card width + gap

  // Event listeners for buttons
  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -cardWidth * 3, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
  });

  // Disable/enable buttons based on scroll position
  container.addEventListener('scroll', () => {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    prevBtn.disabled = container.scrollLeft === 0;
    nextBtn.disabled = container.scrollLeft >= maxScrollLeft;
  });

  // Initialize button states
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  prevBtn.disabled = container.scrollLeft === 0;
  nextBtn.disabled = container.scrollLeft >= maxScrollLeft;
});

$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    nav: false,
    items: 1, // Exibe um item por vez
    autoplay: true,
    autoplayTimeout: 7000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
});
