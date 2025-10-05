/**
 * Book Cover Scanner - Frontend Implementation
 * 
 * This is a prototype that simulates book cover scanning.
 * Backend integration points are marked with TODO comments.
 */

// Mock book database for demo purposes
const MOCK_BOOKS = [
    {
        id: 1,
        title: "Pale Blue Dot",
        author: "Carl Sagan",
        cover: "./Images/cs.jpg",
        description: "A vision of the human future in space. Carl Sagan's exploration of our place in the universe.",
        audioPreview: "./audio/pale-blue-dot-preview.mp3",
        pageUrl: "./pbd.html"
    },
    {
        id: 2,
        title: "Frankenstein",
        author: "Mary Shelley",
        cover: "./Images/Frankestine.jpg",
        description: "The classic tale of science, ambition, and the consequences of playing God.",
        audioPreview: "./audio/frankenstein-preview.mp3",
        pageUrl: "./fs.html"
    },
    {
        id: 3,
        title: "Adventures of Sherlock Holmes",
        author: "Sir Arthur Conan Doyle",
        cover: "./Images/Adventures_Sherlock_Holmes.jpg",
        description: "Join the world's greatest detective in solving mysterious cases.",
        audioPreview: "./audio/sherlock-preview.mp3",
        pageUrl: "./adventures.html"
    },
    {
        id: 4,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        cover: "./Images/Sapiens.jpg",
        description: "A groundbreaking narrative of humanity's creation and evolution.",
        audioPreview: "./audio/sapiens-preview.mp3",
        pageUrl: "./rdpd.html"
    }
];

// State management
let cameraStream = null;
let capturedImageData = null;

// DOM Elements
const states = {
    initial: document.getElementById('initial-state'),
    camera: document.getElementById('camera-state'),
    processing: document.getElementById('processing-state'),
    result: document.getElementById('result-state'),
    error: document.getElementById('error-state')
};

const buttons = {
    startScan: document.getElementById('start-scan-btn'),
    capture: document.getElementById('capture-btn'),
    cancelScan: document.getElementById('cancel-scan-btn'),
    scanAgain: document.getElementById('scan-again-btn'),
    retryCamera: document.getElementById('retry-camera-btn'),
    backHome: document.getElementById('back-home-btn'),
    playPreview: document.getElementById('play-preview-btn'),
    viewBook: document.getElementById('view-book-btn')
};

const cameraPreview = document.getElementById('camera-preview');
const previewAudio = document.getElementById('preview-audio');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('📷 Book Scanner initialized');
    setupEventListeners();
});

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    buttons.startScan.addEventListener('click', startCamera);
    buttons.capture.addEventListener('click', captureImage);
    buttons.cancelScan.addEventListener('click', stopCamera);
    buttons.scanAgain.addEventListener('click', resetScanner);
    buttons.retryCamera.addEventListener('click', startCamera);
    buttons.backHome.addEventListener('click', () => window.location.href = './index.html');
    buttons.playPreview.addEventListener('click', playAudioPreview);
    buttons.viewBook.addEventListener('click', viewFullBook);
}

/**
 * Switch between different scanner states
 */
function switchState(stateName) {
    Object.values(states).forEach(state => state.classList.remove('active'));
    if (states[stateName]) {
        states[stateName].classList.add('active');
    }
}

/**
 * Start camera access
 */
async function startCamera() {
    console.log('📷 Requesting camera access...');
    
    try {
        // Request camera permission
        const constraints = {
            video: {
                facingMode: 'environment', // Use back camera on mobile
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };

        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Set video source
        cameraPreview.srcObject = cameraStream;
        
        // Switch to camera state
        switchState('camera');
        
        console.log('✓ Camera access granted');
        
    } catch (error) {
        console.error('❌ Camera access denied:', error);
        handleCameraError(error);
    }
}

/**
 * Handle camera access errors
 */
function handleCameraError(error) {
    console.error('Camera error:', error.name, error.message);
    
    // Show error state
    switchState('error');
    
    // Log specific error types
    if (error.name === 'NotAllowedError') {
        console.log('User denied camera permission');
    } else if (error.name === 'NotFoundError') {
        console.log('No camera found on device');
    } else if (error.name === 'NotReadableError') {
        console.log('Camera is already in use');
    }
}

/**
 * Stop camera stream
 */
function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        console.log('📷 Camera stopped');
    }
    
    // Return to initial state
    switchState('initial');
}

/**
 * Capture image from camera
 */
function captureImage() {
    console.log('📸 Capturing image...');
    
    // Create canvas to capture frame
    const canvas = document.createElement('canvas');
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(cameraPreview, 0, 0);
    
    // Get image data
    capturedImageData = canvas.toDataURL('image/jpeg', 0.8);
    
    console.log('✓ Image captured');
    
    // Stop camera
    stopCamera();
    
    // Process the image
    processImage(capturedImageData);
}

/**
 * Process captured image (mock implementation)
 * 
 * TODO: Backend Integration Point
 * This is where you would send the image to your backend API
 * for actual image recognition and book matching.
 * 
 * Example API call:
 * 
 * async function processImage(imageData) {
 *     const response = await fetch('https://your-api.com/scan-book', {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({ image: imageData })
 *     });
 *     const result = await response.json();
 *     displayResult(result.book);
 * }
 * 
 * Recommended APIs for backend:
 * - Google Cloud Vision API (for OCR and image recognition)
 * - Amazon Rekognition
 * - Custom ML model (TensorFlow, PyTorch)
 * - OpenLibrary API (for book metadata)
 * - Google Books API (for book information)
 */
