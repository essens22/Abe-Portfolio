document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------
  // 1. INTERACTIVE 3D PARALLAX & TILT FOR MAIN PROFILE PICTURE SLOT
  // ------------------------------------------------------------------
  const profileContainer = document.getElementById("interactive-profile-wrapper");
  const profileFrame = document.getElementById("interactive-profile-frame");

  if (profileContainer && profileFrame) {
    profileContainer.addEventListener("mousemove", (e) => {
      const rect = profileContainer.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse position inside container
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
      const rotateY = ((x - centerX) / centerX) * 15;

      profileFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    profileContainer.addEventListener("mouseleave", () => {
      // Reset tilt smoothly when cursor leaves
      profileFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });

    // Click interactive trigger
    profileFrame.addEventListener("click", () => {
      profileFrame.classList.add("expanded");
      setTimeout(() => {
        profileFrame.classList.remove("expanded");
      }, 600);
    });
  }

  // ------------------------------------------------------------------
  // 2. MOBILE MENU TOGGLE
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
  // 3. LIGHT / DARK MODE TOGGLE
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
  // 4. AUTOMATIC CYCLING TITLE
  // ------------------------------------------------------------------
  const titles = ["2nd Year BSCS Student", "DOST-SEI Scholar"];
  const titleElement = document.getElementById("cycling-title");
  let titleIndex = 0;

  setInterval(() => {
    titleElement.style.opacity = 0;
    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      titleElement.textContent = titles[titleIndex];
      titleElement.style.opacity = 1;
    }, 300);
  }, 2500);

  // ------------------------------------------------------------------
  // 5. AIzen SPIDER CHATBOT
  // ------------------------------------------------------------------
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatClose = document.getElementById("chat-close");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const presetBtns = document.querySelectorAll(".preset-btn");

  chatbotToggle.addEventListener("click", () => {
    chatbotWindow.classList.toggle("hidden");
  });

  chatClose.addEventListener("click", () => {
    chatbotWindow.classList.add("hidden");
  });

  const kb = [
    {
      keywords: ["who", "name", "essein", "about"],
      response: "Essein Antoni L. Abe is a 2nd-year Computer Science student and DOST-SEI Scholar (2025) who aims to be an influential leader in tech!"
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
      response: "He has built projects like the Multiverse Data Analyzer and a Web-Based Inventory Portal using PHP, Python, and MySQL."
    },
    {
      keywords: ["scholar", "dost"],
      response: "Yes! Essein is a proud DOST-SEI Scholar since 2025."
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
    return "I'm not completely sure about that across the Multiverse! Try asking about Essein's skills, projects, contact info, or who he is.";
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  chatSend.addEventListener("click", () => sendMessage());

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const question = btn.getAttribute("data-question");
      sendMessage(question);
    });
  });
});