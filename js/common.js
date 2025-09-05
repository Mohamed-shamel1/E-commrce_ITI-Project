// Common JavaScript functions for all pages

// Dark Mode functionality
class DarkModeManager {
    constructor() {
        this.storageKey = 'darkMode';
        this.theme = this.getTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.createToggleButton();
        this.setupEventListeners();
    }

    getTheme() {
        // Check localStorage first
        const saved = localStorage.getItem(this.storageKey);
        if (saved) return saved;
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        this.updateToggleButton();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem(this.storageKey, newTheme);
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'dark-mode-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.innerHTML = `
            <i class="fas fa-moon" id="theme-icon"></i>
            <span id="theme-text">Dark</span>
        `;
        
        document.body.appendChild(button);
        this.toggleButton = button;
    }

    updateToggleButton() {
        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');
        
        if (icon && text) {
            if (this.theme === 'dark') {
                icon.className = 'fas fa-sun';
                text.textContent = 'Light';
            } else {
                icon.className = 'fas fa-moon';
                text.textContent = 'Dark';
            }
        }
    }

    setupEventListeners() {
        // Toggle button click
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.storageKey)) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }

        // Keyboard shortcut: Ctrl/Cmd + Shift + D
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
}

// Initialize dark mode manager
const darkModeManager = new DarkModeManager();

// Make it globally available
window.darkModeManager = darkModeManager;

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>جاري التحميل...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Add smooth transitions to buttons
function addButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn, .buy_btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add card hover effects
function addCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all effects when page loads
document.addEventListener('DOMContentLoaded', function() {
    addButtonEffects();
    addCardEffects();
    
    // Add loading animation for page transitions
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        if (link.href.includes('.html') && !link.href.includes('#')) {
            link.addEventListener('click', function() {
                showLoading();
            });
        }
    });
});

// Add CSS for loading animation
const loadingCSS = `
<style>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-spinner {
    text-align: center;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-spinner p {
    color: #667eea;
    font-weight: 600;
    font-size: 16px;
}
</style>
`;

// Add loading CSS to head
document.head.insertAdjacentHTML('beforeend', loadingCSS);
