/* =========================================================
   Parascand Consulting — shared interactions
   Sticky-header shrink · mobile + dropdown nav · back-to-top
   NOTE: No scroll-reveal. Content is NEVER hidden by script —
   all sections are fully visible at all times. Image motion
   is handled purely in CSS (Ken Burns drift + hover effects).
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header shrink ---------- */
  function setupHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 24) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav + dropdowns ---------- */
  function setupNav() {
    var menu = document.getElementById("navMenu");
    var toggle = document.querySelector(".nav-toggle");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        menu.classList.toggle("open");
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          if (!a.closest(".nav-item") || a.closest(".nav-dropdown")) {
            menu.classList.remove("open");
          }
        });
      });
    }

    // Dropdown: hover handles desktop via CSS; click toggles on mobile.
    document.querySelectorAll(".nav-item > a.has-dropdown").forEach(function (link) {
      link.addEventListener("click", function (ev) {
        var isMobile = window.matchMedia("(max-width: 900px)").matches;
        var item = link.closest(".nav-item");
        if (isMobile) {
          ev.preventDefault();
          item.classList.toggle("open");
        }
      });
    });
  }

  /* ---------- Back to top ---------- */
  function setupToTop() {
    var btn = document.createElement("button");
    btn.className = "to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });

    var onScroll = function () {
      if (window.scrollY > 600) btn.classList.add("show");
      else btn.classList.remove("show");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function init() {
    setupHeader();
    setupNav();
    setupToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
