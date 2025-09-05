// Authentication Check Script - Include in all pages

document.addEventListener('DOMContentLoaded', async function() {
    checkAuthStatus();
    await setupAuthUI();
    initializeCart();
});

// Global variables
let currentUser = null;
let users = [];
let userCart = [];

// Initialize cart from localStorage
function initializeCart() {
    const savedCart = localStorage.getItem('userCart');
    if (savedCart) {
        userCart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('userCart', JSON.stringify(userCart));
}

// Show loading state for profile icons
function showProfileIconsLoading() {
    const profileIcons = document.querySelectorAll('.profile-icon, .fa-user, .fa-regular.fa-user');
    profileIcons.forEach(icon => {
        const parentElement = icon.tagName === 'I' ? icon.parentElement : icon;
        parentElement.classList.add('profile-loading');
        
        // Add loading spinner
        if (!parentElement.querySelector('.profile-spinner')) {
            const spinner = document.createElement('div');
            spinner.className = 'profile-spinner';
            spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            parentElement.appendChild(spinner);
        }
        
        // Hide original icon temporarily
        icon.style.opacity = '0.3';
    });
}

// Hide loading state for profile icons
function hideProfileIconsLoading() {
    const profileIcons = document.querySelectorAll('.profile-icon, .fa-user, .fa-regular.fa-user');
    profileIcons.forEach(icon => {
        const parentElement = icon.tagName === 'I' ? icon.parentElement : icon;
        parentElement.classList.remove('profile-loading');
        
        // Remove loading spinner
        const spinner = parentElement.querySelector('.profile-spinner');
        if (spinner) {
            spinner.remove();
        }
        
        // Restore original icon
        icon.style.opacity = '1';
    });
}

// Add item to cart
function addToCart(product) {
    const existingItem = userCart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        userCart.push({
            ...product,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart();
    updateCartBadge();
    showCartNotification();
}

// Remove item from cart
function removeFromCart(productId) {
    userCart = userCart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
}

// Update item quantity
function updateCartItemQuantity(productId, quantity) {
    const item = userCart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartBadge();
        }
    }
}

// Get cart total
function getCartTotal() {
    return userCart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return userCart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart badge
function updateCartBadge() {
    const cartBadges = document.querySelectorAll('.cart-badge, #cart-badge');
    const count = getCartItemCount();
    
    cartBadges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    });
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Item added to cart!</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Check authentication status
function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForAuthenticatedUser();
    }
}

// Load users from JSON file
async function loadUsers() {
    try {
        const response = await fetch('./users.json');
        const data = await response.json();
        users = data.users;
    } catch (error) {
        console.error('Error loading users:', error);
        // Fallback to default users
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

// Setup authentication UI
async function setupAuthUI() {
    // Show loading state for profile icons
    showProfileIconsLoading();
    
    // Set a maximum timeout for loading to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
        console.warn('Profile icon loading timeout - hiding loading state');
        hideProfileIconsLoading();
    }, 5000); // 5 second timeout
    
    try {
        await loadUsers();
    } catch (error) {
        console.error('Error setting up auth UI:', error);
    }
    
    // Clear timeout since loading completed
    clearTimeout(loadingTimeout);
    
    // Remove loading state and update profile icons
    hideProfileIconsLoading();
    
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
    updateCartBadge();
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
    updateCartBadge();
}

// Update navigation for authenticated user
function updateNavigationForUser() {
    const navItems = document.querySelectorAll('.nav-list li a, nav ul li a');
    navItems.forEach(item => {
        if (item.textContent.toLowerCase().includes('sign in')) {
            item.textContent = currentUser.fullName;
            item.href = '#';
            item.onclick = showUserMenu;
        }
    });
}

