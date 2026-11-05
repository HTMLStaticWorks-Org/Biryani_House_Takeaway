/**



 * BIRYANI HOUSE & TAKEAWAY — Master Main Script (main.js)



 * Production vanilla JavaScript ES6 for all public pages



 * Features:



 * - Shared dishes data structure



 * - Theme toggle (Light / Dark) with localStorage persistence



 * - Real RTL toggle with localStorage persistence & logical CSS support



 * - Mobile hamburger navigation drawer with trap & smooth close



 * - Public cart drawer & demo ordering with localStorage persistence



 * - Category filtering for Menu page



 * - Favorite dishes toggling with localStorage



 * - Interactive form validations (Party Orders, Contact, Demo Login)



 * - Toast alerts and active link indicators



 */







// Shared Menu Items Data Structure (Rule 24: Single source of truth)



const BIRYANI_MENU_DATA = [



  {



    id: "item-1",



    name: "Hyderabadi Chicken Dum Biryani",



    category: "chicken-biryani",



    diet: "non-veg",



    price: 360,



    desc: "Long-grain aged basmati rice layered with tender farm chicken marinated in fresh yogurt, brown onions and secret house spices, slow-cooked in sealed handi.",



    image: "assets/images/1.jpg",



    isSignature: true,



    tag: "Chef Special"



  },



  {



    id: "item-2",



    name: "Royal Mutton Biryani",



    category: "mutton-biryani",



    diet: "non-veg",



    price: 490,



    desc: "Succulent prime baby goat cuts simmered with saffron broth, roasted cashews, mint and aged aromatic rice cooked in earthen dum vessels.",



    image: "assets/images/2.jpg",



    isSignature: true,



    tag: "Royal Heritage"



  },



  {



    id: "item-3",



    name: "Egg Special Biryani",



    category: "egg-biryani",



    diet: "non-veg",



    price: 280,



    desc: "Farm-fresh golden boiled eggs pan-tossed in robust masala spices and buried beneath layers of fragrant saffron basmati rice.",



    image: "assets/images/egg-biryani.jpg",



    isSignature: true,



    tag: "Popular Pick"



  },



  {



    id: "item-4",



    name: "Vegetable Dum Biryani",



    category: "veg-biryani",



    diet: "veg",



    price: 290,



    desc: "Farm garden vegetables, fresh green peas, roasted cashews and crispy paneer cubes infused with whole garam masala and kewra water.",



    image: "assets/images/veg-biryani.jpg",



    isSignature: true,



    tag: "Vegetarian Pure"



  },



  {



    id: "item-5",



    name: "Special Handi Biryani",



    category: "mutton-biryani",



    diet: "non-veg",



    price: 520,



    desc: "Slow dum-cooked tender lamb chunks in traditional hammered copper handi with deep saffron aroma and crispy brown fried onions.",



    image: "assets/images/5.jpg",



    isSignature: false,



    tag: "Traditional"



  },



  {



    id: "item-6",



    name: "Chicken Dum Biryani (Regular)",



    category: "chicken-biryani",



    diet: "non-veg",



    price: 320,



    desc: "Classic dum-cooked chicken biryani served with complimentary cooling onion raita and authentic Mirchi Ka Salan gravy.",



    image: "assets/images/4.jpg",



    isSignature: false,



    tag: "All-Time Favorite"



  },



  {



    id: "item-7",



    name: "Family Biryani Combo",



    category: "chicken-biryani",



    diet: "non-veg",



    price: 1150,



    desc: "Feast portion serves 4-5 guests: Large handi chicken biryani, 4 boiled eggs, Chicken 65 portion, double raita, salan and 4 gulab jamuns.",



    image: "assets/images/7.jpg",



    isSignature: false,



    tag: "Family Feast"



  },



  {



    id: "item-8",



    name: "Chicken 65",



    category: "starters",



    diet: "non-veg",



    price: 260,



    desc: "Crispy South Indian spiced boneless chicken bites tossed with fresh curry leaves, crushed garlic, and fiery green chillies.",



    image: "assets/images/chicken-65.jpg",



    isSignature: false,



    tag: "Appetizer"



  },



  {



    id: "item-9",



    name: "Chicken Tikka",



    category: "starters",



    diet: "non-veg",



    price: 290,



    desc: "Juicy chicken morsels steeped in hung curd, Kashmiri deggi mirch and roasted cumin, charred gently in clay tandoor.",



    image: "assets/images/3.jpg",



    isSignature: false,



    tag: "Tandoori"



  },



  {



    id: "item-10",



    name: "Tandoori Chicken (Half)",



    category: "starters",



    diet: "non-veg",



    price: 310,



    desc: "Traditional bone-in chicken marinated for 12 hours in tandoori spices and cooked over charcoal with smoky finish.",



    image: "assets/images/10.jpg",



    isSignature: false,



    tag: "Clay Oven"



  },



  {



    id: "item-11",



    name: "Pepper Chicken Fry",



    category: "starters",



    diet: "non-veg",



    price: 280,



    desc: "Dry roasted chicken cubes tossed with cracked Malabar black peppercorns, curry leaves and caramelized shallots.",



    image: "assets/images/14.jpg",



    isSignature: false,



    tag: "Spicy"



  },



  {



    id: "item-12",



    name: "Mutton Curry",



    category: "main-course",



    diet: "non-veg",



    price: 440,



    desc: "Slow-braised mutton in a rich caramelized onion and cashew-nut gravy flavored with cardamom and mace.",



    image: "assets/images/11.jpg",



    isSignature: false,



    tag: "Rich Gravy"



  },



  {



    id: "item-13",



    name: "Chicken Curry",



    category: "main-course",



    diet: "non-veg",



    price: 340,



    desc: "Homestyle chicken simmered in traditional spiced tomato-onion curry with fresh coriander and ginger juliennes.",



    image: "assets/images/9.jpg",



    isSignature: false,



    tag: "Homestyle"



  },



  {



    id: "item-14",



    name: "Butter Chicken",



    category: "main-course",



    diet: "non-veg",



    price: 360,



    desc: "Tandoor-smoked pulled chicken cooked in a velvety tomato gravy enriched with farm butter and dried fenugreek leaves.",



    image: "assets/images/10.jpg",



    isSignature: false,



    tag: "Mughlai Classic"



  },



  {



    id: "item-15",



    name: "Butter Naan",



    category: "breads",



    diet: "veg",



    price: 60,



    desc: "Pillowy refined wheat bread baked against the glowing clay walls of our tandoor and brushed generously with butter.",



    image: "assets/images/3.jpg",



    isSignature: false,



    tag: "Fresh Baked"



  },



  {



    id: "item-16",



    name: "Tandoori Roti",



    category: "breads",



    diet: "veg",



    price: 45,



    desc: "Traditional whole wheat flatbread baked crisp in the clay oven.",



    image: "assets/images/9.jpg",



    isSignature: false,



    tag: "Whole Wheat"



  },



  {



    id: "item-17",



    name: "Mirchi Ka Salan",



    category: "sides",



    diet: "veg",



    price: 90,



    desc: "Authentic Hyderabadi accompaniment made of roasted peanuts, sesame seeds, coconut and tempered Bhavnagri chillies.",



    image: "assets/images/1.jpg",



    isSignature: false,



    tag: "Authentic Side"



  },



  {



    id: "item-18",



    name: "Onion Raita",



    category: "sides",



    diet: "veg",



    price: 60,



    desc: "Chilled whipped yogurt tossed with finely diced red onions, fresh coriander, roasted cumin and black salt.",



    image: "assets/images/4.jpg",



    isSignature: false,



    tag: "Cooling"



  },



  {



    id: "item-19",



    name: "Gulab Jamun (2 Pcs)",



    category: "desserts",



    diet: "veg",



    price: 110,



    desc: "Golden fried milk solid dumplings steeped in warm saffron and green cardamom scented sugar syrup.",



    image: "assets/images/gulab-jamun-exact.jpg",



    isSignature: false,



    tag: "Sweet Finish"



  },



  {



    id: "item-20",



    name: "Royal Rose Falooda",



    category: "beverages",



    diet: "veg",



    price: 150,



    desc: "Chilled rose milk layered with sabja basil seeds, delicate vermicelli, pistachio scoops and rabri cream.",



    image: "assets/images/rose-falooda-exact.jpg",



    isSignature: false,



    tag: "Chilled Refresh"



  },



  {



    id: "item-21",



    name: "Royal Shahi Sweet Platter",



    category: "desserts",



    diet: "veg",



    price: 240,



    desc: "The signature sweet combination: warm golden Shahi Gulab Jamuns paired with chilled Royal Rose Falooda and rabri.",



    image: "assets/images/shahi-dessert-platter.jpg",



    isSignature: true,



    tag: "Chef Platter"



  }



];







