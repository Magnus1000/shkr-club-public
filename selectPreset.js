document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded. Setting up filter elements...");

    // Function to handle clicking on filter elements
    function handleFilterClick(e) {
      console.log("Filter item clicked"); // Log when an item is clicked
      var filterId = e.target.getAttribute("data-filter-id"); // Get the filter-preset-id of the clicked element
      console.log(`Clicked item filter ID: ${filterId}`); // Log the filter ID of the clicked item
      var targetElement = document.querySelector(`[data-preset-id="${filterId}"]`); // Find the target element in the carousel
  
      if (targetElement) {
        console.log(`Scrolling to element with preset ID: ${filterId}`); // Log before scrolling to the element
        targetElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); // Scroll to the target element
        console.log(`Scrolled to element with preset ID: ${filterId}`); // Log after scrolling to the element
      } else {
        console.log(`Element with preset ID: ${filterId} not found`); // Log if the element was not found
      }
    }
  
    // Attach event listeners to all filter elements
    var filterElements = document.querySelectorAll("[filter-preset-id]");
    console.log(`${filterElements.length} filter elements found.`); // Log the number of filter elements found

    filterElements.forEach(function (filterElement) {
      filterElement.addEventListener("click", handleFilterClick);
    });
});