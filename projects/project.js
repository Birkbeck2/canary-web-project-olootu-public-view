import { headerNav } from '../js/header.js';
import { footerNav } from '../js/footer.js';
import { insertHeroImage } from '../js/hero.js';
import { projectData } from '../js/project-data.js';

let projectDataItems = [];
let dataFromLocalStorage = localStorage.getItem('projects');

// declarations of require dom elements
const header_container = document.querySelector('.header');
const footer_container = document.querySelector('footer');
const news = document.querySelector('.news');
const ascBtn = document.querySelector('.asc-btn');
const descBtn = document.querySelector('.desc-btn');
const searchInput = document.querySelector('#searchInput');
const altText = 'Volunteers delibrating on a new project';

// Check if data already exists in localStotrage else populate with local data
if (dataFromLocalStorage) {
    projectDataItems = JSON.parse(dataFromLocalStorage);
} else {
    projectDataItems = projectData;
}

/* checks to ensure variables are not null before inserting to DOM
** After check, insert header, footer and Hero image
** dynamically on the page
*/
if (header_container || footer_container) {
    header_container.innerHTML = headerNav;
    footer_container.innerHTML = footerNav;
    insertHeroImage('.hero', 'boysandgirls', altText); // insert hero image dynamically
}

// Generic function to display data on the html page
const projectDataToScreen = (responseData) => {
    if (responseData && responseData !== undefined) {
        responseData.forEach(data => {
            const div = document.createElement("div");
            div.innerHTML += `
         <div class="project-details">
            <div class="item slug">
            <img src="../images/${data.image}.jpg" alt="${data.projectTitle} picture">
            </div>
            <div class="item details">
            <h2>${data.projectTitle}</h2>
            <p>Duration:
            ${data.duration}
            </p>
            <p>Description:
            ${data.description}
            </p>
            <div class="join-proj">
            <a href="#" id="${data.id}" class="join-btn">Join this project</a>
            
            <span class="likes">
            <i class="material-icons" id="${data.id}">thumb_up </i>
            <span class="likes-count"> ${data.likes} </span>

            <i class="material-icons down-vote" id="${data.id}">thumb_down </i>
            <span class="likes-count"> ${data.disLikes} </span>
            </span>
             </div>
            </div>
            
        </div>
        `;
            div.querySelector(".material-icons").addEventListener("click", function (e) {
                const className = e.target.getAttribute('class');
                updateLike(data.id, className);
            });
            div.querySelector(".material-icons.down-vote").addEventListener("click", function (e) {
                const className = e.target.getAttribute('class');
                updateLike(data.id, className);
            });
            news.appendChild(div);
        })
    }
}

/****
 ** Display data on page first load
*****/
projectDataToScreen(projectDataItems);
/**** */


// Form to be filled by any user willing to join a project
const joinDiv = document.createElement('div');
joinDiv.classList.add('new-join');
joinDiv.innerHTML = `
            <div class="join-form"> 
            <span class="close">X (close)</span>
                <form>
                <label for="name">Name: </label>
                <input id="name" type="text">
                 <label for="email">Email: </label>
                <input id="email" type="text">
                <label for="tel">Telephone: </label>
                <input id="tel" type="text"> <br>
                <button class="join-send">Join</button>
                </form>
            </div>
            `;
const message = document.createElement('span');
const errMessage = document.createElement('span');
message.classList.add('message-text');
errMessage.classList.add('message-text');

/* Finds the ".join" button from the DOM and loop through.
** Opens the New Joiner form
** Closes the form if the close (X) icon is click.
** If the "Join" button is clicked: It closes the form, Add border indicator to the parent element
** Adds an acknowledgement message on the element
*/

