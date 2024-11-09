let translations = {};

// Função para carregar as traduções
async function loadTranslations(lang) {
	const response = await fetch(`${lang}.json`);
	translations = await response.json();
	updateTexts();
}

// Função para atualizar o conteúdo dos elementos
function updateTexts() {
	document.getElementById('home').innerHTML = translations.home;
	document.getElementById('curriculum').innerHTML = translations.curriculum;
	document.getElementById('projects').innerHTML = translations.projects;
	document.getElementById('contact').innerHTML = translations.contact;
	document.getElementById('footer').innerHTML = translations.footer;
	document.getElementById('profile_text').innerHTML = translations.profile_text;
	document.getElementById('title_proj_1').innerHTML = translations.title_proj_1;
	document.getElementById('text_proj_1').innerHTML = translations.text_proj_1;
	document.getElementById('title_proj_2').innerHTML = translations.title_proj_2;
	document.getElementById('text_proj_2').innerHTML = translations.text_proj_2;
	document.getElementById('title_proj_3').innerHTML = translations.title_proj_3;
	document.getElementById('text_proj_3').innerHTML = translations.text_proj_3;
	document.getElementById('title_proj_4').innerHTML = translations.title_proj_3;
	document.getElementById('text_proj_4').innerHTML = translations.text_proj_3;
	document.getElementById('curriculo_title').innerHTML = translations.curriculo_title;
	document.getElementById('section_header').innerHTML = translations.section_header;
	document.getElementById('section_resume').innerHTML = translations.section_resume;
}

// Carrega o idioma inicial
loadTranslations('pt');

// Função para trocar o idioma
function changeLanguage(lang) {
	loadTranslations(lang);
}
