// Theme Management System
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add rotation animation
            themeToggle.classList.add('rotating');
            
            // Apply new theme after animation starts
            setTimeout(() => {
                applyTheme(newTheme);
                themeToggle.classList.remove('rotating');
            }, 150);
        });
    }
}

function applyTheme(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update icon
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

// Enhanced Mobile Menu functionality
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navList.classList.toggle('show');
            menuToggle.classList.toggle('active');
            
            // Add aria-expanded for accessibility
            const isExpanded = navList.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

let currentIndex = 0;

// Slider dots logic
const slider = document.getElementById('slider');
const sliderDots = document.getElementById('sliderDots');
const sliderImages = slider.children;
let dots = [];

function createDots() {
  sliderDots.innerHTML = '';
  dots = [];
  for (let i = 0; i < sliderImages.length-2; i++) {
    const dot = document.createElement('span');
    dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    sliderDots.appendChild(dot);
    dots.push(dot);
  }
}

function updateDots() {
  dots.forEach((dot, i) => {
    dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
  });
}

function moveSlide(step) {
  const itemWidth = slider.children[0].offsetWidth + 25; // image + gap (updated gap)
  currentIndex += step;
  if (currentIndex < 0) currentIndex = sliderImages.length - 1;
  if (currentIndex >= sliderImages.length) currentIndex = 0;
  slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  updateDots();
}

function goToSlide(index) {
  currentIndex = index;
  const itemWidth = slider.children[0].offsetWidth + 25;
  slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  updateDots();
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveSlide(1);
  }, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Countdown Timer Functionality
function startCountdown() {
  // Set target date (2 days, 6 hours, 5 minutes, 30 seconds from now)
  const now = new Date();
  const targetDate = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000) + (5 * 60 * 1000) + (30 * 1000));
  
  function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
      // Countdown finished
      document.getElementById('index-days').innerHTML = '00';
      document.getElementById('index-minutes').innerHTML = '00';
      document.getElementById('index-seconds').innerHTML = '00';
      return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update countdown display
    if (document.getElementById('index-days')) {
      document.getElementById('index-days').innerHTML = days.toString().padStart(2, '0');
    }
    if (document.getElementById('index-hours')) {
      document.getElementById('index-hours').innerHTML = hours.toString().padStart(2, '0');
    }
    if (document.getElementById('index-minutes')) {
      document.getElementById('index-minutes').innerHTML = minutes.toString().padStart(2, '0');
    }
    if (document.getElementById('index-seconds')) {
      document.getElementById('index-seconds').innerHTML = seconds.toString().padStart(2, '0');
    }
    
    // Add pulse animation when seconds change
    const secondsElement = document.getElementById('index-seconds');
    if (secondsElement) {
      secondsElement.style.animation = 'none';
      setTimeout(() => {
        secondsElement.style.animation = 'pulse 0.5s ease-in-out';
      }, 10);
    }
  }
  
  // Update countdown immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Enhanced slider with smooth transitions
function initializeSlider() {
  if (slider) {
    // Add smooth transition class
    slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Add hover effects to pause auto-slide
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoSlide();
    });
    
    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          moveSlide(1); // Swipe left
        } else {
          moveSlide(-1); // Swipe right
        }
      }
      
      startAutoSlide();
    });
  }
}

// Testimonials functionality
let testimonialIndex = 0;
const testimonialTrack = document.querySelector('.testimonial-track');
const totalTestimonials = document.querySelectorAll('.testimonial-item').length;

function updateTestimonial() {
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    }
}

function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
    updateTestimonial();
}

function prevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonial();
}

// Removed duplicate mobile menu function - using enhanced version above

// Initialize everything when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  createDots();
  initializeSlider();
  startCountdown();
  startAutoSlide();
  initializeMobileMenu();
  
  // Add CSS animation for countdown pulse
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});

// Pause auto-slide when page is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoSlide();
  } else {
    startAutoSlide();
  }
});