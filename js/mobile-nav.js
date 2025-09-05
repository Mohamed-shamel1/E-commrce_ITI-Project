// Universal Mobile Navigation for All Pages
// This ensures consistent hamburger menu behavior across all pages

(function() {
    'use strict';
    
    // Mobile Navigation Manager
    const MobileNav = {
        // Initialize mobile navigation
        init: function() {
            this.setupHamburgerMenu();
            this.setupResponsiveHandlers();
            this.ensureAccessibility();
        },
        
        // Setup hamburger menu functionality
        setupHamburgerMenu: function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navList = document.querySelector('.nav-list, nav ul');
            
            if (menuToggle && navList) {
                // Toggle menu on hamburger click
                menuToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isOpen = navList.classList.contains('show') || navList.classList.contains('active');
                    
                    if (isOpen) {
                        this.closeMenu();
                    } else {
                        this.openMenu();
                    }
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
                        this.closeMenu();
                    }
                });
                
                // Close menu when clicking on navigation links
                const navLinks = navList.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        // Small delay to allow navigation to start
                        setTimeout(() => {
                            this.closeMenu();
                        }, 100);
                    });
                });
            }
        },
        
        // Open mobile menu
        openMenu: function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navList = document.querySelector('.nav-list, nav ul');
            
            if (navList && menuToggle) {
                navList.classList.add('show', 'active');
                menuToggle.style.transform = 'rotate(90deg)';
                menuToggle.setAttribute('aria-expanded', 'true');
                menuToggle.setAttribute('aria-label', 'Close navigation menu');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
                
                // Add animation class
                navList.style.animation = 'slideDown 0.3s ease-out';
            }
        },
        
        // Close mobile menu
        closeMenu: function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navList = document.querySelector('.nav-list, nav ul');
            
            if (navList && menuToggle) {
                navList.classList.remove('show', 'active');
                menuToggle.style.transform = 'rotate(0deg)';
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
                
                // Restore body scroll
                document.body.style.overflow = '';
                
                // Add animation class
                navList.style.animation = 'slideUp 0.3s ease-out';
            }
        },
        
        // Setup responsive handlers
        setupResponsiveHandlers: function() {
            // Close menu on window resize if screen becomes large
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMenu();
                }
            });
            
            // Handle orientation change on mobile devices
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    if (window.innerWidth > 768) {
                        this.closeMenu();
                    }
                }, 100);
            });
        },
        
        // Ensure accessibility features
        ensureAccessibility: function() {
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (menuToggle) {
                // Ensure proper ARIA attributes
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-controls', 'navigation-menu');
                
                // Add keyboard support
                menuToggle.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        menuToggle.click();
                    }
                });
                
                // Add focus management
                menuToggle.addEventListener('focus', () => {
                    menuToggle.style.outline = '2px solid #667eea';
                });
                
                menuToggle.addEventListener('blur', () => {
                    menuToggle.style.outline = '';
                });
            }
            
            // Add ID to navigation for ARIA reference
            const navList = document.querySelector('.nav-list, nav ul');
            if (navList && !navList.id) {
                navList.id = 'navigation-menu';
            }
        }
    };
    
    // Add required CSS animations
    function addNavigationCSS() {
        if (!document.querySelector('#mobile-nav-animations')) {
            const style = document.createElement('style');
            style.id = 'mobile-nav-animations';
            style.textContent = `
                /* Mobile Navigation Animations */
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                }
                
                /* Enhanced Mobile Menu Styles */
                @media (max-width: 768px) {
                    .nav-list, nav ul {
                        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(-20px);
                    }
                    
                    .nav-list.show, .nav-list.active, nav.active ul {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                    
                    .menu-toggle {
                        transition: transform 0.3s ease, background-color 0.2s ease;
                        z-index: 1002;
                    }
                    
                    .menu-toggle:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                    
                    .menu-toggle:focus {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                }
                
                /* Smooth transitions for all interactive elements */
                .nav-list li a, nav ul li a {
                    transition: background-color 0.2s ease, color 0.2s ease, padding 0.2s ease;
                }
                
                @media (hover: hover) and (pointer: fine) {
                    .nav-list li a:hover, nav ul li a:hover {
                        background-color: var(--accent-primary, #667eea);
                        color: white;
                        padding-left: 25px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize when DOM is ready
    function initializeMobileNav() {
        addNavigationCSS();
        MobileNav.init();
        
        // Debug info
        console.log('📱 Mobile Navigation initialized');
    }
    
    // Initialize immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMobileNav);
    } else {
        initializeMobileNav();
    }
    
    // Export for use in other scripts
    window.MobileNav = MobileNav;
    
})();

// Utility function for manual menu control
function toggleMobileMenu() {
    if (window.MobileNav) {
        const navList = document.querySelector('.nav-list, nav ul');
        const isOpen = navList.classList.contains('show') || navList.classList.contains('active');
        
        if (isOpen) {
            window.MobileNav.closeMenu();
        } else {
            window.MobileNav.openMenu();
        }
    }
}