document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("home-link");

  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault(); 
      window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });
    });
  }
});

/* email respond */
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
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

/* my project animation*/
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

/* intro text type animation*/

document.addEventListener("DOMContentLoaded", function() {
  const textElement = document.getElementById("typing-text");
  const texts = ["MOBILE APP DEVELOPER.", "QUALITY ASSURANCE.", "SOFTWARE DEVELOPER"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 120;   
  const deletingSpeed = 30;  
  const delayBetween = 1500; 

  function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetween);
        return;
      }
    } else {
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
  }

  typeEffect();
});

/* my project video player */
document.querySelectorAll('.project-card').forEach(card => {
  const video = card.querySelector('.project-video');

  card.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.play();
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
  });
});

/* Gallery Function */


