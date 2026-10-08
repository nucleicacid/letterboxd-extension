const form = document.getElementById("user-form");
const usernameInput = document.getElementById("username");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;

  console.log("Pick for", username);
});
