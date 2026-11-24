// Dữ liệu sản phẩm và giỏ hàng dùng chung cho các trang
const WM_PRODUCTS = [
  { id: "coconut-cookie", name: "Bánh vừng dừa Bảo Ngọc gói 60g", price: 18000, oldPrice: 22000, category: "Bánh kẹo", unit: "Gói 60g", image: "assets/croissant.jpg", discount: 18, badge: "Quà tặng" },
  { id: "chinsu-soy", name: "CHIN-SU Nước tương tự nhiên 120 ngày 300ml", price: 25000, oldPrice: 32000, category: "Gia vị", unit: "Chai 300ml", image: "assets/chinsu-soy.jpg", discount: 22, badge: "Giá tốt" },
  { id: "seafood-dumplings", name: "LC FOODS Bánh xếp hải sản rau củ 350g", price: 54000, oldPrice: 69000, category: "Thực phẩm đông lạnh", unit: "Gói 350g", image: "assets/dumplings.png", discount: 22, badge: "Bán chạy" },
  { id: "jinju-rice-cake", name: "JINJU Bánh gạo muối hồng 134.4g", price: 28000, oldPrice: 35000, category: "Bánh kẹo", unit: "Gói 134.4g", image: "assets/rice-cake.jpg", discount: 20, badge: "Mới" },
  { id: "blueberry-tea", name: "Trà việt quất TVT chai 470ml", price: 12000, oldPrice: 16000, category: "Đồ uống - giải khát", unit: "Chai 470ml", image: "assets/blueberry-tea.png", discount: 25, badge: "Giá tốt" },
  { id: "kitkool-fish-balls", name: "Cá viên Kitkool 200g", price: 26000, oldPrice: 35000, category: "Thực phẩm đông lạnh", unit: "Gói 200g", image: "assets/fish-balls.png", discount: 26, badge: "Quà tặng" }
];

const WM_CART_KEY = "winmart-cart";

function wmFormat(price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(price);
}

function wmGetCart() {
  try {
    return JSON.parse(localStorage.getItem(WM_CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function wmSaveCart(cart) {
  try {
    localStorage.setItem(WM_CART_KEY, JSON.stringify(cart));
  } catch (e) {}
  wmUpdateCartBadge();
}

function wmAddToCart(id, qty = 1) {
  const cart = wmGetCart();
  cart[id] = (cart[id] || 0) + qty;
  wmSaveCart(cart);
}

function wmSetQty(id, qty) {
  const cart = wmGetCart();
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  wmSaveCart(cart);
}

function wmCartCount() {
  return Object.values(wmGetCart()).reduce((sum, n) => sum + n, 0);
}

function wmUpdateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = wmCartCount();
  });
}

document.addEventListener("DOMContentLoaded", wmUpdateCartBadge);
