document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Logic for Main Categories (WORK, BUILD, READ) ---
    const categoryHeaders = document.querySelectorAll('.accordion-header');
    const menusContainer = document.querySelector('.menus-container');

    function updateMenuContainerState() {
        // Check if any main accordion is open
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

            // Toggle open state
            const isOpen = accordion.classList.contains('open');

            // Optionally close others before opening this one (accordion style)
            // If you want them to operate independently, comment this block out.
            /*
            document.querySelectorAll('.accordion').forEach(acc => {
                acc.classList.remove('open');
                const accIcon = acc.querySelector('.accordion-header .icon');
                if (accIcon) accIcon.textContent = '+';
                acc.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            */

            if (isOpen) {
                accordion.classList.remove('open');
                icon.textContent = '+';
                header.setAttribute('aria-expanded', 'false');
            } else {
                accordion.classList.add('open');
                icon.textContent = '−'; // minus sign
                header.setAttribute('aria-expanded', 'true');
            }
            updateMenuContainerState();
        });
    });

    // --- Accordion Logic for Sub-items (Projects, Companies) ---
    const itemHeaders = document.querySelectorAll('.item-header');

    itemHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling up to category
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

    // --- Keyboard Navigation ---
    const hintText = document.getElementById('space-hint');
    const themes = ['', 'light-theme', 'navy-theme'];
    let currentThemeIndex = 0;

    document.addEventListener('keydown', (e) => {
        // Spacebar logic: Toggle Theme
        // Disable spacebar default scroll if we are not focused on an input
        if ((e.code === 'Space' || e.key === ' ') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault(); // prevent scrolling
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            document.body.classList.remove('light-theme', 'navy-theme');
            if (themes[currentThemeIndex] !== '') {
                document.body.classList.add(themes[currentThemeIndex]);
            }
        }

        // Escape key logic: Collapse Accordions
        if (e.code === 'Escape' || e.key === 'Escape') {
            document.querySelectorAll('.accordion, .item-list > li').forEach(el => {
                el.classList.remove('open');
            });
            document.querySelectorAll('.icon, .item-icon').forEach(icon => {
                icon.textContent = '+';
            });
            document.querySelectorAll('.accordion-header, .item-header').forEach(header => {
                header.setAttribute('aria-expanded', 'false');
            });
            updateMenuContainerState();
        }
    });

    // --- Live Time (Optional Polish) ---
    const timeDisplay = document.getElementById('local-time');

    function updateTime() {
        if (!timeDisplay) return;
        const now = new Date();
        const options = { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
        timeDisplay.textContent = `LA ${timeString}`;
    }

    setInterval(updateTime, 60000); // update every minute
    updateTime(); // initial call
});
