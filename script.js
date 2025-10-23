document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("home-link");

  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scroll to top
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };

      emailjs.send("service_omtl227", "template_e4enmgw", params)
        .then(() => {
          alert("✅ Message sent successfully! I’ll get back to you soon.");
          contactForm.reset();
        })
        .catch((error) => {
          alert("❌ Failed to send message. Please try again later.");
          console.error("EmailJS error:", error);
        });
    });
  }
});

/* intro animation */
document.addEventListener("scroll", () => {
  const introText = document.querySelector(".intro-text");
  const introImage = document.querySelector(".intro-image");

  // Trigger animation when scrolling 100px or more
  if (window.scrollY > 100) {
    introText.classList.add("fade-out");
    introImage.classList.add("fade-out");
  } else {
    introText.classList.remove("fade-out");
    introImage.classList.remove("fade-out");
  }
});

/* my projeect animation*/
document.addEventListener("scroll", () => {
  const projects = document.querySelectorAll(".project-card");
  const triggerBottom = window.innerHeight * 0.60; // when 85% of screen is reached

  projects.forEach(project => {
    const projectTop = project.getBoundingClientRect().top;

    if (projectTop < triggerBottom) {
      project.classList.add("visible");
    } else {
      project.classList.remove("visible");
    }
  });
});
