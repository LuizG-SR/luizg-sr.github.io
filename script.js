// ========================================
// Translations
// ========================================
const translations = {
  pt: {
    'nav.about': 'Sobre',
    'nav.experience': 'Experiência',
    'nav.education': 'Educação',
    'nav.certifications': 'Certificações',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contato',
    'hero.greeting': 'Olá, eu sou',
    'hero.role': 'Desenvolvedor Front-End | Full-Stack | Web Designer',
    'hero.cta': 'Ver Experiência',
    'hero.contact': 'Entre em Contato',
    'about.title': 'Sobre Mim',
    'about.summary': 'Profissional com mais de 9 anos de experiência em desenvolvimento de software e web design, atuando em Front-End, integrações com Back-End, criação de interfaces responsivas e experiência do usuário.',
    'about.description': 'Domínio em HTML5, CSS3 (SASS, Bootstrap), JavaScript (ES6+), TypeScript, Angular (versões modernas), React e Ionic, além de experiência com C#/.NET, PHP e WordPress. Participação em projetos ágeis com Scrum/Kanban, sempre com foco em performance, SEO e acessibilidade.',
    'about.availability': 'Disponível para presencial, híbrido ou remoto',
    'stats.years': 'Anos de Experiência',
    'stats.companies': 'Empresas',
    'stats.projects': 'Projetos',
    'stats.performance': 'Melhoria Performance',
    'experience.title': 'Experiência Profissional',
    'experience.totvs.title': 'Analista Full-Stack (Foco em Front-End)',
    'experience.totvs.period': 'Mar/2020 – Presente',
    'experience.totvs.location': 'Belo Horizonte, MG',
    'experience.totvs.desc1': 'Desenvolvimento de interfaces responsivas em Angular, TypeScript, HTML5 e CSS3',
    'experience.totvs.desc2': 'Integração com C#/.NET e APIs REST',
    'experience.totvs.desc3': 'Melhoria de performance em aplicações corporativas, reduzindo tempo de carregamento em até 30%',
    'experience.totvs.desc4': 'Implementação de boas práticas de UX e padrões de acessibilidade',
    'experience.totvs.desc5': 'Criação de materiais gráficos para campanhas internas',
    'experience.dwebnet.title': 'Desenvolvedor de Software',
    'experience.dwebnet.period': 'Set/2019 – Fev/2020',
    'experience.dwebnet.location': 'Belo Horizonte, MG',
    'experience.dwebnet.desc1': 'Criação de aplicativos híbridos com Ionic (Angular + TypeScript)',
    'experience.dwebnet.desc2': 'Desenvolvimento de sites em WordPress e integração de sistemas',
    'experience.dwebnet.desc3': 'Scripts em JavaScript, jQuery e PHP para funcionalidades dinâmicas',
    'experience.dwebnet.desc4': 'Planejamento e execução de e-mail marketing',
    'experience.argument.title': 'Web Designer',
    'experience.argument.period': 'Ago/2017 – Set/2019',
    'experience.argument.location': 'Belo Horizonte, MG',
    'experience.argument.desc1': 'Criação e manutenção de sites corporativos e landing pages',
    'experience.argument.desc2': 'Desenvolvimento de banners, layouts e peças gráficas para campanhas digitais',
    'experience.argument.desc3': 'Gestão de redes sociais e otimização de websites para SEO',
    'experience.buscarid.title': 'Web Designer',
    'experience.buscarid.period': 'Jan/2017 – Abr/2017',
    'experience.buscarid.location': 'Belo Horizonte, MG',
    'experience.buscarid.desc1': 'Criação e manutenção de sites com foco em usabilidade e responsividade',
    'experience.nix.title': 'Desenvolvedor de Software',
    'experience.nix.period': 'Out/2015 – Mai/2016',
    'experience.nix.location': 'Belo Horizonte, MG',
    'experience.nix.desc1': 'Desenvolvimento em VB.NET, HTML, PHP e JavaScript',
    'experience.construsite.title': 'Suporte Técnico (Estágio)',
    'experience.construsite.period': 'Jun/2015 – Set/2015',
    'experience.construsite.location': 'Belo Horizonte, MG',
    'experience.construsite.desc1': 'Suporte ao cliente e alterações básicas em sites corporativos',
    'education.title': 'Formação Acadêmica',
    'education.mba.degree': 'MBA em Desenvolvimento Front-End',
    'education.mba.period': 'Set/2022 – Abr/2023',
    'education.mba.status': 'Projeto final em andamento',
    'education.ads.degree': 'Graduação em Análise e Desenvolvimento de Sistemas',
    'education.ads.period': 'Ago/2020 – Dez/2021',
    'education.ads.status': 'Concluído',
    'education.si.degree': 'Graduação em Sistemas de Informação',
    'education.si.period': '2019 – 2020',
    'education.si.status': 'Incompleto',
    'education.tech.degree': 'Curso Técnico em Tecnologia da Informação',
    'education.tech.period': '2014 – 2016',
    'education.tech.status': 'Concluído',
    'certifications.title': 'Certificações',
    'certifications.react': 'Desenvolvedor React – XP Educação (2022)',
    'certifications.ux': 'UX & Design Thinking – Udemy (2022)',
    'certifications.figma': 'Figma para Layout Mobile – Alura (2022)',
    'certifications.uiux': 'UI & UX Design – Adobe XD e Photoshop – Udemy (2022)',
    'certifications.htmlcss': 'Formação HTML & CSS – Alura (2022)',
    'certifications.reactts': 'React com TypeScript – Alura (2022)',
    'certifications.webdev': 'Desenvolvimento Web com ES6, TypeScript e Angular – Udemy (2021)',
    'certifications.bootcamp': 'Bootcamp Full Stack Developer – IGTI (2020)',
    'skills.title': 'Competências Técnicas',
    'skills.frontend': 'Front-End & Interfaces',
    'skills.uiux': 'UI/UX & Design',
    'skills.backend': 'Back-End & Integrações',
    'skills.cms': 'CMS & Web',
    'skills.seo': 'SEO & Performance',
    'skills.other': 'Outros',
    'languages.title': 'Idiomas',
    'languages.portuguese': 'Português',
    'languages.english': 'Inglês',
    'languages.spanish': 'Espanhol',
    'languages.native': 'Nativo',
    'languages.advanced': 'Avançado (C1)',
    'languages.basic': 'Básico',
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Estou aberto a novas oportunidades e parcerias. Vamos conversar!',
    'contact.email': 'E-mail',
    'contact.linkedin': 'LinkedIn',
    'contact.location': 'Localização',
    'contact.location.value': 'Belo Horizonte, MG - Brasil',
    'contact.cta': 'Enviar E-mail',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.made': 'Desenvolvido com'
  },
  en: {
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.certifications': 'Certifications',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.greeting': 'Hello, I am',
    'hero.role': 'Front-End Developer | Full-Stack | Web Designer',
    'hero.cta': 'View Experience',
    'hero.contact': 'Get in Touch',
    'about.title': 'About Me',
    'about.summary': 'Professional with 9+ years of experience in software development and web design, working in Front-End, Back-End integrations, responsive interface creation and user experience.',
    'about.description': 'Expertise in HTML5, CSS3 (SASS, Bootstrap), JavaScript (ES6+), TypeScript, Angular (modern versions), React and Ionic, plus experience with C#/.NET, PHP and WordPress. Participation in agile projects with Scrum/Kanban, always focusing on performance, SEO and accessibility.',
    'about.availability': 'Available for on-site, hybrid or remote work',
    'stats.years': 'Years Experience',
    'stats.companies': 'Companies',
    'stats.projects': 'Projects',
    'stats.performance': 'Performance Gain',
    'experience.title': 'Professional Experience',
    'experience.totvs.title': 'Full-Stack Analyst (Front-End Focus)',
    'experience.totvs.period': 'Mar 2020 – Present',
    'experience.totvs.location': 'Belo Horizonte, Brazil',
    'experience.totvs.desc1': 'Developed responsive interfaces with Angular, TypeScript, HTML5 and CSS3',
    'experience.totvs.desc2': 'Integrated with C#/.NET and REST APIs',
    'experience.totvs.desc3': 'Optimized application performance, reducing loading time by up to 30%',
    'experience.totvs.desc4': 'Implemented UX best practices and accessibility standards',
    'experience.totvs.desc5': 'Created visual assets for internal campaigns',
    'experience.dwebnet.title': 'Software Developer',
    'experience.dwebnet.period': 'Sep 2019 – Feb 2020',
    'experience.dwebnet.location': 'Belo Horizonte, Brazil',
    'experience.dwebnet.desc1': 'Built hybrid mobile apps with Ionic (Angular + TypeScript)',
    'experience.dwebnet.desc2': 'Developed WordPress websites and system integrations',
    'experience.dwebnet.desc3': 'Implemented features with JavaScript, jQuery and PHP',
    'experience.dwebnet.desc4': 'Planned and executed email marketing campaigns',
    'experience.argument.title': 'Web Designer',
    'experience.argument.period': 'Aug 2017 – Sep 2019',
    'experience.argument.location': 'Belo Horizonte, Brazil',
    'experience.argument.desc1': 'Designed and developed corporate websites and landing pages',
    'experience.argument.desc2': 'Created banners, layouts and marketing visuals for digital campaigns',
    'experience.argument.desc3': 'Managed social media and optimized websites for SEO',
    'experience.buscarid.title': 'Web Designer',
    'experience.buscarid.period': 'Jan 2017 – Apr 2017',
    'experience.buscarid.location': 'Belo Horizonte, Brazil',
    'experience.buscarid.desc1': 'Designed and maintained websites focused on UX and responsiveness',
    'experience.nix.title': 'Software Developer',
    'experience.nix.period': 'Oct 2015 – May 2016',
    'experience.nix.location': 'Belo Horizonte, Brazil',
    'experience.nix.desc1': 'Developed applications in VB.NET, HTML, PHP and JavaScript',
    'experience.construsite.title': 'Technical Support (Internship)',
    'experience.construsite.period': 'Jun 2015 – Sep 2015',
    'experience.construsite.location': 'Belo Horizonte, Brazil',
    'experience.construsite.desc1': 'Provided customer support and basic website updates',
    'education.title': 'Education',
    'education.mba.degree': 'MBA in Front-End Development',
    'education.mba.period': 'Sep 2022 – Apr 2023',
    'education.mba.status': 'Final project in progress',
    'education.ads.degree': 'Bachelor in Systems Analysis and Development',
    'education.ads.period': 'Aug 2020 – Dec 2021',
    'education.ads.status': 'Completed',
    'education.si.degree': 'Bachelor in Information Systems',
    'education.si.period': '2019 – 2020',
    'education.si.status': 'Incomplete',
    'education.tech.degree': 'Technical Degree in Information Technology',
    'education.tech.period': '2014 – 2016',
    'education.tech.status': 'Completed',
    'certifications.title': 'Certifications',
    'certifications.react': 'React Developer – XP Educação (2022)',
    'certifications.ux': 'UX & Design Thinking – Udemy (2022)',
    'certifications.figma': 'Figma Mobile Layout – Alura (2022)',
    'certifications.uiux': 'UI & UX Design (Adobe XD & PSD) – Udemy (2022)',
    'certifications.htmlcss': 'HTML & CSS Training – Alura (2022)',
    'certifications.reactts': 'React with TypeScript – Alura (2022)',
    'certifications.webdev': 'Web Development with ES6, TypeScript & Angular – Udemy (2021)',
    'certifications.bootcamp': 'Full Stack Developer Bootcamp – IGTI (2020)',
    'skills.title': 'Technical Skills',
    'skills.frontend': 'Front-End Development',
    'skills.uiux': 'UI/UX & Design',
    'skills.backend': 'Back-End Development',
    'skills.cms': 'CMS & Web',
    'skills.seo': 'Optimization',
    'skills.other': 'Other',
    'languages.title': 'Languages',
    'languages.portuguese': 'Portuguese',
    'languages.english': 'English',
    'languages.spanish': 'Spanish',
    'languages.native': 'Native',
    'languages.advanced': 'Advanced (C1)',
    'languages.basic': 'Basic',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'I am open to new opportunities and partnerships. Let us talk!',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.location': 'Location',
    'contact.location.value': 'Belo Horizonte, MG - Brazil',
    'contact.cta': 'Send Email',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with'
  }
};