document.querySelectorAll('.join-btn')
    .forEach(item => {
        message.innerHTML = '';
        const parentNode = item.closest('.details');
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const id = e.target.getAttribute('id');
            const data = projectDataItems.filter(item => item.id === parseInt(id));

            parentNode.appendChild(joinDiv);
            const closeBtn = document.getElementsByClassName('close');
            const joinSend = document.querySelector('.join-send');
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const telephone = document.querySelector('#tel');
            const newJoiner = document.querySelector('.join-form');
            // Exit, with no action,  if the close buttun is pressed
            if (closeBtn) {
                closeBtn[0].addEventListener('click', function (e) {
                    e.preventDefault();
                    joinDiv.remove();
                })
            }
            // validate the join form and action, if the "Join" button is pressed
            if (joinSend) {
                message.innerHTML = '';
                errMessage.innerHTML = '';
                joinSend.addEventListener('click', function (e) {
                    e.preventDefault();
                    const topParentNode = e.target.closest('.details');
                    if (!name?.value && !email?.value && !telephone?.value) {
                        errMessage.innerHTML = 'Fill all fields';
                        newJoiner.prepend(errMessage);
                        return;
                    }

                    // if no form errors, reset form values
                    name.value = '';
                    email.value = '';
                    telephone.value = '';
                    joinDiv.remove();
                    message.innerHTML = '';
                    errMessage.innerHTML = '';
                    // add left border
                    topParentNode.classList.add('join-border')
                    // Send thank you message
                    message.innerHTML = `Thanks for joining the project.`;
                    topParentNode.prepend(message);
                })
            }
        })
    });

/**** 
 ** EVENT LISTENERS
*****/
// sort data in Ascending order on Asc button click
ascBtn.addEventListener('click', function () {
    sortItems('asc');
});

// sort data in Descending order on Desc button click
descBtn.addEventListener('click', function () {
    sortItems('desc');
});

// Function to sort data based on which button is click from the page
function sortItems(order) {
    news.innerHTML = '';
    if (order === 'asc') {
        projectDataItems.sort((a, b) => a.projectTitle.localeCompare(b.projectTitle));
        projectDataToScreen(projectDataItems);
    } else {
        if (order === 'desc') {
            projectDataItems.sort((a, b) => b.projectTitle.localeCompare(a.projectTitle));
            projectDataToScreen(projectDataItems);
        }
    }
}

// Search data through the input field
searchInput.addEventListener('input', function (e) {
    news.innerHTML = '';
    const filteredData = projectDataItems.filter(set => set.projectTitle.toLowerCase().includes(searchInput.value));
    projectDataToScreen(filteredData);

    if (filteredData.length === 0) {
        news.innerHTML = `<h2> No Data found for "${searchInput.value.toUpperCase()}" </h2>
        <p>Refine your search and use only lowercase. </p>`
    }
});

// query the DOM for the likes icons and update the "votes"
document.querySelectorAll(".material-icons").forEach(lk => {
    lk.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = e.target.getAttribute("id");
        const className = e.target.getAttribute("class");
        updateLike(id, className);
    })
})
document.querySelectorAll(".material-icons.down-vote").forEach(lk => {
    lk.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = e.target.getAttribute("id");
        const className = e.target.getAttribute("class");
        updateLike(id, className);
    })
})

// runs the likes/dislikes functionality
function updateLike(id, className) {
    news.innerHTML = "";
    let findItem = projectDataItems.find(item => item.id === parseInt(id));
    if (findItem) {
        if (className.includes('down-vote')) {
            findItem.disLikes += 1;
        } else {
            findItem.likes += 1;
        }

        if (className.includes('join-border')) {
            console.log(className)
        } else {
            findItem.likes += 1;
        }

        // Ensure the data is updated
        projectDataItems = projectDataItems.map(item =>
            item.id === findItem.id ? findItem : item
        );

        // Store updates to localStorage
        localStorage.setItem('projects', JSON.stringify(projectDataItems));

        // update the UI with the new likes count
        projectDataToScreen(projectDataItems);

    } else {
        console.log("Item not found");
    }
}