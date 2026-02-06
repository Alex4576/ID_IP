const API_KEY = "69844f53bf4bcc5efe53e46b";
const URL = "https://contactus-2ce8.restdb.io/rest/contact-info";
 
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