// ========================================
// Language Manager
// ========================================
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('portfolio-lang') || 'pt';
    this.langToggle = document.getElementById('langToggle');
    this.langLabel = document.getElementById('langLabel');
    
    this.init();
  }
  
  init() {
    this.updateLanguage();
    
    if (this.langToggle) {
      this.langToggle.addEventListener('click', () => this.toggleLanguage());
    }
  }
  
  toggleLanguage() {
    this.currentLang = this.currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('portfolio-lang', this.currentLang);
    this.updateLanguage();
  }
  
  updateLanguage() {
    // Update label
    if (this.langLabel) {
      this.langLabel.textContent = this.currentLang.toUpperCase();
    }
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[this.currentLang][key]) {
        el.textContent = translations[this.currentLang][key];
      }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang === 'pt' ? 'pt-BR' : 'en';
  }
}

// ========================================
// Navigation Manager
// ========================================
class NavigationManager {
  constructor() {
    this.header = document.getElementById('header');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    
    this.init();
  }
  
  init() {
    // Header scroll effect
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }
    
    // Close menu on link click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }
  
  handleScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }
  
  toggleMenu() {
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
  }
  
  closeMenu() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  handleOutsideClick(e) {
    if (!this.header.contains(e.target) && this.navMenu.classList.contains('active')) {
      this.closeMenu();
    }
  }
}

// ========================================
// Scroll Animation
// ========================================
class ScrollAnimation {
  constructor() {
    this.animatedElements = document.querySelectorAll('.timeline-item, .education-card, .certification-card, .skill-category, .stat-item');
    
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    this.animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// ========================================
// Smooth Scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  new LanguageManager();
  new NavigationManager();
  new ScrollAnimation();
});
