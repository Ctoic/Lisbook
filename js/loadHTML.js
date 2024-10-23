// loadHTML.js
export const loadHTML = async (file, elementId) => {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error("Error loading file" + file);
    }
    const data = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = data;
    }
  } catch (error) {
    console.error(error);
  }
};
