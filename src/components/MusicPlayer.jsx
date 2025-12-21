import { useState, useRef, useEffect } from 'react';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(25);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      audioRef.current.currentTime = percentage * duration;
    }
  };

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="card music-player-card">
      <div className="music-player-glow glow-top"></div>
      <div className="music-player-glow glow-bottom"></div>
      
      {/* Sound wave visualizer (decorative) */}
      <div className="sound-wave-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`sound-wave-bar ${isPlaying ? 'playing' : ''}`}></div>
        ))}
      </div>

      <div className="music-player-content">
        <div className="music-info">
          <div className="music-icon-wrapper">
            <div className={`music-icon ${isPlaying ? 'playing' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13M9 13l12-2"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
          </div>
          <div className="music-details">
            <h3>Cybersecurity Ambient</h3>
            <p>Background Music</p>
          </div>
          <div className={`music-status ${isPlaying ? 'playing' : ''}`}>
            {isPlaying ? 'PLAYING' : 'PAUSED'}
          </div>
        </div>

        {/* Progress bar */}
        <div className="music-progress-section">
          <div className="music-progress-bar" onClick={handleProgressClick}>
            <div className="music-progress-fill" style={{ width: `${progress}%` }}></div>
            <div className="music-progress-hover"></div>
          </div>
          <div className="music-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="music-controls">
          <button className="music-control-btn" onClick={handleSkipBack} title="Skip back 10s">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
            </svg>
          </button>
          
          <button className={`music-play-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay} title="Play/Pause">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button className="music-control-btn" onClick={handleSkipForward} title="Skip forward 10s">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
            </svg>
          </button>
        </div>

        {/* Volume control */}
        <div className="music-volume">
          <button className="music-volume-btn" onClick={toggleVolumeSlider} title="Toggle volume">
            {volume === 0 ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            )}
          </button>
          
          <div className={`music-volume-slider-wrapper ${showVolumeSlider ? 'active' : ''}`}>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              className="music-volume-slider" 
              onChange={handleVolumeChange}
            />
            <span className="music-volume-value">{volume}%</span>
          </div>
          
          <div className="music-quality">WAV · 44.1kHz</div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src="/audio/ambient-cybersecurity.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default MusicPlayer;
