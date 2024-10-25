// bookCard.js
export const createBookCard = (book) => {
  return `
    <div class="col" data-id="${book.id}">
      <div class="features-card border rounded-5 p-4 text-center">
        <div class="card-cover-container rounded-4 d-flex align-items-center border">
          <img
            src="${book.coverImage}"
            class="card-img-top img-fluid"
            alt="${book.title}"
          />
        </div>
        <div class="card-body mt-4">
          <h4 class="card-title">${book.title}</h4>
          <p class="card-text">${book.author}</p>
          <button class="btn-read-book btn btn-bd-primary btn-sm mt-4 px-5 rounded-5" data-id="${book.id}">Play Book</button>
        </div>
      </div>
    </div>
  `;
};
