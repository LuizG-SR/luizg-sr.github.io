let translations = {};

// Função para carregar as traduções
async function loadTranslations(lang) {
  const response = await fetch(`${lang}.json`);
  translations = await response.json();
  updateTexts();
}

// Função para atualizar o conteúdo dos elementos
function updateTexts() {
  const elementsToTranslate = {
    home: 'home',
    curriculum: 'curriculum',
    projects: 'projects',
    contact: 'contact',
    footer: 'footer',
    profile_text: 'profile_text',
    title_proj_1: 'title_proj_1',
    text_proj_1: 'text_proj_1',
    title_proj_2: 'title_proj_2',
    text_proj_2: 'text_proj_2',
    title_proj_3: 'title_proj_3',
    text_proj_3: 'text_proj_3',
    title_proj_4: 'title_proj_4',
    text_proj_4: 'text_proj_4',
    curriculo_title: 'curriculo_title',
    section_header: 'section_header',
    section_resume: 'section_resume',
    title_educacao: 'title_educacao',
    title_carreira: 'title_carreira',
    cotemig: 'cotemig',
    faculdade_cotemig: 'faculdade_cotemig',
    unibh: 'unibh',
    faculdade_cotemig_ads: 'faculdade_cotemig_ads',
    xp_educacao: 'xp_educacao',
    construsite: 'construsite',
    nix_sistemas: 'nix_sistemas',
    buscar_id: 'buscar_id',
    argument: 'argument',
    dwebnet: 'dwebnet',
    totvs: 'totvs',
    titulo_projeto_1: 'titulo_projeto_1',
    descricao_projeto_1: 'descricao_projeto_1',
    titulo_projeto_2: 'titulo_projeto_2',
    descricao_projeto_2: 'descricao_projeto_2',
    titulo_projeto_3: 'titulo_projeto_3',
    descricao_projeto_3: 'descricao_projeto_3',
    titulo_projeto_4: 'titulo_projeto_4',
    descricao_projeto_4: 'descricao_projeto_4',
    titulo_projeto_5: 'titulo_projeto_5',
    descricao_projeto_5: 'descricao_projeto_5',
  };

  Object.keys(elementsToTranslate).forEach((id) => {
    const element = document.getElementById(id);
    if (element && translations[id]) {
      element.innerHTML = translations[id];
    }

    // Check if there is a description translation for tooltips
    const descriptionKey = `${id}_description`;
    if (element && translations[descriptionKey]) {
      element.setAttribute('data-description', translations[descriptionKey]);
    }
  });
}

// Carrega o idioma inicial
loadTranslations('pt');

// Função para trocar o idioma
function changeLanguage(lang) {
  loadTranslations(lang);
}
