// Import required Electron modules
const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path'); // Import Node.js path module for working with file and directory paths

// Function to create the main application window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 666, // Set the window width
        height: 527, // Set the window height
        frame: false, // Disable the default frame (custom title bar)
        resizable: false, // Make the window non-resizable
        title: 'Safe Password Generator', // Set the window title
        icon: path.join(__dirname, 'spg-app/assets/icon/logo/256.png'), // Set the window icon
        titleBarStyle: 'hidden', // Hide the default title bar for custom design
        webPreferences: {
            preload: path.join(__dirname, 'spg-app/assets/js/preload.js'), // Preload script to expose certain functionality to the renderer process
            nodeIntegration: true // Enable Node.js integration in the renderer process
        }
    });

    // Load the HTML file for the app interface
    mainWindow.loadFile('spg-app/index.html');

    // Remove the default menu bar
    Menu.setApplicationMenu(null);
}

// Handle request to open developer tools (triggered from renderer process)
ipcMain.handle('open-devtools', (event) => {
    const win = event.sender.getOwnerBrowserWindow(); // Get the window that triggered the event
    win.webContents.openDevTools(); // Open the developer tools for debugging
});

// Handle request to close the app (triggered from renderer process)
ipcMain.handle('close-app', () => {
    app.quit(); // Quit the application
});

// Handle request to show a custom context menu (right-click menu)
ipcMain.on('show-context-menu', (event) => {
    // Define the context menu template with options
    const template = [
        {
            label: 'Reload', // Menu option to reload the app
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/reload.png'), // Set an icon for the menu item
            click: () => { event.sender.reload(); } // Reload the current window
        },
        {
            label: 'App info', // Menu option to open the app's GitHub page
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/info.png'),
            click: () => { shell.openExternal('https://github.com/saeedkohansal'); } // Open the URL in the default browser
        },
        {
            label: 'Watch tutorials', // Menu option to open YouTube tutorials
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/youtube.png'),
            click: () => { shell.openExternal('https://www.youtube.com/@gilgeekify/videos?sub_confirmation=1'); }
        },
        {
            label: 'Donate', // Menu option to open the PayPal donation page
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/paypal.png'),
            click: () => { shell.openExternal('https://paypal.me/gilgeekify'); }
        },
        {
            label: 'GitHub', // Menu option to open GitHub page
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/github.png'),
            click: () => { shell.openExternal('https://github.com/saeedkohansal'); }
        },
        {
            label: 'Email', // Menu option to open email client
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/gmail.png'),
            click: () => { shell.openExternal('mailto:kohansalism@gmail.com'); }
        },
        {
            label: 'Telegram', // Menu option to open Telegram
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/telegram.png'),
            click: () => { shell.openExternal('https://t.me/kohandev'); }
        },
        {
            label: 'WhatsApp', // Menu option to open WhatsApp
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/whatsapp.png'),
            click: () => { shell.openExternal('https://wa.me/989024645653'); }
        },
        {
            label: 'Made with love', // Disabled menu item to show app info
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/heart.png'),
            enabled: false // The item is displayed but not clickable
        },
        {
            label: 'Exit', // Menu option to exit the app
            icon: path.join(__dirname, 'spg-app/assets/icon/ui/exit.png'),
            click: () => { app.quit(); } // Quit the application when clicked
        }
    ];

    // Build the menu from the template and display it
    const menu = Menu.buildFromTemplate(template);
    menu.popup(BrowserWindow.fromWebContents(event.sender)); // Show the context menu
});

// Event handler for when Electron is ready to create windows
app.on('ready', createWindow);

// Event handler for when all windows are closed
app.on('window-all-closed', () => {
    // Quit the app on non-macOS platforms
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Event handler for macOS to recreate a window when the app icon is clicked
app.on('activate', () => {
    // Create a window if there are no open windows
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
