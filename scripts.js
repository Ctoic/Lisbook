document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");
  const pacmanContainer = document.querySelector(".pacman-container");

  // Only run pacman animation if container exists
  if (pacmanContainer) {
    let lastLeft = pacmanContainer.getBoundingClientRect().left;

    function updateDots() {
      const pacmanRect = pacmanContainer.getBoundingClientRect();
      const pacmanCenter = pacmanRect.left + pacmanRect.width / 2;

      const isMovingForward = pacmanRect.left > lastLeft;
      lastLeft = pacmanRect.left;

      dots.forEach((dot) => {
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.left + dotRect.width / 2;

        if (isMovingForward) {
          dot.style.opacity = pacmanCenter > dotCenter ? "0" : "1";
        } else {
          dot.style.opacity = pacmanCenter < dotCenter ? "0" : "1";
        }
      });

      requestAnimationFrame(updateDots);
    }

    requestAnimationFrame(updateDots);
  }

  // Navbar active tab highlighting
  function highlightActiveNavTab() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Define page mappings (handle both with and without .html)
    const pageMap = {
      'index.html': 'home',
      '': 'home', // Default to home for root
      'explore.html': 'explore',
      'about.html': 'about',
      'contact.html': 'contact',
      'faq.html': 'faq'
    };
    
    // Get the corresponding nav item ID
    const activeNavId = pageMap[currentPage] || pageMap['index.html'];
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('#menu a[href]');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current page nav link
    const activeLink = document.getElementById(activeNavId);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // Call the function to highlight active tab
  highlightActiveNavTab();
});
