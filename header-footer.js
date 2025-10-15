// header-footer.js

document.addEventListener("DOMContentLoaded", function () {
  // ------------------- HEADER -------------------
  const navbarPlaceholder = document.getElementById("navbar");
  if (navbarPlaceholder) {
    const navbarHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="./index.html">
            <img src="./Images/lisbook-logo-1.png" alt="Lisbook Logo" width="84" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
              <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
              <li class="nav-item"><a class="nav-link" href="faq.html">FAQs</a></li>
              <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
              <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li> <!-- Added Blog -->
            </ul>
          </div>
        </div>
      </nav>
    `;
    navbarPlaceholder.innerHTML = navbarHTML;
    console.log("✓ Navbar loaded successfully");
  }

  // ------------------- FOOTER -------------------
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
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
              <li class="nav-item mb-2"><a href="blog.html" class="p-0">Blog</a></li> <!-- Added Blog -->
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
    console.log("✓ Footer loaded successfully");

    // Newsletter form functionality
    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const messageDiv = document.getElementById("newsletterMessage");

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          emailInput.classList.add("is-invalid");
          messageDiv.innerHTML =
            '<div class="alert alert-danger">Please provide a valid email address.</div>';
          return;
        }

        emailInput.classList.remove("is-invalid");
        messageDiv.innerHTML =
          '<div class="alert alert-success">Thank you for subscribing!</div>';
        emailInput.value = "";

        setTimeout(() => {
          messageDiv.innerHTML = "";
        }, 5000);
      });
    }
  }
});
