const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
 
// RESTDB CONFIGURATION
const API_KEY = "69898428bf4bcc85de53e48d";
const DB_URL = "https://schedule-ca42.restdb.io/rest/bookings";
 
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
 
// GLOBAL STORAGE for bookings so all functions can see them
let allBookingsFromDB = [];
 
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
 
// Function to fetch bookings and then render calendar
const loadBookingsAndRender = async () => {
    try {
        const response = await fetch(DB_URL, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "cache-control": "no-cache"
            }
        });
        allBookingsFromDB = await response.json(); // Store in the global variable
        renderCalendar(allBookingsFromDB);
    } catch (err) {
        console.error("Error loading bookings:", err);
        renderCalendar([]);
    }
}
 
const renderCalendar = (bookedData) => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
 
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
 
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : "";
       
        const formattedDate = `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
       
        // Logic: A date only turns Red (booked) if there are multiple bookings
        // Or keep it simple: if ONE booking exists.
        const dayBookings = bookedData.filter(b => b.date === formattedDate);
        const isBooked = dayBookings.length > 0 ? "booked" : "";
 
        liTag += `<li class="${isToday} ${isBooked}" data-date="${formattedDate}">${i}</li>`;
    }
 
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
   
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
 
    // Add click event to each day
    const allDays = daysTag.querySelectorAll("li:not(.inactive)");
    allDays.forEach(day => {
        day.addEventListener("click", () => {
            // We allow clicking even if "booked" so people can book different time slots
            openModal(day.getAttribute("data-date"));
        });
    });
}
 
// Modal Logic - Ensure Bootstrap is loaded
const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
let selectedDate = "";
 
function openModal(dateStr) {
    selectedDate = dateStr;
    document.getElementById("targetDate").innerText = dateStr;
   
    document.getElementById("bookingTime").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
 
    // Show which times are already taken for this day
    const takenTimes = allBookingsFromDB
        .filter(b => b.date === dateStr)
        .map(b => b.time);
 
    // If you want to show taken times, add a div with id="takenTimesList" in your HTML
    const listElement = document.getElementById("takenTimesList");
    if (listElement) {
        listElement.innerHTML = takenTimes.length > 0
            ? "<strong>Already Booked:</strong> " + takenTimes.join(", ")
            : "All times available";
    }
 
    bookingModal.show();
}
 
// Handle Form Submission
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
    e.preventDefault();
   
    const bookingPayload = {
        date: selectedDate,
        time: document.getElementById("bookingTime").value,
        name: document.getElementById("userName").value,
        email: document.getElementById("userEmail").value
    };
 
    try {
        const response = await fetch(DB_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY
            },
            body: JSON.stringify(bookingPayload)
        });
 
        if (response.ok) {
            alert("Booking Saved Successfully!");
            bookingModal.hide();
            loadBookingsAndRender();
        }
    } catch (err) {
        alert("Error saving booking.");
        console.error(err);
    }
});
 
// Initial Load
loadBookingsAndRender();
 
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) {
            let newDate = new Date(currYear, currMonth, 1);
            currYear = newDate.getFullYear();
            currMonth = newDate.getMonth();
        }
        loadBookingsAndRender();
    });
});