// App State Management



const AppState = {



  theme: localStorage.getItem("bh_theme") || "dark",



  dir: localStorage.getItem("bh_dir") || "ltr",



  cart: (() => {



    const saved = localStorage.getItem("bh_cart");



    if (saved) {



      try {



        const parsed = JSON.parse(saved);



        if (Array.isArray(parsed) && parsed.length > 0) return parsed;



      } catch (e) {}



    }



    return [



      { id: "item-1", name: "Hyderabadi Chicken Dum Biryani", price: 360, image: "assets/images/1.jpg", qty: 2 },



      { id: "item-14", name: "Shahi Gulab Jamun (2 pcs)", price: 110, image: "assets/images/14.jpg", qty: 1 }



    ];



  })(),



  favorites: JSON.parse(localStorage.getItem("bh_favorites") || '["item-1", "item-2"]'),



  activeCategory: "all"



};







// DOM Content Loaded Handler



document.addEventListener("DOMContentLoaded", () => {



  initThemeSystem();



  initRtlSystem();



  initNavigation();



  initPublicCart();



  initMenuPage();



  initForms();



  initHeaderScroll();



  initBackToTop();



  initDumMasterclassJourney();
  initWelcomeOfferModal();



  initWeekdayOffers();

  initOccasionTheater();



});







/* ==========================================================================



   THEME (LIGHT / DARK) SYSTEM



   ========================================================================== */



function initThemeSystem() {



  document.documentElement.setAttribute("data-theme", AppState.theme);



  updateThemeToggleButtons();







  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {



    btn.addEventListener("click", () => {



      AppState.theme = AppState.theme === "dark" ? "light" : "dark";



      localStorage.setItem("bh_theme", AppState.theme);



      document.documentElement.setAttribute("data-theme", AppState.theme);



      updateThemeToggleButtons();



      showToast(`Switched to ${AppState.theme === "dark" ? "Dark" : "Light"} Mode`);



    });



  });



}







