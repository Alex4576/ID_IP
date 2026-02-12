 // Auction Items Data
    const auctionItems = [
        {
            id: 1,
            title: "Vintage Gramophone",
            subtitle: "subtitle",
            description: "A vintage, hand-cranked device patented Made in 1887, for playing sound from flat discs, often used to play 78RPM records",
            currentBid: 15000,
            minIncrement: 100,
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
            bidders: 3,
            condition: "Fair",
            image: "images/antiquesobjects.jpg",
            bids: [
                {bidder: "Tim", amount: 15000, time: "2 min ago"},
                {bidder: "Mary", amount: 14000, time: "5 min ago"},
                {bidder: "John", amount: 13000, time: "8 min ago"},
            ]
 },
 {
     id: 2,
            title: "Vintage Acoustic Guitar",
            subtitle: "subtitle",
            description: "A timeless antique used to this very day.This guitar combines the aesthetics of the 90s while the practicality of any guitar.",
            currentBid: 10000,
            minIncrement: 100,
            endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 2 hours
            bidders: 2,
            condition: "Good",
            image: "images/radionatureconcept.jpg",
            bids: [
                {bidder: "Mary", amount: 10000, time: "2 min ago"},
                {bidder: "Luke", amount: 9000, time: "5 min ago"},
            ]
        },
         {
     id: 3,
            title: "Vintage Brass Trumpet",
            subtitle: "subtitle",
            description: "A instrument used in most band, this brass trumpet perfectly catches the vibe of something retro while retaining its original use and retro design.",
            currentBid: 15000,
            minIncrement: 100,
            endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 2 hours
            bidders: 2,
            condition: "Good",
            image: "images/messyinterior.jpg",
            bids: [
                {bidder: "Lisa", amount: 15000, time: "2 min ago"},
                {bidder: "Mary", amount: 13000, time: "25 min ago"},
            ]
        }
    ];

    // State
    let currentItem = null;
    let countdownIntervals = {};

    // DOM Elements
    const auctionGrid = document.getElementById('auctionGrid');
    const biddingModal = document.getElementById('biddingModal');
    const closeModal = document.querySelector('.close-modal');
    const toast = document.getElementById('toast');

    //Initialize
    document.addEventListener('DOMContentLoaded', () => {
        displayAuctionItems();
        startAllCountdowns();
        setupEventListeners();
    });

    // Display Auction Items
    function displayAuctionItems() {
        auctionGrid.innerHTML = '';
        auctionItems.forEach(item => {
            const itemCard = createAuctionItemCard(item);
            auctionGrid.appendChild(itemCard);
        });
    }

    // Create Auction Item Card
    function createAuctionItemCard(item) {
        const card = document.createElement('div');
        card.className = 'auction-item';

        // Check if auction ends soon (less than 1 hour)
        const timeLeft = item.endTime - Date.now();
        const isEndingSoon = timeLeft < 60 * 60 * 1000;

        if (isEndingSoon) {
            card.classList.add('ending-soon');
        }

        card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image">
        <div class="item-content">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-description">${item.description}</p>
        <div class="item-meta">
            <div class="current-bid">
                <div class="bid-label">Current Bid</div>
                <div class="bid-amount">$${item.currentBid.toLocaleString()}</div>
            </div>
            <div class="countdown">
                <div class="countdown-label">Time Left</div>
                <div class="countdown-time" id="countdown-${item.id}">--:--:</div>
            </div>
        </div>
        <button class="bid-now-btn" onclick="openBiddingModal(${item.id})">
            <i class="fas fa-gavel"></i> Bid Now
        </button>
    </div>
`;

return card;
}

// Start All Countdowns
function startAllCountdowns() {
    auctionItems.forEach(item => {
        startCountdown(item);
    });
}

// Start Countdown for Item
function startCountdown(item) {
    const countdownElement = document.getElementById(`countdown-${item.id}`);

    countdownIntervals[item.id] = setInterval(() => {
        const now = Date.now();
        const timeLeft = item.endTime - now;

        if (timeLeft <= 0) {
            clearInterval(countdownIntervals[item.id]);
            countdownElement.textContent = 'ENDED';
            countdownElement.style.color = '#ff0000';

        // End auction
        endAuction(item);
        return;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    countdownElement.textContent = timeString;

    // Change color based on time left
    if (timeLeft < 5 * 60 * 1000) {
        countdownElement.style.color = '#ff0000';
    } else if (timeLeft < 30 * 60 * 1000) {
        countdownElement.style.color = '#ff9800';
    } else {
        countdownElement.style.color = '#02AA8B';
    }
}, 1000);
}

// Open Bidding Modal
function openBiddingModal(itemId) {
    currentItem = auctionItems.find(item => item.id === itemId);
    if (!currentItem) return;

    // Update modal content
    document.getElementById('modalImage').src = currentItem.image;
    document.getElementById('modalTitle').textContent = currentItem.title;
    document.getElementById('modalSubtitle').textContent = currentItem.subtitle;
    document.getElementById('modalCurrentBid').textContent = `$${currentItem.currentBid.toLocaleString()}`;
    document.getElementById('modalIncrement').textContent = `$${currentItem.minIncrement.toLocaleString()}`;
    document.getElementById('modalBidders').textContent = currentItem.bidders;
    document.getElementById('modalCondition').textContent = currentItem.condition;

    // Update bid display
    document.getElementById('displayCurrentBid').textContent = `$${currentItem.currentBid.toLocaleString()}`;
    document.getElementById('displayMinBid').textContent = (currentItem.currentBid + currentItem.minIncrement).toLocaleString();

    // Set minimum bid input
    const bidInput = document.getElementById('bidAmount');
    bidInput.min = currentItem.currentBid + currentItem.minIncrement;
    bidInput.value = currentItem.currentBid + currentItem.minIncrement;

    // Load bid history
    loadBidHistory();

    // Show modal
    biddingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Start countdown in modal
    startModalCountdown();
    }

    // Start Countdown in Modal
    function startModalCountdown() {
        const timeElement = document.getElementById('modalTime');

        const interval = setInterval(() => {
            const now = Date.now();
            const timeLeft = currentItem.endTime - now;

            if (timeLeft <= 0) {
                clearInterval(interval);
                timeElement.textContent = 'AUCTION ENDED';
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft% (1000 * 60)) / 1000);

            timeElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    // Load Bid History
    function loadBidHistory() {
        const bidHistory = document.getElementById('bidHistory');
        bidHistory.innerHTML = '';

        currentItem.bids.forEach(bid => {
            const bidItem = document.createElement('div');
            bidItem.className = 'bid-item';
            bidItem.innerHTML = `
            <div class="bidder-info">
                <div class="bidder-avatar">${bid.bidder.charAt(0)}</div>
                <div>
                    <div class="bidder-name">${bid.bidder}</div>
                    <div class="bid-time">${bid.time}</div>
                </div>
            </div>
            <div class="bid-amount-history">$${bid.amount.toLocaleString()}</div>
            `;
            bidHistory.appendChild(bidItem);
        });
    }

    // Quick Bid Functions
    function quickBid() {
        const increment = event.target.textContent.includes('100') ? 100 : 500;
        const newBid = currentItem.currentBid + increment;

        document.getElementById('bidAmount').value = newBid;
    }

    // Place Bid
    function placeBid() {
        const bidInput = document.getElementById('bidAmount');
        const bidAmount = parseInt(bidInput.value);

        // Validation
        if (!bidAmount || isNaN(bidAmount)) {
            showToast('Please enter a Valid Bid Amount', 'Error');
            return;
        }

        if (bidAmount < currentItem.currentBid + currentItem.minIncrement) {
            showToast(`Minimum Bid is $${(currentItem.currentBid + currentItem.minIncrement).toLocaleString()}`,'warning');
            return;
        }

        // Place the bid
        const newBid = {
            bidder: 'You',
            amount: bidAmount,
            time: 'Just now'
        };

        // Update current item
        currentItem.currentBid = bidAmount;
        currentItem.bidders += 1;
        currentItem.bids.unshift(newBid);

        // Update UI
        document.getElementById('modalCurrentBid').textContent = `$${bidAmount.toLocaleString()}`;
        document.getElementById('displayCurrentBid').textContent = `$${bidAmount.toLocaleString()}`;
        document.getElementById('modalBidders').textContent = currentItem.bidders;
        document.getElementById('displayMinBid').textContent = (bidAmount + currentItem.minIncrement).toLocaleString();

        // Update bid input
        bidInput.value = bidAmount + currentItem.minIncrement;
        bidInput.min = bidAmount + currentItem.minIncrement;

        // Reload bid history
        loadBidHistory();

        // Show success message
        showToast(`Bid placed Successfully! $${bidAmount.toLocaleString()}`, 'success');

        // Simulate other bidders
        simulateOtherBidders();

        // Update main grid
        displayAuctionItems();
    }

    // Simulate Other Bidders
    function simulateOtherBidders() {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                const bidderNames = ['Collector_X', 'Auction_Pro'];
                const randomBidder = bidderNames[Math.floor(Math.random() * bidderNames.length)];
                const bidIncrement = currentItem.minIncrement * (Math.floor(Math.random() * 3) + 1);
                const newBid = currentItem.currentBid + bidIncrement;

                const otherBid = {
                    bidder: randomBidder,
                    amount: newBid,
                    time: 'Just Now'
                };

                currentItem.currentBid = newBid;
                currentItem.bids.unshift(otherBid);

                // Update modal
                document.getElementById('modalCurrentBid').textContent = `$${newBid.toLocaleString()}`;
                document.getElementById('displayCurrentBid').textContent = `$${newBid.toLocaleString()}`;
                document.getElementById('modalBidders').textContent = currentItem.bidders;
                document.getElementById('displayMinBid').textContent = (newBid + currentItem.minIncrement).toLocaleString();

                bidInput.value = newBid + currentItem.minIncrement;
                bidInput.min = newBid + currentItem.minIncrement;

                loadBidHistory();

                showToast(`${randomBidder} bid $${newBid.toLocaleString()}`, 'warning');

                // Update main grid
                displayAuctionItems();
            }
        }, Math.random() * 5000 + 2000); // 2-7 seconds delay
    }

    // End Auction
    function endAuction(item) {
        // Find the winning bid
        const winningBid = item.bids[0];

        // Show end of auction message
        if (currentItem && currentItem.id === item.id) {
            showToast(`Auction ended Winner: ${winningBid.bidder} with $${winningBid.amount.toLocaleString()}`, `success`);
        }
    }


    // Setup Event Listeners
    function setupEventListeners() {
        // Close modal
        closeModal.addEventListener('click', () => {
            biddingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target === biddingModal) {
                biddingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Show Toast Notification
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }