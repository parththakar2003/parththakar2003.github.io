// ===================================
// LAZY LOADING
// ===================================

(function() {
  'use strict';
  
  // Configuration
  const config = {
    rootMargin: '50px',
    threshold: 0.01
  };
  
  // Check for Intersection Observer support
  const supportsIntersectionObserver = 'IntersectionObserver' in window;
  
  // Initialize lazy loading
  function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    
    if (supportsIntersectionObserver) {
      const imageObserver = createImageObserver();
      const backgroundObserver = createBackgroundObserver();
      
      lazyImages.forEach(img => imageObserver.observe(img));
      lazyBackgrounds.forEach(el => backgroundObserver.observe(el));
    } else {
      // Fallback for browsers without Intersection Observer
      loadAllImages(lazyImages);
      loadAllBackgrounds(lazyBackgrounds);
    }
  }
  
  // Create image observer
  function createImageObserver() {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, config);
  }
  
  // Create background observer
  function createBackgroundObserver() {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          loadBackground(el);
          observer.unobserve(el);
        }
      });
    }, config);
  }
  
  // Load single image
  function loadImage(img) {
    const src = img.getAttribute('data-src');
    const srcset = img.getAttribute('data-srcset');
    
    if (!src && !srcset) return;
    
    // Add loading class
    img.classList.add('lazy-loading');
    
    // Handle srcset
    if (srcset) {
      img.setAttribute('srcset', srcset);
      img.removeAttribute('data-srcset');
    }
    
    // Handle src
    if (src) {
      // For images
      if (img.tagName === 'IMG') {
        img.src = src;
      }
      img.removeAttribute('data-src');
    }
    
    // Handle load event
    img.addEventListener('load', () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
    });
    
    // Handle error
    img.addEventListener('error', () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
      console.error('Failed to load image:', src || srcset);
    });
  }
  
  // Load background image
  function loadBackground(el) {
    const bg = el.getAttribute('data-bg');
    if (!bg) return;
    
    el.style.backgroundImage = `url(${bg})`;
    el.removeAttribute('data-bg');
    el.classList.add('lazy-loaded');
  }
  
  // Fallback: Load all images immediately
  function loadAllImages(images) {
    images.forEach(img => loadImage(img));
  }
  
  // Fallback: Load all backgrounds immediately
  function loadAllBackgrounds(elements) {
    elements.forEach(el => loadBackground(el));
  }
  
  // Dynamically add new elements to lazy load
  function observeNewElements(selector = 'img[data-src], [data-bg]') {
    if (!supportsIntersectionObserver) return;
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const lazyElements = node.querySelectorAll(selector);
            lazyElements.forEach((el) => {
              if (el.tagName === 'IMG') {
                createImageObserver().observe(el);
              } else {
                createBackgroundObserver().observe(el);
              }
            });
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLazyLoad();
      observeNewElements();
    });
  } else {
    initLazyLoad();
    observeNewElements();
  }
  
  // Expose API
  window.lazyLoad = {
    init: initLazyLoad,
    loadImage: loadImage,
    loadBackground: loadBackground
  };
  
})();
