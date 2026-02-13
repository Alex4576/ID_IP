document.getElementById('api-reset-form').addEventListener('submit', async function(e) {
    e.preventDefault();
 
    const btn = document.getElementById('reset-btn');
    const emailValue = document.getElementById('reset-email').value;
    const newPasswordValue = document.getElementById('new-password').value;

    const apiKey = "698ec00cbf4bcc663d53e4ef";
    const apiUrl = "https://userinfo-f1a2.restdb.io/rest/userinformation";
 
    btn.innerText = "Updating...";
    btn.disabled = true;
 
    try {
        const queryUrl = `${apiUrl}?q=${JSON.stringify({"email": emailValue})}`;
        const findResponse = await fetch(queryUrl, {
            method: 'GET',
            headers: {
                "cache-control": "no-cache",
                "x-apikey": apiKey,
                "content-type": "application/json"
            }
        });
 
        const users = await findResponse.json();
 
        if (users && users.length > 0) {
            const userId = users[0]._id;
 
            const updateUrl = `${apiUrl}/${userId}`;
            const updateData = {
                "email": emailValue,
                "password": newPasswordValue
            };
 
            const updateResponse = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    "cache-control": "no-cache",
                    "x-apikey": apiKey,
                    "content-type": "application/json"
                },
                body: JSON.stringify(updateData)
            });
 
            if (updateResponse.ok) {
                alert("Password updated successfully!");
                window.location.href = 'login.html';
            } else {
                const errorLog = await updateResponse.json();
                alert("Update failed: " + JSON.stringify(errorLog));
            }
        } else {
            alert("No account found with that email address.");
        }
    } catch (err) {
        console.error("Connection Error:", err);
        alert("Connection error. Please check your internet or RestDB CORS settings.");
    } finally {
        btn.innerText = "Update Password";
        btn.disabled = false;
    }
});