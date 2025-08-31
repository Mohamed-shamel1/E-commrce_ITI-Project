// Authentication Pages JavaScript - Complete Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    checkAuthStatus();
});

// Global variables
let currentUser = null;
let users = [];

// Initialize authentication system
function initializeAuth() {
    // Load users from JSON file
    loadUsers();
    
    // Add fade-in animation to form elements
    addFadeInAnimations();
    
    // Setup form validation
    setupFormValidation();
    
    // Setup social button interactions
    setupSocialButtons();
}

// Load users from JSON file
async function loadUsers() {
    try {
        const response = await fetch('./users.json');
        const data = await response.json();
        users = data.users;
        console.log('Users loaded:', users.length);
    } catch (error) {
        console.error('Error loading users:', error);
        // Fallback to default users if file can't be loaded
        users = [
            {
                id: 1,
                fullName: "John Doe",
                email: "john@example.com",
                password: "password123",
                createdAt: "2024-01-15T10:30:00Z",
                lastLogin: "2024-01-20T14:45:00Z"
            },
            {
                id: 2,
                fullName: "Jane Smith",
                email: "jane@example.com",
                password: "password123",
                createdAt: "2024-01-16T09:15:00Z",
                lastLogin: "2024-01-19T16:20:00Z"
            },
            {
                id: 3,
                fullName: "Mike Johnson",
                email: "mike@example.com",
                password: "password123",
                createdAt: "2024-01-17T11:00:00Z",
                lastLogin: "2024-01-18T13:30:00Z"
            }
        ];
    }
}

// Check authentication status
function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForAuthenticatedUser();
    }
}

// Update UI for authenticated user
function updateUIForAuthenticatedUser() {
    if (!currentUser) return;
    
    // Update profile icons to show user info
    const profileIcons = document.querySelectorAll('.profile-icon, .fa-user, .fa-regular.fa-user');
    profileIcons.forEach(icon => {
        if (icon.tagName === 'A') {
            icon.href = '#';
            icon.onclick = showUserMenu;
        } else if (icon.tagName === 'I') {
            icon.parentElement.href = '#';
            icon.parentElement.onclick = showUserMenu;
        }
    });
    
    // Update navigation to show user-specific items
    updateNavigationForUser();
}

// Update navigation for authenticated user
function updateNavigationForUser() {
    const navItems = document.querySelectorAll('.nav-list li a');
    navItems.forEach(item => {
        if (item.textContent.toLowerCase().includes('sign in')) {
            item.textContent = currentUser.fullName;
            item.href = '#';
            item.onclick = showUserMenu;
        }
    });
}

// Show user menu
function showUserMenu(e) {
    e.preventDefault();
    
    // Remove existing menu
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) existingMenu.remove();
    
    // Create user menu
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.innerHTML = `
        <div class="user-menu-header">
            <div class="user-avatar">${currentUser.fullName.charAt(0)}</div>
            <div class="user-info">
                <div class="user-name">${currentUser.fullName}</div>
                <div class="user-email">${currentUser.email}</div>
            </div>
        </div>
        <div class="user-menu-items">
            <a href="index.html" class="menu-item">
                <i class="fas fa-home"></i> Home
            </a>
            <a href="Shop.html" class="menu-item">
                <i class="fas fa-shopping-bag"></i> Shop
            </a>
            <a href="cart.html" class="menu-item">
                <i class="fas fa-shopping-cart"></i> Cart
            </a>
            <a href="project.html" class="menu-item">
                <i class="fas fa-tags"></i> Deals
            </a>
            <a href="checkout.html" class="menu-item">
                <i class="fas fa-credit-card"></i> Checkout
            </a>
            <div class="menu-divider"></div>
            <button class="menu-item logout-btn" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Sign Out
            </button>
        </div>
    `;
    
    // Position menu near the clicked element
    const rect = e.target.getBoundingClientRect();
    userMenu.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 10}px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        min-width: 250px;
        border: 1px solid #e1e5e9;
    `;
    
    document.body.appendChild(userMenu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeUserMenu);
    }, 100);
}

// Close user menu
function closeUserMenu(e) {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu && !userMenu.contains(e.target)) {
        userMenu.remove();
        document.removeEventListener('click', closeUserMenu);
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Add fade-in animations to form elements
function addFadeInAnimations() {
    const formElements = document.querySelectorAll('.form-header, .social-buttons, .auth-form-fields, .form-footer');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Setup form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('.auth-form-fields');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation feedback
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formId = form.id;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    if (formId === 'loginForm') {
        handleLogin(form);
    } else if (formId === 'signupForm') {
        handleSignup(form);
    } else if (formId === 'forgotPasswordForm') {
        handleForgotPassword(form);
    }
}

// Handle login
function handleLogin(form) {
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Update last login
        user.lastLogin = new Date().toISOString();
        
        // Set current user
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success message
        showSuccessMessage(form, 'Login successful! Redirecting...');
        
        // Redirect to home page after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showErrorMessage(form, 'Invalid email or password');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Handle signup
function handleSignup(form) {
    const fullName = form.querySelector('#fullName').value;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showErrorMessage(form, 'User with this email already exists');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        return;
    }
    
    // Check password confirmation
    if (password !== confirmPassword) {
        showErrorMessage(form, 'Passwords do not match');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        return;
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        fullName: fullName,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Set current user
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Show success message
    showSuccessMessage(form, 'Account created successfully! Redirecting...');
    
    // Redirect to home page after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Handle forgot password
function handleForgotPassword(form) {
    const email = form.querySelector('#email').value;
    
    // Check if user exists
    const user = users.find(u => u.email === email);
    
    if (user) {
        showSuccessMessage(form, 'Password reset link sent to your email!');
    } else {
        showErrorMessage(form, 'No user found with this email address');
    }
    
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        clearAllFieldErrors(form);
    }, 2000);
}

// Validate individual field
function validateField(e) {
    const input = e.target;
    const value = input.value.trim();
    const fieldName = input.name;
    
    // Remove existing error styling
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Field-specific validation
    switch (fieldName) {
        case 'email':
            if (!value) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'password':
            if (!value) {
                errorMessage = 'Password is required';
                isValid = false;
            } else if (value.length < 6) {
                errorMessage = 'Password must be at least 6 characters';
                isValid = false;
            }
            break;
            
        case 'confirmPassword':
            const password = document.getElementById('password')?.value;
            if (!value) {
                errorMessage = 'Please confirm your password';
                isValid = false;
            } else if (password && value !== password) {
                errorMessage = 'Passwords do not match';
                isValid = false;
            }
            break;
            
        case 'fullName':
            if (!value) {
                errorMessage = 'Full name is required';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(input, errorMessage);
    }
}

// Clear field error
function clearFieldError(e) {
    const input = e.target;
    const errorElement = input.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}

// Show field error
function showFieldError(input, message) {
    // Remove existing error
    clearFieldError({ target: input });
    
    // Add error styling
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 5px;
        animation: fadeIn 0.3s ease;
    `;
    
    // Insert error message after input
    input.parentNode.appendChild(errorElement);
}

