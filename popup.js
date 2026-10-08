const BASE = "https://letterboxd.com";

const form = document.getElementById("user-form");
const usernameInput = document.getElementById("username");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;

  let response;
  try {
    response = await fetch(watchlistURL(username), { credentials: "include" });
  } catch {
    statusEl.textContent = "Couldn't reach Letterboxd. Check your connection.";
    return;
  }

  if (response.ok) {
    statusEl.textContent = "Watchlist found!";
    console.log(await response.text());
  } else if (response.status === 404) {
    statusEl.textContent = `No Letterboxd user named "${username}".`;
  } else if (response.status === 403 || response.status === 503) {
    statusEl.textContent = "Letterboxd blocked the request.";
  } else {
    statusEl.textContent = `Letterboxd returned ${response.status}.`;
  }
});

function watchlistURL(username) {
  return `${BASE}/${encodeURIComponent(username)}/watchlist/`;
}
