
async function hashPassword(password) {
    // Encode the password as a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Hash the data using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let passwordError = document.getElementById('passwordError');
    let emailError = document.getElementById('emailError');
    let phoneError = document.getElementById('phoneError');

    passwordError.hidden = true;
    emailError.hidden = true;
    phoneError.hidden = true;

    if (password !== confirmPassword) {
        passwordError.hidden = false;
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let emailExists = users.some(user => user.email === email);
    let phoneExists = users.some(user => user.phone === phone);

    if (emailExists) {
        emailError.hidden = false;
    }
    if (phoneExists) {
        phoneError.hidden = false;
    }
    if (!emailExists && !phoneExists) {
        let hashedPassword = await hashPassword(password);
                let newUser = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashedPassword
                };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
       
        successMessage.hidden = false;
        setTimeout(() => {
            successMessage.hidden = true;
        }, 3000); 
    }
});