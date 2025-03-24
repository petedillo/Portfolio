export const setViewportHeight = () => {
  // Get the viewport height
  const vh = window.innerHeight * 0.01;
  
  // Set the value in the --vh custom property
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Debounced resize handler
let resizeTimeout: number;
const handleResize = () => {
  window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    setViewportHeight();
  }, 100);
};

// We listen to the resize event
window.addEventListener('resize', handleResize);
// We listen to the orientationchange event
window.addEventListener('orientationchange', () => {
  // Wait for orientation change to complete
  setTimeout(setViewportHeight, 100);
});

// Initial call
setViewportHeight(); 