function updateThemeToggleButtons() {



  const isDark = AppState.theme === "dark";



  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {



    const icon = btn.querySelector("i");



    if (icon) {



      icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";



    }



    const label = btn.querySelector(".btn-label");



    if (label) {



      label.textContent = isDark ? "Light Mode" : "Dark Mode";



    }



  });



}







/* ==========================================================================



   RTL SYSTEM (RULE 10)



   ========================================================================== */



function initRtlSystem() {



  document.documentElement.setAttribute("dir", AppState.dir);



  updateRtlToggleButtons();







  document.querySelectorAll(".rtl-toggle-btn").forEach(btn => {



    btn.addEventListener("click", () => {



      AppState.dir = AppState.dir === "rtl" ? "ltr" : "rtl";



      localStorage.setItem("bh_dir", AppState.dir);



      document.documentElement.setAttribute("dir", AppState.dir);



      updateRtlToggleButtons();



      showToast(`Layout flipped to ${AppState.dir.toUpperCase()}`);



    });



  });



}







function updateRtlToggleButtons() {



  const isRtl = AppState.dir === "rtl";



  document.querySelectorAll(".rtl-toggle-btn").forEach(btn => {



    const label = btn.querySelector(".btn-label");



    if (label) {



      label.textContent = isRtl ? "LTR Layout" : "RTL Layout";



    } else {



      btn.textContent = isRtl ? "LTR" : "RTL";



    }



  });



}







/* ==========================================================================



   STICKY NAVBAR & MOBILE NAVIGATION (RULE 8 & 9)



   ========================================================================== */



function initHeaderScroll() {



  const header = document.querySelector(".site-header");



  if (!header) return;







  const onScroll = () => {



    if (window.scrollY > 40) {



      header.classList.add("scrolled");



    } else {



      header.classList.remove("scrolled");



    }



  };



  window.addEventListener("scroll", onScroll, { passive: true });



  onScroll();



}







function initNavigation() {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-drawer-overlay");
  const closeBtn = document.querySelector(".mobile-drawer-close");

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Close drawer on clicking actual navigation links (not accordion toggles)
  drawer.querySelectorAll("a.mobile-nav-link, a.mobile-subnav-link").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  // Mobile Accordion toggle for Home
  drawer.querySelectorAll(".mobile-accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const accordion = trigger.closest(".mobile-nav-accordion");
      if (accordion) {
        accordion.classList.toggle("open");
        const isOpen = accordion.classList.contains("open");
        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
    });
  });

  // Desktop Dropdown toggle on click/touch
  document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
    const trigger = dropdown.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", (e) => {
      if (window.innerWidth >= 992) {
        // Toggle on click
        dropdown.classList.toggle("open");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
    }
  });

  // Highlight current page
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .mobile-nav-link, .mobile-subnav-link, .nav-dropdown-item").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
      // If it's inside home dropdown, highlight the parent trigger as well
      const parentDropdown = link.closest(".nav-dropdown");
      if (parentDropdown) {
        const trg = parentDropdown.querySelector(".nav-dropdown-trigger");
        if (trg) trg.classList.add("active");
      }
      const parentAccordion = link.closest(".mobile-nav-accordion");
      if (parentAccordion) {
        parentAccordion.classList.add("open");
        const accTrg = parentAccordion.querySelector(".mobile-accordion-trigger");
        if (accTrg) {
          accTrg.classList.add("active");
          accTrg.setAttribute("aria-expanded", "true");
        }
      }
    }
  });
}







/* ==========================================================================



   PUBLIC CART & FAVORITES SYSTEM (RULE 34)



   ========================================================================== */



function initPublicCart() {



  updateCartBadge();



  setupCartDrawer();



}







function setupCartDrawer() {



  // Drawer triggers



  document.querySelectorAll(".cart-toggle-btn").forEach(btn => {



    btn.addEventListener("click", () => {



      openCartDrawer();



    });



  });







  const cartDrawer = document.getElementById("publicCartDrawer");



  const cartOverlay = document.getElementById("cartDrawerOverlay");



  const cartClose = document.getElementById("cartDrawerClose");







  if (!cartDrawer || !cartOverlay) return;







  window.openCartDrawer = function() {
    // If mobile drawer is open, close it
    const mDrawer = document.querySelector(".mobile-drawer");
    const mOverlay = document.querySelector(".mobile-drawer-overlay");
    if (mDrawer) mDrawer.classList.remove("active");
    if (mOverlay) mOverlay.classList.remove("active");

    renderCartItems();
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };







  window.closeCartDrawer = function() {



    cartDrawer.classList.remove("active");



    cartOverlay.classList.remove("active");



    document.body.style.overflow = "";



  };







  if (cartClose) cartClose.addEventListener("click", window.closeCartDrawer);



  cartOverlay.addEventListener("click", window.closeCartDrawer);



}







function addToCart(dishId) {



  const dish = BIRYANI_MENU_DATA.find(d => d.id === dishId);



  if (!dish) return;







  const existing = AppState.cart.find(c => c.id === dishId);



  if (existing) {



    existing.qty += 1;



  } else {



    AppState.cart.push({



      id: dish.id,



      name: dish.name,



      price: dish.price,



      image: dish.image,



      qty: 1



    });



  }







  saveCart();



  updateCartBadge();



  showToast(`Added "${dish.name}" to order`);



  if (document.getElementById("publicCartDrawer")?.classList.contains("active")) {



    renderCartItems();



  }



}







