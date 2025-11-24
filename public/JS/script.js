/* ============================
   Wait for DOM to load
============================ */
document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       MOBILE MENU
    ============================= */
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const icon = navToggle.querySelector("i");

    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");

        // icon swap
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        });
    });

    /* ============================
       RESUME TABS
    ============================= */
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.target).classList.add("active");
        });
    });

    /* ============================
       CERTIFICATION FILTER
    ============================= */
    const filterButtons = document.querySelectorAll(".cert-filter");
    const certCards = document.querySelectorAll(".cert-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const type = btn.dataset.filter;

            certCards.forEach(card => {
                card.style.display =
                    (card.dataset.category === type || type === "all")
                    ? "flex"
                    : "none";
            });

            expanded = false;
            showMoreBtn.textContent = "Show More";
            applyLimit();
        });
    });

    /* ============================
       CERTIFICATION SHOW MORE
    ============================= */
    const SHOW_LIMIT = 8;
    const certGrid = document.getElementById("cert-grid");

    const showMoreBtn = document.createElement("button");
    showMoreBtn.className = "cert-toggle";
    showMoreBtn.textContent = "Show More";
    certGrid.insertAdjacentElement("afterend", showMoreBtn);

    let expanded = false;

    function applyLimit() {
        const visible = [...certCards].filter(c => c.style.display !== "none");

        visible.forEach((c, i) => {
            if (!expanded && i >= SHOW_LIMIT) c.classList.add("hidden-by-js");
            else c.classList.remove("hidden-by-js");
        });

        showMoreBtn.style.display = visible.length > SHOW_LIMIT ? "block" : "none";
    }

    showMoreBtn.addEventListener("click", () => {
        expanded = !expanded;
        showMoreBtn.textContent = expanded ? "Show Less" : "Show More";
        applyLimit();
    });

    applyLimit();


    /* ============================
       SKILL TRAINS
    ============================= */
    function initTrain(trainEl, reverse = false) {
        const track = trainEl.querySelector(".train-track");
        if (!track) return;

        let trackWidth = track.scrollWidth;
        let speed = parseFloat(trainEl.dataset.speed) || 50;
        let pos = 0;
        let lastTime = performance.now();
        let paused = false;

        trainEl.addEventListener("mouseenter", () => paused = true);
        trainEl.addEventListener("mouseleave", () => paused = false);

        function step(now) {
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            if (!paused) {
                const delta = speed * dt;
                pos += reverse ? delta : -delta;

                if (Math.abs(pos) >= trackWidth) pos = 0;

                track.style.transform = `translateX(${pos}px)`;
            }
            requestAnimationFrame(step);
        }

        function recalc() {
            setTimeout(() => {
                trackWidth = track.scrollWidth;
            }, 100);
        }

        window.addEventListener("resize", recalc);
        recalc();
        requestAnimationFrame(step);
    }

    document.querySelectorAll(".skill-train").forEach((train, i) => {
        const reverse = i % 2 === 1;
        initTrain(train, reverse);
    });
});
