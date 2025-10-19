// Cookie consent functionality
function initCookieConsent() {
    // Always initialize GA with default denied consent
    initGoogleAnalytics();
    
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        showCookieConsent();
    } else if (consent === 'true') {
        // If user previously accepted, update consent
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('consent', 'update', {
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
        });
    }
}

function showCookieConsent() {
    const consentHtml = {
        pl: {
            title: 'Ciasteczka gry 🎮',
            description: 'Ta strona używa ciasteczek, aby zapewnić najlepsze doświadczenie podczas Game Jam. Akceptując, zgadzasz się na śledzenie analityczne, które pomaga nam udoskonalać wydarzenie.',
            accept: 'Akceptuj wszystkie',
            settings: 'Ustawienia'
        },
        en: {
            title: 'Game Cookies 🎮',
            description: 'This site uses cookies to ensure the best Game Jam experience. By accepting, you agree to analytics tracking that helps us improve the event.',
            accept: 'Accept all',
            settings: 'Settings'
        }
    };

    const currentLang = document.documentElement.lang || 'en';
    const texts = consentHtml[currentLang];

    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-icon">🍪</div>
            <div class="cookie-text">
                <h3>${texts.title}</h3>
                <p>${texts.description}</p>
            </div>
        </div>
        <div class="cookie-buttons">
            <button class="cookie-btn settings-btn">${texts.settings}</button>
            <button class="cookie-btn accept-btn">${texts.accept}</button>
        </div>
    `;

    document.body.appendChild(banner);
    initGameElements(banner);

    banner.querySelector('.accept-btn').addEventListener('click', () => {
        acceptCookies(banner);
    });

    banner.querySelector('.settings-btn').addEventListener('click', () => {
        // Could add more advanced settings here
        window.open('https://policies.google.com/technologies/cookies', '_blank');
    });
}

function acceptCookies(banner) {
    localStorage.setItem('cookieConsent', 'true');
    banner.classList.add('hiding');
    setTimeout(() => {
        banner.remove();
        // Update consent after user accepts
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('consent', 'update', {
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
        });
    }, 500);
}

function initGoogleAnalytics() {
    const gaTag = 'G-9XDQY1GJGD';
    
    // Initialize dataLayer with default denied consent
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('consent', 'default', {
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500
    });
    gtag('js', new Date());
    gtag('config', gaTag);

    // Load gtag.js script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaTag}`;

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(gtagScript, firstScript);
}

// Game elements for visual interest
function initGameElements(banner) {
    const pixelCount = 15;
    const bannerRect = banner.getBoundingClientRect();

    for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'game-pixel';
        pixel.style.left = `${Math.random() * 100}%`;
        pixel.style.top = `${Math.random() * 100}%`;
        banner.appendChild(pixel);

        // Floating animation
        animatePixel(pixel, bannerRect);
    }
}

function animatePixel(pixel, bounds) {
    let x = Math.random() * bounds.width;
    let y = Math.random() * bounds.height;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    function update() {
        x += dx;
        y += dy;

        if (x < 0 || x > bounds.width) dx *= -1;
        if (y < 0 || y > bounds.height) dy *= -1;

        pixel.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(update);
    }

    update();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCookieConsent);