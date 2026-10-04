document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------
  // 1. DIRECT EMAIL SUBMISSION FORM HANDLER
  // ------------------------------------------------------------------
  const contactForm = document.getElementById("direct-contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const userEmail = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const recipient = "abeesseinantoni@gmail.com";
      const subject = encodeURIComponent(`Portfolio Contact Message from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }

  // ------------------------------------------------------------------
  // 2. MAIN ACHIEVEMENTS CAROUSEL SLIDER
  // ------------------------------------------------------------------
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot-item");
  const prevBtn = document.getElementById("achieve-prev-btn");
  const nextBtn = document.getElementById("achieve-next-btn");
  let currentSlide = 0;

  function showSlide(index) {
    if (slides.length === 0) return;
    
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      showSlide(slideIndex);
    });
  });

  // ------------------------------------------------------------------
  // 3. INTERACTIVE 3D PARALLAX FOR PROFILE PICTURE
  // ------------------------------------------------------------------
  const profileContainer = document.getElementById("interactive-profile-wrapper");
  const profileFrame = document.getElementById("interactive-profile-frame");

  if (profileContainer && profileFrame) {
    profileContainer.addEventListener("mousemove", (e) => {
      const rect = profileContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      profileFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileContainer.addEventListener("mouseleave", () => {
      profileFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  }

  // ------------------------------------------------------------------
  // 4. MOBILE MENU TOGGLE
  // ------------------------------------------------------------------
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  // ------------------------------------------------------------------
  // 5. LIGHT / DARK MODE TOGGLE
  // ------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");

  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    let newTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fa-solid fa-sun";
    } else {
      themeIcon.className = "fa-solid fa-moon";
    }
  }

  // ------------------------------------------------------------------
  // 6. AUTOMATIC CYCLING TITLE
  // ------------------------------------------------------------------
  const titles = ["2nd Year BSCS Student", "DOST-SEI Scholar"];
  const titleElement = document.getElementById("cycling-title");
  let titleIndex = 0;

  if (titleElement) {
    setInterval(() => {
      titleElement.style.opacity = '0';
      setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        titleElement.textContent = titles[titleIndex];
        titleElement.style.opacity = '1';
      }, 300);
    }, 2500);
  }

  // ------------------------------------------------------------------
  // 7. AIssein CHATBOT
  // ------------------------------------------------------------------
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatClose = document.getElementById("chat-close");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const presetBtns = document.querySelectorAll(".preset-btn");

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener("click", () => {
      chatbotWindow.classList.toggle("hidden");
    });

    chatClose.addEventListener("click", () => {
      chatbotWindow.classList.add("hidden");
    });
  }

  const kb = [
    {
      keywords: ["who", "name", "essein", "about"],
      response: "Essein Antoni L. Abe is a 2nd-year Computer Science student from Lipa City, Batangas."
    },
    {
      keywords: ["skill", "know", "stack", "technology", "technologies"],
      response: "Essein is skilled in Python, PHP, JavaScript, Git, GitHub, CSS, HTML, and MySQL."
    },
    {
      keywords: ["contact", "email", "phone", "social", "reach"],
      response: "You can email him at abeesseinantoni@gmail.com, call 09929457220, or find him on Instagram @wonntons!"
    },
    {
      keywords: ["project", "work", "build"],
      response: "He has built projects like the Prescription Management System and LCC Payroll System."
    },
    {
      keywords: ["scholar", "dost", "dean", "grades", "gpa"],
      response: "Essein is a DOST-SEI Scholar (RA 7687) and achieved Dean's Lister status with a GPA of 1.57!"
    }
  ];

  function sendMessage(text) {
    const userMsg = text || chatInput.value.trim();
    if (!userMsg) return;

    appendMessage(userMsg, "user");
    if (!text) chatInput.value = "";

    setTimeout(() => {
      const botResponse = generateResponse(userMsg.toLowerCase());
      appendMessage(botResponse, "bot");
    }, 400);
  }

  function generateResponse(input) {
    for (let item of kb) {
      if (item.keywords.some(key => input.includes(key))) {
        return item.response;
      }
    }
    return "I'm not completely sure about that! Try asking about Essein's skills, projects, contact info, or grades.";
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (chatSend && chatInput) {
    chatSend.addEventListener("click", () => sendMessage());
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const question = btn.getAttribute("data-question");
      sendMessage(question);
    });
  });

  // ------------------------------------------------------------------
  // 8. IMAGE ZOOM LIGHTBOX MODAL
  // ------------------------------------------------------------------
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const modalClose = document.querySelector(".modal-close");
  const clickableImages = document.querySelectorAll(".clickable-img");

  clickableImages.forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.add("show");
      modalImg.src = img.src;

      const slotLabel = img.nextElementSibling;
      if (slotLabel && slotLabel.classList.contains("slot-label")) {
        modalCaption.textContent = slotLabel.textContent;
      } else if (img.alt) {
        modalCaption.textContent = img.alt;
      } else {
        modalCaption.textContent = "";
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }
});