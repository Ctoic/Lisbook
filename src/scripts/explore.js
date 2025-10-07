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
            <div class="card-inner" data-book-id="${book.id}">
                <div class="card-front">
                    <div class="image-container">
                        ${createImageWithFallback(book.cover, book.title).outerHTML}
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">by ${book.author}</p>
                        <span class="book-genre">${book.genre || 'Unknown'}</span>
                        ${book.duration ? `<div class="book-duration"><i class="bi bi-clock"></i> ${book.duration}h</div>` : ''}
                    </div>
                </div>
                <div class="card-back">
                    <div class="book-description">
                        <h4>${book.title}</h4>
                        <p class="author-name">by ${book.author}</p>
                        <p class="description-text">${book.description}</p>
                        <div class="book-meta">
                            ${book.duration ? `<span class="meta-item"><i class="bi bi-clock"></i> ${book.duration}h</span>` : ''}
                            ${book.rating ? `<span class="meta-item"><i class="bi bi-star-fill"></i> ${book.rating}</span>` : ''}
                            ${book.narrator ? `<span class="meta-item"><i class="bi bi-mic"></i> ${book.narrator}</span>` : ''}
                        </div>
                        <div class="book-actions">
                            <button class="btn-read" onclick="readBook('${book.id}')">
                                <i class="bi bi-book-open"></i> Read
                            </button>
                            <button class="btn-listen" onclick="listenBook('${book.id}')">
                                <i class="bi bi-headphones"></i> Listen
                            </button>
                            <button class="btn-share" data-book-id="${book.id}">
                                <i class="bi bi-share"></i> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
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
            recCard.innerHTML = `
                <img src="${book.cover}" alt="${book.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="image-placeholder" style="display: none;">
                    <div class="placeholder-content">
                        <i class="bi bi-book" style="font-size: 2rem; color: #10b981; margin-bottom: 0.5rem;"></i>
                        <p style="font-size: 0.7rem; text-align: center; margin: 0;">${book.title}</p>
                    </div>
                </div>
                <h4>${book.title}</h4>
                <p>by ${book.author}</p>
            `;
            
            // Add click handler to navigate to book details
            recCard.addEventListener('click', () => {
                // Scroll to the book in the main grid
                const bookElement = document.querySelector(`[data-book-id="${book.id}"]`);
                if (bookElement) {
                    bookElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add a highlight effect
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