function updateCartQty(dishId, delta) {



  const itemIndex = AppState.cart.findIndex(c => c.id === dishId);



  if (itemIndex > -1) {



    AppState.cart[itemIndex].qty += delta;



    if (AppState.cart[itemIndex].qty <= 0) {



      AppState.cart.splice(itemIndex, 1);



    }



  }



  saveCart();



  updateCartBadge();



  renderCartItems();



}







function removeCartItem(dishId) {



  AppState.cart = AppState.cart.filter(c => c.id !== dishId);



  saveCart();



  updateCartBadge();



  renderCartItems();



  showToast("Item removed from cart");



}







function saveCart() {



  localStorage.setItem("bh_cart", JSON.stringify(AppState.cart));



}







function updateCartBadge() {



  const totalCount = AppState.cart.reduce((sum, item) => sum + item.qty, 0);



  document.querySelectorAll(".cart-count-badge").forEach(badge => {



    badge.textContent = totalCount;



    badge.style.display = totalCount > 0 ? "inline-flex" : "none";



  });







  const totalAmount = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);



  document.querySelectorAll(".cart-total-display").forEach(el => {



    el.textContent = `₹${totalAmount}`;



  });



}







function renderCartItems() {



  const container = document.getElementById("cartItemsList");



  const subtotalEl = document.getElementById("cartSubtotal");



  const deliveryEl = document.getElementById("cartDeliveryFee");



  const grandTotalEl = document.getElementById("cartGrandTotal");



  const emptyState = document.getElementById("cartEmptyState");



  const footerEl = document.getElementById("cartDrawerFooter");







  if (!container) return;







  if (AppState.cart.length === 0) {



    container.innerHTML = "";



    if (emptyState) emptyState.style.display = "block";



    if (footerEl) footerEl.style.display = "none";



    return;



  }







  if (emptyState) emptyState.style.display = "none";



  if (footerEl) footerEl.style.display = "block";







  const subtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);



  const delivery = subtotal > 0 ? 50 : 0; // standard demo fee



  const total = subtotal + delivery;







  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;



  if (deliveryEl) deliveryEl.textContent = `₹${delivery}`;



  if (grandTotalEl) grandTotalEl.textContent = `₹${total}`;







  container.innerHTML = AppState.cart.map(item => `



    <div class="cart-mini-item">



      <img src="${item.image}" alt="${item.name}">



      <div>



        <h4 style="font-size: 0.95rem; margin-bottom: 4px;">${item.name}</h4>



        <span style="font-weight: 600; color: var(--maroon); font-size: 0.9rem;">₹${item.price}</span>



      </div>



      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">



        <div class="qty-control">



          <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>



          <span class="qty-val">${item.qty}</span>



          <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)" aria-label="Increase quantity">+</button>



        </div>



        <button onclick="removeCartItem('${item.id}')" style="color: var(--text-muted); font-size: 0.76rem;" title="Remove">



          <i class="bi bi-trash3"></i> Remove



        </button>



      </div>



    </div>



  `).join("");



}







function toggleFavorite(dishId, btnElement) {



  const index = AppState.favorites.indexOf(dishId);



  if (index > -1) {



    AppState.favorites.splice(index, 1);



    if (btnElement) btnElement.classList.remove("active");



    showToast("Removed from favorite dishes");



  } else {



    AppState.favorites.push(dishId);



    if (btnElement) btnElement.classList.add("active");



    showToast("Saved to favorite dishes");



  }



  localStorage.setItem("bh_favorites", JSON.stringify(AppState.favorites));



}







/* ==========================================================================



   MENU PAGE DYNAMIC CARDS & FILTERING (RULE 16)



   ========================================================================== */



function initMenuPage() {



  const menuContainer = document.getElementById("publicMenuGrid");



  if (!menuContainer) return;







  renderMenuGrid(BIRYANI_MENU_DATA);







  // Category Filter Pills



  document.querySelectorAll(".category-pill").forEach(pill => {



    pill.addEventListener("click", () => {



      document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));



      pill.classList.add("active");



      const category = pill.getAttribute("data-category");



      AppState.activeCategory = category;







      if (category === "all") {



        renderMenuGrid(BIRYANI_MENU_DATA);



      } else {



        const filtered = BIRYANI_MENU_DATA.filter(item => item.category === category);



        renderMenuGrid(filtered);



      }



    });



  });



}







function renderMenuGrid(items) {



  const menuContainer = document.getElementById("publicMenuGrid");



  if (!menuContainer) return;







  if (items.length === 0) {



    menuContainer.innerHTML = `



      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">



        <i class="bi bi-search" style="font-size: 2.4rem; color: var(--saffron);"></i>



        <h3 style="margin-block: 14px 6px;">No dishes found in this category</h3>



        <p style="color: var(--text-secondary);">Try exploring our other authentic dum specialties.</p>



      </div>



    `;



    return;



  }







  menuContainer.innerHTML = items.map(dish => {



    const isFav = AppState.favorites.includes(dish.id);



    const isVeg = dish.diet === "veg";







    return `



      <article class="dish-card" data-category="${dish.category}">



        <div class="dish-media">



          <img src="${dish.image}" alt="${dish.name}" loading="lazy">



          <span class="diet-badge ${isVeg ? 'diet-veg' : 'diet-nonveg'}">



            <span class="diet-icon"></span>



            ${isVeg ? 'Veg' : 'Non-Veg'}



          </span>



          <button class="fav-toggle-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${dish.id}', this)" aria-label="Save ${dish.name}">



            <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>



          </button>



        </div>



        <div class="dish-body">



          <div class="dish-header-row">



            <h3 class="dish-title">${dish.name}</h3>



            <span class="dish-price">₹${dish.price}</span>



          </div>



          <p class="dish-desc">${dish.desc}</p>



          <div class="dish-footer">



            <span class="dish-tag"><i class="bi bi-award"></i> ${dish.tag}</span>



            <button class="btn btn-primary btn-sm" onclick="addToCart('${dish.id}')">



              <i class="bi bi-bag-plus"></i> Add to Order



            </button>



          </div>



        </div>



      </article>



    `;



  }).join("");



}







