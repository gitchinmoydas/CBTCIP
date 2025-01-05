// Product Data
const products = [
    { id: 1, name: 'Wireless Headphones', price: 49.99, image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Smart Watch', price: 99.99, image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Gaming Mouse', price: 29.99, image: 'https://via.placeholder.com/200' },
    { id: 4, name: 'Keyboard', price: 39.99, image: 'https://via.placeholder.com/200' },
  ];
  
  // Cart Data
  let cart = [];
  let orders = []; // To track completed orders
  
  // Load Products
  const productList = document.getElementById('productList');
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productCard);
  });
  
  // Add to Cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const existingItem = cart.find((item) => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
  }
  
  // Update Cart
  function updateCart() {
    const cartList = document.getElementById('cartList');
    const totalItems = document.getElementById('totalItems');
    const totalPrice = document.getElementById('totalPrice');
  
    cartList.innerHTML = '';
    let total = 0;
  
    cart.forEach((item) => {
      const cartItem = document.createElement('li');
      cartItem.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      cartList.appendChild(cartItem);
      total += item.price * item.quantity;
    });
  
    totalItems.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice.textContent = total.toFixed(2);
  }
  
  // Checkout
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    // Generate order details
    const orderId = `ORD-${Date.now()}`;
    const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    const orderItems = cart.map((item) => `${item.name} x ${item.quantity}`).join(', ');
  
    // Add to orders
    orders.push({ id: orderId, items: orderItems, total: orderTotal });
  
    // Update Order Tracking
    updateOrders();
  
    // Clear cart
    cart = [];
    updateCart();
    alert('Your order has been placed!');
  });
  
  // Update Orders
  function updateOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
  
    orders.forEach((order) => {
      const orderItem = document.createElement('li');
      orderItem.innerHTML = `
        <h3>Order ID: ${order.id}</h3>
        <p>Items: ${order.items}</p>
        <p>Total: $${order.total}</p>
      `;
      orderList.appendChild(orderItem);
    });
  }
  