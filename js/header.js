import { toggleMobileMenu } from "./toggle-menu.js";

export const headerNav = `
 <!-- Begin of Header section-->
  <a class="skip-to-content" href="#main">Skip to content</a>
  <nav class="nav">
  <div class="logo-holder"> 
   <a href="/index.html">
      <img src="/images/charitable_logo.png" class="charitable-logo" alt="Charitable logo">
    </a>
    <div class="menu-icon">
    <i class="material-icons">menu</i>
    </div>
  </div>
    <!-- Desktop menu list -->
   <div class="menu-holder">
    <ul class="desktop-menu-list">
      <li><a href="/" class="home-page">Home</a></li>
      <li><a href="/projects/project.html" class="project-page">Projects</a></li>
      <li><a href="/register/register.html" class="register-page">Register</a></li>
      <li><a href="/contact/contact.html" class="contact-page">Contact</a></li>
       <li><div class="donate"><a href="https://fundrazr.com/" target="_blank" class="donate-page">Donate</a></div></li>
    </ul>
    
    <!-- Mobile menu list -->
    <ul class="mobile-menu-list">
      <li><a href="/" class="home-page">Home</a></li>
      <li><a href="/projects/project.html" class="project-page">Projects</a></li>
      <li><a href="/register/register.html" class="register-page">Register</a></li>
      <li><a href="/contact/contact.html" class="contact-page">Contact</a></li>
      <li><a href="https://fundrazr.com/" target="_blank"  class="donate-page">Donate</a></li>
    </ul>
   </div>
  </nav>
`
toggleMobileMenu();
