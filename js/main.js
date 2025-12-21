// Modern Cybersecurity Portfolio - Main JavaScript

// Calculate age based on birth date
function calculateAge() {
    const birthDate = new Date(Date.UTC(2003, 7, 7)); // August 7, 2003 (month is 0-indexed)
    const now = new Date();

    let years = now.getUTCFullYear() - birthDate.getUTCFullYear();
    const currentMonth = now.getUTCMonth();
    const birthMonth = birthDate.getUTCMonth();

    if (currentMonth < birthMonth ||
        (currentMonth === birthMonth && now.getUTCDate() < birthDate.getUTCDate())) {
        years--;
    }

    // Calculate days since last birthday
    const birthDateThisYear = new Date(Date.UTC(now.getUTCFullYear(), birthMonth, birthDate.getUTCDate()));
    if (now < birthDateThisYear) {
        birthDateThisYear.setUTCFullYear(now.getUTCFullYear() - 1);
    }

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const days = Math.floor((now.getTime() - birthDateThisYear.getTime()) / millisecondsInDay);

    return { years, days };
}

// Update age display
function updateAge() {
    const age = calculateAge();
    const yearsElement = document.getElementById('years-value');
    const daysElement = document.getElementById('days-value');
    
    if (yearsElement) yearsElement.textContent = age.years;
    if (daysElement) daysElement.textContent = age.days;
}

