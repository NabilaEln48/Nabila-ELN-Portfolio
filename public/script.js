// ==========================
// Mobile Navigation Menu Toggle
// ==========================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menuToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const isOpen = navMenu.classList.contains('active');
  if (menuIcon) menuIcon.style.display = isOpen ? 'none' : 'inline';
  if (closeIcon) closeIcon.style.display = isOpen ? 'inline' : 'none';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      navMenu?.classList.remove('active');
      if (menuIcon) menuIcon.style.display = 'inline';
      if (closeIcon) closeIcon.style.display = 'none';
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  });
});

// ==========================
// Intro Loader (no titles, instant)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const introLoader = document.getElementById("intro-loader");
  const mainSite = document.getElementById("main-site");
  const skipText = document.getElementById("skip-text");

  const showSite = () => {
    if (introLoader) introLoader.style.display = "none";
    if (mainSite) mainSite.style.display = "block";
  };

  // No waiting—show the site right away
  showSite();

  // Keep skip working in case CSS shows the loader for any reason
  skipText?.addEventListener("click", showSite);
});


// ==========================
// Service Cards - Flip on Click (Mobile)
// ==========================
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.service-card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
  });
});


// ==========================
// Experience Cards - Flip Functionality
// ==========================
function flipCard(card) {
  card.classList.toggle('flipped');
}

// Wait for DOM to be fully loaded before initializing experience cards
document.addEventListener('DOMContentLoaded', function() {
  // Initialize experience cards when DOM is ready
  const experienceCards = document.querySelectorAll('.experience-card');
  
  experienceCards.forEach(card => {
    // Remove any existing onclick attributes to avoid conflicts
    card.removeAttribute('onclick');
    
    card.addEventListener('click', function(e) {
      // Prevent flip if clicking on flip icon
      if (e.target.classList.contains('flip-icon')) {
        return;
      }
      flipCard(this);
    });

    // Handle flip icon clicks
    const flipIcon = card.querySelector('.flip-icon');
    if (flipIcon) {
      flipIcon.removeAttribute('onclick');
      flipIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        flipCard(card);
      });
    }
  });

  // Keyboard navigation for experience cards
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.experience-card.flipped').forEach(card => {
        card.classList.remove('flipped');
      });
    }
  });
});


// ==========================
// Mobile Robot Scroll Effect
// ==========================
if (window.innerWidth <= 768) {
  const robot = document.querySelector('.robot-3d');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (robot) {
      robot.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  });
}

// ==========================
// Swiper Carousel
// ==========================
if (document.querySelector('.projects-carousel')) {
  const swiper = new Swiper('.projects-carousel', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    effect: 'slide'
  });
}

// ==========================
// Theme Toggle by Clicking the Logo
// ==========================
const themeLogo = document.getElementById("theme-logo-toggle");
const htmlElement = document.documentElement;

function setTheme(mode) {
  htmlElement.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeLogo?.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// ===== Certifications: filter + show more =====
(function(){
  const grid = document.getElementById('cert-grid');
  const toggle = document.getElementById('cert-toggle');
  const filters = Array.from(document.querySelectorAll('.cert-filter'));
  const cards = Array.from(grid.querySelectorAll('.cert-card'));

  // How many non-featured to show initially (in addition to featured)
  const BASE_COUNT = 3;

  function applyVisibility(activeCategory, expandAll){
    // 1) filter
    const visible = cards.filter(card => {
      if (activeCategory === 'all') return true;
      return (card.dataset.category || '').includes(activeCategory);
    });

    // 2) reset
    cards.forEach(c => c.classList.remove('__visible'));

    // 3) featured are always shown if they match filter
    const featured = visible.filter(c => c.dataset.featured === 'true');

    // 4) add baseline count for compact view unless expanded
    const remainder = visible.filter(c => c.dataset.featured !== 'true');
    const toShow = expandAll ? visible : [...featured, ...remainder.slice(0, BASE_COUNT)];

    toShow.forEach(c => c.classList.add('__visible'));

    // 5) toggle button state
    const hiddenLeft = visible.length - toShow.length;
    toggle.style.display = hiddenLeft > 0 ? 'inline-block' : 'none';
    toggle.textContent = expandAll ? 'Show less' : `Show more (${hiddenLeft})`;
    toggle.setAttribute('aria-expanded', String(expandAll));
  }

  let currentFilter = 'all';
  let expanded = false;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFilter = btn.dataset.filter || 'all';
      expanded = false;
      applyVisibility(currentFilter, expanded);
    });
  });

  toggle.addEventListener('click', () => {
    expanded = !expanded;
    applyVisibility(currentFilter, expanded);
  });

  // init
  applyVisibility(currentFilter, expanded);
})();
