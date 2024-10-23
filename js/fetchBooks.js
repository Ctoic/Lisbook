// fetchBooks.js
export const fetchBooks = async () => {
  try {
    const response = await fetch("./data/books.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des données des livres.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
