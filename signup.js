document.getElementById('api-signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
 
    const btn = document.getElementById('api-btn');
    const email = document.getElementById('api-email').value;
    const password = document.getElementById('api-password').value;
 
    const apiKey = "698ec00cbf4bcc663d53e4ef";
    const apiUrl = "https://userinfo-f1a2.restdb.io/rest/userinformation";
 
    btn.innerText = "Creating Account...";
    btn.disabled = true;
 
    const userData = {
        "email": email,
        "password": password
    };
 
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "cache-control": "no-cache",
                "x-apikey": apiKey,
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });
 
        if (response.ok) {
            alert("Account created successfully!");
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();

            alert("Error: " + JSON.stringify(errorData));
            btn.innerText = "Sign Up";
            btn.disabled = false;
        }
    } catch (err) {
        console.error(err);
        alert("Connection error. Check console (F12).");
        btn.innerText = "Sign Up";
        btn.disabled = false;
    }
});