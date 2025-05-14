import { headerNav } from '../js/header.js';
import { footerNav } from '../js/footer.js';
import { insertHeroImage } from '../js/hero.js';


// declarations of require dom items
const header_container = document.querySelector('.header');
const footer_container = document.querySelector('footer');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const telephone = document.querySelector('#telephone');
const query = document.querySelector('#query');
const form_container = document.querySelector('.form-container');
const submit_btn = document.querySelector('#submit_btn');

const altText = 'Telephone picture with a lady making a call';
const info = document.createElement('div');
info.classList.add('info');


// checks to ensure variables are not null before inserting header or footer to the DOM
if (header_container || footer_container) {
    header_container.innerHTML = headerNav;
    footer_container.innerHTML = footerNav;
    insertHeroImage('.hero', 'contact', altText); // insert hero image dynamically
}

// submit btn event handler
submit_btn.addEventListener('click', submitForm);

// Form submit handler
function submitForm() {
    // Check for empty input fields and raise validation errors
    if (name.value === '' || telephone.value === '' || email.value === '' || query.value === '') {
        info.classList.add('error');
        info.innerHTML = 'Please fill in all fields';
        form_container.prepend(info);
        return

    }

    info.classList.remove('error');

    // pre-populate the form fields
    const formDetails = {
        fullName: name.value,
        telephone: telephone.value,
        email: email.value,
        query: query.value
    }

    // Save form details to localStorage.
    localStorage.setItem('Contact-form', JSON.stringify(formDetails));

    // successful submission info
    info.innerHTML = 'Form submitted successfully.';
    form_container.prepend(info);

    // set all fields to empty after form submission.
    name.value = ''
    telephone.value = '';
    email.value = '';
    query.value = '';

}