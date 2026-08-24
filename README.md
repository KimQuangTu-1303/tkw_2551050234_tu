# tkw_2551050234_Tu
# WEBSITE Laptop shop
# Sản phẩm gì?	Tên sản phẩm: OneLaptop
Dưới đây là phần tổng quan dự án đã được điều chỉnh nội dung từ nền tảng xem phim sang Website Bán Máy Tính, đồng thời áp dụng chính xác các quy chuẩn thiết kế (Design System) bạn đã yêu cầu ở trên:

### Laptop Shop Landing Page - Project Overview
Dự án thiết kế và phát triển giao diện website thương mại điện tử chuyên cung cấp và sửa chữa laptop.
### Đối tượng hướng đến:
Đại lý bán máy tính.
Cá nhân hoặc gia đình có nhu cầu mua sắm laptop mới hoặc tìm kiếm dịch vụ sửa chữa thiết bị chuyên nghiệp.
### Giá trị mang lại:
Định vị thương hiệu: Giúp chủ shop quảng bá và tăng độ nhận diện thương hiệu trên thị trường.
Trải nghiệm sản phẩm: Giúp người dùng có cái nhìn tổng quan, chi tiết về các sản phẩm và cấu hình máy.
Tính linh hoạt: Đa dạng phương thức thanh toán và cung cấp các gói dịch vụ bảo trì/nâng cấp cao cấp.
Chất lượng cam kết: Cung cấp máy chính hãng, chất lượng đảm bảo.
* **Figma Template:** [Link Figma LaptopShop Clone]([https://www.figma.com/community/file/102919323132](https://www.figma.com/design/75ddYYpn0x33POxewcXaVE/Landwind---Tailwind-CSS-Landing-Page--Community-?node-id=1-19856&p=f&t=qFOWOFFlkPROeGTu-0))
* **Công nghệ sử dụng:** HTML5 (Semantic HTML), Tailwind CSS (v4), JavaScript (ES6), Git/GitHub.

---
## 1. Design System (Quy chuẩn Thiết kế)

###  Bảng màu (Color Palette)
#### Màu thương hiệu chính
--color-brand-600: #0056D2;

#### Màu nhấn
--color-accent-500: #ADD8E6;

#### Chữ chính
--color-ink: #111827;


#### Chữ phụ
--color-muted: #4B5563;

#### Nền trang
--color-surface: #FFFFFF;

#### Viền
--color-line: #E5E7EB;

### 2. Font chữ & Cỡ chữ (Typography)

* **Font chính:** `"Inter", "Helvetica Neue", Arial, sans-serif`

#### Kích thước Heading
* `h1`: `48px` - `60px` (`text-4xl` đến `text-6xl`)
* `h2`: `30px` - `36px` (`text-3xl` đến `text-4xl`)
* `h3`: `20px` - `24px` (`text-xl` đến `text-2xl`)

#### Kích thước Body
* `text-lg`: `18px`
* `text-base`: `16px`
* `text-sm`: `14px`
* `text-xs`: `12px`

---

### 📐 3. Bo góc (Border Radius) & Spacing

#### Bảng Quy Đổi Tailwind CSS
| Figma / Kích thước | Tailwind CSS Class | Ứng dụng |
| :--- | :--- | :--- |
| `4px` | `rounded` | Ô nhập liệu (Input), Nút bấm nhỏ |
| `6px` | `rounded-md` | Nút Đăng nhập, Badge trạng thái |
| `8px` | `rounded-lg` | Khung câu hỏi FAQ (`<details>`) |
| `12px` | `rounded-xl` | Khung chi tiết gói dịch vụ |
| `16px` | `rounded-2xl` | Thẻ tính năng (Feature Cards), Bảng giá |
| `24px` | `rounded-3xl` | Card nổi bật Hero Section |
| `999px` | `rounded-full` | Nút số thứ tự, Avatar |
