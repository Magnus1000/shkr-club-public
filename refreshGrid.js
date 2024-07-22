const refreshButton = document.getElementById('refreshButton');
const imageGrid = document.getElementById('imageGrid');
const imageItems = Array.from(imageGrid.querySelectorAll('.image-items'));

console.log('Refresh button:', refreshButton);
console.log('Image grid:', imageGrid);
console.log('Image items:', imageItems);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function reorderGrid() {
  console.log('Reordering grid...');
  const shuffledItems = shuffleArray(imageItems);
  console.log('Shuffled items:', shuffledItems);
  shuffledItems.forEach(item => imageGrid.appendChild(item));
  console.log('Grid reordered.');
}

refreshButton.addEventListener('click', () => {
  console.log('Refresh button clicked.');
  reorderGrid();
});

console.log('Script loaded.');