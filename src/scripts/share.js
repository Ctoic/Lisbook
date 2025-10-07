document.addEventListener('DOMContentLoaded', function() {
  const shareBtn = document.getElementById('shareBtn');
  const shareModal = document.getElementById('shareModal');
  const closeShareModal = document.getElementById('closeShareModal');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const shareLink = document.getElementById('shareLink');
  const toast = document.getElementById('toast');

  // Open share modal
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      shareModal.classList.remove('hidden');
      // In a real app, you would set the current audiobook's details here
      document.getElementById('shareBookTitle').textContent = 'The Great Audiobook';
      document.getElementById('shareBookAuthor').textContent = 'Author Name';
    });
  }

  // Close share modal
  if (closeShareModal) {
    closeShareModal.addEventListener('click', function() {
      shareModal.classList.add('hidden');
    });
  }

  // Close modal when clicking outside
  if (shareModal) {
    shareModal.addEventListener('click', function(e) {
      if (e.target === shareModal) {
        shareModal.classList.add('hidden');
      }
    });
  }

  // Copy link to clipboard
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async function() {
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
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && shareModal && !shareModal.classList.contains('hidden')) {
      shareModal.classList.add('hidden');
    }
  });
});
