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
  const req = await fetch(`https://fakestoreapi.com/carts/id/${id}`);
  const cart = await req.json();
  const resultsElem = document.querySelector("#products");

  resultsElem.innerHTML = cart.products
    .map((product) => {
      return `
        <tr>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          <td><a href="?id=${product.price}">Ver</a></td>
        </tr>
      `;
    })
    .join("");
}

async function getCarts() {
  const resultsElem = document.querySelector("#carts");
  const req = await fetch("https://fakestoreapi.com/carts/user/2");
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
