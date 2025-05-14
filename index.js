import { headerNav } from './js/header.js';
import { footerNav } from './js/footer.js';
import { insertHeroImage } from './js/hero.js';


// set of DOM selector queries on elements
const header_container = document.querySelector('.header');
const footer_container = document.querySelector('footer');
const project = document.querySelector('.item.project');
const register = document.querySelector('.item.register');
const contact = document.querySelector('.item.contact');
const altText = 'Charity image showing volunteers';


// insert header and footer on the page dynamically
if (header_container || footer_container) {
    header_container.innerHTML = headerNav;
    footer_container.innerHTML = footerNav;
    insertHeroImage('.hero', 'home-img', altText); // insert hero image dynamically
}

// Add evnet handle to click event to navigate to different pages
project.addEventListener('click', navigateTo.bind(null, 'project'), false);
register.addEventListener('click', navigateTo.bind(null, 'register'), false);
contact.addEventListener('click', navigateTo.bind(null, 'contact'), false);


// Function takes parameter and navigate to url based on the value of the parameter received.
function navigateTo(url) {
    console.log('url', url);
    if (url === 'project') {
        window.location.href = './projects/project.html';
    } else {
        if (url === 'register') {
            window.location.href = './register/register.html';
        } else {

            window.location.href = './contact/contact.html';
        }
    }
}