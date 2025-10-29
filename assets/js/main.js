/**
 * Skansen Game Jam 2025 - Main JavaScript
 * Modular, optimized JavaScript for the game jam website
 */

// Configuration
const CONFIG = {
    languages: ['pl', 'en'],
    defaultLang: 'pl',
    scrollThreshold: 100,
    animationDuration: 300
};

// Utility functions
const Utils = {
    /**
     * Debounce function to limit function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function to limit function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Language Manager
class LanguageManager {
    constructor() {
        this.html = document.documentElement;
        this.toggle = document.getElementById('lang-toggle');
        this.mobileToggle = document.getElementById('mobile-lang-toggle');
        this.currentLang = this.html.getAttribute('lang') || CONFIG.defaultLang;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateMetaTags();
    }

    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('change', () => {
                this.setLanguage(this.toggle.checked ? 'en' : 'pl');
            });
        }

        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('change', () => {
                this.setLanguage(this.mobileToggle.checked ? 'en' : 'pl');
            });
        }
    }

    setLanguage(lang) {
        if (this.currentLang === lang) return;
        
        this.currentLang = lang;
        this.html.setAttribute('lang', lang);
        
        // Update toggles
        if (this.toggle) this.toggle.checked = lang === 'en';
        if (this.mobileToggle) this.mobileToggle.checked = lang === 'en';
        
        this.updateMetaTags();
        this.updateAriaLabels();
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }

    updateMetaTags() {
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            const descriptions = {
                pl: 'Skansen Game Jam 2025 — 40 godzin na stworzenie gry komputerowej w Sierpcu. 7–9 listopada 2025. Wersja online hostowana na itch.io.',
                en: 'Skansen Game Jam 2025 — a 40-hour game creation marathon in Sierpc, Poland. 7–9 November 2025. Online edition hosted on itch.io.'
            };
            meta.setAttribute('content', descriptions[this.currentLang]);
        }
        
        document.title = this.currentLang === 'pl' 
            ? 'Skansen Game Jam 2025 | Sierpc' 
            : 'Skansen Game Jam 2025 | Sierpc (EN)';
    }

    updateAriaLabels() {
        const labels = {
            pl: {
                prevImage: 'Poprzednie zdjęcie',
                nextImage: 'Następne zdjęcie',
                closeModal: 'Zamknij modal',
                openMenu: 'Otwórz menu',
                closeMenu: 'Zamknij menu'
            },
            en: {
                prevImage: 'Previous image',
                nextImage: 'Next image',
                closeModal: 'Close modal',
                openMenu: 'Open menu',
                closeMenu: 'Close menu'
            }
        };

        const currentLabels = labels[this.currentLang];
        
        // Update gallery buttons
        const prevBtn = document.querySelector('.gallery-btn.prev');
        const nextBtn = document.querySelector('.gallery-btn.next');
        if (prevBtn) prevBtn.setAttribute('aria-label', currentLabels.prevImage);
        if (nextBtn) nextBtn.setAttribute('aria-label', currentLabels.nextImage);
        
        // Update modal buttons
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) modalClose.setAttribute('aria-label', currentLabels.closeModal);
        
        // Update mobile menu
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.setAttribute('aria-label', currentLabels.openMenu);
        }
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.site-nav');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        this.mobileMenuClose = document.querySelector('.mobile-menu-close');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.lastY = window.scrollY;
        this.ticking = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Mobile menu close
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => this.closeMobileMenu());
        }

        // Close mobile menu when clicking on links
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking overlay
        if (this.mobileNavOverlay) {
            this.mobileNavOverlay.addEventListener('click', (e) => {
                if (e.target === this.mobileNavOverlay) {
                    this.closeMobileMenu();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileNavOverlay?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Scroll handling
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 16));
    }

    toggleMobileMenu() {
        if (!this.mobileNavOverlay) return;
        
        const isActive = this.mobileNavOverlay.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        if (!this.mobileNavOverlay) return;
        
        this.mobileNavOverlay.classList.add('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        if (!this.mobileNavOverlay) return;
        
        this.mobileNavOverlay.classList.remove('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                const currentY = window.scrollY;
                const direction = currentY > this.lastY ? 'down' : 'up';
                
                // Add scroll-based effects here if needed
                
                this.lastY = currentY;
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
}

// Banner Manager
class BannerManager {
    constructor() {
        this.banner = document.querySelector('.announcement-bar');
        this.nav = document.querySelector('.site-nav');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        if (this.banner) {
            this.setBannerHeight();
            window.addEventListener('resize', Utils.debounce(() => this.setBannerHeight(), 250));
        }
    }

    setBannerHeight() {
        if (!this.banner) return;
        
        const height = this.banner.getBoundingClientRect().height;
        this.html.style.setProperty('--banner-h', height + 'px');
        
        if (this.nav) {
            this.nav.style.top = height + 'px';
        }
    }
}

// Gallery Manager
class GalleryManager {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.modal = document.getElementById('gallery-modal');
        this.modalImage = document.getElementById('modal-image');
        this.modalCaption = document.getElementById('modal-caption');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Gallery item clicks
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.openModal(index));
        });

        // Modal close
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal || e.target.classList.contains('modal-close')) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal || this.modal.style.display === 'none') return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }

    openModal(index) {
        if (!this.modal || !this.modalImage || !this.modalCaption) return;
        
        this.currentIndex = index;
        const item = this.galleryItems[index];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        
        if (img && caption) {
            this.modalImage.src = img.src;
            this.modalImage.alt = img.alt;
            this.modalCaption.textContent = caption.textContent;
            this.modal.style.display = 'flex';
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.updateModalImage();
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updateModalImage();
    }

    updateModalImage() {
        const item = this.galleryItems[this.currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        
        if (img && caption && this.modalImage && this.modalCaption) {
            this.modalImage.src = img.src;
            this.modalImage.alt = img.alt;
            this.modalCaption.textContent = caption.textContent;
        }
    }
}

// FAQ Manager
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.faqItems.forEach(item => {
            // Find ALL question buttons in each item (both languages)
            const questions = item.querySelectorAll('.faq-question');
            questions.forEach(question => {
                question.addEventListener('click', () => this.toggleFAQ(item));
            });
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all managers
        new LanguageManager();
        new NavigationManager();
        new BannerManager();
        new GalleryManager();
        new FAQManager();
        
        console.log('Skansen Game Jam 2025 - Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Export for potential external use
window.SkansenGameJam = {
    LanguageManager,
    NavigationManager,
    BannerManager,
    GalleryManager,
    FAQManager,
    Utils
};

// Mentor Cards 3D Effect Manager
const MentorCardsManager = {
    /**
     * Initialize 3D mouse tracking for mentor cards
     */
    init() {
        const mentorCards = document.querySelectorAll('.mentor-card');
        
        mentorCards.forEach(card => {
            card.addEventListener('mousemove', MentorCardsManager.handleMouseMove);
            card.addEventListener('mouseleave', MentorCardsManager.handleMouseLeave);
        });
    },

    /**
     * Handle mouse move event for 3D effect
     */
    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        
        // Update border glow position
        const border = card.querySelector('.mentor-card-border');
        if (border) {
            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
            border.style.background = `linear-gradient(${angle}deg, #60a5fa, #4ade80, #a855f7, #60a5fa)`;
        }
    },

    /**
     * Handle mouse leave event to reset card position
     */
    handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
};

// Initialize mentor cards when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        MentorCardsManager.init();
    });
} else {
    MentorCardsManager.init();
}

// Export MentorCardsManager
window.MentorCardsManager = MentorCardsManager;