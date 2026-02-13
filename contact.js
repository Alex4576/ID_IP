/* Contact Form */
const API_KEY = "698f7c20bf4bccbaf753e505";
const URL = "https://contactus-a865.restdb.io/rest/info";
 
// 2. The Event Listener
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop page refresh
 
    // 3. Gathering the Data
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        text: document.getElementById("message").value
    };
 
    // 4. The Fetch Request
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset(); // Clear the form
    })
    .catch(error => {
        console.error("Error:", error);
    });
});