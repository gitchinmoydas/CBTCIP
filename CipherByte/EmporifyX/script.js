// Product Data
const products = [
    { id: 1, name: 'Wireless Headphones', price: 49.99, image: 'Headphone.jpg' },
    { id: 2, name: 'Smart Watch', price: 99.99, image: 'smart Watch.avif' },
    { id: 3, name: 'Gaming Mouse', price: 29.99, image: 'Mouse.avif' },
    { id: 4, name: 'Keyboard', price: 39.99, image: 'keyBoard.avif' },
  ];
  
  // Cart and Orders Data
  let cart = []; // Stores items in the cart
  let orders = []; // Stores completed orders
  
  // Load Products into the Product Section
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

// Search Products based on User Input
function searchProducts() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchInput)
  );
  displayProducts(filteredProducts);
}

// Display Filtered Products
function displayProducts(filteredProducts) {
  productList.innerHTML = '';
  filteredProducts.forEach((product) => {
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
}


  
  // Add Item to Cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const existingItem = cart.find((item) => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if already in the cart
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new item to the cart
    }
  
    updateCart(); // Update the cart display
  }
  
  // Update the Cart Display
  function updateCart() {
    const cartList = document.getElementById('cartList');
    const totalItems = document.getElementById('totalItems');
    const totalPrice = document.getElementById('totalPrice');
  
    cartList.innerHTML = ''; // Clear the cart list display
    let total = 0;
  
    cart.forEach((item) => {
      const cartItem = document.createElement('li');
      cartItem.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      cartList.appendChild(cartItem);
      total += item.price * item.quantity; // Calculate total price
    });
  
    totalItems.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Total items
    totalPrice.textContent = total.toFixed(2); // Total price
  }
  
  // Checkout and Place Order
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    // Create a new order
    const orderId = `ORD-${Date.now()}`; // Unique order ID
    const orderItems = cart.map((item) => `${item.name} x ${item.quantity}`).join(', ');
    const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  
    // Save the order to the orders array
    orders.push({
      id: orderId,
      items: orderItems,
      total: orderTotal,
    });
  
    // Clear the cart and update the display
    cart = [];
    updateCart();
  
    // Update the order tracking section
    updateOrders();
  
    alert(`Your order (ID: ${orderId}) has been placed successfully!`);
  });
  
  // Update Orders Display
  function updateOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = ''; // Clear the order list display
  
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
  