// Show user menu with cart items
function showUserMenu(e) {
    e.preventDefault();
    
    // Remove existing menu
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) existingMenu.remove();
    
    // Create cart items HTML
    const cartItemsHTML = userCart.length > 0 ? `
        <div class="cart-section">
            <div class="cart-header">
                <h4>Shopping Cart (${getCartItemCount()} items)</h4>
                <span class="cart-total">$${getCartTotal().toFixed(2)}</span>
            </div>
            <div class="cart-items">
                ${userCart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price}</div>
                            <div class="cart-item-controls">
                                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})" class="qty-btn">-</button>
                                <span class="qty-display">${item.quantity}</span>
                                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})" class="qty-btn">+</button>
                                <button onclick="removeFromCart(${item.id})" class="remove-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-actions">
                <button onclick="window.location.href='cart.html'" class="view-cart-btn">View Full Cart</button>
                <button onclick="window.location.href='checkout.html'" class="checkout-btn">Checkout</button>
            </div>
        </div>
    ` : `
        <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <p>Your cart is empty</p>
            <button onclick="window.location.href='Shop.html'" class="shop-btn">Start Shopping</button>
        </div>
    `;
    
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
        ${cartItemsHTML}
        <div class="user-menu-items">
            <a href="index.html" class="menu-item">
                <i class="fas fa-home"></i> Home
            </a>
            <a href="Shop.html" class="menu-item">
                <i class="fas fa-shopping-bag"></i> Shop
            </a>
            <a href="cart.html" class="menu-item">
                <i class="fas fa-shopping-cart"></i> Cart (${getCartItemCount()})
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
        min-width: 300px;
        max-width: 400px;
        border: 1px solid #e1e5e9;
        max-height: 80vh;
        overflow-y: auto;
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
    userCart = [];
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userCart');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Add CSS for user menu with cart
const userMenuStyles = `
<style>
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

/* Cart Section Styles */
.cart-section {
    padding: 15px;
    border-bottom: 1px solid #e1e5e9;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.cart-header h4 {
    margin: 0;
    font-size: 1rem;
    color: #333;
}

.cart-total {
    font-weight: 600;
    color: #667eea;
    font-size: 1.1rem;
}

.cart-items {
    max-height: 200px;
    overflow-y: auto;
}

.cart-item {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
}

.cart-item-details {
    flex: 1;
}

.cart-item-name {
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 4px;
}

.cart-item-price {
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.cart-item-controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.qty-btn {
    width: 24px;
    height: 24px;
    border: 1px solid #ddd;
    background: #f8f9fa;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qty-btn:hover {
    background: #e9ecef;
}

.qty-display {
    min-width: 20px;
    text-align: center;
    font-size: 0.9rem;
}

.remove-btn {
    width: 24px;
    height: 24px;
    border: 1px solid #ff6b6b;
    background: #fff;
    color: #ff6b6b;
    border-radius: 4px;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.remove-btn:hover {
    background: #ff6b6b;
    color: white;
}

.cart-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.view-cart-btn, .checkout-btn, .shop-btn {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.view-cart-btn {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #ddd;
}

.view-cart-btn:hover {
    background: #e9ecef;
}

.checkout-btn {
    background: #667eea;
    color: white;
}

.checkout-btn:hover {
    background: #5a6fd8;
}

.shop-btn {
    background: #667eea;
    color: white;
    width: 100%;
    padding: 12px;
}

.shop-btn:hover {
    background: #5a6fd8;
}

.empty-cart {
    padding: 30px 20px;
    text-align: center;
    color: #666;
}

.empty-cart i {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 15px;
}

.empty-cart p {
    margin: 0 0 20px 0;
    font-size: 1rem;
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

/* Cart Notification */
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

/* Profile Loading Styles */
.profile-loading {
    position: relative;
    pointer-events: none;
}

.profile-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    color: #667eea;
    z-index: 10;
}

.profile-spinner i {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
    
    .cart-items {
        max-height: 300px;
    }
}
</style>
`;

// Add user menu styles to head
document.head.insertAdjacentHTML('beforeend', userMenuStyles);

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.showUserMenu = showUserMenu;
window.logout = logout;
