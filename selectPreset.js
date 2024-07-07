document.addEventListener("DOMContentLoaded", function () {
    // Function to handle clicking on filter elements
    function handleFilterClick(e) {
      var filterId = e.target.getAttribute("data-filter-id"); // Get the filter-preset-id of the clicked element
      var targetElement = document.querySelector(`[data-preset-id="${filterId}"]`); // Find the target element in the carousel
  
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); // Scroll to the target element
      }
    }
  
    // Attach event listeners to all filter elements
    var filterElements = document.querySelectorAll("[filter-preset-id]");
    filterElements.forEach(function (filterElement) {
      filterElement.addEventListener("click", handleFilterClick);
    });
});