const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

function renderCart() {
  const cart = getCart();
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    totalEl.innerText = "0";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>Ksh ${item.price} × ${item.quantity}</p>
          <button onclick="removeItem('${item.name}')">Remove</button>
        </div>
      </div>
    `;
  });

  totalEl.innerText = total;
}

function removeItem(name) {
  removeFromCart(name);
  renderCart();
}

renderCart();
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>Ksh ${item.price}</p>
          <div class="qty">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  cartTotal.textContent = total;
}

function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

document.addEventListener("DOMContentLoaded", () => {

  const placeOrderBtn = document.getElementById("place-order-btn");

  if (!placeOrderBtn) {
    console.error("Place order button not found");
    return;
  }

  placeOrderBtn.addEventListener("click", () => {
    const phone = document.getElementById("phone").value.trim();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (phone === "" || cart.length === 0) {
      alert("Phone number or cart is empty");
      return;
    }

    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });

    fetch("create_order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone,
        amount: total
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showOrderToast("Order placed successfully! Order ID: " + data.order_id);
        localStorage.removeItem("cart");
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong");
    });
  });

});
function showOrderToast(message) {
  const toast = document.getElementById("order-toast");
  const text = document.getElementById("toast-text");

  if (!toast || !text) {
    console.error("Toast elements not found");
    return;
  }

  text.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}