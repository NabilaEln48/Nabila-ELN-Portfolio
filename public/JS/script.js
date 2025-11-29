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

        // Toggle hidden class on menu
        mobileMenu.classList.toggle("hidden");

        // Swap icon between bars ↔ times
        if (mobileMenu.classList.contains("hidden")) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        } else {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        }
    });

    // Close the menu when clicking any link
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
            if (!targetId) {
                console.error("Tab button missing data-target attribute");
                return;
            }

            /* ======================================
               RESET ALL BUTTONS
            ====================================== */
            tabButtons.forEach(b => {
                b.classList.remove("bg-green-400", "text-black");
                b.classList.add("border", "border-gray-700", "text-gray-300");
            });

            /* ======================================
               SET ACTIVE BUTTON
            ====================================== */
            btn.classList.add("bg-green-400", "text-black");
            btn.classList.remove("border", "border-gray-700", "text-gray-300");

            /* ======================================
               RESET TAB CONTENTS
            ====================================== */
            tabContents.forEach(c => {
                c.classList.add("hidden", "opacity-0");
            });

            /* ======================================
               SHOW ACTIVE TAB WITH FADE EFFECT
            ====================================== */
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove("hidden");

                // Fade animation
                setTimeout(() => {
                    targetContent.classList.remove("opacity-0");
                }, 10);
            } else {
                console.error(`Tab content with id '${targetId}' not found`);
            }

            /* ======================================
               MOBILE FIX: AUTO-SCROLL TO CONTENT
            ====================================== */
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
    const VISIBLE_COUNT = 6; // Show first 6 only

    if (!filterButtons.length || !certCards.length) {
        console.warn("Certification elements not found");
        return;
    }

    /* ----------------------------------------
       MAIN FILTER LOGIC
    ----------------------------------------- */
    function applyFilter(filter) {
        activeFilter = filter;
        expanded = false;

        // Update button UI
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

    /* ----------------------------------------
       SHOW FIRST 6 OR ALL
    ----------------------------------------- */
    function updateVisibleCertificates() {
        const filtered = certCards.filter(c => c.dataset.category === activeFilter);

        // First hide all
        certCards.forEach(card => card.classList.add("hidden"));

        if (!expanded) {
            // Show FIRST 6 only
            filtered.slice(0, VISIBLE_COUNT).forEach(card => card.classList.remove("hidden"));
        } else {
            // Show ALL
            filtered.forEach(card => card.classList.remove("hidden"));
        }

        updateShowMoreBtn(filtered);
    }

    /* ----------------------------------------
       UPDATE SHOW MORE BUTTON
    ----------------------------------------- */
    function updateShowMoreBtn(filteredCards) {
        const hiddenCount = filteredCards.length - VISIBLE_COUNT;

        if (hiddenCount > 0) {
            showMoreBtn.classList.remove("hidden");
            showMoreBtn.textContent = expanded ? "Show Less" : "Show More";
        } else {
            showMoreBtn.classList.add("hidden");
        }
    }

    /* ----------------------------------------
       SHOW MORE / SHOW LESS
    ----------------------------------------- */
    function toggleExpand() {
        expanded = !expanded;
        updateVisibleCertificates();
    }

    /* ----------------------------------------
       EVENT LISTENERS
    ----------------------------------------- */
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            applyFilter(btn.dataset.filter);
        });
    });

    showMoreBtn.addEventListener("click", toggleExpand);

    /* ----------------------------------------
       INITIAL LOAD
    ----------------------------------------- */
    applyFilter("development");
}

    /* ============================
        SKILLS/SERVICE CARD INTERACTION
    ============================= */
    function initInteractiveCards() {
        const serviceCards = document.querySelectorAll('.service-card, .flip-card');

        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                serviceCards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('active');
                        c.classList.remove('show-content');
                    }
                });
                
                card.classList.toggle('active');
                card.classList.toggle('show-content');
            });
        });
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