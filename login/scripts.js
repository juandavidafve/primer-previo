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

  const usersReq = await fetch("https://fakestoreapi.com/users");
  const users = await usersReq.json();

  const user = await users.find((usr) => {
    return usr.username == formData.get("user");
  });

  localStorage.setItem("userId", user.id);
  window.location.href = "../store";
});
