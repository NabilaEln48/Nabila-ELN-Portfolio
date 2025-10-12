// ================================
// 🌐 Global Page Interactions Script
// (Smooth transitions, Tabs, Navbar)
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // 🌐 Smooth Page Transitions
  // ==========================
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.5s ease-in";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  const internalLinks = document.querySelectorAll("a[href$='.html']");
  internalLinks.forEach((link) => {
    if (link.classList.contains("hire-me") || link.classList.contains("no-fade")) return;

    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href");
      if (!target || link.target === "_blank") return; // skip external or blank

      e.preventDefault();
      document.body.style.opacity = 0;

      // Delay to allow fade-out
      setTimeout(() => {
        window.location.href = target;
      }, 350);
    });
  });

  // ==========================
  // 📑 Resume Page Tabs Logic
  // ==========================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Reset all tabs
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((tab) => tab.classList.remove("active"));

        // Activate clicked one
        btn.classList.add("active");
        const targetId = btn.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add("active");
      });
    });
  }

  // ==========================
  // 📱 Navbar Mobile Toggle
  // ==========================
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");

  if (navbar && navLinks && !document.querySelector(".menu-icon")) {
    const menuIcon = document.createElement("div");
    menuIcon.classList.add("menu-icon");
    menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
    navbar.insertBefore(menuIcon, navbar.children[1]);

    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuIcon.innerHTML = navLinks.classList.contains("open")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }
});