/* ==========================================================================



   FORMS & VALIDATIONS (Party Orders, Contact, Login)



   ========================================================================== */



function initForms() {



  // Party Orders Enquiry Form (Rule 17)



  const partyForm = document.getElementById("partyEnquiryForm");



  if (partyForm) {



    partyForm.addEventListener("submit", (e) => {



      e.preventDefault();



      if (validateForm(partyForm)) {



        const successBox = document.getElementById("partySuccessAlert");



        if (successBox) {



          successBox.style.display = "flex";



          successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });



        }



        partyForm.reset();



        showToast("Party catering enquiry received successfully!");



      }



    });



  }







  // Contact Form (Rule 18)



  const contactForm = document.getElementById("contactUsForm");



  if (contactForm) {



    contactForm.addEventListener("submit", (e) => {



      e.preventDefault();



      if (validateForm(contactForm)) {



        const successBox = document.getElementById("contactSuccessAlert");



        if (successBox) {



          successBox.style.display = "flex";



          successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });



        }



        contactForm.reset();



        showToast("Message sent to our hospitality team!");



      }



    });



  }







  // Demo Login Form (Rule 19)



  const loginForm = document.getElementById("demoLoginForm");



  if (loginForm) {



    const passInput = document.getElementById("loginPassword");



    const togglePass = document.getElementById("toggleLoginPassword");







    if (togglePass && passInput) {



      togglePass.addEventListener("click", () => {



        const isPassword = passInput.getAttribute("type") === "password";



        passInput.setAttribute("type", isPassword ? "text" : "password");



        togglePass.querySelector("i").className = isPassword ? "bi bi-eye-slash" : "bi bi-eye";



      });



    }







    loginForm.addEventListener("submit", (e) => {



      e.preventDefault();



      const email = document.getElementById("loginEmail").value.trim();



      const password = document.getElementById("loginPassword").value.trim();



      const errorAlert = document.getElementById("loginErrorAlert");







      // Demo login credentials per Rule 19



      if (email === "customer@example.com" && password === "demo123") {



        if (errorAlert) errorAlert.style.display = "none";



        localStorage.setItem("bh_logged_in", "true");



        localStorage.setItem("bh_user_name", "Alex Morgan");



        showToast("Welcome back! Redirecting to dashboard...");



        setTimeout(() => {



          window.location.href = "dashboard.html";



        }, 800);



      } else {



        if (errorAlert) {



          errorAlert.style.display = "flex";



          errorAlert.textContent = "Invalid demo credentials. Use: customer@example.com / demo123";



        }



      }



    });



  }



}







function validateForm(form) {



  let isValid = true;



  const inputs = form.querySelectorAll("[required]");







  inputs.forEach(input => {



    const group = input.closest(".form-group");



    if (!input.value.trim()) {



      if (group) group.classList.add("invalid");



      isValid = false;



    } else {



      if (group) group.classList.remove("invalid");



    }



  });







  return isValid;



}







/* ==========================================================================



   UNIQUE "BACK TO TOP" CONTROLLER (Dum Handi & Steam Pill)



   ========================================================================== */



function initBackToTop() {



  // Create button dynamically if not present



  let btn = document.querySelector(".back-to-top-btn");



  if (!btn) {



    btn = document.createElement("button");



    btn.className = "back-to-top-btn";



    btn.setAttribute("aria-label", "Back to top of page");



    btn.innerHTML = `



      <div class="btt-handi-wrap">



        <span class="btt-steam-dot"></span>



        <span class="btt-steam-dot"></span>



        <svg viewBox="0 0 44 44" fill="none">



          <path d="M16 11c0-3 2-4.5 2-6.5M22 11c0-3.5 2.5-5 2.5-7.5M28 11c0-3 2-4.5 2-6.5" stroke="#FFC043" stroke-width="1.8" stroke-linecap="round"/>



          <ellipse cx="22" cy="15" rx="14" ry="3" fill="#D99A32"/>



          <path d="M9 16c.8 8 5.5 15 13 15s12.2-7 13-15H9z" fill="#D99A32"/>



          <path d="M8 17c-3 0-5 2.5-5 5.5s2 5.5 5 5.5M36 17c3 0 5 2.5 5 5.5s-2 5.5-5 5.5" stroke="#FFDF9E" stroke-width="2" stroke-linecap="round"/>



        </svg>



      </div>



      <div class="btt-label">



        <span>BIRYANI</span>



        <span>TOP</span>



      </div>



      <i class="bi bi-chevron-up btt-arrow"></i>



    `;



    document.body.appendChild(btn);



  }







  const toggleVisibility = () => {



    if (window.scrollY > 320) {



      btn.classList.add("visible");



    } else {



      btn.classList.remove("visible");



    }



  };







  window.addEventListener("scroll", toggleVisibility, { passive: true });



  toggleVisibility();







  btn.addEventListener("click", () => {



    window.scrollTo({



      top: 0,



      behavior: "smooth"



    });



  });



}







