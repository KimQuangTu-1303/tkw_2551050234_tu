// js/theme.js
export function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function updateUI(isDark) {
        toggle.setAttribute('aria-pressed', String(isDark));
        document.getElementById('theme-toggle-light-icon')?.classList.toggle('hidden', !isDark);
        document.getElementById('theme-toggle-dark-icon')?.classList.toggle('hidden', isDark);
    }

    updateUI(document.documentElement.classList.contains('dark'));

    toggle.addEventListener('click', () => {
        const dark = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        updateUI(dark);
    });
}