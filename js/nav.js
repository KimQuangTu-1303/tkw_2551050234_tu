// js/nav.js
export function initNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const header = document.querySelector('header');
    const sentinel = document.getElementById('nav-sentinel');

    if (!menuBtn || !menu || !header) return;

    function setOpen(open) {
        menu.classList.toggle("hidden", !open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
        document.body.classList.toggle("overflow-hidden", open);
    }

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
            setOpen(false);
            menuBtn.focus();
        }
    });

    document.addEventListener("click", (e) => {
        const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
        if (isOpen && !header.contains(e.target)) {
            setOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768 && menuBtn.getAttribute("aria-expanded") === "true") {
            setOpen(false);
        }
    });

    if (sentinel) {
        const observer = new IntersectionObserver(([entry]) => {
            const scrolled = !entry.isIntersecting;
            header.classList.toggle("shadow-md", scrolled);
        });
        observer.observe(sentinel);
    }
}

export function initToTop() {
    const btn = document.getElementById('to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('hidden', window.scrollY < 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}