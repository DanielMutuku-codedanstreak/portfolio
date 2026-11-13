/**
 * DANIEL MUTUKU - PORTFOLIO INTERACTIVITY
 * Human-crafted, minimal, zero-dependency.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Active Section Spy for Sidebar Navigation
  const sections = document.querySelectorAll("section[id]");
  const sidebarLinks = document.querySelectorAll(".nav-anchor");
  const topNavLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function onScroll() {
    let currentId = "";
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    if (!currentId && window.scrollY < 200) {
      currentId = "about";
    }

    sidebarLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });

    topNavLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // One-click copy email with subtle feedback
  const copyEmailEl = document.querySelector("[data-copy-email]");
  if (copyEmailEl) {
    copyEmailEl.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = copyEmailEl.getAttribute("data-copy-email");
      try {
        await navigator.clipboard.writeText(email);
        const originalHtml = copyEmailEl.innerHTML;
        copyEmailEl.innerHTML = '<span style="color: #4ade80;">Copied to clipboard!</span>';
        setTimeout(() => {
          copyEmailEl.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
});
