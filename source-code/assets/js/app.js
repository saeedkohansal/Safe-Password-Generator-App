// Get result and generate button elements
const result = document.getElementById('result');
const generatePasswordBtn = document.getElementById('generate-btn');

// Get options checkboxes elements
const options = {
    uppercase: document.getElementById('uppercase-option'),
    lowercase: document.getElementById('lowercase-option'),
    numbers: document.getElementById('numbers-option'),
    symbols: document.getElementById('symbols-option'),
};

// Create notification element
const notification = document.createElement('span');
notification.id = 'success-notif';
notification.innerHTML = 'New password has been generated and copied &#128525;';
document.body.append(notification);

// Show and hide notification
function showNotification() {
    notification.style.visibility = 'visible';
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.visibility = 'hidden';
        notification.style.opacity = '0';
    }, 2000);
}

// Utility to append character sets based on checkboxes
function getPattern() {
    let pattern = '';
    if (options.uppercase.checked) pattern += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase.checked) pattern += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers.checked) pattern += '0123456789';
    if (options.symbols.checked) pattern += `~!@#$%^&*()_+-=`;
    return pattern;
}

// Password generator
function generatePassword(length) {
    const pattern = getPattern();

    if (!pattern) {
        console.log('🔴 No options selected. Please choose at least one option.');
        return;
    }

    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => pattern[x % pattern.length])
        .join('');
}

// Main password generation function with validation
function passwordGenerator() {
    let length = Number(document.getElementById('password-length').value);

    // Automatically adjust length if out of range
    if (length < 1) {
        length = 1;
        document.getElementById('password-length').value = length;
    } else if (length > 256) {
        length = 256;
        document.getElementById('password-length').value = length;
    }

    const newPassword = generatePassword(length);
    if (newPassword) {
        result.value = newPassword;
        navigator.clipboard.writeText(newPassword);
        console.log('🟢 A new password has been generated and auto copied');
        showNotification();
    }
}

// Disable/Enable the `GENERATE & COPY` button based on password length
function checkPasswordLength() {
    let length = Number(document.getElementById('password-length').value);

    // Automatically adjust length if out of range
    if (length < 1) {
        length = 1;
        document.getElementById('password-length').value = length;
        console.log('🔴 Length adjusted to minimum (1).');
    } else if (length > 256) {
        length = 256;
        document.getElementById('password-length').value = length;
        console.log('🔴 Length adjusted to maximum (256).');
    }

    if (length >= 1 && length <= 256) {
        generatePasswordBtn.disabled = false;
        console.log('🟢 Password length is valid.');
    }
}

// Attach input event to password length field to auto-adjust the length
document.getElementById('password-length').addEventListener('input', checkPasswordLength);

// When the `GENERATE & COPY` button is clicked
generatePasswordBtn.addEventListener('click', passwordGenerator);

// Allow pressing `Enter` to generate the password
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        passwordGenerator();
    }
});
