document.addEventListener('DOMContentLoaded', () => {
  // --- Comment Section ---
  const commentButton = document.querySelector('button svg.lucide-message-circle')?.closest('button');
  const commentSection = document.getElementById('comment-section');

  if (commentButton && commentSection) {
    commentButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent any default button behavior
      commentSection.classList.toggle('hidden');
      if (!commentSection.classList.contains('hidden')) {
        // Optional: Scroll to the comment section when shown
        commentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  } else {
    console.error('Comment button or section not found');
    if (!commentButton) console.error('Comment button not found using selector: button svg.lucide-message-circle');
    if (!commentSection) console.error('Comment section not found using ID: comment-section');
  }

  // Add basic submit handler (just logs for now)
  const submitCommentButton = document.getElementById('submit-comment');
  const commentInput = document.getElementById('comment-input');
  if (submitCommentButton && commentInput) {
      submitCommentButton.addEventListener('click', () => {
          if (commentInput.value.trim() === '') {
              alert('الرجاء كتابة تعليق.');
              return;
          }
          console.log('Comment submitted:', commentInput.value);
          // Here you would typically send the comment to a server
          alert('تم إرسال التعليق بنجاح (هذه محاكاة، لا يتم حفظ التعليق فعلياً).');
          commentInput.value = '';
          commentSection.classList.add('hidden');
      });
  }


  // --- Share Modal ---
  const shareButton = document.querySelector('button svg.lucide-share2')?.closest('button');
  const shareModal = document.getElementById('share-modal');
  const closeShareModalButton = document.getElementById('close-share-modal');

  const shareFacebook = document.getElementById('share-facebook');
  const shareWhatsapp = document.getElementById('share-whatsapp');
  const shareEmail = document.getElementById('share-email');
  const copyLinkButton = document.getElementById('copy-link');

  if (shareButton && shareModal && closeShareModalButton && shareFacebook && shareWhatsapp && shareEmail && copyLinkButton) {
    shareButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent any default button behavior
      const url = window.location.href;
      const title = document.querySelector('h1')?.textContent || document.title;

      // Update share links
      shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
      shareEmail.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('لقد وجدت هذا المقال مثيراً للاهتمام: ' + url)}`;

      shareModal.classList.remove('hidden');
    });

    closeShareModalButton.addEventListener('click', () => {
      shareModal.classList.add('hidden');
    });

    // Close modal if clicked outside the content area
    shareModal.addEventListener('click', (event) => {
        // Check if the click is directly on the modal background (not its children)
        if (event.target === shareModal) {
            shareModal.classList.add('hidden');
        }
    });

    copyLinkButton.addEventListener('click', () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert('تم نسخ الرابط!');
        // Optionally close the modal after copying
        // shareModal.classList.add('hidden');
      }).catch(err => {
        console.error('Failed to copy link: ', err);
        // Fallback for older browsers or if clipboard API fails (e.g., insecure context)
        try {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed"; // Avoid scrolling to bottom
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('تم نسخ الرابط!');
        } catch (execCommandErr) {
          console.error('Fallback copy failed: ', execCommandErr);
          alert('فشل نسخ الرابط. يرجى نسخه يدوياً.');
        }
      });
    });

  } else {
      console.error('Share button or modal elements not found');
      if (!shareButton) console.error('Share button not found using selector: button svg.lucide-share2');
      if (!shareModal) console.error('Share modal not found using ID: share-modal');
      if (!closeShareModalButton) console.error('Close share modal button not found');
      if (!shareFacebook) console.error('Facebook share link not found');
      if (!shareWhatsapp) console.error('WhatsApp share link not found');
      if (!shareEmail) console.error('Email share link not found');
      if (!copyLinkButton) console.error('Copy link button not found');
  }

});

