// Animate dropdown menu visibility by overriding Bootstrap inline styles
const dropdownElement = document.querySelector('.dropdown-menu');

if (dropdownElement) {
  dropdownElement.addEventListener('show.bs.dropdown', () => {
    // Remove inline display:none when dropdown is shown
    dropdownElement.style.display = 'block';
  });

  dropdownElement.addEventListener('hide.bs.dropdown', () => {
    // Delay hiding display to allow CSS animation
    setTimeout(() => {
      dropdownElement.style.display = 'none';
    }, 300); // Duration matches CSS transition time
  });
}
