# Personal Web Portfolio

[![Website Preview](https://vercel.com/_next/image?url=%2Fapi%2Fscreenshot%3Fdark%3D1%26deploymentId%3Ddpl_5nvjMEjqZGez1MdwB9Cc2h8EBaKN%26teamId%3Drazanius12s-projects%26withStatus%3D1&w=640&q=75)](https://razanius12.vercel.app/)

A modern, responsive personal portfolio website showcasing my projects, experience, and certifications.

## Features

- Clean and modern design with smooth transitions
- Responsive layout that works across all devices
- Dynamic navbar with scroll effects
- Project showcase with live demos and source code links
- Experience timeline
- Interactive certificate gallery with carousels
- Social media integration
- Dark theme optimized for readability
- Bootstrap 5 framework integration

## Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery 3.7.1
- Bootstrap 5.3.5
- Font Awesome Icons
- Google Fonts

## Sections

1. **Home** - Hero section with introduction
2. **About** - Personal background and skills
3. **Works** - Project portfolio with descriptions and links
4. **Experience** - Professional timeline
5. **Certificate** - Interactive gallery of certifications
6. **Contact** - Social media links and contact information

## How to Modify the Page

### Changing Text Content

1. Open the `index.html` file
2. Locate the section you want to modify
3. Edit the text within the HTML tags
4. Example:

````html
<div class="text-center text-white">
 <h1 class="display-4">Your Name</h1>
 <p class="lead">Your tagline here</p>
</div>
````

### Modifying Styles

1. Open the `style.css` file
2. Find the relevant CSS rules
3. Modify properties as needed
4. Example:

````css
:root {
 --primary-color: #your-color;
 --secondary-color: #your-color;
}
````

### Adding New Projects

1. Open the `index.html` file
2. Locate the `works` section
3. Copy an existing project card and modify:

````html
<div class="col-md-4 mb-4">
 <div class="card bg-dark text-white">
  <img src="path/to/image.jpg" class="card-img-top" alt="Project Name">
  <div class="card-body">
   <h5 class="card-title">Project Name</h5>
   <p class="card-text">Project description</p>
  </div>
  <div class="card-footer">
   <!-- Add social/demo links -->
  </div>
 </div>
</div>
````

### Adding New Certificates

1. Add certificate images to `img/certificate/` directory
2. In `index.html`, copy existing certificate card structure
3. Update image paths and details
4. For multiple images, use carousel structure:

````html
<div id="uniqueID" class="carousel slide">
 <div class="carousel-inner">
  <div class="carousel-item active">
   <img src="path/to/image1.jpg" class="card-img-top">
  </div>
  <!-- Add more carousel items -->
 </div>
</div>
````

### Modifying Navigation

The script.js file handles:

- Navbar transparency on scroll
- Smooth scrolling to sections
- Active section highlighting
- Mobile menu functionality

To add new navigation items:

1. Add new section in index.html
2. Add corresponding nav item:

````html
<li class="nav-item">
 <a class="nav-link click-scroll" href="#section_id">Section Name</a>
</li>
````

## Deployment

The site uses standard static hosting and can be deployed on:

- GitHub Pages
- Vercel
- Netlify
- Any static web host

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Credits

- Developed by [Razanius12](https://github.com/Razanius12)
- Bootstrap Framework
- Font Awesome Icons
- jQuery Library

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Razanius12

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
