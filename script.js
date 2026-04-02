document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Logic for Main Categories ---
    const categoryHeaders = document.querySelectorAll('.accordion-header');
    const menusContainer = document.querySelector('.menus-container');

    function updateMenuContainerState() {
        const anyOpen = document.querySelectorAll('.accordion.open').length > 0;
        if (anyOpen) {
            menusContainer.classList.add('has-open');
        } else {
            menusContainer.classList.remove('has-open');
        }
    }

    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            const isOpen = accordion.classList.contains('open');

            if (isOpen) {
                accordion.classList.remove('open');
                header.setAttribute('aria-expanded', 'false');
            } else {
                accordion.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
            updateMenuContainerState();
        });
    });

    // --- Accordion Logic for Sub-items ---
    const itemHeaders = document.querySelectorAll('.item-header');

    itemHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const li = header.parentElement;
            const isOpen = li.classList.contains('open');

            if (isOpen) {
                li.classList.remove('open');
                header.setAttribute('aria-expanded', 'false');
            } else {
                li.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- Spacebar: Random Font + Background Color ---
    const sansFonts = [
        'Inter', 'DM Sans', 'Outfit', 'Manrope', 'Nunito', 'Raleway',
        'Poppins', 'Lato', 'Montserrat', 'Source Sans 3', 'Karla',
        'Rubik', 'Work Sans', 'Jost', 'Mulish', 'Barlow', 'Figtree',
        'Plus Jakarta Sans', 'Urbanist', 'Sora', 'Be Vietnam Pro',
        'Lexend', 'Noto Sans', 'IBM Plex Sans', 'Space Grotesk'
    ];

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter&family=DM+Sans&family=Outfit&family=Manrope&family=Nunito&family=Raleway&family=Poppins&family=Lato&family=Montserrat&family=Source+Sans+3&family=Karla&family=Rubik&family=Work+Sans&family=Jost&family=Mulish&family=Barlow&family=Figtree&family=Plus+Jakarta+Sans&family=Urbanist&family=Sora&family=Be+Vietnam+Pro&family=Lexend&family=Noto+Sans&family=IBM+Plex+Sans&family=Space+Grotesk&display=swap';
    document.head.appendChild(fontLink);

    function generatePalette() {
        const colors = [];
        for (let i = 0; i < 150; i++) {
            const base = 235 + Math.floor(Math.random() * 20);
            const r = base;
            const g = base - Math.floor(Math.random() * 10);
            const b = base + Math.floor(Math.random() * 15);
            colors.push(`rgb(${Math.min(r,255)}, ${Math.min(g,255)}, ${Math.min(b,255)})`);
        }
        for (let i = 0; i < 150; i++) {
            const lightness = 10 + Math.floor(Math.random() * 75);
            const saturation = 30 + Math.floor(Math.random() * 60);
            const hue = 200 + Math.floor(Math.random() * 40);
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
    }

    const palette = generatePalette();
    let lastFontIndex = -1;
    let lastColorIndex = -1;

    function getRandomDifferent(arr, lastIndex) {
        let idx;
        do { idx = Math.floor(Math.random() * arr.length); } while (idx === lastIndex);
        return idx;
    }

    function applyRandomStyle() {
        const fontIdx = getRandomDifferent(sansFonts, lastFontIndex);
        const colorIdx = getRandomDifferent(palette, lastColorIndex);
        lastFontIndex = fontIdx;
        lastColorIndex = colorIdx;

        const font = sansFonts[fontIdx];
        const color = palette[colorIdx];

        document.body.style.backgroundColor = color;
        document.body.style.fontFamily = `'${font}', sans-serif`;

        const isDark = color.includes('hsl') && parseInt(color.match(/(\d+)%\)/)[1]) < 50;
        document.body.style.color = isDark ? '#e6e6e6' : '#1a1a1a';
        document.documentElement.style.setProperty('--text-primary', isDark ? '#e6e6e6' : '#1a1a1a');
        document.documentElement.style.setProperty('--text-muted', isDark ? '#888888' : '#666666');
        document.documentElement.style.setProperty('--bg-color', color);
    }

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.key === ' ') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            applyRandomStyle();
        }

        if (e.code === 'Escape' || e.key === 'Escape') {
            document.querySelectorAll('.accordion, .item-list > li').forEach(el => {
                el.classList.remove('open');
            });
            document.querySelectorAll('.accordion-header, .item-header').forEach(header => {
                header.setAttribute('aria-expanded', 'false');
            });
            updateMenuContainerState();
        }
    });

    // --- Live Time ---
    const timeDisplay = document.getElementById('local-time');

    function updateTime() {
        if (!timeDisplay) return;
        const now = new Date();
        const options = { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
        timeDisplay.textContent = `SF ${timeString}`;
    }

    setInterval(updateTime, 60000);
    updateTime();
});
