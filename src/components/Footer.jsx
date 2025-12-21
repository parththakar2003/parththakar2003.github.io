import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 Parth Thakar. All rights reserved. Built with React and Vite.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/certifications">Certifications</Link>
          <Link to="/blog">Blog</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
