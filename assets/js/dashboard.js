/**
 * BIRYANI HOUSE & TAKEAWAY — Customer Dashboard Script (dashboard.js)
 * Production vanilla JavaScript ES6 for dashboard.html
 * Hash Routing: #overview, #menu, #cart, #orders, #tracking, #favorites, #history, #addresses, #profile, #support
 * Features:
 * - Hash routing view switching without page reloads (Rule 20)
 * - Order placement with simulated order ID & timeline update (Rule 34)
 * - Responsive off-canvas sidebar with swipe/click-outside toggle (Rule 22)
 * - Notification dropdown with mark-as-read state (Rule 35)
 * - Dynamic favorite dish listing & management (Rule 28)
 * - Address management (Rule 30) & Profile settings (Rule 31)
 * - Sign out confirmation modal (Rule 33)
 */

const DEMO_ORDERS = [
  {
    id: "BH1024",
    date: "04 Nov 2026, 12:15 PM",
    items: "Chicken Dum Biryani × 2, Chicken 65 × 1",
    total: 980,
    status: "Preparing",
    address: "Flat 402, Royal Palms Residency, Jubilee Hills, Hyderabad",
    step: 3
  },
  {
    id: "BH0988",
    date: "01 Nov 2026, 08:30 PM",
    items: "Royal Mutton Biryani × 1, Butter Naan × 2, Gulab Jamun × 1",
    total: 720,
    status: "Delivered",
    address: "Flat 402, Royal Palms Residency, Jubilee Hills, Hyderabad",
    step: 5
  },
  {
    id: "BH0942",
    date: "28 Oct 2026, 01:20 PM",
    items: "Vegetable Dum Biryani × 2, Mirchi Ka Salan × 1",
    total: 670,
    status: "Delivered",
    address: "Cyber Towers, 4th Floor, HITEC City, Hyderabad",
    step: 5
  }
];

const DEMO_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    isDefault: true,
    name: "Alex Morgan",
    phone: "+91 98765 43210",
    addressText: "Flat 402, Royal Palms Residency, Road No. 36, Jubilee Hills, Hyderabad - 500033"
  },
  {
    id: "addr-2",
    label: "Work",
    isDefault: false,
    name: "Alex Morgan",
    phone: "+91 98765 43210",
    addressText: "Floor 4, Block B, Cyber Gateway, HITEC City, Hyderabad - 500081"
  }
];

// Dashboard Application State
const DashState = {
  activeTab: "overview",
  orders: JSON.parse(localStorage.getItem("bh_orders_list") || JSON.stringify(DEMO_ORDERS)),
  addresses: JSON.parse(localStorage.getItem("bh_addresses") || JSON.stringify(DEMO_ADDRESSES)),
  notifications: [
    { id: 1, text: "Your Chicken Dum Biryani order #BH1024 is being slow dum prepared.", time: "10 mins ago", read: false },
    { id: 2, text: "Special festive discount available on Royal Mutton Biryani this weekend.", time: "2 hours ago", read: false },
    { id: 3, text: "Order #BH0988 was delivered warm & fresh to Jubilee Hills.", time: "3 days ago", read: true }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initDashboardRouting();
  initDashboardSidebar();
  initNotificationsDropdown();
  initDashboardThemeAndRTL();
  renderAllViews();
});

/* ==========================================================================
   HASH ROUTING CONTROLLER (RULE 20)
   ========================================================================== */
