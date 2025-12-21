import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo">Parth Thakar</Link>
        <div className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="nav-right">
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMobileMenu}>About</Link></li>
            <li><Link to="/resume" className={location.pathname === '/resume' ? 'active' : ''} onClick={closeMobileMenu}>Resume</Link></li>
            <li><Link to="/certifications" className={location.pathname === '/certifications' ? 'active' : ''} onClick={closeMobileMenu}>Certifications</Link></li>
            <li><Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''} onClick={closeMobileMenu}>Portfolio</Link></li>
            <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''} onClick={closeMobileMenu}>Blog</Link></li>
          </ul>
          <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme" onClick={toggleTheme}>
            <span id="themeIcon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
