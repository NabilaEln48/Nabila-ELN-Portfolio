// Navigation Menu Toggle Functionality
const toggleBtn = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Create close (X) button only once
let closeBtn = document.querySelector('.menu-close');
if (!closeBtn) {
  closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.classList.add('menu-close');
  closeBtn.style.display = 'none'; // hide it by default
  navMenu.appendChild(closeBtn);
}

// Show menu and toggle buttons
toggleBtn.addEventListener('click', () => {
  navMenu.classList.add('active');
  toggleBtn.style.display = 'none';
  closeBtn.style.display = 'block';
});

// Close menu with X button
closeBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
  toggleBtn.style.display = 'block';
  closeBtn.style.display = 'none';
});

// Auto-close menu on nav link click and delay scroll
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');

    navMenu.classList.remove('active');
    toggleBtn.style.display = 'block';
    closeBtn.style.display = 'none';

    setTimeout(() => {
      window.location.href = target;
    }, 200); // wait for menu to close smoothly
  });
});

// Intro Animation and Page Transition
const titles = [
  "Full-Stack Developer",
  "Python Developer",
  "Creative Designer",
  "UI/UX Enthusiast"
];

const titleText = document.getElementById("title-text");

titles.forEach((title, i) => {
  setTimeout(() => {
    titleText.textContent = title;
  }, i * 3000); // 3s per title
});

// Hide loader and show main site after all titles shown
setTimeout(() => {
  document.getElementById("intro-loader").style.display = "none";
  document.getElementById("main-site").style.display = "block";
}, titles.length * 3000 + 500); // buffer at the end

// Service Cards Interaction
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('show-content');
  });
});

// Mobile-specific Effects
if (window.innerWidth <= 768) {
  const robot = document.querySelector('.robot-3d');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const translateValue = scrollY * 0.15;
    robot.style.transform = `translateY(${translateValue}px)`;
  });
}

// Toggle service card content on mobile click
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    // Close all other cards first (optional, like accordion)
    document.querySelectorAll('.service-card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });

    // Toggle this card
    card.classList.toggle('active');
  });
});