/* ==========================================================================



   TOAST NOTIFICATION UTILITY



   ========================================================================== */



function showToast(message) {



  let container = document.querySelector(".toast-container");



  if (!container) {



    container = document.createElement("div");



    container.className = "toast-container";



    document.body.appendChild(container);



  }







  const toast = document.createElement("div");



  toast.className = "toast-msg";



  toast.innerHTML = `<i class="bi bi-check2-circle" style="color: var(--saffron);"></i> <span>${message}</span>`;



  container.appendChild(toast);







  setTimeout(() => {



    toast.style.opacity = "0";



    toast.style.transform = "translateY(8px)";



    toast.style.transition = "all 0.3s ease";



    setTimeout(() => toast.remove(), 300);



  }, 3200);



}















/* ==========================================================================



   ROYAL DUM MASTERCLASS THEATER & JOURNEY CONTROLLER



   - Constant default auto-play (continuous 4-second cycling)



   - Only stops when user explicitly clicks Pause Auto-Play



   - Locked identical height across all 5 phases



   - No line overlaps through button text



   ========================================================================== */



function initDumMasterclassJourney() {



  const stageContainer = document.getElementById("dumTheaterStage");



  if (!stageContainer) return;







  const slides = Array.from(stageContainer.querySelectorAll(".dum-theater-slide"));



  const stepBtns = Array.from(document.querySelectorAll(".dum-step-btn"));



  const milestonePills = Array.from(document.querySelectorAll(".dum-milestone-pill"));



  const progressBar = document.getElementById("dumTrackProgress");



  const autoPlayBtn = document.getElementById("dumAutoPlayBtn");







  if (!slides.length) return;







  let currentIndex = 0;



  const total = slides.length;



  let autoPlayTimer = null;



  let isAutoPlaying = true; // Auto-play active by default all the time







  const goToStep = (index) => {



    if (index < 0) index = 0;



    if (index >= total) index = total - 1;



    currentIndex = index;







    // 1. Update theater slides



    slides.forEach((slide, i) => {



      const isActive = i === index;



      slide.classList.toggle("active", isActive);



      slide.setAttribute("aria-hidden", isActive ? "false" : "true");



    });







    // 2. Update top stepper buttons



    stepBtns.forEach((btn, i) => {



      const isActive = i === index;



      btn.classList.toggle("active", isActive);



      btn.setAttribute("aria-selected", isActive ? "true" : "false");



    });







    // 3. Update bottom milestone quick selector pills



    milestonePills.forEach((pill, i) => {



      pill.classList.toggle("active", i === index);



    });







    // 4. Update golden track progress line



    if (progressBar) {



      const percent = (index / (total - 1)) * 100;



      progressBar.style.width = percent + "%";



    }



  };







  const resetAutoPlayInterval = () => {



    if (!isAutoPlaying) return;



    if (autoPlayTimer) clearInterval(autoPlayTimer);



    autoPlayTimer = setInterval(() => {



      const next = (currentIndex + 1) % total;



      goToStep(next);



    }, 4000);



  };







  const startAutoPlay = () => {



    isAutoPlaying = true;



    if (autoPlayBtn) {



      autoPlayBtn.classList.add("playing");



      autoPlayBtn.innerHTML = '<i class="bi bi-pause-circle-fill" style="color: var(--saffron);"></i> <span>Pause Auto-Play</span>';



    }



    resetAutoPlayInterval();



  };







  const stopAutoPlay = () => {



    if (autoPlayTimer) {



      clearInterval(autoPlayTimer);



      autoPlayTimer = null;



    }



    isAutoPlaying = false;



    if (autoPlayBtn) {



      autoPlayBtn.classList.remove("playing");



      autoPlayBtn.innerHTML = '<i class="bi bi-play-circle-fill" style="color: var(--saffron);"></i> <span>Resume Auto-Play</span>';



    }



  };







  // Top step buttons click: jump to step and keep auto-play running



  stepBtns.forEach((btn, i) => {



    btn.addEventListener("click", () => {



      goToStep(i);



      resetAutoPlayInterval();



    });



  });







  // Bottom milestone pills click: jump to step and keep auto-play running



  milestonePills.forEach((pill, i) => {



    pill.addEventListener("click", () => {



      goToStep(i);



      resetAutoPlayInterval();



    });



  });







  // Next / Previous buttons inside slides: move and keep auto-play running



  document.querySelectorAll(".dum-next-btn").forEach((btn) => {



    btn.addEventListener("click", () => {



      const nextIndex = (currentIndex + 1) % total;



      goToStep(nextIndex);



      resetAutoPlayInterval();



    });



  });







  document.querySelectorAll(".dum-prev-btn").forEach((btn) => {



    btn.addEventListener("click", () => {



      const prevIndex = (currentIndex - 1 + total) % total;



      goToStep(prevIndex);



      resetAutoPlayInterval();



    });



  });







  // Only stop when user explicitly clicks the Auto-Play toggle button



  if (autoPlayBtn) {



    autoPlayBtn.addEventListener("click", () => {



      if (isAutoPlaying) {



        stopAutoPlay();



      } else {



        startAutoPlay();



      }



    });



  }







  // Keyboard navigation



  stageContainer.addEventListener("keydown", (e) => {



    if (e.key === "ArrowRight") {



      goToStep((currentIndex + 1) % total);



      resetAutoPlayInterval();



    } else if (e.key === "ArrowLeft") {



      goToStep((currentIndex - 1 + total) % total);



      resetAutoPlayInterval();



    }



  });







  // Initialize first step & START AUTO-PLAY IMMEDIATELY



  goToStep(0);



  startAutoPlay();



}











