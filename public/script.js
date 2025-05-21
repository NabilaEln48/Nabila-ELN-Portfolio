// ==========================
// Mobile Navigation Menu
// ==========================

const toggleBtn = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Open menu on ☰ click
toggleBtn.addEventListener('click', () => {
  navMenu.classList.add('active');
});

// Close menu on nav link click (with delay + smooth scroll)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault(); // Only prevent for internal page links
      const target = link.getAttribute('href');

      navMenu.classList.remove('active');

      setTimeout(() => {
        window.location.href = target;
      }, 200);
    }
  });
});


// ==========================
// Intro Title Animation
// ==========================

const titles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Database Manager & Designer",
  "Welcome To My World",
];

const titleText = document.getElementById("title-text");

// Loop through titles every 3 seconds
titles.forEach((title, i) => {
  setTimeout(() => {
    titleText.textContent = title;
  }, i * 3000);
});

// Hide intro loader and show main site after all titles
setTimeout(() => {
  document.getElementById("intro-loader").style.display = "none";
  document.getElementById("main-site").style.display = "block";
}, titles.length * 3000 + 500);


// Skip Text functionality
const skipText = document.getElementById("skip-text");

skipText.addEventListener("click", () => {
  document.getElementById("intro-loader").style.display = "none";
  document.getElementById("main-site").style.display = "block";
});



// ==========================
// Service Cards Interaction
// ==========================

// Toggle service card content (click = flip/reveal)
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('show-content');
  });
});

// Accordion-like effect on mobile
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.service-card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
  });
});


// ==========================
// Mobile-Specific Scroll Effect
// ==========================

if (window.innerWidth <= 768) {
  const robot = document.querySelector('.robot-3d');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const translateValue = scrollY * 0.15;
    if (robot) {
      robot.style.transform = `translateY(${translateValue}px)`;
    }
  });
}



// ==========================
// Projects Swiper Carousel
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
  effect: 'slide' // Optional: 'fade', 'coverflow', etc.
});
// ==========================
// Services  Swiper Carousel
// ==========================
let currentSlide = 0;
const cardsPerView = 2;

function scrollCarousel(direction) {
  const track = document.querySelector('.services-track');
  const cards = document.querySelectorAll('.service-card');
  const totalCards = cards.length;
  const cardWidth = 370; // 350 + 20 gap
  const maxSlide = Math.ceil(totalCards / cardsPerView);

  currentSlide += direction;

  if (currentSlide >= maxSlide) {
    currentSlide = 0; // loop to start
  } else if (currentSlide < 0) {
    currentSlide = maxSlide - 1; // loop to end
  }

  const offset = currentSlide * cardWidth * cardsPerView;
  track.style.transform = `translateX(-${offset}px)`;
}
