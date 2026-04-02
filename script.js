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
            const icon = header.querySelector('.icon');
            const isOpen = accordion.classList.contains('open');

            if (isOpen) {
                accordion.classList.remove('open');
                icon.textContent = '+';
                header.setAttribute('aria-expanded', 'false');
            } else {
                accordion.classList.add('open');
                icon.textContent = '−';
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
            const icon = header.querySelector('.item-icon');
            const isOpen = li.classList.contains('open');

            if (isOpen) {
                li.classList.remove('open');
                icon.textContent = '+';
                header.setAttribute('aria-expanded', 'false');
            } else {
                li.classList.add('open');
                icon.textContent = '−';
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

    // Load all fonts via Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter&family=DM+Sans&family=Outfit&family=Manrope&family=Nunito&family=Raleway&family=Poppins&family=Lato&family=Montserrat&family=Source+Sans+3&family=Karla&family=Rubik&family=Work+Sans&family=Jost&family=Mulish&family=Barlow&family=Figtree&family=Plus+Jakarta+Sans&family=Urbanist&family=Sora&family=Be+Vietnam+Pro&family=Lexend&family=Noto+Sans&family=IBM+Plex+Sans&family=Space+Grotesk&display=swap';
    document.head.appendChild(fontLink);

    // 300 shades: off-whites and blues
    function generatePalette() {
        const colors = [];

        // ~150 off-white shades (warm, cool, neutral)
        for (let i = 0; i < 150; i++) {
            const base = 235 + Math.floor(Math.random() * 20); // 235-255
            const r = base;
            const g = base - Math.floor(Math.random() * 10);
            const b = base + Math.floor(Math.random() * 15);
            colors.push(`rgb(${Math.min(r,255)}, ${Math.min(g,255)}, ${Math.min(b,255)})`);
        }

        //
