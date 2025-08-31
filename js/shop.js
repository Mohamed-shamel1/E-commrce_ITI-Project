// Shop Page JavaScript Functionality - Simplified Version

// Product data with enhanced properties for display only
const products = [
    {
        id: 1,
        name: "Elegant Blazer",
        brand: "al-karam",
        category: "womens",
        collection: "best-sellers",
        price: 95.50,
        size: ["S", "M", "L", "XL"],
        colors: ["black", "navy", "gray"],
        tags: ["formal", "elegant", "professional"],
        image: "./scr/pexels-kowalievska-1381556.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Professional blazer for modern women"
    },
    {
        id: 2,
        name: "Long Dress",
        brand: "al-karam",
        category: "womens",
        collection: "new-arrivals",
        price: 95.50,
        size: ["S", "M", "L"],
        colors: ["red", "blue", "black"],
        tags: ["elegant", "casual", "summer"],
        image: "./scr/dom-hill-nimElTcTNyY-unsplash.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "Almost Sold Out",
        description: "Elegant long dress for special occasions"
    },
    {
        id: 3,
        name: "Full Sweater",
        brand: "nike",
        category: "womens",
        collection: "best-sellers",
        price: 75.00,
        size: ["M", "L", "XL"],
        colors: ["gray", "black", "white"],
        tags: ["casual", "winter", "comfortable"],
        image: "./scr/pexels-minan1398-1163194.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Comfortable sweater for cold weather"
    },
    {
        id: 4,
        name: "White Dress",
        brand: "zara",
        category: "womens",
        collection: "new-arrivals",
        price: 120.00,
        size: ["S", "M", "L", "XL"],
        colors: ["white", "cream"],
        tags: ["elegant", "summer", "formal"],
        image: "./scr/pexels-frendsmans-1926769.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Classic white dress for summer"
    },
    {
        id: 5,
        name: "White Shirt",
        brand: "adidas",
        category: "mens",
        collection: "best-sellers",
        price: 45.00,
        size: ["S", "M", "L", "XL"],
        colors: ["white", "blue", "pink"],
        tags: ["formal", "casual", "professional"],
        image: "./scr/pexels-olly-974911.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Crisp white shirt for formal occasions"
    },
    {
        id: 6,
        name: "Street Style Jacket",
        brand: "nike",
        category: "mens",
        collection: "new-arrivals",
        price: 85.00,
        size: ["M", "L", "XL"],
        colors: ["black", "gray", "navy"],
        tags: ["casual", "street", "modern"],
        image: "./scr/dom-hill-nimElTcTNyY-unsplash.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "Almost Sold Out",
        description: "Trendy street style jacket"
    },
    {
        id: 7,
        name: "Summer Dress",
        brand: "zara",
        category: "womens",
        collection: "new-arrivals",
        price: 65.00,
        size: ["S", "M", "L"],
        colors: ["yellow", "pink", "blue"],
        tags: ["summer", "casual", "light"],
        image: "./scr/pexels-minan1398-1163194.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Light summer dress for warm days"
    },
    {
        id: 8,
        name: "Classic Coat",
        brand: "al-karam",
        category: "mens",
        collection: "best-sellers",
        price: 150.00,
        size: ["M", "L", "XL"],
        colors: ["brown", "black", "gray"],
        tags: ["classic", "winter", "formal"],
        image: "./scr/pexels-frendsmans-1926769.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Timeless classic coat for winter"
    },
    {
        id: 9,
        name: "Trendy Suit",
        brand: "adidas",
        category: "mens",
        collection: "best-sellers",
        price: 200.00,
        size: ["S", "M", "L", "XL"],
        colors: ["black", "navy", "gray"],
        tags: ["formal", "business", "professional"],
        image: "./scr/p1.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Modern suit for business meetings"
    },
    {
        id: 10,
        name: "Fashion Hoodie",
        brand: "nike",
        category: "accessories",
        collection: "new-arrivals",
        price: 55.00,
        size: ["S", "M", "L", "XL"],
        colors: ["black", "gray", "white"],
        tags: ["casual", "comfortable", "sport"],
        image: "./scr/pexels-olly-974911.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Comfortable hoodie for casual wear"
    },
    {
        id: 11,
        name: "Designer Bag",
        brand: "zara",
        category: "accessories",
        collection: "best-sellers",
        price: 180.00,
        size: ["one-size"],
        colors: ["brown", "black", "tan"],
        tags: ["luxury", "elegant", "fashion"],
        image: "./scr/pexels-kowalievska-1381556.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "Almost Sold Out",
        description: "Luxury designer bag for fashionistas"
    },
    {
        id: 12,
        name: "Premium Watch",
        brand: "adidas",
        category: "accessories",
        collection: "new-arrivals",
        price: 250.00,
        size: ["one-size"],
        colors: ["silver", "gold", "black"],
        tags: ["premium", "elegant", "gentleman"],
        image: "./scr/dom-hill-nimElTcTNyY-unsplash.jpg",
        reviews: 4.1,
        reviewCount: 4100,
        stock: "In Stock",
        description: "Elegant premium watch for gentlemen"
    }
];

