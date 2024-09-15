// Import the necessary modules from the 'electron-winstaller' package and the 'path' module for path manipulation
const { createWindowsInstaller } = require('electron-winstaller');
const path = require('path');

// Define an asynchronous function to create the Windows installer
async function createInstaller() {
    try {
        // Await the completion of the createWindowsInstaller function with specified options
        await createWindowsInstaller({
            appDirectory: path.join(__dirname, 'dist/SafePasswordGenerator-win32-x64'), // Path to the directory containing the packaged app
            outputDirectory: path.join(__dirname, 'installer'), // Path to the directory where the installer will be saved
            authors: 'Saeed Kohansal', // Author of the application
            exe: 'SafePasswordGenerator.exe', // Name of the application executable
            setupExe: 'SPG-Setup.exe', // Name of the installer executable
            description: 'Install Safe Password Generator', // Description of the installer
            version: '1.0.0', // Version of the installer
            loadingGif: path.join(__dirname, 'spg-app/assets/image/installer.gif'), // Path to the loading GIF displayed during installation
            setupIcon: path.join(__dirname, 'spg-app/assets/icon/logo/128.ico'), // Path to the icon used for the installer
            iconUrl: path.join(__dirname, 'spg-app/assets/icon/logo/128.ico'), // URL to the icon used for the installer (also used for the setup executable)
            noMsi: true // Disable creation of an MSI installer
        });
        // Log a success message to the console if the installer is created successfully
        console.log('Installer created successfully!');
    } catch (error) {
        // Log an error message to the console if there's an issue creating the installer
        console.error('Error creating installer:', error.message);
    }
}

// Call the createInstaller function to start the installer creation process
createInstaller();