// Update current time display
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = new Date().toLocaleTimeString();
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            // Update icon and save preference
            if (body.classList.contains('light-mode')) {
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

// Typewriter effect for terminal code
let typewriterTimeout;
let currentLineIndex = 0;
let currentCharIndex = 0;
// SECURITY NOTE: codeLines contains only hardcoded content with no user input
// The HTML tags are safe and intentional for syntax highlighting
const codeLines = [
    "class <span class='code-class'>CyberSecurityExpert</span> {",
    "  <span class='code-method'>constructor</span>() {",
    "    this.<span class='code-property'>name</span> = <span class='code-string'>'Parth Thakar'</span>;",
    "    this.<span class='code-property'>role</span> = <span class='code-string'>'Cybersecurity Student'</span>;",
    "    this.<span class='code-property'>specialties</span> = [<span class='code-string'>'DFIR'</span>, <span class='code-string'>'SOC Operations'</span>, <span class='code-string'>'Red Team'</span>, <span class='code-string'>'Blue Team'</span>, <span class='code-string'>'CTF Player'</span>];",
    "  }",
    "}"
];

function typewriterEffect() {
    if (currentLineIndex >= codeLines.length) {
        // Typewriter complete
        const cursor = document.getElementById('typewriter-cursor');
        const completionMsg = document.getElementById('completion-msg');
        if (cursor) cursor.style.display = 'none';
        if (completionMsg) completionMsg.style.display = 'block';
        return;
    }

    const currentLine = codeLines[currentLineIndex];
    // Safe: codeLines is hardcoded and contains no user input
    const plainText = currentLine.replace(/<[^>]*>/g, ''); // Remove HTML tags for character counting
    
    if (currentCharIndex < plainText.length) {
        // Continue typing current line
        let htmlIndex = 0;
        let plainIndex = 0;
        
        // Find the HTML position that corresponds to the current plain text position
        while (plainIndex <= currentCharIndex && htmlIndex < currentLine.length) {
            if (currentLine[htmlIndex] === '<') {
                // Skip HTML tag
                while (htmlIndex < currentLine.length && currentLine[htmlIndex] !== '>') {
                    htmlIndex++;
                }
                htmlIndex++;
            } else {
                plainIndex++;
                htmlIndex++;
            }
        }
        
        // Update the display
        const container = document.getElementById('typewriter-container');
        if (container) {
            const lineElements = container.querySelectorAll('.code-line');
            if (lineElements[currentLineIndex]) {
                lineElements[currentLineIndex].innerHTML = currentLine.substring(0, htmlIndex);
            }
        }
        
        currentCharIndex++;
        typewriterTimeout = setTimeout(typewriterEffect, Math.random() * 50 + 30);
    } else {
        // Move to next line
        currentLineIndex++;
        currentCharIndex = 0;
        typewriterTimeout = setTimeout(typewriterEffect, 100);
    }
}

// Initialize typewriter when page loads
function initTypewriter() {
    const container = document.getElementById('typewriter-container');
    if (!container) return;
    
    // Create code-line divs for each line
    container.innerHTML = '';
    codeLines.forEach(() => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        container.appendChild(lineDiv);
    });
    
    // Show cursor initially
    const cursor = document.getElementById('typewriter-cursor');
    if (cursor) {
        cursor.style.display = 'inline-block';
    }
    
    // Start typewriter after a short delay
    setTimeout(() => {
        typewriterEffect();
    }, 1000);
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll animations for cards
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Set active nav link
    setActiveNavLink();
    
    // Update age and time
    updateAge();
    updateTime();
    
    // Update time every second
    setInterval(updateTime, 1000);
    
    // Initialize typewriter effect
    initTypewriter();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize music player
    initMusicPlayer();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Music Player Functionality
function initMusicPlayer() {
    const audio = document.getElementById('musicPlayer');
    const playBtn = document.getElementById('musicPlayBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const skipBack = document.getElementById('musicSkipBack');
    const skipForward = document.getElementById('musicSkipForward');
    const progressBar = document.getElementById('musicProgressBar');
    const progressFill = document.getElementById('musicProgressFill');
    const currentTimeEl = document.getElementById('musicCurrentTime');
    const durationEl = document.getElementById('musicDuration');
    const volumeBtn = document.getElementById('musicVolumeBtn');
    const volumeSlider = document.getElementById('musicVolumeSlider');
    const volumeValue = document.getElementById('musicVolumeValue');
    const volumeSliderWrapper = document.getElementById('volumeSliderWrapper');
    const volumeOnIcon = document.getElementById('volumeOnIcon');
    const volumeOffIcon = document.getElementById('volumeOffIcon');
    const musicStatus = document.getElementById('musicStatus');
    const soundWaveBars = document.querySelectorAll('.sound-wave-bar');
    const musicIcon = document.querySelector('.music-icon');
    
    if (!audio) return; // Exit if no audio element
    
    let isPlaying = false;
    
    // Set initial volume
    audio.volume = 0.25;
    
    // Format time helper
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Toggle play/pause
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            playBtn.classList.remove('playing');
            musicStatus.textContent = 'PAUSED';
            musicStatus.classList.remove('playing');
            soundWaveBars.forEach(bar => bar.classList.remove('playing'));
            musicIcon.classList.remove('playing');
        } else {
            audio.play().catch(err => {
                console.error('Error playing audio:', err);
            });
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            playBtn.classList.add('playing');
            musicStatus.textContent = 'PLAYING';
            musicStatus.classList.add('playing');
            soundWaveBars.forEach(bar => bar.classList.add('playing'));
            musicIcon.classList.add('playing');
        }
    });
    
    // Update progress bar
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });
    
    // Update duration when metadata loads
    audio.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(audio.duration);
    });
    
    // Seek functionality
    progressBar.addEventListener('click', function(e) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        audio.currentTime = percentage * audio.duration;
    });
    
    // Skip back 10 seconds
    skipBack.addEventListener('click', function() {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
    
    // Skip forward 10 seconds
    skipForward.addEventListener('click', function() {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });
    
    // Volume button toggle
    volumeBtn.addEventListener('click', function() {
        volumeSliderWrapper.classList.toggle('active');
    });
    
    // Volume slider
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        audio.volume = volume;
        volumeValue.textContent = this.value + '%';
        
        if (volume === 0) {
            volumeOnIcon.style.display = 'none';
            volumeOffIcon.style.display = 'block';
        } else {
            volumeOnIcon.style.display = 'block';
            volumeOffIcon.style.display = 'none';
        }
    });
    
    // Close volume slider when clicking outside
    document.addEventListener('click', function(e) {
        if (!volumeBtn.contains(e.target) && !volumeSliderWrapper.contains(e.target)) {
            volumeSliderWrapper.classList.remove('active');
        }
    });
}

// Add loading screen fade out
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Cleanup timeouts when leaving page
window.addEventListener('beforeunload', function() {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
});

// Resume Download Functionality
function downloadResume() {
    // Download ATS-friendly resume PDF
    const link = document.createElement('a');
    link.href = 'Parth_Thakar_Resume.pdf';
    link.download = 'Parth_Thakar_Resume_ATS_Friendly.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Make downloadResume available globally
window.downloadResume = downloadResume;
