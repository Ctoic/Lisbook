document.addEventListener('DOMContentLoaded', () => {
    // Global variables for search and filter functionality
    let allBooks = [];
    let filteredBooks = [];
    let currentFilters = {
        search: '',
        genre: '',
        duration: '',
        sort: 'title'
    };

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

    // Add mock data for enhanced functionality
    const enhanceBookData = (books) => {
        return books.map((book, index) => ({
            ...book,
            // Add mock duration data (in hours)
            duration: Math.floor(Math.random() * 12) + 2, // 2-14 hours
            // Add mock popularity score
            popularity: Math.floor(Math.random() * 100) + 1,
            // Add mock release date (last 2 years)
            releaseDate: new Date(2022 + Math.random() * 2, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
            // Add mock rating
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
            // Add mock narrator
            narrator: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'][Math.floor(Math.random() * 5)]
        }));
    };

    // Share functionality
    const shareModal = document.getElementById('shareModal');
    const closeShareModal = document.getElementById('closeShareModal');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareLink = document.getElementById('shareLink');
    const toast = document.getElementById('toast');

    function openShareModal(book) {
        const shareBookCover = document.getElementById('shareBookCover');
        const shareBookTitle = document.getElementById('shareBookTitle');
        const shareBookAuthor = document.getElementById('shareBookAuthor');
        const shareBookTagline = document.getElementById('shareBookTagline');
        
        // Set book details in the modal with better defaults and error handling
        const coverUrl = book.cover || book.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover';
        shareBookCover.src = coverUrl;
        shareBookCover.onerror = function() {
            this.src = 'https://via.placeholder.com/300x400?text=No+Cover';
        };
        
        // Set title and author with proper formatting
        shareBookTitle.textContent = book.title || 'Audiobook Title';
        shareBookAuthor.textContent = book.author ? `by ${book.author}` : 'by Unknown Author';
        
        // Generate a dynamic tagline if not provided
        const genre = book.genre || 'adventure';
        const defaultTaglines = [
            `A ${genre} journey that will keep you listening for hours`,
            `Immerse yourself in this ${genre} masterpiece`,
            `Experience the ${genre} story everyone's talking about`,
            `The ${genre} audiobook you've been waiting for`
        ];
        const randomTagline = defaultTaglines[Math.floor(Math.random() * defaultTaglines.length)];
        
        // Use the book's tagline, first 50 chars of description, or a generated one
        shareBookTagline.textContent = book.tagline || 
                                     (book.description ? 
                                         (book.description.length > 50 ? 
                                             book.description.substring(0, 80) + '...' : 
                                             book.description) : 
                                         randomTagline);
        
        // Set the share link with book ID if available, otherwise use a default
        const bookId = book.id || '123';
        const shareUrl = `https://audiobook.app/book/${bookId}`;
        shareLink.value = shareUrl;
        
        // Show the modal
        shareModal.classList.remove('hidden');
        
        // Log for backend integration reference
        console.log('Sharing book:', { 
            id: bookId, 
            title: book.title,
            author: book.author,
            // Add other fields that would come from backend
            coverUrl: coverUrl,
            shareUrl: shareUrl
        });
    }

    // Close modal when clicking the close button or outside the modal
    if (closeShareModal) {
        closeShareModal.addEventListener('click', () => {
            shareModal.classList.add('hidden');
        });
    }

    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            shareModal.classList.add('hidden');
        }
    });

    // Copy link to clipboard
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(shareLink.value);
                showToast();
            } catch (err) {
                // Fallback for browsers that don't support clipboard API
                shareLink.select();
                document.execCommand('copy');
                showToast();
            }
        });
    }

    // Show toast notification
    function showToast() {
        if (!toast) return;
        
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !shareModal.classList.contains('hidden')) {
            shareModal.classList.add('hidden');
        }
    });

    // Search and Filter Functionality
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const genreFilter = document.getElementById('genreFilter');
    const durationFilter = document.getElementById('durationFilter');
    const sortFilter = document.getElementById('sortFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const resultsCount = document.getElementById('resultsCount');

    // Initialize genre filter options
    const populateGenreFilter = (books) => {
        const genres = [...new Set(books.map(book => book.genre).filter(Boolean))];
        genres.sort();
        
        genreFilter.innerHTML = '<option value="">All Genres</option>';
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    };

    // Search and filter functions
    const searchBooks = (books, searchTerm) => {
        if (!searchTerm) return books;
        
        const term = searchTerm.toLowerCase();
        return books.filter(book => 
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            book.genre.toLowerCase().includes(term) ||
            (book.description && book.description.toLowerCase().includes(term))
        );
    };

    const filterByGenre = (books, genre) => {
        if (!genre) return books;
        return books.filter(book => book.genre === genre);
    };

    const filterByDuration = (books, duration) => {
        if (!duration) return books;
        
        return books.filter(book => {
            switch (duration) {
                case 'short':
                    return book.duration < 4;
                case 'medium':
                    return book.duration >= 4 && book.duration <= 8;
                case 'long':
                    return book.duration > 8;
                default:
                    return true;
            }
        });
    };

    const sortBooks = (books, sortBy) => {
        const sortedBooks = [...books];
        
        switch (sortBy) {
            case 'title':
                return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            case 'author':
                return sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
            case 'genre':
                return sortedBooks.sort((a, b) => a.genre.localeCompare(b.genre));
            case 'popularity':
                return sortedBooks.sort((a, b) => b.popularity - a.popularity);
            case 'newest':
                return sortedBooks.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            default:
                return sortedBooks;
        }
    };

    // Apply all filters
    const applyFilters = () => {
        let result = [...allBooks];
        
        // Apply search
        result = searchBooks(result, currentFilters.search);
        
        // Apply genre filter
        result = filterByGenre(result, currentFilters.genre);
        
        // Apply duration filter
        result = filterByDuration(result, currentFilters.duration);
        
        // Apply sorting
        result = sortBooks(result, currentFilters.sort);
        
        filteredBooks = result;
        return result;
    };

    // Update display
    const updateDisplay = () => {
        const books = applyFilters();
        const bookContainer = document.getElementById('book-container');
        
        // Clear existing books
        bookContainer.innerHTML = '';
        
        if (books.length === 0) {
            bookContainer.innerHTML = `
                <div class="no-books-message">
                    <i class="bi bi-search" style="font-size: 3rem; color: #f59e0b;"></i>
                    <h3>No books found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
        } else {
            books.forEach(book => {
                const card = createBookCard(book);
                bookContainer.appendChild(card);
                
                // Add click handler for the share button
                const shareBtn = card.querySelector('.btn-share');
                if (shareBtn) {
                    shareBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openShareModal(book);
                    });
                }
            });
        }
        
        // Update results count
        resultsCount.textContent = `Showing ${books.length} of ${allBooks.length} books`;
        
        // Show/hide recommendations based on search
        const recommendationsSection = document.getElementById('recommendationsSection');
        if (currentFilters.search || currentFilters.genre || currentFilters.duration) {
            recommendationsSection.classList.add('hidden');
        } else {
            recommendationsSection.classList.remove('hidden');
        }
    };

    // Event listeners for search and filters
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            clearSearchBtn.classList.toggle('hidden', !e.target.value);
            updateDisplay();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentFilters.search = '';
            clearSearchBtn.classList.add('hidden');
            updateDisplay();
        });
    }

    if (genreFilter) {
        genreFilter.addEventListener('change', (e) => {
            currentFilters.genre = e.target.value;
            updateDisplay();
        });
    }

    if (durationFilter) {
        durationFilter.addEventListener('change', (e) => {
            currentFilters.duration = e.target.value;
            updateDisplay();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            updateDisplay();
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset all filters
            currentFilters = {
                search: '',
                genre: '',
                duration: '',
                sort: 'title'
            };
            
            // Reset UI elements
            searchInput.value = '';
            clearSearchBtn.classList.add('hidden');
            genreFilter.value = '';
            durationFilter.value = '';
            sortFilter.value = 'title';
            
            updateDisplay();
        });
    }

    const createPlaceholderElement = (text, { iconSize = '3rem', textSize = '0.9rem', iconMargin = '1rem' } = {}) => {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';

        const placeholderContent = document.createElement('div');
        placeholderContent.className = 'placeholder-content';

        const icon = document.createElement('i');
        icon.className = 'bi bi-book';
        icon.style.fontSize = iconSize;
        icon.style.color = '#10b981';
        icon.style.marginBottom = iconMargin;

        const label = document.createElement('p');
        label.style.fontSize = textSize;
        label.style.textAlign = 'center';
        label.style.margin = '0';
        label.textContent = text || 'Audiobook';

        placeholderContent.appendChild(icon);
        placeholderContent.appendChild(label);
        placeholder.appendChild(placeholderContent);

        return placeholder;
    };

    const createImageWithFallback = (src, alt, placeholderOptions) => {
        const img = document.createElement('img');
        img.alt = alt || 'Audiobook cover';
        img.loading = 'lazy';

        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.objectPosition = 'center';
        img.style.display = 'block';

        img.onerror = function () {
            console.warn(`Failed to load image: ${src}`);
            if (this.parentNode) {
                const placeholder = createPlaceholderElement(alt, placeholderOptions);
                this.parentNode.replaceChild(placeholder, this);
            }
        };

        img.onload = function () {
            this.style.display = 'block';
        };

        if (src) {
            img.src = src;
        } else {
            // Trigger fallback immediately when no source provided
            const placeholder = createPlaceholderElement(alt, placeholderOptions);
            return placeholder;
        }

        return img;
    };

    const createBookCard = (book) => {
        const card = document.createElement('div');
        card.className = 'card';

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        if (book.id) {
            cardInner.dataset.bookId = book.id;
        }

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const coverElement = createImageWithFallback(book.cover, book.title);
        imageContainer.appendChild(coverElement);

        const bookInfo = document.createElement('div');
        bookInfo.className = 'book-info';

        const titleElement = document.createElement('h3');
        titleElement.className = 'book-title';
        titleElement.textContent = book.title || 'Untitled audiobook';

        const authorElement = document.createElement('p');
        authorElement.className = 'book-author';
        authorElement.textContent = book.author ? `by ${book.author}` : 'Author unknown';

        const genreElement = document.createElement('span');
        genreElement.className = 'book-genre';
        genreElement.textContent = book.genre || 'Unknown';

        bookInfo.appendChild(titleElement);
        bookInfo.appendChild(authorElement);
        bookInfo.appendChild(genreElement);

        if (book.duration) {
            const durationElement = document.createElement('div');
            durationElement.className = 'book-duration';

            const durationIcon = document.createElement('i');
            durationIcon.className = 'bi bi-clock';

            durationElement.appendChild(durationIcon);
            durationElement.appendChild(document.createTextNode(` ${book.duration}h`));
            bookInfo.appendChild(durationElement);
        }

        cardFront.appendChild(imageContainer);
        cardFront.appendChild(bookInfo);

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';

        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'book-description';

        const backTitle = document.createElement('h4');
        backTitle.textContent = book.title || 'Untitled audiobook';

        const authorName = document.createElement('p');
        authorName.className = 'author-name';
        authorName.textContent = book.author ? `by ${book.author}` : 'Author unknown';

        const descriptionText = document.createElement('p');
        descriptionText.className = 'description-text';
        descriptionText.textContent = book.description || 'No description available.';

        const metaContainer = document.createElement('div');
        metaContainer.className = 'book-meta';

        if (book.duration) {
            const durationMeta = document.createElement('span');
            durationMeta.className = 'meta-item';

            const durationMetaIcon = document.createElement('i');
            durationMetaIcon.className = 'bi bi-clock';

            durationMeta.appendChild(durationMetaIcon);
            durationMeta.appendChild(document.createTextNode(` ${book.duration}h`));
            metaContainer.appendChild(durationMeta);
        }

        if (book.rating) {
            const ratingMeta = document.createElement('span');
            ratingMeta.className = 'meta-item';

            const ratingIcon = document.createElement('i');
            ratingIcon.className = 'bi bi-star-fill';

            ratingMeta.appendChild(ratingIcon);
            ratingMeta.appendChild(document.createTextNode(` ${book.rating}`));
            metaContainer.appendChild(ratingMeta);
        }

        if (book.narrator) {
            const narratorMeta = document.createElement('span');
            narratorMeta.className = 'meta-item';

            const narratorIcon = document.createElement('i');
            narratorIcon.className = 'bi bi-mic';

            narratorMeta.appendChild(narratorIcon);
            narratorMeta.appendChild(document.createTextNode(` ${book.narrator}`));
            metaContainer.appendChild(narratorMeta);
        }

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'book-actions';

        const createActionButton = (className, iconClass, text, handler) => {
            const button = document.createElement('button');
            button.className = className;
            button.type = 'button';
            if (typeof handler === 'function') {
                button.addEventListener('click', handler);
            }

            const icon = document.createElement('i');
            icon.className = iconClass;

            button.appendChild(icon);
            button.appendChild(document.createTextNode(` ${text}`));
            return button;
        };

        const readButton = createActionButton(
            'btn-read',
            'bi bi-book-open',
            'Read',
            book.id ? () => readBook(book.id) : undefined
        );
        const listenButton = createActionButton(
            'btn-listen',
            'bi bi-headphones',
            'Listen',
            book.id ? () => listenBook(book.id) : undefined
        );
        const shareButton = createActionButton('btn-share', 'bi bi-share', 'Share');
        if (book.id) {
            shareButton.dataset.bookId = book.id;
        }

        actionsContainer.appendChild(readButton);
        actionsContainer.appendChild(listenButton);
        actionsContainer.appendChild(shareButton);

        descriptionContainer.appendChild(backTitle);
        descriptionContainer.appendChild(authorName);
        descriptionContainer.appendChild(descriptionText);
        descriptionContainer.appendChild(metaContainer);
        descriptionContainer.appendChild(actionsContainer);

        cardBack.appendChild(descriptionContainer);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        return card;
    };

    // Recommendations functionality
    const generateRecommendations = (books) => {
        // Simple recommendation algorithm based on genre and popularity
        const recommendations = [];
        const genreCounts = {};
        
        // Count books by genre
        books.forEach(book => {
            genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
        });
        
        // Find the most popular genres
        const popularGenres = Object.entries(genreCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([genre]) => genre);
        
        // Get top books from popular genres
        popularGenres.forEach(genre => {
            const genreBooks = books
                .filter(book => book.genre === genre)
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 2);
            recommendations.push(...genreBooks);
        });
        
        // Remove duplicates and limit to 6 recommendations
        const uniqueRecommendations = recommendations
            .filter((book, index, self) => 
                index === self.findIndex(b => b.id === book.id)
            )
            .slice(0, 6);
        
        return uniqueRecommendations;
    };

    const displayRecommendations = (recommendations) => {
        const recommendationsContainer = document.getElementById('recommendationsContainer');
        
        if (recommendations.length === 0) {
            recommendationsContainer.innerHTML = `
                <div class="text-center text-gray-400 col-span-full">
                    <i class="bi bi-lightbulb text-4xl mb-4"></i>
                    <p>No recommendations available at the moment.</p>
                </div>
            `;
            return;
        }
        
        recommendationsContainer.innerHTML = '';
        
        recommendations.forEach(book => {
            const recCard = document.createElement('div');
            recCard.className = 'recommendation-card';

            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'recommendation-image';

            const recommendationImage = createImageWithFallback(
                book.cover,
                book.title,
                { iconSize: '2rem', textSize: '0.7rem', iconMargin: '0.5rem' }
            );

            imageWrapper.appendChild(recommendationImage);
            recCard.appendChild(imageWrapper);

            const titleElement = document.createElement('h4');
            titleElement.textContent = book.title || 'Untitled audiobook';

            const authorElement = document.createElement('p');
            authorElement.textContent = book.author ? `by ${book.author}` : 'Author unknown';

            recCard.appendChild(titleElement);
            recCard.appendChild(authorElement);
            
            recCard.addEventListener('click', () => {
                const bookElement = document.querySelector(`[data-book-id="${book.id}"]`);
                if (bookElement) {
                    bookElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    bookElement.style.animation = 'pulse 2s ease-in-out';
                    setTimeout(() => {
                        bookElement.style.animation = '';
                    }, 2000);
                }
            });
            
            recommendationsContainer.appendChild(recCard);
        });
    };

    // Load and display books
    loadBooksData().then(data => {
        if (data.length === 0) {
            const bookContainer = document.getElementById('book-container');
            bookContainer.innerHTML = `
                <div class="no-books-message">
                    <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: #f59e0b;"></i>
                    <h3>No books available</h3>
                    <p>Unable to load book data. Please try again later.</p>
                </div>
            `;
            return;
        }
        
        // Enhance book data with mock information
        allBooks = enhanceBookData(data);
        
        // Populate genre filter
        populateGenreFilter(allBooks);
        
        // Generate and display recommendations
        const recommendations = generateRecommendations(allBooks);
        displayRecommendations(recommendations);
        
        // Initial display
        updateDisplay();
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