function processImage(imageData) {
    console.log('🔍 Processing image...');
    console.log('📦 Image data size:', (imageData.length / 1024).toFixed(2), 'KB');
    
    // Show processing state
    switchState('processing');
    
    // TODO: Replace this mock delay with actual API call
    // Simulate API processing time
    setTimeout(() => {
        // Mock: Randomly select a book from our database
        const randomBook = MOCK_BOOKS[Math.floor(Math.random() * MOCK_BOOKS.length)];
        
        console.log('✓ Book identified:', randomBook.title);
        
        // Display result
        displayResult(randomBook);
    }, 2000); // 2 second delay to simulate processing
}

/**
 * Display scan result
 */
function displayResult(book) {
    console.log('📚 Displaying result:', book.title);
    
    // Populate result card
    document.getElementById('result-cover').src = book.cover;
    document.getElementById('result-title').textContent = book.title;
    document.getElementById('result-author').textContent = `By ${book.author}`;
    document.getElementById('result-description').textContent = book.description;
    
    // Store book data for later use
    buttons.playPreview.dataset.audioUrl = book.audioPreview;
    buttons.viewBook.dataset.pageUrl = book.pageUrl;
    
    // Show result state
    switchState('result');
}

/**
 * Play audio preview
 */
function playAudioPreview() {
    const audioUrl = buttons.playPreview.dataset.audioUrl;
    
    if (audioUrl) {
        console.log('🎵 Playing preview:', audioUrl);
        
        // In a real implementation, you would load and play the actual audio
        // For now, we'll show a message
        alert('Audio preview would play here!\n\nIn production, this would play: ' + audioUrl);
        
        // TODO: Implement actual audio playback
        // previewAudio.src = audioUrl;
        // previewAudio.play();
    } else {
        alert('No audio preview available for this book.');
    }
}

/**
 * View full book page
 */
function viewFullBook() {
    const pageUrl = buttons.viewBook.dataset.pageUrl;
    
    if (pageUrl) {
        console.log('📖 Navigating to:', pageUrl);
        window.location.href = pageUrl;
    }
}

/**
 * Reset scanner to initial state
 */
function resetScanner() {
    console.log('🔄 Resetting scanner...');
    
    // Clear captured data
    capturedImageData = null;
    
    // Stop camera if running
    stopCamera();
    
    // Return to initial state
    switchState('initial');
}

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
});

/**
 * BACKEND INTEGRATION GUIDE
 * ========================
 * 
 * When you're ready to add real image recognition:
 * 
 * 1. IMAGE UPLOAD
 *    - Send capturedImageData to your backend
 *    - Use FormData or base64 encoding
 *    - Consider image compression to reduce upload size
 * 
 * 2. IMAGE RECOGNITION APIs
 *    
 *    Option A: Google Cloud Vision API
 *    - Detects text (OCR) from book covers
 *    - Identifies book title and author
 *    - https://cloud.google.com/vision
 *    
 *    Option B: Custom ML Model
 *    - Train a model on book cover dataset
 *    - Use TensorFlow.js for client-side processing
 *    - Or deploy model on backend (Python/Flask)
 *    
 *    Option C: Barcode/ISBN Scanner
 *    - Use ZXing or QuaggaJS for barcode detection
 *    - Look up book by ISBN in database
 * 
 * 3. BOOK MATCHING
 *    - Query your database with recognized title/author
 *    - Use fuzzy matching for better results
 *    - Fall back to external APIs (Google Books, OpenLibrary)
 * 
 * 4. EXAMPLE BACKEND ENDPOINT
 * 
 *    POST /api/scan-book
 *    Request: { "image": "base64_encoded_image" }
 *    Response: {
 *        "success": true,
 *        "book": {
 *            "id": 1,
 *            "title": "Book Title",
 *            "author": "Author Name",
 *            "cover": "url",
 *            "audioUrl": "url"
 *        }
 *    }
 * 
 * 5. ERROR HANDLING
 *    - No match found: Show "Book not found" message
 *    - Multiple matches: Show selection UI
 *    - API errors: Show retry option
 */

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startCamera,
        captureImage,
        processImage,
        displayResult
    };
}


// --- Cursor Smooth Animation ---
// Initialize cursor circles animation
document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll(".circle");
    const coords = { x: 0, y: 0 };
    
    // Set initial position to center of screen
    coords.x = window.innerWidth / 2;
    coords.y = window.innerHeight / 2;

    // Green gradient colors for the cursor trail
    const colors = [
        "#a7e078", "#9dd36c", "#94c760", "#8abc55", "#80b14b", "#76a640", 
        "#6cbf58", "#62a24d", "#579643", "#4e8a3b", "#458132", "#3b752a", 
        "#336824", "#2c9137", "#23802c", "#1f7628", "#1b6c25", "#121212", 
        "#0f0f0f", "#2b2b2b", "#1e1e1e", "#1a1a1a",
    ];

    // Initialize each circle with color and position
    circles.forEach((circle, index) => {
        circle.style.backgroundColor = colors[index % colors.length];
        circle.x = 0;
        circle.y = 0;
    });

    // Track mouse movement
    document.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    // Animate circles to follow cursor
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = `${x - 12}px`;
            circle.style.top = `${y - 12}px`;

            // Scale circles from largest to smallest
            circle.style.transform = `scale(${
                (circles.length - index) / circles.length
            })`;

            // Create trailing effect
            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.2;
            y += (nextCircle.y - y) * 0.2;

            circle.x = x;
            circle.y = y;
        });

        requestAnimationFrame(animateCircles);
    }

    // Start animation if circles exist
    if (circles.length > 0) {
        animateCircles();
        console.log('✓ Custom cursor animation initialized');
    }
});
// --- End Cursor Smooth Animation ---
