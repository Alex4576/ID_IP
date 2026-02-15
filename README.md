# ID_IP 
Github link: https://github.com/Alex4576/ID_IP.git <br>
Github pages: https://alex4576.github.io/ID_IP/
  
<h1>SPECIFICALLYRETRO</h1> 
<p>Our website is an ecommerce website which aims to market towards people who enjoy the collection of both vintage and retro musical items. Through features like auctions, they can purchase items which are rarer and exquisite, catering to richer and more dedicated enthusiasts. For people who just wish to purchase regular items, we also provide budget friendly options. We also provide services like selling your retro items to us, for those who have lost interest in the hobby, or just want more cash to purchase another product they like.<p> 
  
  
<h2>Design Process</h2> 
<p>For this website, we wanted to follow the same minimalist aesthetic of our app from figma. Therefore we used the same type of buttons, and same ype of backgrounds. 
WHO THIS WEBSITE IS FOR: Targets users who wish to purchase musical items which can no longer be found in normal stores, people who wish to purchase exquisite one of a kind musical pieces, as well as people who want to sell off their musical items. This project would benefit them greatly, as the affordability of our products allows people who are not so well off to also participate in this hobby. We also offer expert services to verify items sold to us would be authentic, so buyers can rest assured that items they purchase are 100% authentic. <p> 
 
  
<h3>User Stories</h3> 
<p> 
As a vintage item enthusiast, I want a website which provides a large array of vintage items, so that I can expand my collection . 
As a hardcore musical instrument collector, I want a website which hosts auctions for one-of-a-kind pieces of instruments, so that I can further expand my collection. 
As a person who has left the hobby of musical instrument and item collection, I want a website which offers to purchase my collection, so that I can earn some extra cash. 
</p> 
 
  
<h2>Features</h2>
- Login, Reset Password, Sign up Feature
<p>Users can login in using the account they have created as well as to change their account password</p>
- Responsive Navigation Bar 
<p>We have a navigation bar which allows users to go to each page of our website seamlessly</p>
- Product Detail Feature
<p>Pressing on the products leads them to a product detail page. This page allows users to view more information on the product as well as add product to cart and checkout.</p>
- Add to Cart Feature 
<p>By adding any of the items to the cart, the cart icon at the top right will increment as the number of items in cart increases, showing how many items are pending for purchase.</p>
- Checkout Feature 
<p>By pressing check out, items will be decremented from cart, and item will be purchased using saved credit card from profile page. If no items in cart and user presses checkout, error message pops up.</p>
- Profile Page feature 
<p>Displays different information like account name, address, and credit card in use. Users can press the button below to edit their username, location and cards used. The parts displayed will change upon pressing the save changes button after pressing the edit button. Users can also View their digital collectibles they have obtained.</p>
- Contact us form 
<p>A form which users must input in their name, email, along with their message. Upon completing all 3 fields, Pressing send would send the data to RESTDB to store the information.</p>
- Auction and bidding Feature  
<p>Users are able to press the item which they want to bid, and they can increment the amount they want to pay by either using the +$100 or + $500 button, or they can set their own price. They must offer at least $100 more than the previous highest bidder. When pressing bid, bid will show up on the interface. There is a chance another user will enter a bid right after you.</p>
- Calendar Feature 
<p>The calandar feature allows user to choose a date to get their items authenticated for sale. By pressing their preferred date, they would then be allowed to choose the time they want to meet, as well as be prompted to input their name. Data is then saved in Restdb</p>
- Currency Converter Feature
<p>Users can check how much our product cost based on the currency chosen</p>
  
<h3>Existing Features</h3> 
- Login, Reset Password, Sign up Feature
- Responsive Navigation Bar
- Auction Feature
- Add to Cart Feature
- View Product Detail Feature
- Checkout Feature
- Schedule Appointment Feature
- Contact Us Feature
- Edit Profile Feature
- Currency Converter Feature
- View Collectible Gallery
  
<h2>Technologies Used</h2> 
<p>HTML5</p>
- Provide the semantic structure and content for the web pages
<p>CSS3</p>
- Advanced styling, 3D transformations, and responsive layouts across different devices.
<p>JavaScript (ES6+)</p>
- handle dynamic logic, such as the currency converter API, the cart toggle (activeTabCart), and the bidding modal, as well as scheduling, leaving a message and the account detail saving features.

<h3>Frameworks & Libraries</h3>
<p>Bootstrap 5</p>
- The project uses Bootstrap to quickly implement responsive components like the navbar, buttons, and the grid system. 
<p>Lottie</p>
- Render high-quality, lightweight animations
<p>Google Fonts</p>
- import the "Orbitron" and "Urbanist" typefaces

<h3>Tools & Third-Party Integrations</h3>
<p>Sketchfab</p>
- Embed interactive 3D models into the collectible section of the site. 
<p>ExchangeRate-API</p>
- Power the real-time currency converter feature

<h3>Key JavaScript Technologies & Patterns</h3>
<p>DOM Manipulation & Web APIs</p>
- Uses the DOM API  to dynamically inject HTML content based on the auctionItems data array. 