// Simple cart state (display only)
let cartCount = 0;

// DOM elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const searchToggle = document.querySelector('.search-toggle');
const searchExpand = document.querySelector('.search-expand');
const cartIcon = document.getElementById('cart-icon');
const cartBadge = document.getElementById('cart-badge');
const miniCartOverlay = document.getElementById('mini-cart-overlay');
const miniCartSidebar = document.getElementById('mini-cart-sidebar');
const miniCartItems = document.getElementById('mini-cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCart = document.getElementById('close-cart');
const filterToggle = document.getElementById('filter-toggle');
const mobileFilterOverlay = document.getElementById('mobile-filter-overlay');
const mobileFilterSidebar = document.querySelector('.mobile-filter-sidebar');
const closeFilters = document.getElementById('close-filters');
const clearFiltersBtn = document.getElementById('clear-filters');
const resultsCount = document.getElementById('results-count');
const sortSelect = document.getElementById('sort-select');
const viewButtons = document.querySelectorAll('.view-btn');

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    setupEventListeners();
    loadProducts(products);
    updateResultsCount(products.length);
});

// Initialize shop functionality
function initializeShop() {
    // Add fade-in animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    // Initialize cart counter
    updateCartCounter();
    
    // Clone filters for mobile
    cloneFiltersForMobile();
}

// Clone filters for mobile overlay
function cloneFiltersForMobile() {
    const desktopFilters = document.getElementById('sidebar-filters');
    const mobileFilterContent = document.querySelector('.mobile-filter-content');
    
    if (desktopFilters && mobileFilterContent) {
        mobileFilterContent.innerHTML = desktopFilters.innerHTML;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality (static - just toggle visibility)
    searchToggle.addEventListener('click', toggleSearch);
    
    // Cart functionality (static - just toggle visibility)
    cartIcon.addEventListener('click', openMiniCart);
    closeCart.addEventListener('click', closeMiniCart);
    miniCartOverlay.addEventListener('click', function(e) {
        if (e.target === miniCartOverlay) {
            closeMiniCart();
        }
    });
    
    // Filter functionality (static - just toggle mobile visibility)
    filterToggle.addEventListener('click', openMobileFilters);
    closeFilters.addEventListener('click', closeMobileFilters);
    mobileFilterOverlay.addEventListener('click', function(e) {
        if (e.target === mobileFilterOverlay) {
            closeMobileFilters();
        }
    });
    
    // Filter UI elements (static - just visual feedback)
    setupFilterUI();
    
    // Sort functionality (static - just visual feedback)
    sortSelect.addEventListener('change', handleSort);
    
    // View toggle (static - just visual feedback)
    viewButtons.forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });
    
    // Smooth scroll for CTA button
    const shopCta = document.querySelector('.shop-cta');
    if (shopCta) {
        shopCta.addEventListener('click', function() {
            document.querySelector('.main-content').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Setup filter UI elements (static functionality)
function setupFilterUI() {
    // Filter checkboxes - just visual feedback
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Just toggle the visual state, no filtering
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.style.background = 'black';
                checkmark.style.borderColor = 'black';
            } else {
                checkmark.style.background = 'transparent';
                checkmark.style.borderColor = '#ddd';
            }
        });
    });
    
    // Size buttons - just visual feedback
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Color buttons - just visual feedback
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Tag buttons - just visual feedback
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Clear filters - just reset visual states
    clearFiltersBtn.addEventListener('click', resetFilterUI);
}

