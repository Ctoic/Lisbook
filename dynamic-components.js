// Dynamic Components Loader
// This file handles loading navbar and footer components dynamically across all pages

document.addEventListener("DOMContentLoaded", function () {
    // Load navbar
    loadNavbar();
    
    // Load footer
    loadFooter();
    
    // Initialize theme
    initializeTheme();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize signup button
    initializeSignupButton();
    
    // Initialize newsletter form
    initializeNewsletterForm();
});

// Function to load navbar
function loadNavbar() {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    
    if (navbarPlaceholder) {
        // Create navbar HTML directly to avoid CORS issues with file:// protocol
        const navbarHTML = `
<!-- Navbar -->
<header class="sticky top-0 z-20 bg-gray-800 shadow-lg border-b border-gray-700">
  <nav class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <a class="logo-text font-bold flex items-center gap-3 text-white hover:text-green-400 transition-colors duration-200" href="./index.html">
        <img src="./Images/lisbook-logo-1.png" alt="Logo" width="40" height="40" class="flex-shrink-0" />
        <span class="text-xl font-semibold">Lisbook</span>
      </a>

      <div id="menu"
        class="fixed inset-0 bg-gray-900 w-full h-full flex flex-col items-center justify-center space-y-8 transform scale-0 transition-transform duration-300 ease-in-out lg:relative lg:flex lg:items-center lg:justify-end lg:space-y-0 lg:bg-transparent lg:scale-100 lg:flex-row lg:space-x-2 z-20">
        <div id="menu-close" class="text-gray-300 lg:hidden absolute top-5 right-5 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <!-- Navigation Links - Clean Layout -->
        <a href="./index.html" class="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md transition-colors duration-200">
          Home
        </a>

        <a href="./explore.html" class="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md transition-colors duration-200" id="explore">
          Explore
        </a>

        <a href="./scan.html" class="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md transition-colors duration-200">
          Scan Book
        </a>

        <a href="./about.html" class="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md transition-colors duration-200" id="about">
          About
        </a>

        <a href="./contact.html" class="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md transition-colors duration-200">
          Contact
        </a>

        <a href="./faq.html" class="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md transition-colors duration-200">
          FAQs
        </a>

        <!-- Theme Toggle -->
        <button id="theme-toggle" class="text-gray-300 hover:text-green-500 p-2 rounded-md transition-colors duration-200">
          <svg id="sun-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
            <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" stroke-width="2" />
            <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" stroke-width="2" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" stroke-width="2" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" />
            <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="2" />
            <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" stroke-width="2" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" />
          </svg>
          <svg id="moon-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Profile Link -->
        <a href="./profile.html" class="text-gray-300 hover:text-green-500 p-2 rounded-md transition-colors duration-200">
          <i class="bi bi-person-circle h-5 w-5"></i>
        </a>

        <!-- Language Selector -->
        <div class="language-selector">
          <select id="language" onchange="changeLanguage()" class="bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"> 
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="zh">简体中文</option>
          </select>
        </div>

        <!-- Signup button -->
        <button id="signupButton" class="text-white bg-green-600 hover:bg-green-700 border border-green-600 rounded-md py-2 px-4 transition-all duration-300 text-sm font-medium">
          Sign up
        </button>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button id="menu-toggle" title="Menu" class="text-gray-300 hover:text-green-500 lg:hidden p-2 rounded-md transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </nav>
</header>
        `;

        navbarPlaceholder.innerHTML = navbarHTML;
        console.log('✓ Navbar loaded successfully');
    }
}

