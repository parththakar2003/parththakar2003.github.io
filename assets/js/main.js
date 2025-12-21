// ===================================
// MAIN JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollReveal();
  initLazyLoading();
  loadPageData();
  initSmoothScroll();
  initBackToTop();
});

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Highlight active nav link based on scroll position
  window.addEventListener('scroll', () => {
    highlightActiveSection();
    handleNavbarScroll();
  });
  
  // Set initial active link
  highlightActiveSection();
}

function highlightActiveSection() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  let currentSection = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// ===================================
// LAZY LOADING
// ===================================
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// DATA LOADING
// ===================================
async function loadPageData() {
  const page = getCurrentPage();
  
  try {
    switch(page) {
      case 'index':
        await loadProfileData();
        break;
      case 'about':
        await loadAboutData();
        break;
      case 'skills':
        await loadSkillsData();
        break;
      case 'projects':
        await loadProjectsData();
        break;
      case 'blog':
        await loadBlogData();
        break;
      case 'certifications':
        await loadCertificationsData();
        break;
      case 'resume':
        await loadResumeData();
        break;
    }
  } catch (error) {
    console.error('Error loading page data:', error);
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '') || 'index';
  return page;
}

async function loadProfileData() {
  try {
    const response = await fetch('/data/profile.json');
    const profile = await response.json();
    
    // Update hero section
    const heroTitle = document.getElementById('hero-name');
    const heroSubtitle = document.getElementById('hero-title');
    
    if (heroTitle) heroTitle.textContent = profile.name;
    if (heroSubtitle) heroSubtitle.textContent = profile.title;
  } catch (error) {
    console.error('Error loading profile data:', error);
  }
}

async function loadAboutData() {
  try {
    const [profile, experience] = await Promise.all([
      fetch('/data/profile.json').then(r => r.json()),
      fetch('/data/experience.json').then(r => r.json())
    ]);
    
    // Populate about section
    if (document.getElementById('about-bio')) {
      document.getElementById('about-bio').textContent = profile.bio;
    }
    
    // Populate education
    if (document.getElementById('education-list')) {
      renderEducation(experience.education);
    }
  } catch (error) {
    console.error('Error loading about data:', error);
  }
}

async function loadSkillsData() {
  try {
    const skills = await fetch('/data/skills.json').then(r => r.json());
    
    if (document.getElementById('computer-skills')) {
      renderSkills(skills.computerSkills, 'computer-skills');
    }
    
    if (document.getElementById('soft-skills')) {
      renderSkills(skills.softSkills, 'soft-skills');
    }
  } catch (error) {
    console.error('Error loading skills data:', error);
  }
}

async function loadProjectsData() {
  try {
    const data = await fetch('/data/projects.json').then(r => r.json());
    
    if (document.getElementById('projects-grid')) {
      renderProjects(data.projects);
    }
  } catch (error) {
    console.error('Error loading projects data:', error);
  }
}

async function loadBlogData() {
  try {
    const data = await fetch('/data/blogs.json').then(r => r.json());
    
    if (document.getElementById('blog-grid')) {
      renderBlogs(data.blogs);
    }
  } catch (error) {
    console.error('Error loading blog data:', error);
  }
}

async function loadCertificationsData() {
  try {
    const data = await fetch('/data/certifications.json').then(r => r.json());
    
    if (document.getElementById('certifications-grid')) {
      renderCertifications(data.certifications);
    }
    
    if (document.getElementById('achievements-grid')) {
      renderAchievements(data.achievements);
    }
  } catch (error) {
    console.error('Error loading certifications data:', error);
  }
}

async function loadResumeData() {
  try {
    const [profile, experience, skills, certifications] = await Promise.all([
      fetch('/data/profile.json').then(r => r.json()),
      fetch('/data/experience.json').then(r => r.json()),
      fetch('/data/skills.json').then(r => r.json()),
      fetch('/data/certifications.json').then(r => r.json())
    ]);
    
    // Render all sections
    renderResumeData({ profile, experience, skills, certifications });
  } catch (error) {
    console.error('Error loading resume data:', error);
  }
}

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderSkills(skills, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = skills.map(skill => `
    <div class="card cyber-card scroll-reveal">
      <div class="skill-icon">${skill.icon || '🔧'}</div>
      <h3 class="card-title">${skill.name}</h3>
      ${skill.category ? `<p class="card-text">${skill.category}</p>` : ''}
      ${skill.level ? `<div class="skill-level">${skill.level}</div>` : ''}
    </div>
  `).join('');
}

function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container) return;
  
  container.innerHTML = projects.map(project => `
    <div class="card cyber-card scroll-reveal">
      ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
      <h3 class="card-title">${project.title}</h3>
      <p class="card-text">${project.description}</p>
      <div class="project-tech">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <div class="project-links">
        ${project.github ? `<a href="${project.github}" class="btn btn-secondary" target="_blank">GitHub</a>` : ''}
        ${project.demo ? `<a href="${project.demo}" class="btn btn-primary" target="_blank">Demo</a>` : ''}
      </div>
    </div>
  `).join('');
}

function renderBlogs(blogs) {
  const container = document.getElementById('blog-grid');
  if (!container) return;
  
  if (blogs.length === 0) {
    container.innerHTML = '<p class="text-center">No blog posts yet. Check back soon!</p>';
    return;
  }
  
  container.innerHTML = blogs.map(blog => `
    <div class="card cyber-card scroll-reveal">
      ${blog.image ? `<img src="${blog.image}" alt="${blog.title}" class="blog-image">` : ''}
      <h3 class="card-title">${blog.title}</h3>
      <p class="card-text">${blog.excerpt}</p>
      <div class="blog-meta">
        <span class="blog-date">${blog.date}</span>
        ${blog.tags ? blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('') : ''}
      </div>
      <a href="${blog.url}" class="btn btn-primary">Read More</a>
    </div>
  `).join('');
}

function renderCertifications(certifications) {
  const container = document.getElementById('certifications-grid');
  if (!container) return;
  
  container.innerHTML = certifications.map(cert => `
    <div class="card scroll-reveal">
      <h3 class="card-title">${cert.name}</h3>
      <p class="card-text">${cert.issuer}</p>
      ${cert.date ? `<p class="cert-date">${cert.date}</p>` : ''}
    </div>
  `).join('');
}

function renderAchievements(achievements) {
  const container = document.getElementById('achievements-grid');
  if (!container) return;
  
  container.innerHTML = achievements.map(achievement => `
    <div class="card cyber-card scroll-reveal">
      <div class="achievement-icon">${achievement.icon || '🏆'}</div>
      <h3 class="card-title">${achievement.title}</h3>
      <p class="card-text">${achievement.description}</p>
    </div>
  `).join('');
}

function renderEducation(education) {
  const container = document.getElementById('education-list');
  if (!container) return;
  
  container.innerHTML = education.map(edu => `
    <div class="education-item scroll-reveal">
      <h3>${edu.degree}</h3>
      <p class="institution">${edu.institution}</p>
      <p class="period">${edu.period}</p>
      ${edu.grade ? `<p class="grade">Grade: ${edu.grade}</p>` : ''}
    </div>
  `).join('');
}

function renderResumeData(data) {
  // This would render the complete resume
  // Implementation depends on resume.html structure
  console.log('Rendering resume data', data);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export functions for use in other scripts
window.portfolioUtils = {
  debounce,
  throttle,
  loadPageData
};
