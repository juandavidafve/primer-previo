const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);

  const req = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("user"),
      password: formData.get("pass"),
    }),
  });

  if (req.status !== 200) {
    alert(await req.text());
    return;
  }

  const data = await req.json();
  console.log(data);

  localStorage.setItem("user", formData.get("user"));
  window.location.href = "../store";
});
