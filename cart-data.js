// cart-data.js
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, image) {
  let cart = getCart();
  let item = cart.find(p => p.name === name);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  saveCart(cart);
  showToast(`${name} added to cart`);
}

function removeFromCart(name) {
  let cart = getCart().filter(p => p.name !== name);
  saveCart(cart);
}