// Clear all field errors
function clearAllFieldErrors(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    const errorElements = form.querySelectorAll('.field-error');
    errorElements.forEach(element => element.remove());
}

// Show success message
function showSuccessMessage(form, message) {
    const submitBtn = form.querySelector('.submit-btn');
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    successMessage.style.cssText = `
        color: #27ae60;
        text-align: center;
        margin-top: 15px;
        font-weight: 600;
        animation: fadeIn 0.3s ease;
    `;
    
    // Insert success message
    form.appendChild(successMessage);
}

// Show error message
function showErrorMessage(form, message) {
    const submitBtn = form.querySelector('.submit-btn');
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.cssText = `
        color: #e74c3c;
        text-align: center;
        margin-top: 15px;
        font-weight: 600;
        animation: fadeIn 0.3s ease;
    `;
    
    // Insert error message
    form.appendChild(successMessage);
}

// Setup social button interactions
function setupSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Show loading state
            const originalText = button.querySelector('span').textContent;
            button.querySelector('span').textContent = 'Loading...';
            button.disabled = true;
            
            // Simulate social login process
            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
                button.disabled = false;
                
                // Show message
                showSocialLoginMessage(button);
            }, 2000);
        });
    });
}

// Show social login message
function showSocialLoginMessage(button) {
    const message = document.createElement('div');
    message.className = 'social-message';
    message.textContent = 'Social login functionality coming soon!';
    message.style.cssText = `
        color: #667eea;
        text-align: center;
        margin-top: 10px;
        font-size: 0.8rem;
        animation: fadeIn 0.3s ease;
    `;
    
    button.parentNode.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS for error states and user menu
const additionalStyles = `
<style>
.form-group input.error {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.field-error {
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 5px;
    animation: fadeIn 0.3s ease;
}

.success-message, .error-message, .social-message {
    animation: fadeIn 0.3s ease;
}

.social-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* User Menu Styles */
.user-menu {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user-menu-header {
    padding: 20px;
    border-bottom: 1px solid #e1e5e9;
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-avatar {
    width: 50px;
    height: 50px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
}

.user-info {
    flex: 1;
}

.user-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
}

.user-email {
    font-size: 0.9rem;
    color: #666;
}

.user-menu-items {
    padding: 10px 0;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    transition: background-color 0.2s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-size: 0.9rem;
    cursor: pointer;
}

.menu-item:hover {
    background-color: #f8f9fa;
    color: #667eea;
}

.menu-item i {
    width: 16px;
    color: #666;
}

.menu-divider {
    height: 1px;
    background: #e1e5e9;
    margin: 8px 0;
}

.logout-btn {
    color: #e74c3c !important;
}

.logout-btn:hover {
    background-color: #fdf2f2 !important;
    color: #e74c3c !important;
}

.logout-btn i {
    color: #e74c3c !important;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design for User Menu */
@media (max-width: 768px) {
    .user-menu {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 0 !important;
        max-height: none !important;
    }
    
    .user-menu-header {
        padding: 30px 20px;
        background: #f8f9fa;
    }
    
    .user-avatar {
        width: 60px;
        height: 60px;
        font-size: 24px;
    }
    
    .menu-item {
        padding: 16px 20px;
        font-size: 1rem;
    }
}
</style>
`;

// Add additional styles to head
document.head.insertAdjacentHTML('beforeend', additionalStyles);
