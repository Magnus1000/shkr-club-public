// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed");

  // Get all thumbnail container divs
  const thumbnails = document.querySelectorAll('.image-items');
  // Get the popup elements
  const popupOverlay = document.querySelector('.image-modal-overlay');
  const popupImage = document.getElementById('popup-image');
  const popupAuthor = document.getElementById('popup-author');
  const popupLink = document.getElementById('popup-link');

  // Function to show the popup
  const showPopup = (imageSrc, authorName, authorLink) => {
    console.log("Showing popup with image:", imageSrc, "author:", authorName, "link:", authorLink);
    popupImage.src = imageSrc;
    popupImage.srcset = ''; // Clear the srcset attribute if it exists
    popupAuthor.textContent = authorName;
    popupLink.href = authorLink;
    popupOverlay.classList.remove('hidden');
    document.addEventListener('keydown', handleEscape); // Add escape key listener
  };

  // Function to hide the popup
  const hidePopup = () => {
    console.log("Hiding popup");
    popupOverlay.classList.add('hidden');
    popupImage.src = ''; // Clear the image source
    popupImage.srcset = ''; // Clear the srcset attribute
    popupAuthor.textContent = ''; // Clear the author name
    popupLink.href = '#'; // Clear the link
    document.removeEventListener('keydown', handleEscape); // Remove escape key listener
  };

  // Function to handle escape key press
  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      console.log("Escape key pressed, hiding popup");
      hidePopup();
    }
  };

  // Add click event listener to each thumbnail container div
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (event) => {
      const largeImageSrc = thumbnail.getAttribute('data-large');
      const authorName = thumbnail.getAttribute('data-author');
      const authorLink = thumbnail.getAttribute('data-link');
      console.log("Thumbnail clicked with large image src:", largeImageSrc, "author:", authorName, "link:", authorLink);
      showPopup(largeImageSrc, authorName, authorLink);
    });
  });

  // Add click event listener to close the popup when clicking outside the image
  popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay || event.target === popupLink) {
      console.log("Overlay clicked, hiding popup");
      hidePopup();
    }
  });
});