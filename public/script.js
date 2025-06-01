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
  menuIcon.style.display = isOpen ? 'none' : 'inline';
  closeIcon.style.display = isOpen ? 'inline' : 'none';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      navMenu.classList.remove('active');
      menuIcon.style.display = 'inline';
      closeIcon.style.display = 'none';
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  });
});

// ==========================
// Intro Title Animation + Loader
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const titles = [
    "Software Engineer",
    "Full-Stack Developer",
    "Database Manager & Designer",
    "Mobile App Development",
    "Welcome To My World"
  ];
  const titleText = document.getElementById("title-text");
  const introLoader = document.getElementById("intro-loader");
  const mainSite = document.getElementById("main-site");

  if (titleText && introLoader && mainSite) {
    titles.forEach((title, i) => {
      setTimeout(() => {
        titleText.textContent = title;
      }, i * 3000);
    });

    setTimeout(() => {
      introLoader.style.display = "none";
      mainSite.style.display = "block";
    }, titles.length * 3000 + 500);
  }

  const skipText = document.getElementById("skip-text");
  skipText?.addEventListener("click", () => {
    introLoader.style.display = "none";
    mainSite.style.display = "block";
  });
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
