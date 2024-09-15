// Import necessary modules from Electron
const { contextBridge, ipcRenderer, shell } = require('electron');

// Use contextBridge to expose specific APIs to the renderer process
// This ensures that only defined methods are accessible in the renderer, 
// protecting the main process from being manipulated directly.

// Expose 'electronAPI' in the global window object of the renderer
contextBridge.exposeInMainWorld('electronAPI', {
    // Method to open the developer tools via an IPC call
    openDevTools: () => ipcRenderer.invoke('open-devtools'),

    // Method to close the application by sending an IPC call to the main process
    closeApp: () => ipcRenderer.invoke('close-app'),

    // Method to trigger a context menu by sending a message to the main process
    showContextMenu: () => ipcRenderer.send('show-context-menu')
});

// Expose a separate 'electron' object in the global window object
contextBridge.exposeInMainWorld('electron', {
    // Method to open an external URL in the default browser
    openExternalLink: (url) => shell.openExternal(url)
});
