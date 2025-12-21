function Portfolio() {
  return (
    <main className="container">
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="scanline"></div>
        <div className="hero-content">
          <h1>&gt; Portfolio</h1>
          <p className="subtitle">[ Projects & Work ]</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid">
            <div className="card">
              <h3>&gt; Security Projects</h3>
              <p>
                Explore my cybersecurity projects, research, and contributions to the field.
                This section showcases my practical experience and technical capabilities.
              </p>
            </div>
            <div className="card">
              <h3>&gt; CTF Achievements</h3>
              <p>
                Competed in multiple Capture The Flag competitions, including achieving
                16th place at IIT Roorkee CTF.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
