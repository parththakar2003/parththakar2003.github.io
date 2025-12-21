function Certifications() {
  return (
    <main className="container">
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="scanline"></div>
        <div className="hero-content">
          <h1>&gt; Certifications</h1>
          <p className="subtitle">[ Professional Credentials ]</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card">
            <h3>&gt; Industry Certifications</h3>
            <p>I hold 15+ professional certifications covering various aspects of cybersecurity, including:</p>
            <ul style={{ marginTop: '1rem', paddingLeft: '2rem' }}>
              <li>Security Operations & SIEM</li>
              <li>Digital Forensics & Incident Response</li>
              <li>Penetration Testing & Ethical Hacking</li>
              <li>Network Security</li>
              <li>Cloud Security</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Certifications;
