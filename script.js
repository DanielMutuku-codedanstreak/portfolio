/**
 * DANIEL MUTUKU - PORTFOLIO INTERACTIVITY (ELITE EDITION)
 * Lightweight, zero-dependency, ultra-smooth DOM interaction
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Typing Effect for Roles
  const roles = [
    "Mobile Application Architect",
    "Flutter & Cross-Platform Engineer",
    "Product & UI/UX Engineer",
    "CleanTech & Fintech Specialist",
    "Client-Backend Integration Engineer"
  ];
  
  const roleElement = document.querySelector(".role-typing");
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function typeRole() {
    if (!roleElement) return;

    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 35;
    } else {
      roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && currentCharIndex === currentRole.length) {
      typingSpeed = 2200; // Pause when word is complete
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // 2. Active Section Spy (Syncs both Left Sidebar Tracker and Top Navbar)
  const sections = document.querySelectorAll("section[id], #contact");
  const topNavLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sidebarTrackerLinks = document.querySelectorAll(".tracker-link");

  function updateActiveSection() {
    let activeId = "";
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeId = section.getAttribute("id");
      }
    });

    if (!activeId && window.scrollY < 200) {
      activeId = "about";
    }

    // Update Top Nav
    topNavLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${activeId}`) {
        link.classList.add("active");
      }
    });

    // Update Left Sidebar Tracker
    sidebarTrackerLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${activeId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  updateActiveSection(); // Run on init

  // 3. Interactive Project Filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "block";
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.transition = "all 0.3s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 40);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Quick Copy for Email
  const copyElements = document.querySelectorAll("[data-copy-email]");
  copyElements.forEach(el => {
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = el.getAttribute("data-copy-email");
      try {
        await navigator.clipboard.writeText(email);
        const originalHtml = el.innerHTML;
        el.innerHTML = '<i class="fa fa-check text-success"></i> Copied!';
        setTimeout(() => {
          el.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  });
});
