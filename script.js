document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (navLinks.classList.contains("active") && !event.target.closest("nav")) {
      navLinks.classList.remove("active")
    }
  })

  // Tabs functionality
  const tabTriggers = document.querySelectorAll(".tab-trigger")

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      // Get the parent tabs container
      const tabsContainer = this.closest(".tabs, .stats-tabs")

      // Remove active class from all triggers in this container
      tabsContainer.querySelectorAll(".tab-trigger").forEach((t) => {
        t.classList.remove("active")
      })

      // Add active class to clicked trigger
      this.classList.add("active")

      // Get the tab content id from data attribute
      const tabId = this.getAttribute("data-tab")

      // Hide all tab contents in this container
      tabsContainer.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Show the selected tab content
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
        }

        // Scroll to the target element
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission (prevent default for demo)
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent default form reload

      const formData = new FormData(this);

      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            alert("Thank you for your message!");
            this.reset();
          } else {
            alert("Oops! Something went wrong. Please try again.");
          }
        })
        .catch(error => {
          alert("An error occurred: " + error.message);
        });
    });
  }


  // Add animation on scroll
  const animateOnScroll = () => {
    const sections = document.querySelectorAll(".section")

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("fade-in")
      }
    })
  }

  // Add fade-in class for CSS animation
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
            .section {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .section.fade-in {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `,
  )

  // Run on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})

