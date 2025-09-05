// Dark Mode Toggle Functionality

(function() {
    'use strict';
    
    // Theme management
    const ThemeManager = {
        themes: {
            light: 'light',
            dark: 'dark'
        },
        
        storageKey: 'eprova-theme-preference',
        
        // Get current theme
        getCurrentTheme: function() {
            return localStorage.getItem(this.storageKey) || this.themes.light;
        },
        
        // Set theme
        setTheme: function(theme) {
            if (theme === this.themes.dark) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem(this.storageKey, this.themes.dark);
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem(this.storageKey, this.themes.light);
            }
            this.updateToggleButton(theme);
        },
        
        // Toggle theme
        toggleTheme: function() {
            const currentTheme = this.getCurrentTheme();
            const newTheme = currentTheme === this.themes.light ? this.themes.dark : this.themes.light;
            this.setTheme(newTheme);
            
            // Add toggle animation
            this.animateToggle();
        },
        
        // Update toggle button icon and aria-label
        updateToggleButton: function(theme) {
            const button = document.querySelector('.dark-mode-toggle');
            if (button) {
                if (theme === this.themes.dark) {
                    button.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
                    button.setAttribute('aria-label', 'Switch to light mode');
                    button.setAttribute('title', 'Switch to light mode');
                } else {
                    button.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
                    button.setAttribute('aria-label', 'Switch to dark mode');
                    button.setAttribute('title', 'Switch to dark mode');
                }
            }
        },
        
        // Add animation effect when toggling
        animateToggle: function() {
            const button = document.querySelector('.dark-mode-toggle');
            if (button) {
                button.style.transform = 'scale(0.9) rotate(180deg)';
                setTimeout(() => {
                    button.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }
        },
        
        // Initialize theme on page load
        init: function() {
            const savedTheme = this.getCurrentTheme();
            this.setTheme(savedTheme);
            this.createToggleButton();
            this.addKeyboardShortcut();
        },
        
        // Create dark mode toggle button
        createToggleButton: function() {
            // Check if button already exists
            if (document.querySelector('.dark-mode-toggle')) {
                return;
            }
            
            const button = document.createElement('button');
            button.className = 'dark-mode-toggle';
            button.setAttribute('type', 'button');
            button.setAttribute('aria-label', 'Toggle dark mode');
            
            // Add click event listener
            button.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            // Add to page
            document.body.appendChild(button);
            
            // Update initial button state
            const currentTheme = this.getCurrentTheme();
            this.updateToggleButton(currentTheme);
        },
        
        // Add keyboard shortcut (Ctrl/Cmd + Shift + D)
        addKeyboardShortcut: function() {
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    };
    
    // Auto-detect system preference if no saved preference
    function detectSystemPreference() {
        if (!localStorage.getItem(ThemeManager.storageKey)) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                ThemeManager.setTheme(ThemeManager.themes.dark);
            }
        }
    }
    
    // Listen for system theme changes
    function listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(ThemeManager.storageKey)) {
                    ThemeManager.setTheme(e.matches ? ThemeManager.themes.dark : ThemeManager.themes.light);
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    function initializeDarkMode() {
        detectSystemPreference();
        ThemeManager.init();
        listenForSystemThemeChanges();
        
        // Add a small delay to prevent flash of wrong theme
        setTimeout(() => {
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        }, 100);
    }
    
    // Initialize immediately if DOM is already ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDarkMode);
    } else {
        initializeDarkMode();
    }
    
    // Export for use in other scripts
    window.ThemeManager = ThemeManager;
    
    // Add transition CSS if not already added
    const addTransitionCSS = () => {
        if (!document.querySelector('#dark-mode-transitions')) {
            const style = document.createElement('style');
            style.id = 'dark-mode-transitions';
            style.textContent = `
                .dark-mode-toggle {
                    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) !important;
                }
                
                .dark-mode-toggle i {
                    transition: transform 0.3s ease;
                }
                
                /* Prevent flash of wrong theme */
                body.theme-transition,
                body.theme-transition *,
                body.theme-transition *:before,
                body.theme-transition *:after {
                    transition: all 0.3s !important;
                    transition-delay: 0 !important;
                }
                
                /* Smooth theme transition */
                html {
                    color-scheme: light dark;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    addTransitionCSS();
    
})();

// Utility function to manually trigger theme change (for debugging)
function toggleDarkMode() {
    if (window.ThemeManager) {
        window.ThemeManager.toggleTheme();
    }
}

// Console message for developers
console.log('🌓 Dark Mode enabled! Use Ctrl/Cmd + Shift + D to toggle, or call toggleDarkMode() in console.');