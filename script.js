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

function initializeImageViewer() {
 const DOM = {
  viewer: document.getElementById('imageViewer'),
  image: document.getElementById('expandedImg'),
  controls: {
   close: document.querySelector('.close-btn'),
   prev: document.querySelector('.nav-btn.prev'),
   next: document.querySelector('.nav-btn.next'),
   zoom: document.createElement('div')
  }
 };

 const state = {
  currentIndex: 0,
  images: [],
  scale: 1,
  isDragging: false,
  transform: { x: 0, y: 0 },
  pointer: { x: 0, y: 0 },
  touch: {
   start: { x: 0, y: 0 },
   move: { x: 0, y: 0 },
   distance: 0
  },
  config: {
   maxZoom: 5,
   minZoom: 1,
   zoomStep: 1.5,
   swipeThreshold: 50
  }
 };

 // Initialize zoom controls
 function setupZoomControls() {
  DOM.controls.zoom.className = 'zoom-controls';
  DOM.controls.zoom.innerHTML = `
            <button class="zoom-btn zoom-in">+</button>
            <button class="zoom-btn zoom-out">-</button>
            <button class="zoom-btn zoom-reset">↺</button>
        `;
  DOM.viewer.appendChild(DOM.controls.zoom);

  DOM.controls.zoom.querySelector('.zoom-in').onclick = () => handleZoom(1);
  DOM.controls.zoom.querySelector('.zoom-out').onclick = () => handleZoom(-1);
  DOM.controls.zoom.querySelector('.zoom-reset').onclick = resetView;
 }

 function updateTransform() {
  const { x, y } = state.transform;
  DOM.image.style.transform = `translate(${x}px, ${y}px) scale(${state.scale})`;
 }

 function toggleNavigationButtons(show) {
  const display = show ? 'block' : 'none';
  DOM.controls.prev.style.display = display;
  DOM.controls.next.style.display = display;
 }

 function resetView() {
  state.scale = 1;
  state.transform = { x: 0, y: 0 };
  updateTransform();
  DOM.image.style.cursor = 'default';
  toggleNavigationButtons(true);
 }

 function handleZoom(direction, factor = state.config.zoomStep) {
  const prevScale = state.scale;
  state.scale = direction > 0
   ? Math.min(state.scale * factor, state.config.maxZoom)
   : Math.max(state.scale / factor, state.config.minZoom);

  if (prevScale !== state.scale) {
   if (state.scale === 1) {
    state.transform = { x: 0, y: 0 }; // Reset position when zoomed out
   }
   DOM.image.style.cursor = state.scale > 1 ? 'grab' : 'default';
   toggleNavigationButtons(state.scale === 1);
   updateTransform();
  }
 }

 function showImage(index) {
  if (index >= 0 && index < state.images.length) {
   DOM.image.src = state.images[index];
   state.currentIndex = index;
   resetView();
  }
 }

 function handleSwipe(deltaX) {
  if (state.scale === 1 && Math.abs(deltaX) > state.config.swipeThreshold) {
   const direction = deltaX > 0 ? -1 : 1;
   const newIndex = state.currentIndex + direction;

   if (newIndex >= 0 && newIndex < state.images.length) {
    showImage(newIndex);
   } else {
    // Bounce effect if at end of gallery
    state.transform.x = 0;
    updateTransform();
   }
  } else {
   state.transform.x = 0;
   updateTransform();
  }
 }

 function handleOutsideClick(e) {
  // Check if click is outside the image and zoom controls
  if (!DOM.image.contains(e.target) &&
   !DOM.controls.zoom.contains(e.target) &&
   !DOM.controls.prev.contains(e.target) &&
   !DOM.controls.next.contains(e.target)) {
   DOM.viewer.style.display = 'none';
   resetView();
  }
 }

 const handlers = {
  mouse: {
   down: (e) => {
    e.preventDefault();
    state.isDragging = true;
    state.pointer = { x: e.clientX, y: e.clientY };
    DOM.image.style.cursor = state.scale > 1 ? 'grabbing' : 'default';
    DOM.image.style.transition = 'none';
   },
   move: (e) => {
    if (!state.isDragging) return;

    const deltaX = e.clientX - state.pointer.x;
    const deltaY = e.clientY - state.pointer.y;

    if (state.scale > 1) {
     // Pan when zoomed in
     state.transform.x += deltaX;
     state.transform.y += deltaY;
    }

    updateTransform();
    state.pointer = { x: e.clientX, y: e.clientY };
   },
   up: () => {
    if (!state.isDragging) return;

    DOM.image.style.transition = 'transform 0.3s ease-out';

    if (state.scale === 1) {
     handleSwipe(state.transform.x);
    }

    state.isDragging = false;
    DOM.image.style.cursor = state.scale > 1 ? 'grab' : 'default';
   },
   wheel: (e) => {
    e.preventDefault();
    handleZoom(e.deltaY < 0, 1.1);
   }
  },
  touch: {
   start: (e) => {
    if (e.touches.length === 1) {
     const touch = e.touches[0];
     state.isDragging = true;
     state.pointer = { x: touch.clientX, y: touch.clientY };
     state.touch.start = { x: touch.clientX, y: touch.clientY };
     DOM.image.style.transition = 'none';
    } else if (e.touches.length === 2) {
     state.touch.distance = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY
     );
    }
   },
   move: (e) => {
    if (e.touches.length === 1 && state.isDragging) {
     const touch = e.touches[0];
     const deltaX = touch.clientX - state.pointer.x;
     const deltaY = touch.clientY - state.pointer.y;

     if (state.scale > 1) {
      state.transform.x += deltaX;
      state.transform.y += deltaY;
     } else {
      state.transform.x = touch.clientX - state.touch.start.x;
     }

     updateTransform();
     state.pointer = { x: touch.clientX, y: touch.clientY };
    } else if (e.touches.length === 2) {
     const currentDistance = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY
     );
     handleZoom(currentDistance > state.touch.distance ? 1 : -1, 1.1);
     state.touch.distance = currentDistance;
    }
   },
   end: () => {
    if (!state.isDragging) return;

    DOM.image.style.transition = 'transform 0.3s ease-out';

    if (state.scale === 1) {
     handleSwipe(state.transform.x);
    }

    state.isDragging = false;
   }
  },
  keyboard: (e) => {
   if (DOM.viewer.style.display !== 'block') return;

   const actions = {
    'ArrowRight': () => state.scale === 1 && showImage(state.currentIndex + 1),
    'ArrowLeft': () => state.scale === 1 && showImage(state.currentIndex - 1),
    'Escape': () => {
     DOM.viewer.style.display = 'none';
     resetView();
    },
    '+': () => handleZoom(1),
    '=': () => handleZoom(1),
    '-': () => handleZoom(-1),
    '_': () => handleZoom(-1)
   };

   if (actions[e.key]) {
    e.preventDefault();
    actions[e.key]();
   }
  },
  outside: {
   click: (e) => {
    if (state.isDragging) return; // Don't close if dragging
    handleOutsideClick(e);
   },
   touch: (e) => {
    if (state.isDragging) return; // Don't close if dragging
    if (e.touches.length === 1) { // Only handle single touch
     handleOutsideClick(e.touches[0]);
    }
   }
  }
 };

 DOM.viewer.addEventListener('mousedown', handlers.outside.click);
 DOM.viewer.addEventListener('touchstart', handlers.outside.touch);

 // Setup event listeners
 setupZoomControls();

 DOM.image.addEventListener('mousedown', handlers.mouse.down);
 document.addEventListener('mousemove', handlers.mouse.move);
 document.addEventListener('mouseup', handlers.mouse.up);
 DOM.viewer.addEventListener('wheel', handlers.mouse.wheel);

 DOM.viewer.addEventListener('touchstart', handlers.touch.start);
 DOM.viewer.addEventListener('touchmove', handlers.touch.move);
 DOM.viewer.addEventListener('touchend', handlers.touch.end);

 document.addEventListener('keydown', handlers.keyboard);

 DOM.controls.next.onclick = () => state.scale === 1 && showImage(state.currentIndex + 1);
 DOM.controls.prev.onclick = () => state.scale === 1 && showImage(state.currentIndex - 1);
 DOM.controls.close.onclick = () => {
  DOM.viewer.style.display = 'none';
  resetView();
 };

 // Initialize images
 document.querySelectorAll('img').forEach(img => {
  if (!img.closest('.navbar') && !img.closest('.image-viewer')) {
   state.images.push(img.src);
   img.addEventListener('click', () => {
    state.currentIndex = state.images.indexOf(img.src);
    showImage(state.currentIndex);
    DOM.viewer.style.display = 'block';
   });
  }
 });
}

document.addEventListener('DOMContentLoaded', initializeImageViewer);
