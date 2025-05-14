/* functionality to toggle the menu list on the mobile/tablet devices.
This function is called on each page of the project.
*/
export function toggleMobileMenu() {
    document.addEventListener("DOMContentLoaded", function () {
        let menuIcon = document.querySelector('.material-icons');

        let mobileMenuList = document.querySelector('.mobile-menu-list');

        if (menuIcon) {
            mobileMenuList.style.display = 'none';
            menuIcon.addEventListener('click', toggleMenu);
        } else {
            console.log('Not Found!')
        }

        function toggleMenu() {
            mobileMenuList.style.display = mobileMenuList.style.display === 'none' ? 'flex' : 'none';
        }
    }
    )
}

