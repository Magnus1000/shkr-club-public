document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded. Setting up filter elements...");

    function handleFilterClick(e) {
        console.log("Filter item clicked"); // Log when an item is clicked
        var filterId = e.target.getAttribute("data-filter-id"); // Get the filter-preset-id of the clicked element
        console.log(`Clicked item filter ID: ${filterId}`); // Log the filter ID of the clicked item
        console.log(`Clicked item class: ${e.target.className}`); // Log the class of the clicked item

        // Toggle "selected" class on the parent element
        var parentElement = e.target.parentElement;
        if (parentElement.classList.contains("selected")) {
            parentElement.classList.remove("selected");
            console.log("Removed 'selected' class from parent element.");
        } else {
            parentElement.classList.add("selected");
            console.log("Added 'selected' class to parent element.");
        }

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
    var filterElements = document.querySelectorAll("[data-filter-id]");
    console.log(`${filterElements.length} filter elements found.`); // Log the number of filter elements found

    filterElements.forEach(function (filterElement) {
      filterElement.addEventListener("click", handleFilterClick);
    });

    // Automatically add "selected" class to the parent of the first filter element
    if (filterElements.length > 0) {
        filterElements[0].parentElement.classList.add("selected");
        console.log("Automatically added 'selected' class to the first filter element's parent.");
    }
});