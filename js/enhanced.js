/**
 * Houseworld Immersive - Enhanced Interactions
 * Parallax scrolling, lightbox gallery, and scroll animations
 */

// ==================== PARALLAX SCROLLING ====================

function initParallax() {
  const parallaxElements = document.querySelectorAll('.hero-image, .parallax-image');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      // Get the element's position
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      
      // Only apply parallax when element is in viewport
      if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
        const offset = (scrolled - elementTop) * 0.5; // 0.5 = parallax speed
        element.style.transform = `translateY(${offset}px)`;
      }
    });
  });
}

// ==================== LIGHTBOX GALLERY ====================

let currentImageIndex = 0;
let galleryImages = [];

function initLightbox() {
  // Add lightbox capability to all gallery images
  const images = document.querySelectorAll('.gallery-image');
  
  images.forEach((img, index) => {
    // Add click handler
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(index));
    
    // Store image data
    galleryImages.push({
      src: img.src,
      alt: img.alt
    });
  });
  
  // Create lightbox HTML
  createLightboxHTML();
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboard);
}

function createLightboxHTML() {
  const lightboxHTML = `
    <div id="lightbox" class="lightbox">
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
      <button class="lightbox-next" aria-label="Next image">&#8250;</button>
      <div class="lightbox-content">
        <img id="lightbox-image" src="" alt="">
        <div class="lightbox-caption" id="lightbox-caption"></div>
      </div>
      <div class="lightbox-counter" id="lightbox-counter"></div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  
  // Add event listeners
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', prevImage);
  document.querySelector('.lightbox-next').addEventListener('click', nextImage);
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const counter = document.getElementById('lightbox-counter');
  
  img.src = galleryImages[index].src;
  caption.textContent = galleryImages[index].alt;
  counter.textContent = `${index + 1} / ${galleryImages.length}`;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  openLightbox(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentImageIndex);
}

function handleKeyboard(e) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
}

// ==================== MOBILE NAV ====================

function toggleNav() {
  const nav = document.querySelector('.main-nav');
  nav.classList.toggle('active');
}

// Close nav when clicking outside
document.addEventListener('click', function(event) {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');
  
  if (!nav.contains(event.target) && !toggle.contains(event.target)) {
    nav.classList.remove('active');
  }
});

// ==================== SCROLL ANIMATIONS (Options for user to choose) ====================

// OPTION 1: Subtle Fade-In on Scroll
function initFadeInScroll() {
  const sections = document.querySelectorAll('.content-section, .press-item, .mailing-list');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.add('fade-in-scroll');
    observer.observe(section);
  });
}

// OPTION 2: Staggered Slide-Up (more dramatic)
function initSlideUpScroll() {
  const sections = document.querySelectorAll('.content-section, .press-item, .image-gallery');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up-visible');
      }
    });
  }, { threshold: 0.15 });
  
  sections.forEach(section => {
    section.classList.add('slide-up-scroll');
    observer.observe(section);
  });
}

// OPTION 3: Theatrical Reveal (spotlight effect)
function initTheatricalReveal() {
  const sections = document.querySelectorAll('.content-section, .press-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('theatrical-visible');
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(section => {
    section.classList.add('theatrical-scroll');
    observer.observe(section);
  });
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initLightbox();
  
  // OPTION 2 - Staggered Slide-Up: ACTIVATED
  initSlideUpScroll();
});