// Reset filter UI to default state
function resetFilterUI() {
    // Reset checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    document.querySelector('input[value="all"]').checked = true;
    
    // Reset size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset tag buttons
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset checkmarks
    document.querySelectorAll('.checkmark').forEach(checkmark => {
        checkmark.style.background = 'transparent';
        checkmark.style.borderColor = '#ddd';
    });
}

// Search functionality (static - just toggle visibility)
function toggleSearch() {
    searchExpand.classList.toggle('active');
    if (searchExpand.classList.contains('active')) {
        searchInput.focus();
    }
}

// Sort functionality (static - just visual feedback)
function handleSort() {
    // Just show a simple message - no actual sorting
    console.log('Sort option selected:', sortSelect.value);
}

// View toggle functionality (static - just visual feedback)
function handleViewToggle(e) {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    const view = e.target.dataset.view;
    if (view === 'list') {
        productsGrid.classList.add('list-view');
    } else {
        productsGrid.classList.remove('list-view');
    }
}

// Load products into grid (static - always shows all products)
function loadProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
        
        // Add animation delay for staggered effect
        setTimeout(() => {
            productCard.classList.add('slide-up');
        }, 100);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.id = product.id;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-overlay">
                <button class="quick-view-btn">Quick View</button>
            </div>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-brand">${product.brand.replace('-', ' ').toUpperCase()}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-reviews">
                <div class="stars">${'★'.repeat(Math.floor(product.reviews))}${'☆'.repeat(5 - Math.floor(product.reviews))}</div>
                <div class="review-count">(${product.reviews}k) Customer Reviews</div>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-stock">${product.stock}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    return card;
}

// Cart functionality - integrated with auth system
function addToCart(productId) {
    // Find the product
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Use the global addToCart function from auth-check.js
    if (typeof window.addToCart === 'function') {
        window.addToCart(product);
    }
    
    // Add bounce animation to cart badge
    if (cartBadge) {
        cartBadge.style.animation = 'none';
        setTimeout(() => {
            cartBadge.style.animation = 'bounce 0.6s ease';
        }, 10);
    }
    
    // Add loading state to button temporarily
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

function updateCartCounter() {
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
    
    // Show/hide cart badge
    if (cartCount > 0) {
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

// Mini cart functionality (static - just toggle visibility)
function openMiniCart() {
    miniCartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show static cart content
    showStaticCart();
}

function closeMiniCart() {
    miniCartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show static cart content
function showStaticCart() {
    if (!miniCartItems) return;
    
    miniCartItems.innerHTML = `
        <div class="cart-item">
            <img src="./scr/p1.jpg" alt="Sample Product" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">Sample Product</div>
                <div class="cart-item-price">$95.50</div>
                <div class="cart-item-qty">
                    <button>1</button>
                </div>
            </div>
        </div>
        <p style="text-align: center; color: #666; margin: 20px 0;">Cart functionality is static for now</p>
    `;
    
    cartTotal.textContent = '$95.50';
}

// Mobile filter functionality (static - just toggle visibility)
function openMobileFilters() {
    mobileFilterOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileFilters() {
    mobileFilterOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Utility functions
function updateResultsCount(count) {
    if (resultsCount) {
        resultsCount.textContent = `${count} product${count !== 1 ? 's' : ''}`;
    }
}

function showCartToast() {
    const cartToast = document.getElementById('cart-toast');
    if (cartToast) {
        cartToast.classList.add('show');
        
        setTimeout(() => {
            cartToast.classList.remove('show');
        }, 3000);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all product cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => observer.observe(card));
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Close search when clicking outside
document.addEventListener('click', function(e) {
    if (!searchToggle.contains(e.target) && !searchExpand.contains(e.target)) {
        searchExpand.classList.remove('active');
    }
});

// Add CSS for list view
const listViewCSS = `
<style>
.products-grid.list-view {
    grid-template-columns: 1fr;
}

.products-grid.list-view .product-card {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 20px;
}

.products-grid.list-view .product-image {
    height: 250px;
}

.products-grid.list-view .product-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.products-grid.list-view .product-title {
    font-size: 1.4rem;
}

.products-grid.list-view .add-to-cart-btn {
    width: auto;
    max-width: 200px;
}

@media (max-width: 768px) {
    .products-grid.list-view .product-card {
        grid-template-columns: 1fr;
    }
    
    .products-grid.list-view .product-image {
        height: 200px;
    }
}
</style>
`;

// Add list view CSS to head
document.head.insertAdjacentHTML('beforeend', listViewCSS);
