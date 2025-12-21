function Blog() {
  return (
    <main className="container">
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="scanline"></div>
        <div className="hero-content">
          <h1>&gt; Blog</h1>
          <p className="subtitle">[ Security Research & Insights ]</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid">
            <div className="card">
              <h3>&gt; Memory Forensics</h3>
              <p>In-depth analysis of memory forensics techniques and tools.</p>
            </div>
            <div className="card">
              <h3>&gt; SIEM Rules</h3>
              <p>Best practices for creating effective SIEM detection rules.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;
