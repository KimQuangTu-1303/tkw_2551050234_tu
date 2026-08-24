export function initPricing() {
    const toggle = document.getElementById("pricing-toggle");
    const prices = document.querySelectorAll("[data-price]");
    if (!toggle || prices.length === 0) return;

    const dong = new Intl.NumberFormat("vi-VN", {
        style: "currency", currency: "VND", maximumFractionDigits: 0,
    });

    function updatePrices(isYearly) {
        prices.forEach((el) => {
            const value = isYearly ? el.dataset.yearly : el.dataset.monthly;
            el.textContent = dong.format(Number(value));
        });
    }

    toggle.addEventListener("click", () => {
        const isChecked = toggle.getAttribute("aria-checked") === "true";
        toggle.setAttribute("aria-checked", String(!isChecked));
        updatePrices(!isChecked);
    });

    updatePrices(false); // Init mặc định
}