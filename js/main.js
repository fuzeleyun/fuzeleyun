// Main JavaScript file for Fuzeleyun Website

document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            // Placeholder for language switching logic
            // In a real implementation, this would switch the page language
            const currentLang = langBtn.textContent;
            langBtn.textContent = currentLang === 'EN' ? '中文' : 'EN';
            
            // Show language switch notification
            showNotification(`Language switched to ${currentLang === 'EN' ? 'Chinese' : 'English'}`);
        });
    }
    
    // Mobile navigation toggle (if needed in the future)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Statistics counter animation
    animateStatistics();
    
    // Form submission handling (for contact page)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real implementation, this would send the form data to a server
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Add notification styles dynamically
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 1000;
                    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
                }
                
                .notification.success {
                    background-color: #34c759;
                }
                
                .notification.error {
                    background-color: #ff3b30;
                }
                
                .notification.info {
                    background-color: #007aff;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove notification after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Add scroll effect to header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Statistics counter animation function
    function animateStatistics() {
        const statisticNumbers = document.querySelectorAll('.statistic-number');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberElement = entry.target;
                    const targetNumber = numberElement.textContent;
                    let isPercentage = false;
                    let isMillion = false;
                    
                    // Check if it's a percentage or million value
                    if (targetNumber.includes('%')) {
                        isPercentage = true;
                        const cleanNumber = parseInt(targetNumber.replace('%', ''));
                        animateNumber(numberElement, 0, cleanNumber, isPercentage);
                    } else if (targetNumber.includes('M+')) {
                        isMillion = true;
                        const cleanNumber = parseInt(targetNumber.replace('M+', ''));
                        animateNumber(numberElement, 0, cleanNumber, false, isMillion);
                    } else {
                        const cleanNumber = parseInt(targetNumber.replace('+', ''));
                        animateNumber(numberElement, 0, cleanNumber, false, false, targetNumber.includes('+'));
                    }
                    
                    observer.unobserve(numberElement);
                }
            });
        }, observerOptions);
        
        statisticNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // Helper function to animate numbers
    function animateNumber(element, start, end, isPercentage = false, isMillion = false, hasPlus = false) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(start + (end - start) * easeProgress);
            
            let displayNumber = currentNumber.toString();
            if (isMillion) {
                displayNumber += 'M+';
            } else if (hasPlus) {
                displayNumber += '+';
            } else if (isPercentage) {
                displayNumber += '%';
            }
            
            element.textContent = displayNumber;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
});