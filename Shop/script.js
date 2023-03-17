const catalog = document.getElementById('catalog');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cart = {};

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = createProductCard(product);
      catalog.appendChild(card);
    });
  });

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const title = document.createElement('h3');
  title.textContent = product.title;

  const image = document.createElement('img');
  image.src = product.image_url;
  image.width = 150;

  const price = document.createElement('p');
  price.textContent = `Цена: ${product.price} ₽`;

  const addButton = document.createElement('button');
  addButton.textContent = 'Добавить';
  addButton.onclick = () => addToCart(product);

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(price);
  card.appendChild(addButton);

  return card;
}

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity++;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }

  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  renderCart();
}

function changeQuantity(productId, delta) {
  cart[productId].quantity += delta;

  if (cart[productId].quantity <= 0) {
    removeFromCart(productId);
  } else {
    renderCart();
  }
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  for (const productId in cart) {
    const item = cart[productId];
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const title = document.createElement('h4');
    title.textContent = item.title;
    cartItem.appendChild(title);

    const quantity = document.createElement('p');
    quantity.textContent = `Количество: ${item.quantity}`;
    cartItem.appendChild(quantity);

    const price = document.createElement('p');
    const itemTotal = item.price * item.quantity;
    price.textContent = `Сумма: ${itemTotal} ₽`;
    cartItem.appendChild(price);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.onclick = () => removeFromCart(productId);
    cartItem.appendChild(removeButton);

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.onclick = () => changeQuantity(productId, 1);
    cartItem.appendChild(increaseButton);

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = () => changeQuantity(productId, -1);
    cartItem.appendChild(decreaseButton);

    cartItems.appendChild(cartItem);
    total += itemTotal;
  }

  totalPrice.textContent = `Общая сумма: ${total} ₽`;
}
