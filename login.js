document.getElementById('api-login-form').addEventListener('submit', async function(e) {
        e.preventDefault();
 
        const btn = document.getElementById('api-btn');
        const emailValue = document.getElementById('api-email').value;
        const passwordValue = document.getElementById('api-password').value;
 

        const apiKey = "698ec00cbf4bcc663d53e4ef";

        const apiUrl = "https://userinfo-f1a2.restdb.io/rest/userinformation";
 
        btn.innerText = "Authenticating...";
        btn.disabled = true;
 
        const queryUrl = `${apiUrl}?q=${JSON.stringify({email: emailValue, password: passwordValue})}`;
 
        try {
            const response = await fetch(queryUrl, {
                method: 'GET',
                headers: {
                    "cache-control": "no-cache",
                    "x-apikey": apiKey,
                    "content-type": "application/json"
                }
            });
 
            const userRecords = await response.json();
 
            if (userRecords.length > 0) {
                localStorage.setItem('userSession', JSON.stringify(userRecords[0]));
                window.location.href = 'loginloading.html';
            } else {
                alert("Invalid email or password.");
                btn.innerText = "Login";
                btn.disabled = false;
            }
        } catch (err) {
            console.error(err);
            alert("Connection error to RestDB.");
            btn.innerText = "Login";
            btn.disabled = false;
        }
    });
 