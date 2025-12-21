function About() {
  return (
    <main className="container">
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="scanline"></div>
        <div className="hero-content">
          <h1>&gt; About Me</h1>
          <p className="subtitle">[ Passionate About Cybersecurity ]</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="card">
              <h3>&gt; Who I Am</h3>
              <p>
                I'm Parth Mehulkumar Thakar, a passionate Cybersecurity Student from Ahmedabad, India. 
                With a strong foundation in Digital Forensics, Security Operations, and Penetration Testing, 
                I'm dedicated to securing digital assets and protecting against cyber threats.
              </p>
              <p>
                My journey in cybersecurity began with a curiosity about how systems work and how they can be protected. 
                This curiosity has evolved into a comprehensive skill set spanning multiple domains of information security.
              </p>
            </div>

            <div className="card">
              <h3>&gt; What I Do</h3>
              <div className="expertise-list">
                <div className="expertise-item">
                  <div className="expertise-icon">🛡️</div>
                  <div className="expertise-content">
                    <h4>SOC Operations</h4>
                    <p>Security monitoring, incident detection, and threat analysis using SIEM platforms like Splunk, QRadar, and ELK Stack.</p>
                  </div>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">🔍</div>
                  <div className="expertise-content">
                    <h4>Digital Forensics & Incident Response</h4>
                    <p>Investigation of security incidents, malware analysis, and evidence collection using industry-standard tools.</p>
                  </div>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">⚔️</div>
                  <div className="expertise-content">
                    <h4>Penetration Testing</h4>
                    <p>Ethical hacking and vulnerability assessment to identify and remediate security weaknesses.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>&gt; Education & Experience</h3>
              <p>
                I have completed multiple internships in cybersecurity and DFIR, gaining hands-on experience 
                in real-world security operations. My certification portfolio includes 15+ professional credentials 
                covering various aspects of information security.
              </p>
              <p>
                As an active CTF player, I've competed in numerous competitions, including achieving 16th place 
                in the IIT Roorkee CTF as part of a team effort.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
