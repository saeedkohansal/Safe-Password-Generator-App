// Add an event listener for the right-click (context menu) event on the document
document.addEventListener('contextmenu', (event) => {
  // Prevent the default context menu from appearing
  event.preventDefault();

  // Trigger the custom context menu by calling the exposed method from the preload script
  window.electronAPI.showContextMenu();
});

// Add an event listener for the 'click' event on the element with the ID 'inspect-source-code'
document.getElementById('inspect-source-code').addEventListener('click', (event) => {
  // Prevent the default action (if it's a link or button)
  event.preventDefault();

  // Open the developer tools via the method exposed from the preload script
  window.electronAPI.openDevTools();
});

// Add an event listener for the 'click' event on the element with the ID 'close-app'
document.getElementById('close-app').addEventListener('click', (event) => {
  // Prevent the default action
  event.preventDefault();

  // Close the app by invoking the corresponding method exposed from the preload script
  window.electronAPI.closeApp();
});

// Add an event listener for the 'click' event on the element with the ID 'powered-by'
document.getElementById('powered-by').addEventListener('click', (event) => {
  // Prevent the default action
  event.preventDefault();

  // Open an external link in the default browser using the method exposed from the preload script
  window.electron.openExternalLink('https://www.youtube.com/@gilgeekify/videos?sub_confirmation=1');
});
