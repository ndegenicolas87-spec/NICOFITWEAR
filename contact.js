function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);

  showToast("Copied: " + text);
}

function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}