/* ==========================================================================



   WEEKDAY & WEEKEND SPECIAL OFFERS CONTROLLER



   - Real-time current day detection



   - Day-by-day filtering tabs (Mon-Fri + Weekend)



   - 1-click clipboard coupon copying with toast alerts



   ========================================================================== */



function initWeekdayOffers() {



  const offersSection = document.getElementById("weekday-offers");



  if (!offersSection) return;







  const dayTabs = Array.from(offersSection.querySelectorAll(".weekday-day-btn"));



  const offerCards = Array.from(offersSection.querySelectorAll(".weekday-offer-card"));



  const copyButtons = Array.from(offersSection.querySelectorAll(".copy-coupon-btn, .copy-today-code-btn"));







  // Real-time Day of Week Data



  const now = new Date();



  const dayIndex = now.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat



  const dayKeys = { 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri", 6: "weekend", 0: "weekend" };



  const currentDayKey = dayKeys[dayIndex];







  const dailySpecials = {



    mon: { title: "Monday Starter Fiesta: 50% Off Chicken/Paneer 65", code: "MON50STARTER", sub: "Order any Large Biryani & get half-price starter!" },



    tue: { title: "Treat Tuesday: Flat 20% Off All Handi Biryanis", code: "TUETREAT20", sub: "Valid on Chicken Dum & Mutton Biryanis all day!" },



    wed: { title: "Wednesday Sweet Craving: Free Gulab Jamun & Buttermilk", code: "WEDMEALTREAT", sub: "Complimentary warm desserts with every meal order!" },



    thu: { title: "Thursday Express: Office Lunch Biryani Box @ ₹249", code: "THUEXPRESS249", sub: "Speedy 15-min packing with Egg, Raita & Salan!" },



    fri: { title: "Friday Kickoff: Family Jumbo Bucket ₹150 OFF", code: "FRIFAMILY150", sub: "Flat ₹150 off on our 4-person feast bucket!" },



    weekend: { title: "Weekend Royal Dawat: Flat ₹200 Off Family Handi Feast", code: "WEEKEND200", sub: "Grand Saturday & Sunday celebration with free dessert!" }



  };







  // Update Top Live Banner with Today's Deal



  const todayTitleEl = document.getElementById("todayOfferTitle");



  const todaySubEl = document.getElementById("todayOfferSubtitle");



  const todayCodeEl = document.getElementById("todayOfferCode");



  const todayCopyBtn = offersSection.querySelector(".copy-today-code-btn");







  if (currentDayKey && dailySpecials[currentDayKey]) {



    const todayDeal = dailySpecials[currentDayKey];



    if (todayTitleEl) todayTitleEl.textContent = `Today's Special: ${todayDeal.title}`;



    if (todaySubEl) todaySubEl.textContent = todayDeal.sub;



    if (todayCodeEl) todayCodeEl.textContent = todayDeal.code;



    if (todayCopyBtn) todayCopyBtn.setAttribute("data-code", todayDeal.code);



  }







  // Day Tabs Filter



  dayTabs.forEach((tab) => {



    tab.addEventListener("click", () => {



      dayTabs.forEach((t) => t.classList.remove("active"));



      tab.classList.add("active");







      const selectedDay = tab.getAttribute("data-day");







      offerCards.forEach((card) => {



        const cardDay = card.getAttribute("data-day");



        if (selectedDay === "all" || cardDay === selectedDay) {



          card.style.display = "flex";



          card.style.animation = "slideFadeIn 0.35s ease forwards";



        } else {



          card.style.display = "none";



        }



      });



    });



  });







  // 1-Click Copy Coupon Code with Toast



  copyButtons.forEach((btn) => {



    btn.addEventListener("click", (e) => {



      e.preventDefault();



      const code = btn.getAttribute("data-code") || "WEEKDAYDUM";







      if (navigator.clipboard && navigator.clipboard.writeText) {



        navigator.clipboard.writeText(code).then(() => {



          showCopySuccess(btn, code);



        }).catch(() => {



          fallbackCopy(btn, code);



        });



      } else {



        fallbackCopy(btn, code);



      }



    });



  });







  function showCopySuccess(button, code) {



    const originalText = button.innerHTML;



    button.innerHTML = '<i class="bi bi-check2"></i> Copied!';



    button.style.backgroundColor = "#28a745";



    button.style.color = "#ffffff";



    showToast(`Coupon code ${code} copied! Apply at checkout.`);







    setTimeout(() => {



      button.innerHTML = originalText;



      button.style.backgroundColor = "";



      button.style.color = "";



    }, 2200);



  }







  function fallbackCopy(button, code) {



    const tempInput = document.createElement("input");



    tempInput.value = code;



    document.body.appendChild(tempInput);



    tempInput.select();



    document.execCommand("copy");



    document.body.removeChild(tempInput);



    showCopySuccess(button, code);



  }



}





/* ==========================================================================

   PARTY ORDERS: OCCASION THEATER CONTROLLER

   ========================================================================== */

function initOccasionTheater() {

  const stage = document.getElementById("occasionTheaterStage");

  if (!stage) return;



  const slides = Array.from(stage.querySelectorAll(".occasion-slide"));

  const tabs = Array.from(document.querySelectorAll(".occasion-tab"));

  const dots = Array.from(document.querySelectorAll(".occasion-dot"));

  const autoPlayBtn = document.getElementById("occasionAutoPlayBtn");



  if (!slides.length) return;



  let currentIndex = 0;

  const total = slides.length;

  let timer = null;

  let isAutoPlaying = true;



  const goToOccasion = (index) => {

    if (index < 0) index = 0;

    if (index >= total) index = total - 1;

    currentIndex = index;



    // 1. Update slides

    slides.forEach((slide, i) => {

      const active = i === index;

      slide.classList.toggle("active", active);

      slide.setAttribute("aria-hidden", active ? "false" : "true");

    });



    // 2. Update tabs

    tabs.forEach((tab, i) => {

      const active = i === index;

      tab.classList.toggle("active", active);

      tab.setAttribute("aria-selected", active ? "true" : "false");

      if (active && window.innerWidth <= 768) {

        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

      }

    });



    // 3. Update dots

    dots.forEach((dot, i) => {

      dot.classList.toggle("active", i === index);

    });

  };



  const resetTimer = () => {

    if (!isAutoPlaying) return;

    if (timer) clearInterval(timer);

    timer = setInterval(() => {

      let nextIndex = (currentIndex + 1) % total;

      goToOccasion(nextIndex);

    }, 4500);

  };



  // Tab click listeners

  tabs.forEach((tab, i) => {

    tab.addEventListener("click", () => {

      goToOccasion(i);

      resetTimer();

    });

  });



  // Dots click listeners

  dots.forEach((dot, i) => {

    dot.addEventListener("click", () => {

      goToOccasion(i);

      resetTimer();

    });

  });



  // Prev & Next Arrow Listeners
  const prevBtn = document.getElementById("occasionPrevBtn");
  const nextBtn = document.getElementById("occasionNextBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let prevIndex = (currentIndex - 1 + total) % total;
      goToOccasion(prevIndex);
      resetTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let nextIndex = (currentIndex + 1) % total;
      goToOccasion(nextIndex);
      resetTimer();
    });
  }

  // Clean Play/Pause Icon Button (No ugly text)
  if (autoPlayBtn) {
    autoPlayBtn.addEventListener("click", () => {
      isAutoPlaying = !isAutoPlaying;
      if (isAutoPlaying) {
        autoPlayBtn.classList.add("playing");
        autoPlayBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        autoPlayBtn.setAttribute("aria-label", "Pause Auto-Play");
        resetTimer();
      } else {
        autoPlayBtn.classList.remove("playing");
        autoPlayBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        autoPlayBtn.setAttribute("aria-label", "Play Auto-Play");
        if (timer) clearInterval(timer);
      }
    });
  }

  // Pause on hover over stage for great UX
  stage.addEventListener("mouseenter", () => {
    if (timer) clearInterval(timer);
  });
  stage.addEventListener("mouseleave", () => {
    if (isAutoPlaying) resetTimer();
  });



  // Start initial autoplay

  resetTimer();

}



