document.addEventListener('DOMContentLoaded', () => {
    // Try to load from local data first, then fallback to remote
    const loadBooksData = async () => {
        try {
            // First try to load local data
            const response = await fetch('./data/books.json');
            if (response.ok) {
                return await response.json();
            }
            throw new Error('Local data not found');
        } catch (error) {
            console.warn('Loading from local data failed, trying remote:', error);
            // Fallback to remote data
            try {
                const response = await fetch('https://raw.githubusercontent.com/Ctoic/Lisbook/refs/heads/main/data/books.json');
                return await response.json();
            } catch (remoteError) {
                console.error('Failed to load book data from both sources:', remoteError);
                return [];
            }
        }
    };

    const createBookCard = (book) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Create image element with error handling
        const createImageWithFallback = (src, alt) => {
            const img = document.createElement('img');
            img.alt = alt;
            img.loading = 'lazy';
            
            // Add loading placeholder
            img.style.backgroundColor = '#555';
            img.style.minHeight = '200px';
            img.style.display = 'flex';
            img.style.alignItems = 'center';
            img.style.justifyContent = 'center';
            
            // Handle image load error
            img.onerror = function() {
                console.warn(`Failed to load image: ${src}`);
                // Create a placeholder with book title
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.innerHTML = `
                    <div class="placeholder-content">
                        <i class="bi bi-book" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                        <p style="font-size: 0.9rem; text-align: center; margin: 0;">${alt}</p>
                    </div>
                `;
                this.parentNode.insertBefore(placeholder, this);
            };
            
            img.onload = function() {
                // Remove loading styles when image loads successfully
                this.style.backgroundColor = '';
                this.style.minHeight = '';
            };
            
            img.src = src;
            return img;
        };
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="image-container">
                        ${createImageWithFallback(book.cover, book.title).outerHTML}
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">by ${book.author}</p>
                        <span class="book-genre">${book.genre || 'Unknown'}</span>
                    </div>
                </div>
                <div class="card-back">
                    <div class="book-description">
                        <h4>${book.title}</h4>
                        <p class="author-name">by ${book.author}</p>
                        <p class="description-text">${book.description}</p>
                        <div class="book-actions">
                            <button class="btn-read" onclick="readBook('${book.id}')">
                                <i class="bi bi-book-open"></i> Read
                            </button>
                            <button class="btn-listen" onclick="listenBook('${book.id}')">
                                <i class="bi bi-headphones"></i> Listen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    };

    // Load and display books
    loadBooksData().then(data => {
        const bookContainer = document.getElementById('book-container');
        
        if (data.length === 0) {
            bookContainer.innerHTML = `
                <div class="no-books-message">
                    <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: #f59e0b;"></i>
                    <h3>No books available</h3>
                    <p>Unable to load book data. Please try again later.</p>
                </div>
            `;
            return;
        }
        
        data.forEach(book => {
            const card = createBookCard(book);
            bookContainer.appendChild(card);
        });
        
        // Re-apply error handling to dynamically created images
        const images = bookContainer.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('error', function() {
                    console.warn(`Failed to load image: ${this.src}`);
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    placeholder.innerHTML = `
                        <div class="placeholder-content">
                            <i class="bi bi-book" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                            <p style="font-size: 0.9rem; text-align: center; margin: 0;">${this.alt}</p>
                        </div>
                    `;
                    this.parentNode.replaceChild(placeholder, this);
                });
            }
        });
    });
});

// Placeholder functions for book actions
function readBook(bookId) {
    console.log(`Reading book with ID: ${bookId}`);
    // Add your read book logic here
    alert(`Opening book reader for book ID: ${bookId}`);
}

function listenBook(bookId) {
    console.log(`Listening to book with ID: ${bookId}`);
    // Add your audio book logic here
    alert(`Opening audio player for book ID: ${bookId}`);
}
