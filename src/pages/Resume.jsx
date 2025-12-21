function Resume() {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Parth_Thakar_Resume.pdf';
    link.download = 'Parth_Thakar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="container">
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="scanline"></div>
        <div className="hero-content">
          <h1>&gt; Resume</h1>
          <p className="subtitle">[ Professional Experience & Skills ]</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Download My Resume</h3>
              <p style={{ marginBottom: '2rem' }}>
                Download my complete resume to learn more about my experience, skills, and achievements.
              </p>
              <button onClick={downloadResume} className="btn btn-primary">
                <span>Download Resume (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Resume;
