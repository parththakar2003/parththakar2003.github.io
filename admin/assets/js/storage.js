// ===================================
// ADMIN STORAGE MANAGER
// ===================================

(function() {
  'use strict';
  
  const DATA_PREFIX = 'portfolio-data-';
  
  // Load data from file or localStorage
  async function loadData(filename) {
    try {
      // First try to get from localStorage (edited data)
      const localData = localStorage.getItem(DATA_PREFIX + filename);
      if (localData) {
        return JSON.parse(localData);
      }
      
      // Otherwise, load from file
      const response = await fetch(`/data/${filename}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return null;
    }
  }
  
  // Save data to localStorage
  function saveData(filename, data) {
    try {
      localStorage.setItem(DATA_PREFIX + filename, JSON.stringify(data, null, 2));
      return { success: true, message: 'Data saved successfully' };
    } catch (error) {
      console.error(`Error saving ${filename}:`, error);
      return { success: false, message: error.message };
    }
  }
  
  // Export data as JSON file
  function exportData(filename, data) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportName = filename.replace('.json', '') + '-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  }
  
  // Import data from file
  function importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  }
  
  // Clear all local data
  function clearAllData() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(DATA_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return { success: true, message: 'All local data cleared' };
  }
  
  // Get data status
  function getDataStatus() {
    const files = [
      'profile.json',
      'socials.json',
      'skills.json',
      'projects.json',
      'blogs.json',
      'experience.json',
      'certifications.json',
      'settings.json'
    ];
    
    const status = {};
    
    files.forEach(file => {
      const localData = localStorage.getItem(DATA_PREFIX + file);
      status[file] = {
        hasLocalChanges: !!localData,
        size: localData ? new Blob([localData]).size : 0
      };
    });
    
    return status;
  }
  
  // Sync data to JSON files (requires manual download and commit)
  async function syncToFiles() {
    const files = [
      'profile.json',
      'socials.json',
      'skills.json',
      'projects.json',
      'blogs.json',
      'experience.json',
      'certifications.json',
      'settings.json'
    ];
    
    const exports = [];
    
    for (const file of files) {
      const data = await loadData(file);
      if (data) {
        exports.push({ filename: file, data: data });
      }
    }
    
    return exports;
  }
  
  // Expose API
  window.adminStorage = {
    loadData,
    saveData,
    exportData,
    importData,
    clearAllData,
    getDataStatus,
    syncToFiles
  };
  
})();
