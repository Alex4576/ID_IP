document.addEventListener("DOMContentLoaded", () => {
    const myModal = new bootstrap.Modal(document.getElementById('profileModal'));
    const profileForm = document.getElementById('profileForm');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.querySelector('#profileForm .mb-3');
    const inputField = document.getElementById('newName');
 
    let activeTargetId = "";
    let cardData = {holder: "", number: "", expiry: "", cvv: ""};
 
    function openEditModal(targetId, titleText) {
        activeTargetId = targetId;
        modalTitle.innerText = titleText;

        if(targetId === "displayCard") {
            modalBody.innerHTML = `
                <input type="text" class="form-control mb-2" id="cardHolderName" placeholder="Cardholder Name" required value="${cardData.holder}">
                <input type="text" class="form-control mb-2" id="cardNumber" placeholder="Card Number" required value="${cardData.number}">
                <input type="text" class="form-control mb-2" id="cardExpiry" placeholder="Expiration" required value="${cardData.expiry}">
                <input type="text" class="form-control mb-2" id="cardCVV" placeholder="CVV" required value="${cardData.cvv}">
            `;
        } else {
            modalBody.innerHTML = `
            <label class="form-label">Edit Info</label>
            <input type="text" class="form-control" id="newName" required value="${document.getElementById(targetId).innerText}">
            `;
        }

        myModal.show();
    }
 

    document.getElementById('editProfileBtn').addEventListener('click', (e) => {
        e.preventDefault();
        openEditModal('displayName', 'Edit Profile Name');
    });
 
    document.getElementById('editCardBtn').addEventListener('click', (e) => {
        e.preventDefault();
        openEditModal('displayCard', 'Update Card Type');
    });
 
    document.getElementById('editAddressBtn').addEventListener('click', (e) => {
        e.preventDefault();
        openEditModal('displayAddress', 'Update Shipping Address');
    });
 
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (activeTargetId === "displayCard") {
            cardData.holder = document.getElementById('cardHolderName').value.trim();
            cardData.number = document.getElementById('cardNumber').value.trim();
            cardData.expiry = document.getElementById('cardExpiry').value.trim();
            cardData.cvv = document.getElementById('cardCVV').value.trim();

            if (cardData.number) {
                const masked = cardData.number.slice(-4).padStart(cardData.number.length, "*");
                document.getElementById(activeTargetId).innerText = masked;
                myModal.hide();
            }
        } else {
        const newValue = document.getElementById(`newName`).value.trim();
        if (newValue) {
            document.getElementById(activeTargetId).innerText = newValue;
            myModal.hide();
            }
        }
    });
});