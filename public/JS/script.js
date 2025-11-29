/* ============================
    Wait for DOM to load
============================ */
document.addEventListener("DOMContentLoaded", () => {

    /* ============================
            MOBILE MENU
    ============================= */
    function initMobileMenu() {
        const navToggle = document.getElementById("navToggle");
        const mobileMenu = document.getElementById("mobileMenu");

        if (!navToggle || !mobileMenu) {
            console.warn("Mobile menu elements not found");
            return;
        }

        const icon = navToggle.querySelector("i");

        navToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");

            if (mobileMenu.classList.contains("hidden")) {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            } else {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            }
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            });
        });
    }

    /* ============================
            RESUME TABS
    ============================= */
    function initResumeTabs() {
        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabContents = document.querySelectorAll(".tab-content");

        if (tabButtons.length === 0 || tabContents.length === 0) {
            console.warn("Tab elements not found");
            return;
        }

        tabButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.dataset.target;
                if (!targetId) return;

                tabButtons.forEach(b => {
                    b.classList.remove("bg-green-400", "text-black");
                    b.classList.add("border", "border-gray-700", "text-gray-300");
                });

                btn.classList.add("bg-green-400", "text-black");
                btn.classList.remove("border", "border-gray-700", "text-gray-300");

                tabContents.forEach(c => c.classList.add("hidden", "opacity-0"));

                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.remove("hidden");
                    setTimeout(() => targetContent.classList.remove("opacity-0"), 10);
                }

                if (window.innerWidth < 768) {
                    const container = document.getElementById("tab-container");
                    if (container) {
                        window.scrollTo({
                            top: container.offsetTop - 20,
                            behavior: "smooth"
                        });
                    }
                }
            });
        });
    }

    /* ============================
        CERTIFICATION LOGIC
    ============================= */
    function initCertifications() {
        const filterButtons = document.querySelectorAll("[data-filter]");
        const certCards = [...document.querySelectorAll(".cert-card")];
        const showMoreBtn = document.getElementById("cert-toggle");

        let activeFilter = "development";
        let expanded = false;
        const VISIBLE_COUNT = 6;

        if (!filterButtons.length || !certCards.length) {
            console.warn("Certification elements not found");
            return;
        }

        function applyFilter(filter) {
            activeFilter = filter;
            expanded = false;

            filterButtons.forEach(btn => {
                const isActive = btn.dataset.filter === filter;

                btn.classList.toggle("bg-[#00ff9d]", isActive);
                btn.classList.toggle("text-black", isActive);
                btn.classList.toggle("font-bold", isActive);
                btn.classList.toggle("shadow-lg", isActive);
                btn.classList.toggle("shadow-emerald-500/30", isActive);

                btn.classList.toggle("bg-transparent", !isActive);
                btn.classList.toggle("border-gray-800", !isActive);
                btn.classList.toggle("text-gray-400", !isActive);
            });

            updateVisibleCertificates();
        }

        function updateVisibleCertificates() {
            const filtered = certCards.filter(c => c.dataset.category === activeFilter);

            certCards.forEach(card => card.classList.add("hidden"));

            if (!expanded) {
                filtered.slice(0, VISIBLE_COUNT).forEach(card => card.classList.remove("hidden"));
            } else {
                filtered.forEach(card => card.classList.remove("hidden"));
            }

            updateShowMoreBtn(filtered);
        }

        function updateShowMoreBtn(filteredCards) {
            const hiddenCount = filteredCards.length - VISIBLE_COUNT;

            if (hiddenCount > 0) {
                showMoreBtn.classList.remove("hidden");
                showMoreBtn.textContent = expanded ? "Show Less" : "Show More";
            } else {
                showMoreBtn.classList.add("hidden");
            }
        }

        function toggleExpand() {
            expanded = !expanded;
            updateVisibleCertificates();
        }

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
        });

        showMoreBtn.addEventListener("click", toggleExpand);

        applyFilter("development");
    }

    /* ============================
        SKILLS / SERVICES CARDS
        + FULL iPHONE FIX ADDED HERE
    ============================= */
    function initInteractiveCards() {
        const serviceCards = document.querySelectorAll('.service-card, .flip-card');

        serviceCards.forEach(card => {
            // Desktop click
            card.addEventListener("click", () => {
                serviceCards.forEach(c => {
                    if (c !== card) c.classList.remove("active", "show-content", "flip-active");
                });

                card.classList.toggle("active");
                card.classList.toggle("show-content");
            });

            // iPhone tap → force flip animation
            card.addEventListener("touchstart", (e) => {
                e.stopPropagation();

                const isActive = card.classList.toggle("flip-active");

                if (isActive) {
                    serviceCards.forEach(c => {
                        if (c !== card) c.classList.remove("flip-active");
                    });
                }
            });
        });

        // Tap anywhere else → close flips on iPhone
        document.addEventListener("touchstart", () => {
            document.querySelectorAll(".flip-card.flip-active")
                .forEach(c => c.classList.remove("flip-active"));
        });
    }

    /* ============================
        SKILL TRAINS (Placeholder)
    ============================= */
    function initSkillTrains() {
        // Avoid JS errors if this is not implemented yet.
        console.log("initSkillTrains loaded");
    }

    /* ============================
        INITIALIZE ALL COMPONENTS
    ============================= */
    try {
        initMobileMenu();
        initResumeTabs();
        initCertifications();
        initSkillTrains();
        initInteractiveCards();
    } catch (error) {
        console.error("Error initializing components:", error);
    }

});
