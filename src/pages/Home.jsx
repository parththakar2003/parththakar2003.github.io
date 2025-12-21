import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer';

function Home() {
  const [age, setAge] = useState({ years: 21, days: 0 });
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [typewriterLines, setTypewriterLines] = useState([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const codeLines = [
    "class <span class='code-class'>CyberSecurityExpert</span> {",
    "  <span class='code-method'>constructor</span>() {",
    "    this.<span class='code-property'>name</span> = <span class='code-string'>'Parth Thakar'</span>;",
    "    this.<span class='code-property'>role</span> = <span class='code-string'>'Cybersecurity Student'</span>;",
    "    this.<span class='code-property'>specialties</span> = [<span class='code-string'>'DFIR'</span>, <span class='code-string'>'SOC Operations'</span>, <span class='code-string'>'Red Team'</span>, <span class='code-string'>'Blue Team'</span>, <span class='code-string'>'CTF Player'</span>];",
    "  }",
    "}"
  ];

  useEffect(() => {
    // Calculate age
    const calculateAge = () => {
      const birthDate = new Date(Date.UTC(2003, 7, 7));
      const now = new Date();
      let years = now.getUTCFullYear() - birthDate.getUTCFullYear();
      const currentMonth = now.getUTCMonth();
      const birthMonth = birthDate.getUTCMonth();

      if (currentMonth < birthMonth || (currentMonth === birthMonth && now.getUTCDate() < birthDate.getUTCDate())) {
        years--;
      }

      const birthDateThisYear = new Date(Date.UTC(now.getUTCFullYear(), birthMonth, birthDate.getUTCDate()));
      if (now < birthDateThisYear) {
        birthDateThisYear.setUTCFullYear(now.getUTCFullYear() - 1);
      }

      const millisecondsInDay = 1000 * 60 * 60 * 24;
      const days = Math.floor((now.getTime() - birthDateThisYear.getTime()) / millisecondsInDay);

      return { years, days };
    };

    setAge(calculateAge());

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Typewriter effect
    let currentLine = 0;
    let currentChar = 0;
    const lines = [];

    const typewriter = () => {
      if (currentLine >= codeLines.length) {
        setIsTypingComplete(true);
        return;
      }

      const line = codeLines[currentLine];
      const plainText = line.replace(/<[^>]*>/g, '');

      if (currentChar < plainText.length) {
        let htmlIndex = 0;
        let plainIndex = 0;

        while (plainIndex <= currentChar && htmlIndex < line.length) {
          if (line[htmlIndex] === '<') {
            while (htmlIndex < line.length && line[htmlIndex] !== '>') {
              htmlIndex++;
            }
            htmlIndex++;
          } else {
            plainIndex++;
            htmlIndex++;
          }
        }

        lines[currentLine] = line.substring(0, htmlIndex);
        setTypewriterLines([...lines]);
        currentChar++;
        setTimeout(typewriter, Math.random() * 50 + 30);
      } else {
        currentLine++;
        currentChar = 0;
        setTimeout(typewriter, 100);
      }
    };

    // Initialize empty lines
    for (let i = 0; i < codeLines.length; i++) {
      lines.push('');
    }
    setTypewriterLines(lines);

    // Start typewriter after delay
    setTimeout(typewriter, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <main className="container">
      <h3 className="status-line">
        <span className="status-dot"></span>
        Parth Thakar - Cybersecurity Portfolio
      </h3>

      {/* Terminal Header Section */}
      <div className="terminal-section">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-btn red"></span>
            <span className="terminal-btn yellow"></span>
            <span className="terminal-btn green"></span>
          </div>
          <div className="terminal-title">terminal@parth-security</div>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">cat welcome.txt</span>
          </div>
          <div className="terminal-output">
            <p>👋 Hello! I'm <span className="highlight-name">Parth Mehulkumar Thakar</span>, a Cybersecurity Student from Ahmedabad, India</p>
            <p>Securing digital assets with expertise in DFIR, SOC Operations, and Penetration Testing.</p>
          </div>

          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">python3 about_me.py</span>
          </div>
          <div className="terminal-code">
            <div id="typewriter-container">
              {typewriterLines.map((line, index) => (
                <div key={index} className="code-line" dangerouslySetInnerHTML={{ __html: line }}></div>
              ))}
            </div>
            {!isTypingComplete && <div className="cursor-blink">|</div>}
            {isTypingComplete && (
              <div className="completion-msg">
                ✓ Security expert profile initialized successfully
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Container for Cards */}
      <div className="cards-container">
        {/* Left Column */}
        <div className="left-column">
          {/* Profile Card */}
          <div className="card profile-card">
            <div className="glow-effect glow-top-left"></div>
            <div className="glow-effect glow-bottom-right"></div>
            
            <div className="profile-header">
              <div className="profile-image-wrapper">
                <div className="profile-image">
                  <div className="profile-placeholder">PT</div>
                </div>
                <div className="status-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                </div>
              </div>
              <div className="profile-info">
                <h2>Parth Thakar</h2>
                <p className="role-title">Cybersecurity Student</p>
                <div className="social-links">
                  <a href="https://github.com/parththakar2003" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/parthmehulkumarthakar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a href="mailto:parththakar39@gmail.com" aria-label="Email" className="social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{age.years}</div>
                <div className="stat-label">Years</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{age.days}</div>
                <div className="stat-label">Days</div>
              </div>
            </div>
            <div className="execution-time">
              Execution time: <span>{currentTime}</span>
            </div>
          </div>

          {/* Skills Card */}
          <div className="card skills-card">
            <div className="card-header">
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
              <h3>Security Arsenal</h3>
            </div>
            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#00d9ff'}}>🛡️</div>
                <div className="skill-name">SIEM</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#ff0055'}}>🔍</div>
                <div className="skill-name">DFIR</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#00ff88'}}>⚔️</div>
                <div className="skill-name">Pentesting</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#ffbd2e'}}>🔐</div>
                <div className="skill-name">Volatility</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#9b59b6'}}>📊</div>
                <div className="skill-name">Wireshark</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#e74c3c'}}>💻</div>
                <div className="skill-name">Python</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#3498db'}}>🐧</div>
                <div className="skill-name">Linux</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#00d9ff'}}>🔧</div>
                <div className="skill-name">IDS/IPS</div>
              </div>
              <div className="skill-item">
                <div className="skill-icon" style={{color: '#ff0055'}}>🎯</div>
                <div className="skill-name">CTF</div>
              </div>
            </div>
          </div>

          {/* Music Player */}
          <MusicPlayer />
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Quick Stats */}
          <div className="card stats-card">
            <h3 className="stats-title">// Professional Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-item">
                <div className="highlight-icon">⚡</div>
                <div className="highlight-value">5+</div>
                <div className="highlight-label">Internships</div>
                <p>Cyber Security & DFIR</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🎯</div>
                <div className="highlight-value">15+</div>
                <div className="highlight-label">Certifications</div>
                <p>Professional credentials</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🏅</div>
                <div className="highlight-value">16th</div>
                <div className="highlight-label">CTF Rank</div>
                <p>IIT Roorkee CTF (Team)</p>
              </div>
            </div>
          </div>

          {/* Key Expertise */}
          <div className="card expertise-card">
            <h3 className="expertise-title">// Core Competencies</h3>
            <div className="expertise-list">
              <div className="expertise-item">
                <div className="expertise-icon">🛡️</div>
                <div className="expertise-content">
                  <h4>SOC Operations</h4>
                  <p>Security monitoring, incident detection, SIEM platforms</p>
                  <div className="expertise-tags">
                    <span>Splunk</span>
                    <span>QRadar</span>
                    <span>ELK</span>
                  </div>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon">🔍</div>
                <div className="expertise-content">
                  <h4>Digital Forensics</h4>
                  <p>Investigation, malware analysis, evidence collection</p>
                  <div className="expertise-tags">
                    <span>Volatility</span>
                    <span>Autopsy</span>
                    <span>FTK</span>
                  </div>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon">⚔️</div>
                <div className="expertise-content">
                  <h4>Red Team Operations</h4>
                  <p>Penetration testing, exploitation, adversary emulation</p>
                  <div className="expertise-tags">
                    <span>Metasploit</span>
                    <span>Burp Suite</span>
                    <span>PowerShell</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="card cta-card">
            <h3>Ready to Collaborate?</h3>
            <p>Let's discuss how we can work together on security projects and initiatives.</p>
            <div className="cta-buttons">
              <Link to="/portfolio" className="btn btn-primary">
                <span>View Portfolio</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/resume" className="btn btn-secondary">
                <span>View Resume</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
