// ===================================
// THEME TOGGLE
// ===================================

(function() {
  'use strict';
  
  const THEME_KEY = 'portfolio-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  
  // Initialize theme on page load
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? THEME_DARK : THEME_LIGHT);
    
    setTheme(theme, false);
    createThemeToggle();
  }
  
  // Set theme
  function setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    
    if (save) {
      localStorage.setItem(THEME_KEY, theme);
    }
    
    // Update toggle button if it exists
    updateToggleButton(theme);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    setTheme(newTheme);
  }
  
  // Create theme toggle button
  function createThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
      
      const currentTheme = document.documentElement.getAttribute('data-theme');
      updateToggleButton(currentTheme);
    }
  }
  
  // Update toggle button appearance
  function updateToggleButton(theme) {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return;
    
    const icon = toggleButton.querySelector('.theme-icon');
    if (!icon) return;
    
    if (theme === THEME_LIGHT) {
      icon.textContent = '🌙';
      toggleButton.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      icon.textContent = '☀️';
      toggleButton.setAttribute('aria-label', 'Switch to light mode');
    }
  }
  
  // Listen for system theme changes
  function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem(THEME_KEY);
      
      // Only auto-switch if user hasn't manually set a preference
      if (!savedTheme) {
        const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
        setTheme(newTheme, false);
      }
    });
  }
  
  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      watchSystemTheme();
    });
  } else {
    initTheme();
    watchSystemTheme();
  }
  
  // Expose toggle function globally
  window.toggleTheme = toggleTheme;
  window.setTheme = setTheme;
  
})();
