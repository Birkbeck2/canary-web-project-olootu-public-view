import { headerNav } from '../js/header.js';
import { footerNav } from '../js/footer.js';
import { insertHeroImage } from '../js/hero.js';
import { getRadioAndCheckBoxesValues } from '../js/custom/get-radio-checkboxes.js';


// declarations of require dom items
const header_container = document.querySelector('.header');
const footer_container = document.querySelector('footer');

// Form details
const register_form = document.querySelector('.register-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const telephone = document.querySelector('#telephone');
let email_check_btn = document.querySelector('input[name="email_preference"]');
let tel_check_btn = document.querySelector('input[name="tel_preference"]');
let radio_btn = document.querySelector('input[name="volunteer"]:checked');
const submit_btn = document.querySelector('#submit_btn');
const form = document.querySelector('#form');
const info = document.createElement('div');

const altText = 'Adult volunteers feeling happy to join ';
info.classList.add('form-error');
info.innerHTML = 'Please fill in all form fields.';


// get values fromcheckboxes and radio buttons
getRadioAndCheckBoxesValues("email_preference", email_check_btn);
getRadioAndCheckBoxesValues("tel_preference", tel_check_btn);
getRadioAndCheckBoxesValues("volunteer", radio_btn);


// checks to ensure variables are not null before inserting
// header and footer to DOM
if (header_container || footer_container) {
    header_container.innerHTML = headerNav;
    footer_container.innerHTML = footerNav;
    insertHeroImage('.hero', 'three-volunteers', altText); // insert hero image dynamically
}

// Submit button EventListener
submit_btn.addEventListener('click', submitForm);
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

// handles web form submission
function submitForm() {
    // check for empty input fields
    if (name.value === '' || email.value === '' || telephone.value === ''
        || radio_btn.value === '' || (!email_check_btn.checked && !tel_check_btn.checked)
    ) {
        // check to prevent multiple error messages on the page.
        if (!register_form.contains(info)) {
            register_form.prepend(info);
        }
        return
    }
    const formDetails = {
        fullName: name.value,
        email: email.value,
        telephone: telephone.value,
        experience: radio_btn.value,
        email_preference: email_check_btn.value,
        tel_preference: tel_check_btn.value
    }
    // store details in localStorage
    localStorage.setItem('web-form', JSON.stringify(formDetails));

    // display personalised acknowledgement message on the page.
    register_form.innerHTML = `
    <h3>Thank you ${name.value.toUpperCase()} for your registration</h3>
    <p>You will be contacted soon on your contact preference(<strong>${email_check_btn.checked ? 'Email' : ''}
    ${tel_check_btn.checked && email_check_btn.checked ? ', ' : ''}
    ${tel_check_btn.checked ? 'Telephone' : ''}</strong>).
    Your registered email address is: <strong>${email.value}</strong>.`
}