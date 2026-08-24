export function initReveal() {
    const items = document.querySelectorAll(".reveal-item"); // Nhớ thêm class này vào các thẻ <section>
    if (items.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        items.forEach((el) => el.classList.add("opacity-100"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => {
        item.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
        observer.observe(item);
    });
}