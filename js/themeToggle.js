const body = document.body;

export function initializeTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.classList.toggle("dark-theme", currentTheme === "dark");
  body.classList.toggle("light-theme", currentTheme === "light");
}

export function toggleTheme() {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");

  // Save theme in localStorage
  const newTheme = body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
}
