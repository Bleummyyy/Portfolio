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

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Validate name
      if (name.length < 2) {
        alert("⚠️ Please enter a valid name (at least 2 characters)");
        nameInput.focus();
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) {
        alert("⚠️ Please enter a valid email format (e.g., example@gmail.com)");
        emailInput.focus();
        return;
      }

      // Check for common email typos
      const emailParts = email.split('@');
      if (emailParts.length === 2) {
        const domain = emailParts[1].toLowerCase();
        const suggestion = checkCommonTypos(domain);
        
        if (suggestion) {
          const correctedEmail = `${emailParts[0]}@${suggestion}`;
          if (confirm(`⚠️ Did you mean: ${correctedEmail}?`)) {
            emailInput.value = correctedEmail;
            return;
          }
        }
      }

      // Block disposable/temporary email addresses
      if (isDisposableEmail(email)) {
        alert("⚠️ Please use a permanent email address. Temporary email services are not allowed.");
        emailInput.focus();
        return;
      }

      // Additional email checks
      if (!hasValidDomain(email)) {
        alert("⚠️ Please enter a valid email domain");
        emailInput.focus();
        return;
      }

      // Validate message
      if (message.length < 10) {
        alert("⚠️ Please enter a message (at least 10 characters)");
        messageInput.focus();
        return;
      }

      // All validations passed, send email
      sendEmail(name, email, message);
    });
  }

  // Check for common domain typos
  function checkCommonTypos(domain) {
    const commonDomains = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gmil.com': 'gmail.com',
      'gmaill.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
      'hotmal.com': 'hotmail.com',
      'outlok.com': 'outlook.com',
      'outloo.com': 'outlook.com',
      'outloook.com': 'outlook.com'
    };

    if (commonDomains[domain]) {
      return commonDomains[domain];
    }

    // Check for close matches using Levenshtein distance
    const popularDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    for (let popularDomain of popularDomains) {
      // Only suggest if domain is different AND close enough
      if (domain !== popularDomain && levenshteinDistance(domain, popularDomain) === 1) {
        return popularDomain;
      }
    }

    return null;
  }

  // Calculate Levenshtein distance for fuzzy matching
  function levenshteinDistance(a, b) {
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  }

  // Check if email is from a disposable/temporary service
  function isDisposableEmail(email) {
    const domain = email.split('@')[1].toLowerCase();
    
    const disposableDomains = [
      'tempmail.com', 'temp-mail.org', 'guerrillamail.com', 
      '10minutemail.com', 'throwaway.email', 'mailinator.com',
      'trashmail.com', 'fakeinbox.com', 'yopmail.com',
      'maildrop.cc', 'getnada.com', 'temp-mail.io',
      'mohmal.com', 'dispostable.com', 'throwawaymail.com',
      'mintemail.com', 'emailondeck.com', 'tempinbox.com'
    ];

    return disposableDomains.includes(domain);
  }

  // Validate domain structure
  function hasValidDomain(email) {
    const domain = email.split('@')[1];
    
    // Check if domain has at least one dot
    if (!domain.includes('.')) {
      return false;
    }

    // Check if domain doesn't start or end with dot/hyphen
    if (domain.startsWith('.') || domain.startsWith('-') || 
        domain.endsWith('.') || domain.endsWith('-')) {
      return false;
    }

    // Check for consecutive dots
    if (domain.includes('..')) {
      return false;
    }

    // Check if TLD is at least 2 characters
    const tld = domain.split('.').pop();
    if (tld.length < 2) {
      return false;
    }

    return true;
  }

  // Send email using EmailJS
  function sendEmail(name, email, message) {
    const params = {
      name: name,
      email: email,
      message: message
    };

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    emailjs.send("service_omtl227", "template_e4enmgw", params)
      .then(() => {
        alert("✅ Message sent successfully! I'll get back to you soon.");
        contactForm.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send message. Please try again later.");
        console.error("EmailJS error:", error);
      })
      .finally(() => {
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
  }
});
/*document.addEventListener("DOMContentLoaded", function () {
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
});*/



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
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll(".image-item img");
  const viewer = document.getElementById("image-viewer");
  const fullImage = document.getElementById("full-image");
  const closeBtn = document.querySelector(".close-btn");

  // When an image is clicked
  images.forEach(image => {
    image.addEventListener("click", () => {
      fullImage.src = image.src;
      viewer.style.display = "flex";
    });
  });

  // Close when clicking the X
  closeBtn.addEventListener("click", () => {
    viewer.style.display = "none";
  });

  // Close when clicking outside the image
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
      viewer.style.display = "none";
    }
  });
});
