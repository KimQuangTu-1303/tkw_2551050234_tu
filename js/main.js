// js/main.js
import { initNav, initToTop } from "./nav.js";
import { initTheme } from "./theme.js"; // <-- Thêm dòng này để nạp hàm initTheme
import { initPricing } from "./pricing.js";
import { initReveal } from "./reveal.js";

// Khởi tạo các module
initNav();
initToTop();
initTheme(); // Giờ thì hàm này đã được định nghĩa và gọi thành công
initPricing();
initReveal();