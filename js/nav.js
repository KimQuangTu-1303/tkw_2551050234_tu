const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        // Thêm/Xóa class 'hidden' để bật tắt menu
        mobileMenu.classList.toggle('hidden');
    });