function initDashboardRouting() {
  const switchView = () => {
    let hash = window.location.hash.replace("#", "") || "overview";
    const validTabs = ["overview", "menu", "cart", "orders", "tracking", "favorites", "history", "addresses", "profile", "support"];
    if (!validTabs.includes(hash)) {
      hash = "overview";
    }

    DashState.activeTab = hash;

    // Update active nav links in sidebar
    document.querySelectorAll(".dash-nav-item").forEach(link => {
      const linkHash = link.getAttribute("href")?.replace("#", "");
      if (linkHash === hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update view panels
    document.querySelectorAll(".dash-tab-section").forEach(sec => {
      if (sec.id === `view-${hash}`) {
        sec.classList.add("active");
      } else {
        sec.classList.remove("active");
      }
    });

    // Update topbar title
    const titleEl = document.getElementById("dashTopbarTitle");
    if (titleEl) {
      const formattedTitle = hash === "overview" ? "Dashboard Overview" : hash.replace("-", " ");
      titleEl.textContent = formattedTitle;
    }

    // Refresh view-specific dynamic contents
    if (hash === "overview") renderOverviewKPIs();
    if (hash === "menu") renderDashboardMenu();
    if (hash === "cart") renderDashboardCart();
    if (hash === "orders") renderOrdersView();
    if (hash === "tracking") renderTrackingTimeline();
    if (hash === "favorites") renderFavoritesView();
    if (hash === "history") renderHistoryTable();
    if (hash === "addresses") renderAddressesView();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("hashchange", switchView);
  switchView();
}

/* ==========================================================================
   SIDEBAR & MOBILE OFF-CANVAS (RULE 21 & 22)
   ========================================================================== */
function initDashboardSidebar() {
  const toggleBtn = document.querySelector(".dash-menu-toggle");
  const sidebar = document.querySelector(".dash-sidebar");
  const overlay = document.querySelector(".dash-sidebar-overlay");
  const closeBtn = document.querySelector(".dash-sidebar-close");

  if (!toggleBtn || !sidebar || !overlay) return;

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  toggleBtn.addEventListener("click", openSidebar);
  overlay.addEventListener("click", closeSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);

  sidebar.querySelectorAll(".dash-nav-item").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 991) {
        closeSidebar();
      }
    });
  });
}

/* ==========================================================================
   DASHBOARD THEME & RTL CONTROLLER
   ========================================================================== */
function initDashboardThemeAndRTL() {
  const savedTheme = localStorage.getItem("bh_theme") || "light";
  const savedDir = localStorage.getItem("bh_dir") || "ltr";

  document.documentElement.setAttribute("data-theme", savedTheme);
  document.documentElement.setAttribute("dir", savedDir);

  document.querySelectorAll(".dash-theme-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const curr = document.documentElement.getAttribute("data-theme");
      const next = curr === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("bh_theme", next);
      showToast(`Switched to ${next === "dark" ? "Dark" : "Light"} Mode`);
    });
  });

  document.querySelectorAll(".dash-rtl-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const curr = document.documentElement.getAttribute("dir");
      const next = curr === "rtl" ? "ltr" : "rtl";
      document.documentElement.setAttribute("dir", next);
      localStorage.setItem("bh_dir", next);
      showToast(`Layout changed to ${next.toUpperCase()}`);
    });
  });
}

/* ==========================================================================
   NOTIFICATIONS SYSTEM (RULE 35)
   ========================================================================== */
function initNotificationsDropdown() {
  const notifBtn = document.getElementById("notifToggleBtn");
  const dropdown = document.getElementById("notifDropdownMenu");
  const markReadBtn = document.getElementById("markAllReadBtn");

  if (!notifBtn || !dropdown) return;

  notifBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !notifBtn.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  if (markReadBtn) {
    markReadBtn.addEventListener("click", () => {
      DashState.notifications.forEach(n => n.read = true);
      renderNotifications();
      showToast("All notifications marked as read");
    });
  }

  renderNotifications();
}

function renderNotifications() {
  const listEl = document.getElementById("notifListItems");
  const badgeEl = document.getElementById("notifCountBadge");
  if (!listEl) return;

  const unreadCount = DashState.notifications.filter(n => !n.read).length;
  if (badgeEl) {
    badgeEl.textContent = unreadCount;
    badgeEl.style.display = unreadCount > 0 ? "flex" : "none";
  }

  listEl.innerHTML = DashState.notifications.map(n => `
    <div class="notif-item ${n.read ? 'read' : ''}">
      <p style="margin-bottom: 4px;">${n.text}</p>
      <span style="font-size: 0.72rem; color: var(--text-muted);"><i class="bi bi-clock"></i> ${n.time}</span>
    </div>
  `).join("");
}

/* ==========================================================================
   VIEW RENDERERS
   ========================================================================== */
function renderAllViews() {
  renderOverviewKPIs();
  renderDashboardMenu();
  renderDashboardCart();
  renderOrdersView();
  renderTrackingTimeline();
  renderFavoritesView();
  renderHistoryTable();
  renderAddressesView();
}

