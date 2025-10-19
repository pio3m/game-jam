// Cookie consent functionality
function initCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        showCookieConsent();
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
        initGoogleAnalytics();
    }, 500);
}

function initGoogleAnalytics() {
    // Replace with your Google Analytics tag
    const gaTag = 'G-XXXXXXXXXX';
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaTag}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaTag);
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