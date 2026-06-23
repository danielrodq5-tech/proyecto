// ESTRUCTURA DE LA BASE DE DATOS DE PRODUCTOS
const products = [
  {
    id: 1,
    name: "Camiseta Real Madrid Oficial 2026",
    price: 249,
    img: "img/real-madrid.jpg" // Cambia la ruta cuando agregues tus imágenes reales
  },
  {
    id: 2,
    name: "Camiseta FC Barcelona Local",
    price: 229,
    img: "img/barcelona.jpg"
  },
  {
    id: 3,
    name: "Camiseta Argentina Tres Estrellas",
    price: 199,
    img: "img/argentina.jpg"
  },
  {
    id: 4,
    name: "Camiseta Inter Miami Edición Especial",
    price: 219,
    img: "img/inter-miami.jpg"
  }
];

// ESTADO GLOBAL DE LA APLICACIÓN (CARRITO)
let cart = [];

// CAPTURA DE COMPONENTES DEL INTERFAZ (DOM)
const productsGrid = document.getElementById("productsGrid");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartToggleBtn = document.getElementById("cartToggleBtn");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartBody = document.getElementById("cartBody");
const cartTotal = document.getElementById("cartTotal");
const cartCounter = document.getElementById("cartCounter");

// 1. INYECCIÓN DINÁMICA DE LOS PRODUCTOS AL CATÁLOGO
function renderProducts() {
  productsGrid.innerHTML = "";
  
  products.forEach(product => {
    // Si no tienes imágenes aún, se muestra un recuadro limpio estructurado por CSS
    productsGrid.innerHTML += `
      <article class="product-card">
        <div class="product-img-wrapper">
          <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://placehold.co/240x260/f8fafc/0a0a0b?text=Jersey'">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price} Bs</p>
          <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-plus"></i> AGREGAR AL CARRITO
          </button>
        </div>
      </article>
    `;
  });
}

// 2. CONTROL DEL SISTEMA DEL CARRITO (Añadir o Incrementar Unidades)
function addToCart(id) {
  const targetProduct = products.find(p => p.id === id);
  const alreadyInCart = cart.find(item => item.id === id);

  if (alreadyInCart) {
    alreadyInCart.quantity += 1;
  } else {
    cart.push({ ...targetProduct, quantity: 1 });
  }

  updateCartUI();
  openCart(); // Brinda feedback inmediato al cliente abriendo el panel lateral
}

// 3. REMOVER UNA UNIDAD O ELIMINAR COMPLETAMENTE EL ITEM
function removeUnitFromCart(id) {
  const itemIndex = cart.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
  }
  updateCartUI();
}

// 4. VACIADO TOTAL DEL CARRITO
function clearCart() {
  cart = [];
  updateCartUI();
}

// 5. ACTUALIZACIÓN EN TIEMPO REAL DE LA INTERFAZ DEL CARRITO
function updateCartUI() {
  cartBody.innerHTML = "";
  let runningTotal = 0;
  let totalItemsCount = 0;

  if (cart.length === 0) {
    cartBody.innerHTML = `<p class="cart-empty-msg">Tu carrito está vacío de momento.</p>`;
  } else {
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      runningTotal += subtotal;
      totalItemsCount += item.quantity;

      cartBody.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://placehold.co/60x60/f8fafc/0a0a0b?text=Jersey'">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-pricing">${item.quantity} x <span>${item.price} Bs</span></p>
          </div>
          <button class="btn-remove-item" onclick="removeUnitFromCart(${item.id})" aria-label="Quitar un elemento">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    });
  }

  // Modificar valores numéricos en el DOM
  cartTotal.innerText = runningTotal;
  cartCounter.innerText = totalItemsCount;
}

// 6. FUNCIONES DE APERTURA Y CIERRE DEL PANEL LATERAL
function openCart() {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// ASIGNACIÓN DE ESCUCHADORES DE EVENTOS (LISTENERS)
cartToggleBtn.addEventListener("click", openCart);
cartCloseBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// 7. SIMULACIÓN DE CIERRE DE COMPRA/PAGO
function proceedToCheckout() {
  if (cart.length === 0) {
    alert("Agrega al menos una polera a tu pedido antes de proceder.");
    return;
  }
  
  alert("¡Pedido recibido con éxito! Un asesor se pondrá en contacto contigo para coordinar la entrega y el método de pago en Bolivia. ¡Gracias por confiar en SportCool!");
  clearCart();
  closeCart();
}

// 8. DESPLAZAMIENTO SUAVE DESDE EL HERO AL ÁREA DE VENTAS
function scrollToCatalog() {
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
}

// EXECUCIÓN INICIAL AL CARGAR LA PÁGINA
renderProducts();