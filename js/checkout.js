// Checkout Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all checkout functionality
    initializePaymentMethod();
    initializeFormValidation();
    initializeCardFormatting();
    initializeDiscountCode();
    initializeFormSubmission();
});

// Payment Method Toggle
function initializePaymentMethod() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const creditCardFields = document.getElementById('creditCardFields');
    
    if (paymentMethodSelect && creditCardFields) {
        paymentMethodSelect.addEventListener('change', function() {
            const selectedMethod = this.value;
            
            if (selectedMethod === 'credit-card') {
                creditCardFields.classList.remove('hidden');
                // Enable credit card fields
                enableCreditCardFields();
            } else {
                creditCardFields.classList.add('hidden');
                // Disable credit card fields
                disableCreditCardFields();
            }
        });
    }
}

function enableCreditCardFields() {
    const creditCardInputs = creditCardFields.querySelectorAll('input');
    creditCardInputs.forEach(input => {
        input.disabled = false;
        input.required = true;
    });
}

function disableCreditCardFields() {
    const creditCardInputs = creditCardFields.querySelectorAll('input');
    creditCardInputs.forEach(input => {
        input.disabled = true;
        input.required = false;
        input.value = '';
    });
}

// Card Number Formatting
function initializeCardFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const securityCodeInput = document.getElementById('securityCode');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (securityCodeInput) {
        securityCodeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            e.target.value = value;
        });
    }
}

// Form Validation
function initializeFormValidation() {
    const form = document.querySelector('.checkout-form');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError(e);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Card number validation
    if (field.id === 'cardNumber' && value) {
        const cardNumber = value.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            isValid = false;
            errorMessage = 'Please enter a valid card number';
        }
    }
    
    // Expiry date validation
    if (field.id === 'expiryDate' && value) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid expiry date (MM/YY)';
        } else {
            const [month, year] = value.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;
            
            if (parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                isValid = false;
                errorMessage = 'Card has expired';
            }
        }
    }
    
    // Security code validation
    if (field.id === 'securityCode' && value) {
        if (value.length < 3 || value.length > 4) {
            isValid = false;
            errorMessage = 'Please enter a valid security code';
        }
    }
    
    // Postal code validation
    if (field.id === 'postalCode' && value) {
        if (value.length < 3) {
            isValid = false;
            errorMessage = 'Please enter a valid postal code';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    // Remove existing error
    clearFieldError({ target: field });
    
    // Add error class
    field.classList.add('error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff0000';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    // Insert error message after the field
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    // Remove error message
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Discount Code
function initializeDiscountCode() {
    const applyButton = document.querySelector('.apply-button');
    const discountInput = document.querySelector('.discount-input input');
    
    if (applyButton && discountInput) {
        applyButton.addEventListener('click', function() {
            const code = discountInput.value.trim();
            
            if (!code) {
                showDiscountMessage('Please enter a discount code', 'error');
                return;
            }
            
            // Simulate discount code validation
            if (code.toLowerCase() === 'save10' || code.toLowerCase() === 'discount20') {
                showDiscountMessage('Discount code applied successfully!', 'success');
                applyDiscount(code);
            } else {
                showDiscountMessage('Invalid discount code', 'error');
            }
        });
    }
}

function showDiscountMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.discount-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'discount-message';
    messageDiv.textContent = message;
    messageDiv.style.marginTop = '10px';
    messageDiv.style.fontSize = '14px';
    messageDiv.style.fontWeight = '500';
    
    if (type === 'success') {
        messageDiv.style.color = '#00cc00';
    } else {
        messageDiv.style.color = '#ff0000';
    }
    
    // Insert message after discount input
    const discountSection = document.querySelector('.discount-section');
    discountSection.appendChild(messageDiv);
    
    // Auto remove message after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

function applyDiscount(code) {
    const subtotalElement = document.querySelector('.cost-row:first-child span:last-child');
    const totalElement = document.querySelector('.cost-row.total span:last-child');
    
    if (subtotalElement && totalElement) {
        const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
        let discount = 0;
        
        if (code.toLowerCase() === 'save10') {
            discount = subtotal * 0.1; // 10% discount
        } else if (code.toLowerCase() === 'discount20') {
            discount = subtotal * 0.2; // 20% discount
        }
        
        const newTotal = parseFloat(subtotalElement.textContent.replace('$', '')) + 
                        parseFloat(document.querySelector('.cost-row:nth-child(2) span:last-child').textContent.replace('$', '')) - 
                        discount;
        
        // Add discount row
        const costBreakdown = document.querySelector('.cost-breakdown');
        const existingDiscount = costBreakdown.querySelector('.cost-row.discount');
        
        if (existingDiscount) {
            existingDiscount.remove();
        }
        
        const discountRow = document.createElement('div');
        discountRow.className = 'cost-row discount';
        discountRow.innerHTML = `
            <span>Discount</span>
            <span>-$${discount.toFixed(2)}</span>
        `;
        discountRow.style.color = '#00cc00';
        
        // Insert before total
        const totalRow = costBreakdown.querySelector('.cost-row.total');
        costBreakdown.insertBefore(discountRow, totalRow);
        
        // Update total
        totalElement.textContent = `$${newTotal.toFixed(2)}`;
    }
}

// Form Submission
function initializeFormSubmission() {
    const form = document.querySelector('.checkout-form');
    const payButton = document.querySelector('.pay-button');
    
    if (form && payButton) {
        payButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            } else {
                showFormError('Please fill in all required fields correctly');
            }
        });
    }
}

function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Check payment method specific validation
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (paymentMethod === 'credit-card') {
        const creditCardFields = document.querySelectorAll('#creditCardFields input[required]');
        creditCardFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
    }
    
    return isValid;
}

function showFormError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff0000';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.marginTop = '20px';
    errorDiv.style.padding = '10px';
    errorDiv.style.backgroundColor = '#ffe6e6';
    errorDiv.style.borderRadius = '6px';
    errorDiv.style.border = '1px solid #ffcccc';
    
    // Insert error message before pay button
    const payButton = document.querySelector('.pay-button');
    payButton.parentNode.insertBefore(errorDiv, payButton);
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function submitForm() {
    const payButton = document.querySelector('.pay-button');
    
    // Show loading state
    payButton.disabled = true;
    payButton.classList.add('loading');
    payButton.textContent = 'Processing...';
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset button
        payButton.disabled = false;
        payButton.classList.remove('loading');
        payButton.textContent = 'Pay Now';
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 2000);
    }, 2000);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="text-align: center; padding: 20px; background-color: #e6ffe6; border: 1px solid #ccffcc; border-radius: 6px; margin-top: 20px;">
            <i class="fas fa-check-circle" style="color: #00cc00; font-size: 24px; margin-bottom: 10px;"></i>
            <h3 style="color: #00cc00; margin-bottom: 10px;">Payment Successful!</h3>
            <p style="color: #006600;">Your order has been processed successfully. Redirecting to confirmation page...</p>
        </div>
    `;
    
    // Insert success message before pay button
    const payButton = document.querySelector('.pay-button');
    payButton.parentNode.insertBefore(successDiv, payButton);
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    .success-message {
        text-align: center;
        padding: 20px;
        background-color: #e6ffe6;
        border: 1px solid #ccffcc;
        border-radius: 6px;
        margin-top: 20px;
    }
`;
document.head.appendChild(style);

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

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
});
