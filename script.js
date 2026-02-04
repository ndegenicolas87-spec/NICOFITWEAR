updateCartCount();

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = count;
  }
}


// ===== TOAST FUNCTION =====
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ===== COPY TO CLIPBOARD =====
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied successfully");
  });
}

// ===== ADD TO CART =====
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  showToast(name + " added to cart");
}
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.quantity, 0);

  function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = count;
  });
}
  if (cartCount) {
    cartCount.textContent = count;
  }
}
document.addEventListener("DOMContentLoaded", updateCartCount);
document.addEventListener("DOMContentLoaded", () => {

  // ---- CART COUNT ----
  updateCartCount();

  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCount) cartCount.textContent = cart.length;
  }

  // ---- GREETING ----
  const greetingText = document.getElementById("greeting-text");
  const dateText = document.getElementById("date-text");

  if (!greetingText || !dateText) return;

  const now = new Date();
  const hour = now.getHours();

  let greeting;
  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
  } else {
    greeting = "Good Evening 🌙";
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  greetingText.textContent = greeting;
  dateText.textContent = now.toLocaleDateString(undefined, options);
});
