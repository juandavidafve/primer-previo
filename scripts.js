function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  window.location.href = "../login";
}

async function fillHeader() {
  const headerUserElem = document.querySelector(".header__user");
  const id = localStorage.getItem("userId");

  if (headerUserElem && id) {
    const req = await fetch(`https://fakestoreapi.com/users/${id}`);
    const user = await req.json();

    headerUserElem.innerHTML = `Welcome ${user.name.firstname} ${user.name.lastname}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fillHeader();
});