// Global helper to select occasion and scroll to enquiry form

window.selectOccasion = function(eventType) {

  const selectElem = document.getElementById("partyEventType");

  const formElem = document.getElementById("partyOrderForm") || document.querySelector(".party-form");



  if (selectElem && eventType) {

    selectElem.value = eventType;

    selectElem.classList.add("field-highlight");

    setTimeout(() => selectElem.classList.remove("field-highlight"), 2500);

  }



  if (formElem) {

    formElem.scrollIntoView({ behavior: "smooth", block: "start" });

  }

};



/* ==========================================================================
   WELCOME OFFER POPUP SYSTEM (OPTION B)
   ========================================================================== */
function initWelcomeOfferModal() {
  const modal = document.getElementById("welcomeOfferModal");
  if (!modal) return;

  const closeBtn = document.getElementById("closeOfferModal");
  const dismissLink = document.getElementById("dismissOfferLink");
  const copyBtn = document.getElementById("copyCouponBtn");
  const claimBtn = document.getElementById("claimOfferBtn");
  const couponCodeElem = document.getElementById("welcomeCouponCode");
  const code = couponCodeElem ? couponCodeElem.textContent.trim() : "DUMFEAST20";

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    sessionStorage.setItem("bh_offer_closed", "true");
  };

  const openModal = () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  };

  // Check if previously closed in current session
  if (!sessionStorage.getItem("bh_offer_closed")) {
    setTimeout(() => {
      openModal();
    }, 1400);
  }

  // Close handlers
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (dismissLink) dismissLink.addEventListener("click", closeModal);

  // Click outside modal card
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Copy coupon handler
  const copyCode = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    } else {
      const tempInput = document.createElement("input");
      tempInput.value = code;
      document.body.appendChild(tempInput);
      tempInput.select();
      try { document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(tempInput);
    }
    localStorage.setItem("bh_applied_coupon", code);
    if (copyBtn) {
      const orig = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="bi bi-check-lg"></i> COPIED!';
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.innerHTML = orig;
        copyBtn.classList.remove("copied");
      }, 2500);
    }
  };

  if (copyBtn) copyBtn.addEventListener("click", copyCode);

  if (claimBtn) {
    claimBtn.addEventListener("click", () => {
      copyCode();
      closeModal();
    });
  }
}
