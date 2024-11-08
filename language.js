let translations = {};

// Função para carregar as traduções
async function loadTranslations(lang) {
  const response = await fetch(`${lang}.json`);
  translations = await response.json();
  updateTexts();
}

// Função para atualizar o conteúdo dos elementos
function updateTexts() {
  document.getElementById('home').innerText = translations.home;
  document.getElementById('curriculum').innerText = translations.curriculum;
  document.getElementById('projects').innerText = translations.projects;
  document.getElementById('contact').innerText = translations.contact;
  document.getElementById('footer').innerText = translations.footer;
  document.getElementById('profile_text').innerText = translations.profile_text;
  document.getElementById('profile_text_v2').innerText =
    translations.profile_text_v2;
  document.getElementById('title_proj_1').innerText = translations.title_proj_1;
  document.getElementById('text_proj_1').innerText = translations.text_proj_1;
  document.getElementById('title_proj_2').innerText = translations.title_proj_2;
  document.getElementById('text_proj_2').innerText = translations.text_proj_2;
  document.getElementById('title_proj_3').innerText = translations.title_proj_3;
  document.getElementById('text_proj_3').innerText = translations.text_proj_3;
  document.getElementById('title_proj_4').innerText = translations.title_proj_3;
  document.getElementById('text_proj_4').innerText = translations.text_proj_3;
}

// Carrega o idioma inicial
loadTranslations('pt');

// Função para trocar o idioma
function changeLanguage(lang) {
  loadTranslations(lang);
}
