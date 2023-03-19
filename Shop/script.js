const catalog = document.getElementById('catalog');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cart = {};

fetch('https://dummyjson.com/products?limit=12') 
  .then(response => response.json()) // Преобразуем строку в JSON
  .then(data => {
    data.products.forEach(product => { // Обрабатываем каждый продукт из полученных данных
      const card = createProductCard(product); // Создаем элемент карточки продукта
      catalog.appendChild(card); // Добавляем созданную карточку продукта в каталог
   });
  });


 // создаем карточку товара на основе объекта продукта и возвращаем ее в виде элемента div.
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const title = document.createElement('h3');
  title.textContent = product.title;

  const image = document.createElement('img');
  image.src = product.images[0];
  image.width = 150;

  const price = document.createElement('p');
  price.textContent = `Цена: ${product.price} KZT`;

  const description = document.createElement('p');
  description.textContent = `Описание: ${product.description}`;

  const addButton = document.createElement('button');
  addButton.textContent = 'Добавить';
  addButton.onclick = () => addToCart(product);

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(price);
  card.appendChild(description);
  card.appendChild(addButton);

  return card;
}

// добавляем товара в корзину по кнопке 'Добавить', если товар в корзине, то просто увеличиваем его кол-во.
function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity++;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }

  renderCart();
}
// Удаляем товар с корзины
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
// Создаем в корзине добавленный товар и его свойства-действия, а именно кнопки "удалить" +/- количества, проводим расчет суммы на основании количества и цены товара, а также суммируем все суммы
function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  for (const productId in cart) {
    const item = cart[productId];
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.onclick = () => removeFromCart(productId);
    cartItem.appendChild(removeButton);

    const title = document.createElement('h4');
    title.textContent = item.title;
    cartItem.appendChild(title);
    
    const quantity = document.createElement('p');
    quantity.textContent = `Количество: ${item.quantity}`;
    cartItem.appendChild(quantity);
    
    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.onclick = () => changeQuantity(productId, 1);
    cartItem.appendChild(increaseButton);

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = () => changeQuantity(productId, -1);
    cartItem.appendChild(decreaseButton);

    const price = document.createElement('p');
    const itemTotal = item.price * item.quantity;
    price.textContent = `Сумма: ${itemTotal} KZT`;
    cartItem.appendChild(price);
 
    cartItems.appendChild(cartItem);
    total += itemTotal;
  }

  totalPrice.textContent = `Общая сумма: ${total} KZT`;
}
