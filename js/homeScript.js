const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
menuToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});

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

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize everything when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
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