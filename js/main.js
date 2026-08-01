/* =========================================================
   BRINDA CHENDJOU — PORTFOLIO
   MAIN.JS
   Global site interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. MOBILE NAVIGATION
    ====================================================== */

    const headerContainer = document.querySelector(".header-container");
    const navigation = document.querySelector(".main-navigation");
    if (headerContainer && navigation) {
        /*
         * Create the mobile menu button dynamically.
         * This keeps the HTML cleaner and avoids duplicating
         * the button on both pages.
         */
        const menuButton = document.createElement("button");
              menuButton.className ="mobile-menu-button";
              menuButton.setAttribute("aria-label", "Open navigation menu");
              menuButton.setAttribute("aria-expanded", "false");
              menuButton.innerHTML = `<span></span><span></span><span></span>`;
              headerContainer.appendChild(menuButton);
      
        /* ---------- Toggle menu ---------- */
              menuButton.addEventListener("click", () => {
                const isOpen = navigation.classList.toggle("mobile-navigation-open");
                      menuButton.classList.toggle("menu-open", isOpen);
                      menuButton.setAttribute("aria-expanded", String(isOpen));
                  });


        /* ---------- Close after clicking a link ---------- */

        const navigationLinks = navigation.querySelectorAll("a");
              navigationLinks.forEach((link) => {
              link.addEventListener("click", () => {
                  navigation.classList.remove("mobile-navigation-open");
                  menuButton.classList.remove("menu-open");
                  menuButton.setAttribute("aria-expanded", "false");
            });
        });

    }


    /* =====================================================
       02. HEADER SCROLL STATE
    ====================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        const updateHeader =
            () => {

                if (window.scrollY > 20) {header.classList.add("header-scrolled");
                } else {
                    header.classList.remove(
                        "header-scrolled"
                    );

                }

            };
        updateHeader();


        window.addEventListener("scroll", updateHeader, { passive: true } );

    }


    /* =====================================================
       03. CURRENT YEAR
    ====================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       04. EXTERNAL LINKS
    ====================================================== */

    const externalLinks = document.querySelectorAll('a[data-external="true"]');
          externalLinks.forEach((link) => {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
    });


    /* =====================================================
       05. PDF CV DOWNLOAD
    ====================================================== */

    const cvLinks =
        document.querySelectorAll('a[data-cv-download]');

    cvLinks.forEach((link) => {
        link.addEventListener("click", () => {
            /*
             * Analytics or additional download logic
             * can be added here later.
             */
            link.classList.add("cv-download-clicked");
        });

    });


    /* =====================================================
       06. CURRENT PAGE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname .split("/") .pop();


    const navigationLinks =
        document.querySelectorAll(".main-navigation .nav-link");

    navigationLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                ?.split("#")[0];


        if (
            linkPage &&
            linkPage === currentPage
        ) {

            navigationLinks.forEach((item) => {

                item.classList.remove(
                    "active"
                );

            });
          
            link.classList.add("active");

        }

    });


});
