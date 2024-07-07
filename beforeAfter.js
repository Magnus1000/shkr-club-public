document.addEventListener("DOMContentLoaded", function () {
  var containers = document.querySelectorAll("[data-container]"); // Select all containers

  containers.forEach(function (container) {
    var dragElement = container.querySelector("[data-drag]"); // Select draggable element within container
    var beforeElement = container.querySelector("[data-before]"); // Select resizable element within container

    var isDragging = false; // Flag to check if dragging is active
    var dragStartX, dragStartY; // Initial positions when drag starts
    var dragElementStartX, dragElementStartY; // Initial positions of the drag element

    // Set initial position of drag element within container
    dragElement.style.left = "50%"; // Set initial position to 50%
    dragElementStartX = dragElement.offsetLeft;
    dragElementStartY = dragElement.offsetTop;

    // Add mousedown and touchstart event listeners to drag element
    dragElement.addEventListener("mousedown", startDragging);
    dragElement.addEventListener("touchstart", startDragging);

    // Add mousemove and touchmove event listeners to document to track drag movement
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag);

    // Add mouseup and touchend event listeners to document to stop tracking drag movement
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);

    function startDragging(e) {
      e.preventDefault(); // Prevent default behavior
      isDragging = true; // Set dragging flag to true
      dragStartX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX; // Get start X position
      dragStartY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY; // Get start Y position
    }

    function drag(e) {
      e.preventDefault(); // Prevent default behavior
      if (isDragging) {
        var dragDeltaX = (e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX) - dragStartX; // Calculate delta X
        var dragDeltaY = (e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY) - dragStartY; // Calculate delta Y

        // Calculate new position of drag element within container
        var newDragElementX = dragElementStartX + dragDeltaX;
        var newDragElementY = dragElementStartY + dragDeltaY;

        // Ensure drag element stays within container
        var containerRect = container.getBoundingClientRect();
        var dragElementRect = dragElement.getBoundingClientRect();
        var maxDragElementX = containerRect.width - dragElementRect.width;
        var maxDragElementY = containerRect.height - dragElementRect.height;
        newDragElementX = Math.min(maxDragElementX, Math.max(0, newDragElementX));
        newDragElementY = Math.min(maxDragElementY, Math.max(0, newDragElementY));

        // Update position of drag element
        dragElement.style.left = newDragElementX + "px";
        dragElement.style.top = newDragElementY + "px";

        // Calculate new width of before element
        var newBeforeElementWidth = (newDragElementX + (dragElementRect.width / 2)) / containerRect.width * 100;

        // Update width of before element
        beforeElement.style.width = newBeforeElementWidth + "%";
      }
    }

    function stopDragging() {
      isDragging = false; // Set dragging flag to false
      dragElementStartX = dragElement.offsetLeft; // Update start X position
      dragElementStartY = dragElement.offsetTop; // Update start Y position
    }
  });
});
</script>

<script>
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