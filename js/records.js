const state = {
    records: [],
    query: "",
    category: "all",
    status: "all",
    sort: "date-desc",
    loading: true,
    error: null
};

const currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });

const sorters = {
    "date-desc": (a, b) => b.date.localeCompare(a.date),
    "amount-desc": (a, b) => b.amount - a.amount
};

function debounce(fn, delay = 300) {
    let id;
    return (...args) => {
        clearTimeout(id);
        id = setTimeout(() => fn(...args), delay);
    };
}

async function loadRecords() {
    const saved = localStorage.getItem("onelaptop_records");
    if (saved) {
        state.records = JSON.parse(saved);
        return;
    }
    const res = await fetch("./data/records.json");
    if (!res.ok) throw new Error(`Máy chủ trả về mã lỗi ${res.status}`);
    state.records = await res.json();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem("onelaptop_records", JSON.stringify(state.records));
}

function visibleRecords() {
    const q = state.query.trim().toLowerCase();
    return state.records
        .filter(r => state.category === "all" || r.category === state.category)
        .filter(r => state.status === "all" || r.status === state.status)
        .filter(r => !q || r.trader.toLowerCase().includes(q))
        .sort(sorters[state.sort] || sorters["date-desc"]);
}

function render() {
    const tbody = document.getElementById("records-tbody");
    const countEl = document.getElementById("record-count");
    if (!tbody) return;

    if (state.loading) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-slate-500 animate-pulse">Đang tải danh sách laptop từ máy chủ...</td></tr>`;
        return;
    }

    if (state.error) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-red-500 font-semibold">${state.error}</td></tr>`;
        return;
    }

    const list = visibleRecords();
    countEl.textContent = `Hiển thị ${list.length} / ${state.records.length} sản phẩm`;

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-slate-500">Không tìm thấy dòng máy phù hợp nào.</td></tr>`;
        return;
    }

    const template = document.getElementById("row-template");
    const rows = list.map(record => {
        const row = template.content.firstElementChild.cloneNode(true);
        
        // Gắn dữ liệu vào các ô tương ứng với template trong HTML
        row.querySelector("[data-cell='id']").textContent = record.id;
        row.querySelector("[data-cell='laptopName']").textContent = record.trader; // Tên máy tính lưu ở trường trader
        row.querySelector("[data-cell='category']").textContent = record.category;
        
        // Hiển thị thông số trọng lượng thay thế cho phần cấu hình cấu trúc
        row.querySelector("[data-cell='specs']").textContent = `Trọng lượng: ${record.weight.toLocaleString('vi-VN')} g`;
        
        const badge = row.querySelector("[data-cell='status-badge']");
        if (record.status === "da-chot") {
            badge.textContent = "Đã chốt";
            badge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
        } else if (record.status === "dang-xu-ly") {
            badge.textContent = "Đang xử lý";
            badge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
        } else {
            badge.textContent = "Đã hủy";
            badge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        }

        row.querySelector("[data-cell='amount']").textContent = currencyFormatter.format(record.amount);
        row.querySelector("[data-cell='date']").textContent = record.date;

        row.querySelector("[data-action='delete']").addEventListener('click', () => {
            state.records = state.records.filter(r => r.id !== record.id);
            saveToStorage();
            render();
        });

        return row;
    });

    tbody.replaceChildren(...rows);
}

export function initRecordsTable() {
    const searchInput = document.getElementById("search-input");
    const catSelect = document.getElementById("filter-category");
    const statusSelect = document.getElementById("filter-status");
    const sortSelect = document.getElementById("sort-select");
    const resetBtn = document.getElementById("reset-storage-btn");

    if (!searchInput) return;

    searchInput.addEventListener('input', debounce((e) => {
        state.query = e.target.value;
        render();
    }, 300));

    catSelect.addEventListener('change', (e) => {
        state.category = e.target.value;
        render();
    });

    statusSelect.addEventListener('change', (e) => {
        state.status = e.target.value;
        render();
    });

    sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        render();
    });

    resetBtn.addEventListener('click', async () => {
        localStorage.removeItem("onelaptop_records");
        state.loading = true;
        render();
        try {
            await loadRecords();
            state.error = null;
        } catch (err) {
            state.error = `Không thể khôi phục dữ liệu: ${err.message}`;
        } finally {
            state.loading = false;
            render();
        }
    });

    (async () => {
        try {
            await loadRecords();
        } catch (err) {
            state.error = `Không tải được dữ liệu: ${err.message}`;
        } finally {
            state.loading = false;
            render();
        }
    })();
}

initRecordsTable();