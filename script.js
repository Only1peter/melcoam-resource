// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true
});

// Navigation and Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const scrollTopBtn = document.createElement('a');
    
    // Add scroll to top button
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // Navigation toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks?.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
            navToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
        }
    });

    // Scroll effects
    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Scroll to top button visibility
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Stats counter animation
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / duration * 10;
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 10);
};

// Intersection Observer for stats
const observeStats = () => {
    const stats = document.querySelectorAll('.stat-item h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
};

// Initialize stats animation
document.addEventListener('DOMContentLoaded', observeStats);

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Service card hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Feature card interaction
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'rotateY(360deg)';
    });
});

// Add loading spinner
const addLoadingSpinner = () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);
};

// Initialize loading spinner
addLoadingSpinner();

// Image slider functionality
function nextSlide(button) {
    const slider = button.closest('.image-slider');
    const container = slider.querySelector('.slider-container');
    const images = container.querySelectorAll('.slider-image');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % images.length;
    images[activeIndex].classList.add('active');
}

function prevSlide(button) {
    const slider = button.closest('.image-slider');
    const container = slider.querySelector('.slider-container');
    const images = container.querySelectorAll('.slider-image');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    images[activeIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Event listeners
    navToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS

    let current = 0;
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.round(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };

    updateCounter();
});

// Project Chart
const projectChart = document.getElementById('projectChart');

if (projectChart) {
    new Chart(projectChart, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Completed Projects',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: '#0056b3',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e0e0e0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Reports Chart
if (document.getElementById('reportsChart')) {
    const reportsChart = document.getElementById('reportsChart');
    new Chart(reportsChart, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Financial Reports',
                    data: [30, 45, 35, 50, 40, 60],
                    borderColor: '#0056b3',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Maintenance Reports',
                    data: [25, 35, 40, 30, 45, 35],
                    borderColor: '#00b8d4',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Reports Generated Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Reports'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

// Report Filters
const reportFilters = document.querySelectorAll('.report-filters .filter-btn');
if (reportFilters) {
    reportFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            reportFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');
        });
    });
}

// Search Functionality
const searchInput = document.querySelector('.header-search input');
const searchButton = document.querySelector('.header-search button');

searchButton?.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        // Implement search functionality
        console.log('Searching for:', query);
    }
});

searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            // Implement search functionality
            console.log('Searching for:', query);
        }
    }
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Example notification triggers
const notificationBtn = document.querySelector('.notification-btn');
const messagesBtn = document.querySelector('.messages-btn');

notificationBtn?.addEventListener('click', () => {
    showNotification('You have 3 new notifications');
});

messagesBtn?.addEventListener('click', () => {
    showNotification('You have 5 unread messages');
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');

progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
        bar.style.width = width;
    }, 500);
});

// Sidebar Menu Active State
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');
    });
});

// Task Status Color Update
const taskItems = document.querySelectorAll('.task-item');

taskItems.forEach(item => {
    const status = item.querySelector('.task-status');
    if (status) {
        const text = status.textContent.toLowerCase();
        status.classList.add(text);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Hero Slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetAutoplay();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Touch events for mobile
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoplay();
        }
    }

    // Start autoplay
    startAutoplay();
});
