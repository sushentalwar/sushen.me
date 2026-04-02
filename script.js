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

    // Build palette: 150 off-whites + 150 blues
    const palette = [];
    for (let i = 0; i < 150; i++) {
        const base = 235 + Math.floor(Math.random() * 20);
        const r = Math.min(base, 255);
        const g = Math.min(base - Math.floor(Math.random() * 10), 255);
        const b = Math.min(base + Math.floor(Math.random() * 15), 255);
        palette.push({ color: `rgb(${r}, ${g}, ${b})`, dark: false });
    }
    for (let i = 0; i < 150; i++) {
        const lightness = 10 + Math.floor(Math.random() * 75);
        const saturation = 30 + Math.floor(Math.random() * 60);
        const hue = 200 + Math.floor(Math.random() * 40);
        palette.push({ color: `hsl(${hue}, ${saturation}%, ${lightness}%)`, dark: lightness < 50 });
    }

    let lastFontIdx = -1;
    let lastColorIdx = -1;

    function applyRandomStyle() {
        // Pick new font
        let fontIdx;
        do { fontIdx = Math.floor(Math.random() * sansFonts.length); } while (fontIdx === lastFontIdx);
        lastFontIdx = fontIdx;

        // Pick new color
        let colorIdx;
        do { colorIdx = Math.floor(Math.random() * palette.length); } while (colorIdx === lastColorIdx);
        lastColorIdx = colorIdx;

        const font = sansFonts[fontIdx];
        const { color, dark } = palette[colorIdx];
        const textPrimary = dark ? '#e6e6e6' : '#1a1a1a';
        const textMuted = dark ? '#888888' : '#666666';
        const dividerColor = dark ? 'rgba(230,230,230,0.2)' : 'rgba(26,26,26,0.2)';

        document.body.style.backgroundColor = color;
        document.body.style.fontFamily = `'${font}', sans-serif`;
        document.body.style.color = textPrimary;
        document.documentElement.style.setProperty('--text-primary', textPrimary);
        document.documentElement.style.setProperty('--text-muted', textMuted);
        document.documentElement.style.setProperty('--bg-color', color);

        const dividerLine = document.querySelector('.divider-line');
        if (dividerLine) dividerLine.style.backgroundColor = dividerColor;
    }

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        const tag = e.target.tagName;
        if ((e.code === 'Space' || e.key === ' ') && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'BUTTON') {
            e.preventDefault();
            applyRandomStyle();
        }

        if (e.code === 'Escape' || e.key === 'Escape') {
            document.querySelectorAll('.accordion, .item-list > li').forEach(el => el.classList.remove('open'));
            document.querySelectorAll('.accordion-header, .item-header').forEach(h => h.setAttribute('aria-expanded', 'false'));
            updateMenuContainerState();
        }
    });

    // --- Live Time ---
    const timeDisplay = document.getElementById('local-time');

    function updateTime() {
        if (!timeDisplay) return;
        const now = new Date();
        const opts = { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit', hour12: true };
        timeDisplay.textContent = `SF ${new Intl.DateTimeFormat('en-US', opts).format(now)}`;
    }

    setInterval(updateTime, 60000);
    updateTime();
});