// Function to load footer
function loadFooter() {
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (footerPlaceholder) {
        // Create footer HTML directly to avoid CORS issues with file:// protocol
        const footerHTML = `
<!-- Footer -->
<div class="container border-top" style="margin-top: 80px">
  <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-3 mt-5 pb-5 g-4">
    <div class="col mb-3">
      <div class="footer-brand">
        <a href="./index.html" class="brand-link text-decoration-none">
          <img src="./Images/lisbook-logo-1.png" alt="Lisbook Logo" width="84" />
        </a>
        <div class="brand-text">
          <div class="brand-title">Lisbook</div>
          <p class="brand-tagline">LisBook is a straightforward audiobook player designed for simplicity and ease of use.</p>
        </div>
      </div>
    </div>

    <div class="col mb-3">
      <h5 class="fw-bold h5 mb-3 text-uppercase footer-col-title">Important Link</h5>
      <ul class="nav flex-column ms-2">
        <li class="nav-item mb-2"><a href="index.html" class="p-0">Home</a></li>
        <li class="nav-item mb-2"><a href="about.html" class="p-0">About</a></li>
        <li class="nav-item mb-2"><a href="contact.html" class="p-0">Contact</a></li>
        <li class="nav-item mb-2"><a href="faq.html" class="p-0">FAQs</a></li>
        <li class="nav-item mb-2"><a href="profile.html" class="p-0">Profile</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5 class="fw-bold h5 mb-3 text-uppercase footer-col-title">Features</h5>
      <ul class="nav flex-column ms-2">
        <li class="nav-item mb-2"><a href="#" class="p-0">Play/Pause</a></li>
        <li class="nav-item mb-2"><a href="#" class="p-0">Skip Chapters</a></li>
        <li class="nav-item mb-2"><a href="#" class="p-0">Change Speed</a></li>
        <li class="nav-item mb-2"><a href="#" class="p-0">Change Volume</a></li>
        <li class="nav-item mb-2"><a href="#" class="p-0">Change Theme</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5 class="fw-bold h5 mb-3 text-uppercase footer-col-title">Follow Us</h5>
      <ul class="nav flex-column ms-2">
        <li class="nav-item mb-2">
          <a href="https://www.instagram.com/dev_with_ctoic" class="p-0" target="_blank"><i class="bi bi-instagram me-2"></i> Instagram</a>
        </li>
        <li class="nav-item mb-2">
          <a href="https://x.com/Ct0ic" class="p-0" target="_blank"><i class="bi bi-twitter-x me-2"></i> Twitter-X</a>
        </li>
        <li class="nav-item mb-2">
          <a href="https://www.linkedin.com/in/ctoic/" class="p-0" target="_blank"><i class="bi bi-linkedin me-2"></i> LinkedIn</a>
        </li>
        <li class="nav-item mb-2">
          <a href="https://github.com/Ctoic" class="p-0" target="_blank"><i class="bi bi-github me-2"></i> GitHub</a>
        </li>
      </ul>
    </div>

    <!-- Newsletter Section -->
    <div class="col mb-3">
      <h5 class="fw-bold h5 mb-3 text-uppercase footer-col-title">Stay Updated</h5>
      <p class="mb-3">Subscribe to our newsletter for updates on new features and audiobooks.</p>
      <form id="newsletterForm" class="d-flex flex-column gap-2">
        <input 
          type="email" 
          class="form-control py-2 px-3" 
          id="newsletterEmail" 
          placeholder="Enter your email"
          required
        >
        <div class="invalid-feedback">Please provide a valid email address.</div>
        <button type="submit" class="btn btn-success py-2 px-3 w-100">Subscribe</button>
      </form>
      <div id="newsletterMessage" class="mt-2 small"></div>
    </div>
  </footer>
</div>

<div class="bg-white-900 p-4 text-center">
  <div class="text-gray-500">&copy; 2024 Lisbook | All Rights Reserved</div>
</div>
        `;

        footerPlaceholder.innerHTML = footerHTML;
        console.log('✓ Footer loaded successfully');
    }
}

// Initialize theme functionality
function initializeTheme() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (themeToggle && sunIcon && moonIcon) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            document.body.classList.remove('light-theme', 'dark-theme');
            document.body.classList.add(newTheme + '-theme');
            
            // Update icons
            if (newTheme === 'light') {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
            
            // Save to localStorage
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                console.warn('Could not save theme to localStorage', e);
            }
        });
    }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const menuClose = document.getElementById('menu-close');

    if (menuToggle && menu && menuClose) {
        menuToggle.addEventListener('click', function() {
            menu.classList.remove('scale-0');
            menu.classList.add('scale-100');
        });

        menuClose.addEventListener('click', function() {
            menu.classList.remove('scale-100');
            menu.classList.add('scale-0');
        });

        // Close menu when clicking on a link
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('scale-100');
                menu.classList.add('scale-0');
            });
        });
    }
}

// Initialize signup button functionality
function initializeSignupButton() {
    const signupButton = document.getElementById("signupButton");
    
    if (signupButton) {
        signupButton.addEventListener("click", function() {
            window.location.href = "pages/signup.html";
        });
    }
}

// Initialize newsletter form functionality
function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const messageDiv = document.getElementById('newsletterMessage');

    if (form && emailInput && messageDiv) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                emailInput.classList.add('is-invalid');
                messageDiv.innerHTML = '<div class="alert alert-danger">Please provide a valid email address.</div>';
                return;
            }

            emailInput.classList.remove('is-invalid');
            messageDiv.innerHTML = '<div class="alert alert-success">Thank you for subscribing!</div>';
            emailInput.value = '';

            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        });
    }
}

// Language change function (for iframe communication)
function changeLanguage() {
    const language = document.getElementById('language').value;
    const iframe = document.getElementById('gd-iframe');
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'changeLanguage', language: language }, '*');
    }
}
