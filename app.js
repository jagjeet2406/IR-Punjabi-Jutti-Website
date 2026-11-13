const API = "https://ir-punjabi-jutti-website-login.onrender.com/api/products";
const ADMIN_KEY = "irjutti@admin2026";

const SUBCATEGORY_MAP = {
  kids: ["little-gabru", "little-mutiyar"],
  wedding: ["groom", "bride"],
  women: [], men: [], purse: []
};


function handleLogin() {
  const user = document.getElementById("login-user").value.trim();
  const pass = document.getElementById("login-pass").value.trim();
  const err  = document.getElementById("login-error");


  if (user === "irpunjabijutti" && pass === ADMIN_KEY) {
    sessionStorage.setItem("admin_auth", "true");
    showDashboard();
  } else {
    err.style.display = "block";
    err.textContent = "Invalid username or password.";
  }
}

function handleLogout() {
  sessionStorage.removeItem("admin_auth");
  document.getElementById("login-page").style.display = "flex";
  document.getElementById("dashboard-page").style.display = "none";
  document.getElementById("login-pass").value = "";
}

function showDashboard() {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("dashboard-page").style.display = "block";
  updateSubcategoryOptions();
  loadProducts();
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-pass").addEventListener("keydown", e => {
    if (e.key === "Enter") handleLogin();
  });
  document.getElementById("login-user").addEventListener("keydown", e => {
    if (e.key === "Enter") handleLogin();
  });


  if (sessionStorage.getItem("admin_auth") === "true") {
    showDashboard();
  }
});


function updateSubcategoryOptions() {
  const cat = document.getElementById("inp-category").value;
  const sub = document.getElementById("inp-subcategory");
  const opts = SUBCATEGORY_MAP[cat] || [];
  sub.innerHTML = '<option value="">None</option>';
  opts.forEach(s => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());
    sub.appendChild(o);
  });
}

function previewImage() {
  const url = document.getElementById("inp-link").value;
  const container = document.getElementById("img-preview-container");
  if (url.startsWith("http")) {
    container.innerHTML = `<img src="${url}" class="image-preview" onerror="this.style.opacity='0.3'" />`;
  }
}


async function addProduct() {
  const name       = document.getElementById("inp-name").value.trim();
  const price      = document.getElementById("inp-price").value.trim();
  const fake_price = document.getElementById("inp-fake").value.trim();
  const link       = document.getElementById("inp-link").value.trim();
  const category   = document.getElementById("inp-category").value;
  const subcategory= document.getElementById("inp-subcategory").value || null;
  const description= document.getElementById("inp-description").value.trim();
  const material   = document.getElementById("inp-material").value.trim();
  const sizes      = document.getElementById("inp-sizes").value.split(",").map(x => x.trim()).filter(Boolean);
  const images     = document.getElementById("inp-images").value.split("\n").map(x => x.trim()).filter(Boolean);

  if (!name || !price || !fake_price || !link) {
    alert("Please fill all required fields.");
    return;
  }

  const body = { name, price, fake_price, link, category, subcategory, description, material, sizes, images };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      let reason = `HTTP ${res.status}`;
      try { const j = await res.json(); if (j.error) reason += ": " + j.error; } catch (_) {}
      throw new Error(reason);
    }

    const msg = document.getElementById("success-msg");
    msg.style.display = "inline";
    setTimeout(() => msg.style.display = "none", 3000);

    // Clear form
    ["inp-name","inp-price","inp-fake","inp-link","inp-description","inp-material","inp-sizes","inp-images"]
      .forEach(id => document.getElementById(id).value = "");
    document.getElementById("img-preview-container").innerHTML =
      '<div class="image-preview-placeholder">No image</div>';

    loadProducts();
  } catch (err) {
    alert("Error adding product — " + err.message);
    console.error(err);
  }
}


async function deleteProduct(id) {
  if (!confirm("Delete this product? This cannot be undone.")) return;
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": ADMIN_KEY }
    });
    loadProducts();
  } catch (err) {
    alert("Error deleting product.");
  }
}

// ── LOAD PRODUCTS ──
async function loadProducts() {
  const listEl = document.getElementById("product-list");
  listEl.innerHTML = '<div class="loading">Loading...</div>';

  const cat = document.getElementById("filter-category").value;
  const sub = document.getElementById("filter-subcategory").value;

  let url = API;
  const params = [];
  if (cat) params.push(`category=${cat}`);
  if (sub) params.push(`subcategory=${sub}`);
  if (params.length) url += "?" + params.join("&");

  try {
    const res = await fetch(url);
    const products = await res.json();

    document.getElementById("total-count").textContent = products.length;

    if (products.length === 0) {
      listEl.innerHTML = '<div class="empty">No products found</div>';
      return;
    }

    listEl.innerHTML = products.map(p => `
      <div class="product-row">
        <img src="${p.link}" class="image-preview" onerror="this.style.opacity='0.3'" />
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-meta">
            ${p.price} &nbsp;|&nbsp; <s style="color:#aaa">${p.fake_price}</s>
            &nbsp;|&nbsp;
            <span class="badge">${p.category}</span>
            ${p.subcategory ? `<span class="badge" style="margin-left:4px">${p.subcategory}</span>` : ""}
          </div>
        </div>
        <button class="btn btn-red" onclick="deleteProduct('${p._id}')">🗑 Delete</button>
      </div>
    `).join("");

  } catch (err) {
    listEl.innerHTML = '<div class="empty">Failed to load products. Check API URL.</div>';
    console.error(err);
  }
}