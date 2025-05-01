document.addEventListener("DOMContentLoaded", function () {
 const navbar = document.getElementById("navbarNav");
 const navbarParent = navbar.closest(".navbar");

 const windowHeight = window.innerHeight - 60;

 // Add transparent class on load
 navbarParent.classList.add("transparent");

 // Change navbar on scroll
 window.addEventListener("scroll", function () {
  // Check if the page is scrolled more than 100vh
  if (window.scrollY > windowHeight) {
   navbarParent.classList.remove("transparent");
   navbarParent.classList.add("scrolled");
  } else {
   navbarParent.classList.remove("scrolled");
   navbarParent.classList.add("transparent");
  }
 });


 // Get all elements with click-scroll class
 const clickScrollElements = document.querySelectorAll('.click-scroll');

 // Add click event listener to each element
 clickScrollElements.forEach(element => {
  element.addEventListener('click', function (e) {
   e.preventDefault();

   // Get the target section id from href attribute
   const targetId = this.getAttribute('href');
   const targetSection = document.querySelector(targetId);

   if (targetSection) {
    const offsetTop = targetSection.offsetTop - 59; // Same offset as navbar height

    window.scrollTo({
     top: offsetTop,
     behavior: 'smooth'
    });
   }
  });
 });

 // Handle active state for nav items
 const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
 const sections = document.querySelectorAll('section[id^="section_"]');

 function setActiveNavItem() {
  const scrollPosition = window.scrollY + 60; // Add small offset for better accuracy

  sections.forEach((section, index) => {
   if (section.offsetTop <= scrollPosition &&
    (section.offsetTop + section.offsetHeight) > scrollPosition) {

    navLinks.forEach(link => {
     link.classList.remove('active');
     link.classList.add('inactive');
    });

    if (navLinks[index]) {
     navLinks[index].classList.add('active');
     navLinks[index].classList.remove('inactive');
    }
   }
  });
 }

 // Initialize nav links
 navLinks.forEach(link => link.classList.add('inactive'));
 if (navLinks[0]) {
  navLinks[0].classList.add('active');
  navLinks[0].classList.remove('inactive');
 }

 // Add scroll event listener
 window.addEventListener('scroll', setActiveNavItem);
});

(function ($) {

 "use strict";

 // MENU
 $(document).on('click', '.navbar-collapse a', function () {
  $(".navbar-collapse").collapse('hide');
 });

 // CUSTOM LINK
 $('.smoothscroll').click(function () {
  var el = $(this).attr('href');
  var elWrapped = $(el);
  var header_height = $('.navbar').height();

  scrollToDiv(elWrapped, header_height);
  return false;

  function scrollToDiv(element, navheight) {
   var offset = element.offset();
   var offsetTop = offset.top;
   var totalScroll = offsetTop - navheight;

   $('body,html').animate({
    scrollTop: totalScroll
   }, 300);
  }
 });

})(window.jQuery);