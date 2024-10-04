function logout() {
  localStorage.removeItem("user");
  window.location.href = "../login";
}

function fillHeader() {
  const headerUserElem = document.querySelector(".header__user");

  if (headerUserElem && localStorage.getItem("user")) {
    headerUserElem.innerHTML = `Welcome ${localStorage.getItem("user")}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fillHeader();
});
