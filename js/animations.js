/* =========================================================
   BRINDA CHENDJOU — PORTFOLIO
   ANIMATIONS.JS
   Scroll-based animations and visual interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Respect users who prefer reduced motion.
     * In this case, we keep the page static and avoid
     * unnecessary animations.
     */
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       01. SCROLL REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");


    if (!prefersReducedMotion && revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        /*
                         * Once the element has appeared,
                         * we no longer need to observe it.
                         */
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        /*
         * If reduced motion is enabled, make sure all
         * reveal elements remain visible.
         */
        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       02. LANGUAGE PROGRESS BARS
    ====================================================== */

    const languageBars = document.querySelectorAll(
        ".language-progress"
    );


    if (languageBars.length > 0) {

        const languageObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const bar = entry.target;

                    const level = bar.dataset.level;


                    /*
                     * Make sure the value is a valid number.
                     */
                    const numericLevel = Math.min(
                        Math.max(
                            parseInt(level, 10) || 0,
                            0
                        ),
                        100
                    );


                    if (prefersReducedMotion) {

                        bar.style.width = `${numericLevel}%`;

                    } else {

                        /*
                         * Small delay creates a softer visual
                         * entrance when the language section
                         * becomes visible.
                         */
                        setTimeout(() => {

                            bar.style.width =
                                `${numericLevel}%`;

                        }, 150);

                    }


                    observer.unobserve(bar);

                });

            },
            {
                threshold: 0.5
            }
        );


        languageBars.forEach((bar) => {

            languageObserver.observe(bar);

        });

    }


    /* =====================================================
       03. STAGGERED ELEMENTS
    ====================================================== */

    /*
     * These elements appear one after another rather than
     * simultaneously.
     */

    const staggerGroups = [
        ".skills-cloud .skill",
        ".education-timeline .education-item",
        ".more-grid .more-card",
        ".contact-links .contact-card",
        ".interest-tags span"
    ];


    staggerGroups.forEach((selector) => {

        const elements =
            document.querySelectorAll(selector);


        elements.forEach((element, index) => {

            /*
             * The delay is stored as a CSS variable.
             * profile.css/main.css can use it later if
             * desired.
             */
            element.style.setProperty(
                "--animation-delay",
                `${index * 70}ms`
            );

        });

    });


    /* =====================================================
       04. SOFT PARALLAX EFFECT
    ====================================================== */

    /*
     * Only applied to the decorative Hero element.
     *
     * This is intentionally subtle so the portfolio
     * remains professional rather than looking like
     * an animated landing page.
     */

    const heroDecoration =
        document.querySelector(".hero-decoration");


    if (
        heroDecoration &&
        !prefersReducedMotion
    ) {

        let ticking = false;


        const updateParallax = () => {

            const scrollPosition =
                window.scrollY;


            /*
             * Very small movement.
             */
            const movement =
                Math.min(scrollPosition * 0.08, 35);


            heroDecoration.style.transform =
                `translateY(${movement}px)`;


            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       05. HERO LOAD ANIMATION
    ====================================================== */

    const heroContent =
        document.querySelector(".hero-content");


    if (
        heroContent &&
        !prefersReducedMotion
    ) {

        heroContent.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(25px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 900,
                easing: "cubic-bezier(.2, .8, .2, 1)",
                fill: "forwards"
            }
        );

    }


    /* =====================================================
       06. SMOOTH INTERNAL NAVIGATION
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",

                block: "start"

            });

        });

    });


    /* =====================================================
       07. CURRENT YEAR
    ====================================================== */

    /*
     * If the footer contains an element with
     * data-current-year, its content will automatically
     * be updated.
     */

    const yearElement =
        document.querySelector(
            "[data-current-year]"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});
