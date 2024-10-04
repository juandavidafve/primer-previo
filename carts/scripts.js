function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let id = urlParams.get("id");

  if (id === "null") {
    id = null;
  }

  return {
    id,
  };
}

async function printCartDetails(id) {
  const cart = await getCartDetails(id);

  const productsTable = document.querySelector("#cart-products");
  productsTable.innerHTML = cart.products
    .map((product) => {
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.subtotal}</td>
      </tr>
    `;
    })
    .join("");

  const cartDateElem = document.querySelector("#cart-date");
  cartDateElem.value = new Date(cart.date).toLocaleDateString();

  const cartNumberElem = document.querySelector("#cart-number");
  cartNumberElem.value = cart.id;

  const cartUserElem = document.querySelector("#cart-user");
  cartUserElem.value = `${cart.user.name.firstname} ${cart.user.name.lastname}`;

  const cartTotalElem = document.querySelector("#cart-total");
  cartTotalElem.value = cart.total;

  console.log(cart);
}

async function getProductDetails(id) {
  const req = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await req.json();

  return product;
}

async function getUserDetails(id) {
  const req = await fetch(`https://fakestoreapi.com/users/${id}`);
  const user = await req.json();

  return user;
}

async function getCartDetails(id) {
  const req = await fetch(`https://fakestoreapi.com/carts/${id}`);
  const cart = await req.json();

  let total = 0;
  const products = await Promise.all(
    cart.products.map(async (product) => {
      const productDetails = await getProductDetails(product.productId);
      const subtotal = product.quantity * productDetails.price;
      total += subtotal;

      return {
        quantity: product.quantity,
        subtotal,
        ...productDetails,
      };
    })
  );

  const user = await getUserDetails(cart.userId);

  return {
    ...cart,
    user,
    total,
    products,
  };
}

async function getAllCarts() {
  const req = await fetch("https://fakestoreapi.com/carts/");
  const data = await req.json();

  return data;
}

async function printAllCarts() {
  const resultsElem = document.querySelector("#carts");
  const carts = await getAllCarts();

  resultsElem.innerHTML = carts
    .map((cart) => {
      return `
        <tr>
          <td>${cart.id}</td>
          <td>${new Date(cart.date).toLocaleDateString()}</td>
          <td><a href="?id=${cart.id}">Ver</a></td>
        </tr>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const { id } = getUrlParams();

  if (id) {
    document.querySelector("#all-carts").classList.add("hidden");
    printCartDetails(id);
  } else {
    document.querySelector("#cart-details").classList.add("hidden");
    printAllCarts();
  }
});
