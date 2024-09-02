// Function to handle user registration
function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const securityQuestion = document.getElementById('securityQuestion').value.trim();
    const securityAnswer = document.getElementById('securityAnswer').value.trim().toLowerCase();

    if (!username || !password || !securityQuestion || !securityAnswer) {
        alert('Please fill in all fields.');
        return;
    }

    if (localStorage.getItem(username)) {
        alert('User already exists. Please log in.');
        window.location.href = 'index.html';
        return;
    }

    // Create a new user
    const newUser = {
        password: password,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
        files: []
    };

    localStorage.setItem(username, JSON.stringify(newUser));
    alert('User registered successfully!');
    window.location.href = 'index.html'; // Redirect to login page after registration
}

// Function to handle user login
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
        alert('Login successful!');
        localStorage.setItem('currentUser', username); // Save the current user in local storage
        window.location.href = 'upload.html'; // Redirect to upload page after login
    } else {
        alert('Invalid username or password.');
    }
}

// Function to show the forgot password section
function showForgotPassword() {
    document.querySelector('.login-section').style.display = 'none';
    document.getElementById('forgotPasswordSection').style.display = 'block';
}

// Function to retrieve and display the security question
function retrieveSecurityQuestion() {
    const forgotUsername = document.getElementById('forgotUsername').value.trim();
    const user = JSON.parse(localStorage.getItem(forgotUsername));

    if (user) {
        document.getElementById('displaySecurityQuestion').textContent = user.securityQuestion;
        document.getElementById('securityQuestionSection').style.display = 'block';
    } else {
        alert('Username not found.');
    }
}

// Function to reset the password
function resetPassword() {
    const forgotUsername = document.getElementById('forgotUsername').value.trim();
    const forgotSecurityAnswer = document.getElementById('forgotSecurityAnswer').value.trim().toLowerCase();

    const user = JSON.parse(localStorage.getItem(forgotUsername));

    if (user && user.securityAnswer === forgotSecurityAnswer) {
        const newPassword = prompt('Enter a new password:');
        if (newPassword) {
            user.password = newPassword;
            localStorage.setItem(forgotUsername, JSON.stringify(user));
            alert('Password reset successfully!');
            window.location.href = 'index.html'; // Redirect to login page after resetting password
        }
    } else {
        alert('Incorrect security answer.');
    }
}
// Function to handle file upload
function uploadFiles() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please log in to upload files.');
        window.location.href = 'index.html';
        return;
    }

    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length === 0) {
        alert('No files selected.');
        return;
    }

    const user = JSON.parse(localStorage.getItem(currentUser));
    for (let i = 0; i < files.length; i++) {
        const file = {
            name: files[i].name,
            url: URL.createObjectURL(files[i]) // Generates a temporary URL for the file
        };
        user.files.push(file);
    }

    localStorage.setItem(currentUser, JSON.stringify(user));
    alert('Files uploaded successfully!');
    displayUserFiles();
}

// Function to display the user's uploaded files
function displayUserFiles() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please log in.');
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(localStorage.getItem(currentUser));
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    if (user.files.length === 0) {
        fileList.innerHTML = '<li>No files uploaded yet.</li>';
    } else {
        user.files.forEach(file => {
            const li = document.createElement('li');
            const downloadLink = document.createElement('a');
            downloadLink.href = file.url;
            downloadLink.textContent = file.name;
            downloadLink.download = file.name;

            const shareLink = document.createElement('a');
            shareLink.href = file.url;
            shareLink.textContent = 'Share Link';
            shareLink.style.marginLeft = '10px';

            li.appendChild(downloadLink);
            li.appendChild(shareLink);
            fileList.appendChild(li);
        });
    }
}

// Function to handle user logout
function logout() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html'; // Redirect to login page after logout
}
