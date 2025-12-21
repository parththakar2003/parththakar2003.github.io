// ===================================
// ADMIN ROUTE GUARD
// ===================================

(function() {
  'use strict';
  
  // Pages that don't require authentication
  const PUBLIC_PAGES = ['/admin/index.html', '/admin/'];
  
  // Check authentication on page load
  function checkAuth() {
    const currentPage = window.location.pathname;
    
    // Allow access to login page
    if (PUBLIC_PAGES.some(page => currentPage.endsWith(page))) {
      // If already authenticated, redirect to dashboard
      if (window.adminAuth && window.adminAuth.isAuthenticated()) {
        window.location.href = '/admin/dashboard.html';
      }
      return;
    }
    
    // Check if user is authenticated
    if (!window.adminAuth || !window.adminAuth.isAuthenticated()) {
      // Redirect to login
      window.location.href = '/admin/index.html?redirect=' + encodeURIComponent(currentPage);
      return;
    }
    
    // Refresh session on activity
    window.adminAuth.refreshSession();
  }
  
  // Initialize guard
  function initGuard() {
    checkAuth();
    
    // Check auth periodically
    setInterval(checkAuth, 60000); // Every minute
    
    // Refresh session on user activity
    ['click', 'keypress', 'scroll'].forEach(event => {
      document.addEventListener(event, () => {
        if (window.adminAuth && window.adminAuth.isAuthenticated()) {
          window.adminAuth.refreshSession();
        }
      }, { passive: true });
    });
  }
  
  // Wait for DOM and auth to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initGuard, 100);
    });
  } else {
    setTimeout(initGuard, 100);
  }
  
})();
