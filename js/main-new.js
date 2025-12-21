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
