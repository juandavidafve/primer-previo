function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let category = urlParams.get("category");

  if (category === "null") {
    category = null;
  }

  return {
    category,
  };
}

async function getResults() {
  const { category } = getUrlParams();

  let url = "https://fakestoreapi.com/products/";

  if (category) {
    url = `https://fakestoreapi.com/products/category/${category}`;
  }

  const resultsElem = document.querySelector("#results");
  const req = await fetch(url);
  const data = await req.json();

  resultsElem.innerHTML = data
    .map((product) => {
      return `
          <div class="card">
            <img class="card__img" src="${product.image}">
            <h2 class="card__title">${product.title}</h2>
            <p class="card__price">${product.price}</p>
            <button onclick="addProduct(${product.id})">Agregar</button>
          </div>
        `;
    })
    .join("");
}

async function addProduct(id) {
  try {
    const req = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 5,
        date: new Date(),
        products: [
          { productId: 5, quantity: 1 },
          { productId: 1, quantity: 5 },
        ],
      }),
    });

    const data = await req.json();

    alert("Producto Agregado");
  } catch (err) {
    alert("No se ha podido agregar el producto");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getResults();
});
