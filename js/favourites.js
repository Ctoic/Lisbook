const FAV_BOOKS_KEY = "favouriteBooks";

export function loadFavourites(currentBookId, allBooksList, favBooksList) {
  const favs = localStorage.getItem(FAV_BOOKS_KEY);
  const favsList = JSON.parse(favs) || [];

  favBooksList.innerHTML = "";

  if (!favs || favsList.length === 0) {
    document
      .getElementById("fav-empty-container")
      .classList.remove("invisible");
    return;
  } else {
    document.getElementById("fav-empty-container").classList.add("invisible");
  }

  if (favsList.includes(currentBookId)) {
    toggleHeart(true);
  }

  allBooksList.forEach((book) => {
    if (favsList.includes(book.id)) {
      renderBookItem(book, favBooksList);
    }
  });
}

export function markFavourite(id, addItem = null) {
  let favsList = JSON.parse(localStorage.getItem(FAV_BOOKS_KEY)) || [];

  if (addItem === null) {
    addItem = !favsList.includes(id);
  }

  if (addItem) {
    favsList.push(id);
  } else {
    favsList = favsList.filter((favId) => favId !== id);
  }

  localStorage.setItem(FAV_BOOKS_KEY, JSON.stringify(favsList));
}

export function toggleHeart(activate = null) {
  const favouriteButton = document.getElementById("favourite-button");

  if (activate === null) {
    activate = favouriteButton.classList.contains("bi-heart");
  }

  if (activate) {
    favouriteButton.classList.remove("bi-heart");
    favouriteButton.classList.add("bi-heart-fill");
  } else {
    favouriteButton.classList.add("bi-heart");
    favouriteButton.classList.remove("bi-heart-fill");
  }

  return activate;
}

export function initializeFavouriteButton(
  currentBookId,
  currentBook,
  favBooksList,
  allBooksList
) {
  const favouriteButton = document.getElementById("favourite-button");
  if (favouriteButton) {
    favouriteButton.addEventListener("click", () => {
      const activated = toggleHeart();
      markFavourite(currentBookId, activated);

      if (activated) {
        document
          .getElementById("fav-empty-container")
          .classList.add("invisible");
        renderBookItem(currentBook, favBooksList);
      } else {
        loadFavourites(currentBookId, allBooksList, favBooksList);
      }
    });
  }
}