<h3>Core Technologies & Tools</h3>
<p>Web Storage API</p>
- Uses localStorage to save the user's cart data directly in browser. This ensures that if a user refreshes the page or closes their tab, their selected items are still there when they return.

<h3>External Tools & Services</h3>
<p>RestDB.io</p>
- Acts as backend, storing the messages sent by users without needing to set up a dedicated server or write server-side code (Node.js, Python, etc.).
  
<h2>Assistive AI</h2> 
<p>ChatGPT was used to assist</p>
<p>In adding more fields for profile edit credit card info</p>
!(images/AssistiveAI1.png)
<p>Implement validation for auction place bid feature where once auction has ended user cant bid</p> 
!(images/AssistiveAI2.png)
!(images/AssistiveAI3.png)
!(images/AssistiveAI4.png)

<h2>Testing</h2> 
<p>User Information Storage</p>
<p>Press create account, then enter in both fields. Check if restdbio has stored data. If data can be stored correctly, move on to reset password feature, Enter new password and email. If the restdb updates the password, move on to login. If any portion does not work, check the api key and link if it is correct. Check if api key is able to post, get, put, delete. If all methods dont work, create new api and redo all fields.  
On auction page, users press on ended auction item, and see if they can bid. Make sure that they cannot place a bid down by pressing bid buttons. 
On contact Us page, make sure that all fields must be filled before sumbission. Error should appear if not all fields are filled 
On schedule page, Make sure that users can press each button on the interactive calendar, and a pop up should appear, prompting the user to fill in time, name and email. If not all fields pop up, place down error message. 
On profile page, make sure that the html updates if the user changes their name, shipping address and card information. 
On Currency converter page, make sure users can input the amount of cash to be translated, and also the countries to convert between should all be selectable. Output should also be accurate 
</p>
<p>Code validation for HTML, CSS and JavaScript</p>
  
<h2>Credits</h2> 
<p>Image Slider</p>
<p>https://www.youtube.com/watch?v=yqaLSlPOUxM</p>
<p>Responsive Navigation Bar</p> 
<p>https://www.youtube.com/watch?v=h5apE3E72wY&list=PLj0z0WBaTiH7jOjO7C0w2lSeuuisoiSR9</p>
<p>Responsive Login Page</p>
<p>https://www.youtube.com/watch?v=oF28ns9eVdc</p>
<p>Responsive Add Cart Shopping</p>
<p>https://www.youtube.com/watch?v=pM9tQ1u6oF0</p> 
<p>API Currency Converter</p> 
<p>https://www.youtube.com/watch?v=ZD_Yft-Qd9Y&list=PLNCevxogE3fiLT6bEObGeVfHVLnttptKv&index=12</p> 
<p>Calendar</p> 
<p>https://www.youtube.com/watch?v=Z1BGAivZRlE & TidyCal</p> 
<p>Auction</p> 
<p>https://www.youtube.com/watch?v=_8m6wHiJ7sA</p>  
  
<h3>Media</h3> 
<p>Photos used in this site were obtained from</p> 
<p>Images used in the Image Sliders, Retro Boombox, Vintage Radio, Vintage Gramophone and Vintage Brass Trumpet were taken from Freepik</p> 
<p>Icons used in this site were obtained from</p> 
<p>https://flowbite.com/icons/</p> 
<p>USB MP3 Music Player:</p> 
<p>https://www.pinterest.com/pin/62206038598905477/</p> 
<p>Vintage CD Player</p> 
<p>https://www.pinterest.com/pin/322218548314685793/</p> 
<p>Vintage Walkman</p> 
<p>https://www.pinterest.com/pin/7740630606425915/</p> 
<p>Cassette Player</p> 
<p>https://www.pinterest.com/pin/9429480466381815/</p> 
<p>Vinyl Record</p> 
<p>https://www.freepik.com/free-photo/vintage-looking-vinyl-record_15024205.htm#fromView=search&page=1&position=6&uuid=5248d6db-11a6-426c-8dbb-1cf7f9753e8f&query=vinyl</p>
<p>Cassette</p>
<p>https://www.pinterest.com/pin/774124915334283/</p>
<p>Vintage Electric Guitar</p>
<p>https://pixabay.com/photos/guitar-music-instrument-1022710/</p>
  
<h3>Acknowledgements</h3> 
<p>I received inspiration from the many different website layout designs found in Pinterest</p> 

<h2>Roles & Responsibilities</h2>
<p>Alex, ensure consistent design among all webpages & code compiler</p>
<p>Pages worked on</p>
- Login Page
- Product Catalogue Page
- Product Detail Page
- Auction Page
- Currency Converter Page
- Gallery Collectible Page

<p>Kayden, ensure website works smoothly such as user inputs is stored successfully in restdb as well as providing written content</p>
<p>Pages worked on</p>
- Forget Password & Sign Up Pages
- Schedule Page
- About Us Page
- Contact Us Page
- Profile Page
- Usage of restdb for Login, Forget, Sign Up, Schedule & Contact Pages
 
 