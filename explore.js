document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/Ctoic/Lisbook/refs/heads/main/data/books.json')
        .then(response => response.json())
        .then(data => {
            const bookContainer = document.getElementById('book-container');
            data.forEach(book => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="${book.cover}" alt="${book.title}">
                            <h3>${book.title}</h3>
                        </div>
                        <div class="card-back">
                            <p>${book.description}</p>
                        </div>
                    </div>
                `;
                bookContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading book data:', error));
});
