// ===================================
// ADMIN AUTHENTICATION
// ===================================

(function() {
  'use strict';
  
  const AUTH_KEY = 'portfolio-admin-auth';
  const SESSION_KEY = 'portfolio-admin-session';
  const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  
  // Default credentials (should be changed by user)
  const DEFAULT_CREDENTIALS = {
    username: 'admin',
    password: 'changeme123' // IMPORTANT: Change this password!
  };
  
  // Initialize authentication system
  function initAuth() {
    // Check if credentials are stored
    let storedCreds = localStorage.getItem(AUTH_KEY);
    
    if (!storedCreds) {
      // First time setup - store default credentials
      localStorage.setItem(AUTH_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
      console.warn('⚠️ Using default credentials. Please change them in settings!');
    }
  }
  
  // Login function
  function login(username, password) {
    const storedCreds = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    
    if (username === storedCreds.username && password === storedCreds.password) {
      // Create session
      const session = {
        username: username,
        loginTime: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION
      };
      
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(SESSION_KEY, JSON.stringify(session)); // Persistent session
      
      return { success: true, message: 'Login successful' };
    }
    
    return { success: false, message: 'Invalid credentials' };
  }
  
  // Logout function
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    window.location.href = '/admin/index.html';
  }
  
  // Check if user is authenticated
  function isAuthenticated() {
    const session = getSession();
    
    if (!session) return false;
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      logout();
      return false;
    }
    
    return true;
  }
  
  // Get current session
  function getSession() {
    let session = sessionStorage.getItem(SESSION_KEY);
    
    if (!session) {
      // Try to get from localStorage (persistent)
      session = localStorage.getItem(SESSION_KEY);
      if (session) {
        sessionStorage.setItem(SESSION_KEY, session);
      }
    }
    
    return session ? JSON.parse(session) : null;
  }
  
  // Update credentials
  function updateCredentials(currentPassword, newUsername, newPassword) {
    const storedCreds = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    
    if (currentPassword !== storedCreds.password) {
      return { success: false, message: 'Current password is incorrect' };
    }
    
    const newCreds = {
      username: newUsername || storedCreds.username,
      password: newPassword || storedCreds.password
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(newCreds));
    
    return { success: true, message: 'Credentials updated successfully' };
  }
  
  // Refresh session
  function refreshSession() {
    const session = getSession();
    
    if (session) {
      session.expiresAt = Date.now() + SESSION_DURATION;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  }
  
  // Initialize on load
  initAuth();
  
  // Expose API
  window.adminAuth = {
    login,
    logout,
    isAuthenticated,
    getSession,
    updateCredentials,
    refreshSession
  };
  
})();
