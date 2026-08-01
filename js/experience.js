/* =========================================================
   BRINDA CHENDJOU — PORTFOLIO
   EXPERIENCE.JS
   Experience & Projects page interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. EXPERIENCE CARD INTERACTION
    ====================================================== */

    const experienceCards =
        document.querySelectorAll(".experience-card");
        experienceCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
                card.classList.add("experience-card-active");

            }
        );

        card.addEventListener("mouseleave", () => {
                card.classList.remove("experience-card-active");

            }
        );

    });


    /* =====================================================
       02. PROJECT CARD INTERACTION
    ====================================================== */

    const projectCards = document.querySelectorAll(".project-card");
          projectCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
                card.classList.add("project-card-active");

            }
        );


        card.addEventListener("mouseleave", () => {
                card.classList.remove("project-card-active");

            }
        );

    });


    /* =====================================================
       03. PROJECT LINKS
    ====================================================== */

    const projectLinks =
        document.querySelectorAll(".project-link");


    projectLinks.forEach((link) => {

        link.addEventListener("click",
            (event) => {

                const destination =
                    link.getAttribute("href");


                /*
                 * Do nothing when the project link
                 * is still a placeholder.
                 */

                if (!destination || destination === "#") {

                    event.preventDefault();

                    return;

                }

            }
        );

    });


    /* =====================================================
       04. EXPERIENCE TIMELINE
    ====================================================== */

    const timelineItems =
        document.querySelectorAll(".experience-item");


    if (timelineItems.length > 0) {

        timelineItems.forEach(
            (item, index) => {

                item.style.setProperty("--timeline-index", index);

            }
        );

    }


    /* =====================================================
       05. TOOL TAG INTERACTION
    ====================================================== */

    const toolTags =
        document.querySelectorAll(".experience-tools span");
    toolTags.forEach((tag) => {

        tag.addEventListener("click", () => {

                /*
                 * Simple visual feedback.
                 * This can later be extended to filter
                 * experiences by technology.
                 */

                tag.classList.toggle("tool-selected");

            }
        );

    });


    /* =====================================================
       06. PROJECT TAG INTERACTION
    ====================================================== */

    const projectTags = document.querySelectorAll(".project-tags span");
    projectTags.forEach((tag) => {
        tag.addEventListener("click",() => {
                tag.classList.toggle("project-tag-selected");
            }
        );

    });


    /* =====================================================
       07. EXPERIENCE STAT COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(
            ".summary-value[data-count]"
        );

    if (counters.length > 0) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)").matches;


        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {entries.forEach((entry) => {

                        if (!entry.isIntersecting) {return;}
                        const counter = entry.target;
                        const target = parseInt(counter.dataset.count, 10);
                        if (Number.isNaN(target)) {
                            return;
                        }


                        /*
                         * Reduced-motion users get
                         * the final value immediately.
                         */

                        if (prefersReducedMotion) {
                            counter.textContent = `${target}+`;
                            observer.unobserve(counter);
                            return;
                        }


                        let current = 0;
                        const duration = 1000;
                        const startTime =performance.now();
                        const animateCounter =(currentTime) => {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);

                                /*
                                 * Ease-out animation.
                                 */
                                const eased = 1-Math.pow(1 - progress, 3);
                                current = Math.round(target*eased);
                                counter.textContent = `${current}+`;


                                if (
                                    progress < 1
                                ) {

                                    requestAnimationFrame(
                                        animateCounter
                                    );

                                }

                            };

                        requestAnimationFrame(animateCounter);
                        observer.unobserve(counter);
                    });

                },
                {
                    threshold: 0.7
                }
            );


        counters.forEach((counter) => {

            counterObserver.observe(
                counter
            );

        });

    }


});
