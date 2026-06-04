/* =========================================================
   Parascand Consulting — shared interactions
   Scroll reveal · sticky-header shrink · mobile + dropdown nav · back-to-top
   Progressive enhancement: if JS fails, all content stays visible.
   ========================================================= */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveal ---------- */
  function setupReveal() {
    var selectors = [
      ".section-head", ".problem-card", ".service-card", ".vertical-block",
      ".pricing-card", ".process-step", ".founder-block", ".stat",
      ".callout", ".transcript", ".area-card", ".offer-card",
      ".stack-table", ".roi-calc", ".demo-audio"
    ];
    var els = document.querySelectorAll(selectors.join(","));
    if (!els.length) return;

    els.forEach(function (el, i) {
      el.classList.add("reveal");
      // gentle stagger within groups
      el.style.transitionDelay = (i % 4) * 70 + "ms";
    });

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });

    // Safety net: reveal everything after 1.4s in case observer never fires.
    setTimeout(function () {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }, 1400);
  }

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
      // close menu after tapping a real link (not the dropdown parent)
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          if (!a.closest(".nav-item") || a.closest(".nav-dropdown")) {
            menu.classList.remove("open");
          }
        });
      });
    }

    // Dropdown: hover handles desktop via CSS; click toggles on touch/mobile.
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
    setupReveal();
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
