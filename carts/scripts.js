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

async function getCart(id) {
  const req = await fetch(`https://fakestoreapi.com/carts/${id}`);
  const cart = await req.json();
  const resultsElem = document.querySelector("#products");

  const data = await Promise.all(
    cart.products.map(async (product) => {
      return await getProduct(product.productId, product.quantity);
    })
  );

  resultsElem.innerHTML = data.join("");
}

async function getProduct(id, quantity) {
  const req = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await req.json();

  return `
        <tr>
          <td>${product.title}</td>
          <td>${quantity}</td>
          <td>${product.price}</td>
          <td>${quantity * product.price}</td>
        </tr>
      `;
}

async function getCarts() {
  const resultsElem = document.querySelector("#carts");
  const req = await fetch("https://fakestoreapi.com/carts/");
  const data = await req.json();

  resultsElem.innerHTML = data
    .map((cart) => {
      return `
          <tr>
            <td>${cart.id}</td>
            <td>${cart.date}</td>
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
    getCart(id);
  } else {
    document.querySelector("#cart-details").classList.add("hidden");
    getCarts();
  }
});
