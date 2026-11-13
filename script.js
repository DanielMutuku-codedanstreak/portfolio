/**
 * DANIEL MUTUKU - PORTFOLIO INTERACTIVITY
 * Lightweight, performant, zero-dependency vanilla JS
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
  let typingSpeed = 90;

  function typeRole() {
    if (!roleElement) return;

    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 40;
    } else {
      roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && currentCharIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // 2. Active Navigation Scroll Spy
  const sections = document.querySelectorAll(".content-card, #contact");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function updateActiveNavLink() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  // 3. Quick Copy for Email
  const copyBtn = document.querySelector("[data-copy-email]");
  if (copyBtn) {
    copyBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = copyBtn.getAttribute("data-copy-email");
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa fa-check text-success"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
});
