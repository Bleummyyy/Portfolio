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
    
    if (!domain.includes('.')) {
      return false;
    }

    if (domain.startsWith('.') || domain.startsWith('-') || 
        domain.endsWith('.') || domain.endsWith('-')) {
      return false;
    }

    if (domain.includes('..')) {
      return false;
    }

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
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
  }
});

/* intro animation */
document.addEventListener("scroll", () => {
  const introText = document.querySelector(".intro-text");
  const introImage = document.querySelector(".intro-image");

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
  const triggerBottom = window.innerHeight * 0.60;

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
  const texts = ["IMPLEMENTATION CONSULTANT.", "DATA ANALYST.", "QUALITY ASSURANCE."];
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

  images.forEach(image => {
    image.addEventListener("click", () => {
      fullImage.src = image.src;
      viewer.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    viewer.style.display = "none";
  });

  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
      viewer.style.display = "none";
    }
  });
});

/* ===== PARTICLE BACKGROUND ===== */
(function () {
  const canvas = document.getElementById("particle-bg");
  const ctx = canvas.getContext("2d");

  const GREEN = "#28a745";
  const GREEN_DIM = "rgba(40,167,69,";
  const BLUE_DIM = "rgba(59,130,246,";

  let W, H, particles, mouse = { x: -9999, y: -9999 };

  const CONFIG = {
    count: 90,
    speed: 0.25,
    maxDist: 130,
    mouseRadius: 180,
    minRadius: 0.8,
    maxRadius: 2.2,
    glowBlur: 6,
  };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      r: Math.random() * (CONFIG.maxRadius - CONFIG.minRadius) + CONFIG.minRadius,
      opacity: Math.random() * 0.3 + 0.4,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: (Math.random() * 0.003) + 0.001,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.count }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Gentle sine drift
      p.drift += p.driftSpeed;
      p.x += p.vx + Math.sin(p.drift) * 0.2;
      p.y += p.vy + Math.cos(p.drift) * 0.2;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // Particle-to-particle lines (blue)
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDist) {
          const alpha = (1 - dist / CONFIG.maxDist) * 0.35;

          const grad = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
          grad.addColorStop(0, BLUE_DIM + alpha + ")");
          grad.addColorStop(1, BLUE_DIM + (alpha * 0.2) + ")");

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Draw particle (green with glow)
      ctx.save();
      ctx.shadowBlur = CONFIG.glowBlur;
      ctx.shadowColor = GREEN;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = GREEN_DIM + p.opacity + ")";
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener("resize", init);
  window.addEventListener("load", resize);

  init();
  draw();
})();



/* ===== INTERACTIVE NAVBAR ===== */
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".custom-navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("nav-overlay");
  const overlayLinks = document.querySelectorAll(".overlay-link");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".custom-navbar .nav-link");

  // --- Hide/show navbar on scroll ---
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 300) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }
    lastScroll = current;
    highlightActiveLink();
  });

  // --- Hamburger toggle ---
  hamburgerBtn.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    overlay.classList.toggle("open");
    document.body.style.overflow = overlay.classList.contains("open") ? "hidden" : "";
  });

  // --- Close overlay on link click ---
  overlayLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // --- Highlight active nav link on scroll ---
  function highlightActiveLink() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  highlightActiveLink();
});