/* Overview KPIs (Rule 23) */
function renderOverviewKPIs() {
  const kpiTotal = document.getElementById("kpiTotalOrders");
  const kpiActive = document.getElementById("kpiActiveOrders");
  const kpiFav = document.getElementById("kpiFavoritesCount");
  const kpiCompleted = document.getElementById("kpiCompletedOrders");

  const favCount = (JSON.parse(localStorage.getItem("bh_favorites") || "[]")).length;
  const activeOrders = DashState.orders.filter(o => o.status === "Preparing").length;
  const completedOrders = DashState.orders.filter(o => o.status === "Delivered").length;

  if (kpiTotal) kpiTotal.textContent = DashState.orders.length;
  if (kpiActive) kpiActive.textContent = activeOrders;
  if (kpiFav) kpiFav.textContent = favCount;
  if (kpiCompleted) kpiCompleted.textContent = completedOrders;
}

/* Dashboard Browse Menu (Rule 24) */
function renderDashboardMenu() {
  const container = document.getElementById("dashMenuGrid");
  if (!container) return;

  const favs = JSON.parse(localStorage.getItem("bh_favorites") || "[]");

  container.innerHTML = BIRYANI_MENU_DATA.map(dish => {
    const isFav = favs.includes(dish.id);
    const isVeg = dish.diet === "veg";

    return `
      <article class="dish-card">
        <div class="dish-media">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy">
          <span class="diet-badge ${isVeg ? 'diet-veg' : 'diet-nonveg'}">
            <span class="diet-icon"></span> ${isVeg ? 'Veg' : 'Non-Veg'}
          </span>
          <button class="fav-toggle-btn ${isFav ? 'active' : ''}" onclick="toggleFavoriteDash('${dish.id}', this)" aria-label="Favorite">
            <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
          </button>
        </div>
        <div class="dish-body">
          <div class="dish-header-row">
            <h3 class="dish-title" style="font-size: 1.1rem;">${dish.name}</h3>
            <span class="dish-price">₹${dish.price}</span>
          </div>
          <p class="dish-desc" style="font-size: 0.82rem; margin-bottom: 16px;">${dish.desc}</p>
          <div class="dish-footer">
            <span class="dish-tag">${dish.tag}</span>
            <button class="btn btn-primary btn-sm" onclick="addToCartDash('${dish.id}')">
              <i class="bi bi-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function addToCartDash(id) {
  addToCart(id);
  renderDashboardCart();
  renderOverviewKPIs();
}

function toggleFavoriteDash(id, btn) {
  toggleFavorite(id, btn);
  renderFavoritesView();
  renderOverviewKPIs();
}

/* Dashboard My Cart (Rule 25 & 34) */
function renderDashboardCart() {
  const container = document.getElementById("dashCartItemsTable");
  const emptyBox = document.getElementById("dashCartEmptyNotice");
  const summaryBox = document.getElementById("dashCartSummaryCard");

  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("bh_cart") || "[]");

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyBox) emptyBox.style.display = "block";
    if (summaryBox) summaryBox.style.display = "none";
    return;
  }

  if (emptyBox) emptyBox.style.display = "none";
  if (summaryBox) summaryBox.style.display = "block";

  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const delivery = 50;
  const grandTotal = subtotal + delivery;

  container.innerHTML = cart.map(item => `
    <tr>
      <td data-label="Item" style="display: flex; align-items: center; gap: 14px;">
        <img src="${item.image}" alt="${item.name}" style="width: 54px; height: 46px; border-radius: 4px; object-fit: cover;">
        <div>
          <strong>${item.name}</strong>
          <div style="font-size: 0.78rem; color: var(--text-muted);">₹${item.price} each</div>
        </div>
      </td>
      <td data-label="Quantity">
        <div class="qty-control">
          <button class="qty-btn" onclick="updateDashCartQty('${item.id}', -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateDashCartQty('${item.id}', 1)">+</button>
        </div>
      </td>
      <td data-label="Total" style="font-weight: 700; color: var(--maroon);">₹${item.price * item.qty}</td>
      <td data-label="Action">
        <button class="btn btn-outline btn-sm" onclick="removeCartItem('${item.id}'); renderDashboardCart();" style="padding: 6px 10px;">
          <i class="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  `).join("");

  document.getElementById("dashCartSubtotal").textContent = `₹${subtotal}`;
  document.getElementById("dashCartDelivery").textContent = `₹${delivery}`;
  document.getElementById("dashCartGrandTotal").textContent = `₹${grandTotal}`;
}

function updateDashCartQty(id, delta) {
  updateCartQty(id, delta);
  renderDashboardCart();
}

/* Proceed to Order / Checkout (Rule 34: Demo Order Generation) */
window.proceedDemoOrder = function() {
  const cart = JSON.parse(localStorage.getItem("bh_cart") || "[]");
  if (cart.length === 0) {
    showToast("Your cart is empty! Add items from menu first.");
    return;
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newOrderId = `BH${randomNum}`;
  const itemsText = cart.map(i => `${i.name} × ${i.qty}`).join(", ");
  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const total = subtotal + 50;

  const newOrder = {
    id: newOrderId,
    date: "Just now (Demo)",
    items: itemsText,
    total: total,
    status: "Preparing",
    address: "Flat 402, Royal Palms Residency, Jubilee Hills, Hyderabad",
    step: 2
  };

  DashState.orders.unshift(newOrder);
  localStorage.setItem("bh_orders_list", JSON.stringify(DashState.orders));

  // Clear cart
  localStorage.setItem("bh_cart", "[]");
  AppState.cart = [];
  updateCartBadge();

  // Notification
  DashState.notifications.unshift({
    id: Date.now(),
    text: `New Order #${newOrderId} placed successfully! Kitchen has begun slow dum cooking.`,
    time: "Just now",
    read: false
  });
  renderNotifications();

  showToast(`Order #${newOrderId} Confirmed! Redirecting to tracking...`);

  setTimeout(() => {
    window.location.hash = "#tracking";
  }, 1000);
};

/* Dashboard My Orders (Rule 26) */
function renderOrdersView() {
  const container = document.getElementById("dashOrdersListContainer");
  if (!container) return;

  container.innerHTML = DashState.orders.map(order => `
    <div class="tracking-card" style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 14px;">
        <div>
          <span style="font-size: 0.76rem; font-weight: 700; color: var(--saffron); text-transform: uppercase;">Order Number</span>
          <h3 style="font-size: 1.3rem;">#${order.id}</h3>
          <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="bi bi-calendar3"></i> ${order.date}</span>
        </div>
        <div style="text-align: end;">
          <span class="status-badge ${order.status === 'Preparing' ? 'status-preparing' : 'status-delivered'}">${order.status}</span>
          <div style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: var(--text-heading); margin-top: 6px;">₹${order.total}</div>
        </div>
      </div>
      <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px dashed var(--border-color);">
        <strong>Ordered Items:</strong> ${order.items}
      </p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-outline btn-sm" onclick="viewOrderTracking('${order.id}')">
          <i class="bi bi-geo-alt"></i> Track Status
        </button>
        <button class="btn btn-primary btn-sm" onclick="reorderItems('${order.id}')">
          <i class="bi bi-arrow-repeat"></i> Reorder
        </button>
      </div>
    </div>
  `).join("");
}

function viewOrderTracking(id) {
  window.location.hash = "#tracking";
}

function reorderItems(orderId) {
  showToast(`Items from #${orderId} added to cart!`);
  // Add first dish as sample
  addToCart("item-1");
  window.location.hash = "#cart";
}

/* Dashboard Track Delivery (Rule 27) */
function renderTrackingTimeline() {
  const activeOrder = DashState.orders.find(o => o.status === "Preparing") || DashState.orders[0];
  if (!activeOrder) return;

  const idEl = document.getElementById("trackOrderId");
  const itemsEl = document.getElementById("trackItemsSummary");
  const addrEl = document.getElementById("trackDeliveryAddress");
  const totalEl = document.getElementById("trackOrderTotal");

  if (idEl) idEl.textContent = `#${activeOrder.id}`;
  if (itemsEl) itemsEl.textContent = activeOrder.items;
  if (addrEl) addrEl.textContent = activeOrder.address;
  if (totalEl) totalEl.textContent = `₹${activeOrder.total}`;

  // Update step indicators
  const step = activeOrder.step || 3;
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`trackStep${i}`);
    if (el) {
      el.classList.remove("completed", "active");
      if (i < step) el.classList.add("completed");
      if (i === step) el.classList.add("active");
    }
  }
}

/* Dashboard Favorite Dishes (Rule 28) */
function renderFavoritesView() {
  const container = document.getElementById("dashFavoritesGrid");
  const emptyNotice = document.getElementById("dashFavEmptyNotice");
  if (!container) return;

  const favIds = JSON.parse(localStorage.getItem("bh_favorites") || "[]");
  const favItems = BIRYANI_MENU_DATA.filter(dish => favIds.includes(dish.id));

  if (favItems.length === 0) {
    container.innerHTML = "";
    if (emptyNotice) emptyNotice.style.display = "block";
    return;
  }

  if (emptyNotice) emptyNotice.style.display = "none";

  container.innerHTML = favItems.map(dish => `
    <article class="dish-card">
      <div class="dish-media">
        <img src="${dish.image}" alt="${dish.name}">
        <span class="diet-badge ${dish.diet === 'veg' ? 'diet-veg' : 'diet-nonveg'}">
          ${dish.diet === 'veg' ? 'Veg' : 'Non-Veg'}
        </span>
        <button class="fav-toggle-btn active" onclick="toggleFavoriteDash('${dish.id}', this)" title="Remove Favorite">
          <i class="bi bi-heart-fill"></i>
        </button>
      </div>
      <div class="dish-body">
        <div class="dish-header-row">
          <h3 class="dish-title" style="font-size: 1.15rem;">${dish.name}</h3>
          <span class="dish-price">₹${dish.price}</span>
        </div>
        <p class="dish-desc" style="font-size: 0.84rem; margin-bottom: 16px;">${dish.desc}</p>
        <div class="dish-footer">
          <button class="btn btn-outline btn-sm" onclick="toggleFavoriteDash('${dish.id}')">Remove</button>
          <button class="btn btn-primary btn-sm" onclick="addToCartDash('${dish.id}')">
            <i class="bi bi-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* Dashboard Order History Table (Rule 29) */
function renderHistoryTable() {
  const tableBody = document.getElementById("dashHistoryTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = DashState.orders.map(order => `
    <tr>
      <td data-label="Order ID"><strong>#${order.id}</strong></td>
      <td data-label="Date">${order.date}</td>
      <td data-label="Items" style="max-width: 280px;">${order.items}</td>
      <td data-label="Total" style="font-weight: 700; color: var(--maroon);">₹${order.total}</td>
      <td data-label="Status">
        <span class="status-badge ${order.status === 'Preparing' ? 'status-preparing' : 'status-delivered'}">${order.status}</span>
      </td>
      <td data-label="Action">
        <button class="btn btn-outline btn-sm" onclick="reorderItems('${order.id}')">
          <i class="bi bi-arrow-repeat"></i> Reorder
        </button>
      </td>
    </tr>
  `).join("");
}

/* Dashboard Saved Addresses (Rule 30) */
function renderAddressesView() {
  const container = document.getElementById("dashAddressesGrid");
  if (!container) return;

  container.innerHTML = DashState.addresses.map(addr => `
    <div class="address-card ${addr.isDefault ? 'default' : ''}">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="address-tag-pill"><i class="bi bi-geo-alt-fill"></i> ${addr.label}</span>
          ${addr.isDefault ? '<span class="status-badge status-delivered" style="font-size: 0.68rem;">Default Address</span>' : ''}
        </div>
        <h4 style="font-size: 1.05rem; margin-bottom: 4px;">${addr.name}</h4>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 6px;">${addr.phone}</p>
        <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.5;">${addr.addressText}</p>
      </div>
      <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-color); padding-top: 14px;">
        <button class="btn btn-outline btn-sm" onclick="showToast('Address edit dialog (Demo)')">Edit</button>
        ${!addr.isDefault ? `<button class="btn btn-outline btn-sm" onclick="setDefaultAddress('${addr.id}')">Set Default</button>` : ''}
      </div>
    </div>
  `).join("");
}

function setDefaultAddress(id) {
  DashState.addresses.forEach(a => a.isDefault = (a.id === id));
  localStorage.setItem("bh_addresses", JSON.stringify(DashState.addresses));
  renderAddressesView();
  showToast("Default delivery address updated");
}

/* Profile Form Submit (Rule 31) */
window.saveProfileSettings = function(e) {
  e.preventDefault();
  showToast("Profile settings saved successfully");
};

/* Dashboard Sign Out Confirmation (Rule 33) */
window.openSignOutModal = function() {
  const modal = document.getElementById("signOutModal");
  if (modal) modal.style.display = "flex";
};

window.closeSignOutModal = function() {
  const modal = document.getElementById("signOutModal");
  if (modal) modal.style.display = "none";
};

window.confirmSignOut = function() {
  localStorage.removeItem("bh_logged_in");
  showToast("Signing out...");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 600);
};

