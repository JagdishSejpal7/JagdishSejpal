// ================== SELECTORS ==================
const bootScreen = document.getElementById("bootScreen");
const typewriterSpan = document.getElementById("typewriter");
const scrollBar = document.getElementById("scrollBar");
const cursorGlow = document.querySelector(".cursor-glow");
const navButtons = document.querySelectorAll("[data-scroll]");
const yearSpan = document.getElementById("year");

// Chatbot
const chatbot = document.getElementById("chatbot");
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotMessages = document.getElementById("chatbotMessages");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");

// Terminal
const terminalOverlay = document.getElementById("terminalOverlay");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

// Particles
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

// ================== BOOT + TYPEWRITER ==================
let typeIndex = 0;
const typeText =
  "Cloud, code, design — building digital experiences ahead of time.";

setTimeout(() => {
  if (bootScreen) {
    bootScreen.classList.add("boot-hide");
    setTimeout(() => {
      bootScreen.style.display = "none";
    }, 400);
  }
  startTypewriter();
}, 3200);

function startTypewriter() {
  if (!typewriterSpan) return;
  typewriterSpan.textContent = "";
  typeIndex = 0;
  typeNextChar();
}

function typeNextChar() {
  if (typeIndex < typeText.length) {
    typewriterSpan.textContent += typeText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeNextChar, 40);
  }
}

// ================== SMOOTH SCROLL NAV ==================
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-scroll");
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ================== CURSOR GLOW ==================
document.addEventListener("pointermove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// ================== FOOTER YEAR ==================
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ================== SCROLL PROGRESS BAR ==================
window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  if (scrollBar) scrollBar.style.width = percent + "%";
});

// ================== SECTION REVEAL OBSERVER ==================
let skillsAnimated = false;

const observerOptions = { threshold: 0.2 };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-visible");
      if (entry.target.id === "skills") {
        animateSkills();
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) =>
  revealObserver.observe(el)
);

function animateSkills() {
  if (skillsAnimated) return;
  document.querySelectorAll(".bar div").forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });
  skillsAnimated = true;
}

// ================== LEARNING ROTATOR ==================
const learningItems = [
  "TensorFlow Fundamentals",
  "Linux Server Deployment",
  "Prompt Engineering",
  "Cloud Automation",
  "Advanced JavaScript",
  "AI-Powered Dev Tools",
];

let learnIndex = 0;
setInterval(() => {
  const learningText = document.getElementById("learningText");
  if (learningText) {
    learnIndex = (learnIndex + 1) % learningItems.length;
    learningText.textContent =
      "Currently Exploring: " + learningItems[learnIndex];
  }
}, 5000);

// ================== TERMINAL EASTER EGG ==================
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.code === "KeyC") {
    if (terminalOverlay) terminalOverlay.classList.toggle("active");
  }
  if (e.key === "Escape") {
    if (terminalOverlay) terminalOverlay.classList.remove("active");
  }
});

if (terminalInput && terminalOutput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = terminalInput.value.toLowerCase().trim();
      terminalOutput.textContent += `\n> ${cmd}`;
      if (cmd === "whoami") {
        terminalOutput.textContent +=
          "\nJagdish S Sejpal | BSc IT | Cloud & App Dev";
      } else if (cmd === "projects") {
        terminalOutput.textContent +=
          "\n🚀 Upcoming: Personal Chatbot, Custom AI Model";
      } else if (cmd === "links") {
        terminalOutput.textContent +=
          "\nLinkedIn: https://www.linkedin.com/in/jagdish-sejpal-538290347" +
          "\nInstagram: https://www.instagram.com/jagdishsejpal_" +
          "\nEmail: jagdish.sejpal2008@gmail.com";
      } else if (cmd === "close") {
        terminalOverlay.classList.remove("active");
      } else {
        terminalOutput.textContent += "\nCommand not recognized";
      }
      terminalInput.value = "";
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

// ================== PARTICLE CURSOR EFFECT ==================
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

function createParticle(x, y) {
  particles.push({ x, y, alpha: 1, size: 4 });
}

window.addEventListener("mousemove", (e) => {
  createParticle(e.clientX, e.clientY);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.alpha -= 0.02;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ================== CHATBOT LOGIC ==================
let chatbotOpenedOnce = false;

function openChatbot() {
  if (!chatbot) return;
  chatbot.classList.add("open");
}

function closeChatbot() {
  if (!chatbot) return;
  chatbot.classList.remove("open");
}

if (chatbotToggle) {
  chatbotToggle.addEventListener("click", () => {
    if (chatbot.classList.contains("open")) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });
}

if (chatbotClose) {
  chatbotClose.addEventListener("click", () => {
    closeChatbot();
  });
}

// Auto-open chatbot once when scroll reaches bottom
window.addEventListener("scroll", () => {
  const bottomReached =
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 10;
  if (bottomReached && !chatbotOpenedOnce) {
    openChatbot();
    chatbotOpenedOnce = true;
  }
});

// Helper to add messages
function addChatMessage(text, sender = "bot", extraClass = "") {
  if (!chatbotMessages) return;
  const msg = document.createElement("div");
  msg.className = `chatbot-message ${sender} ${extraClass}`.trim();
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  return msg;
}

// Simulate thinking delay
function botReplyWithDelay(responseText) {
  const thinkingMsg = addChatMessage("Thinking...", "bot", "thinking");
  const delay = 2000 + Math.random() * 3000; // 2–5 seconds
  setTimeout(() => {
    if (thinkingMsg && thinkingMsg.parentNode) {
      thinkingMsg.parentNode.removeChild(thinkingMsg);
    }
    addChatMessage(responseText, "bot");
  }, delay);
}

// Small helper: time-of-day
function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "late night";
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

// Math parsing
function trySolveMath(input) {
  // Extract something like "2 + 2", "15 / 3", "5*10"
  const match = input.match(
    /(-?\d+(\.\d+)?)\s*([+\-*/x])\s*(-?\d+(\.\d+)?)/i
  );
  if (!match) return null;
  const a = parseFloat(match[1]);
  const op = match[3];
  const b = parseFloat(match[4]);
  let result;
  if (op === "+" ) result = a + b;
  else if (op === "-" ) result = a - b;
  else if (op === "*" || op.toLowerCase() === "x") result = a * b;
  else if (op === "/") {
    if (b === 0) return "Division by zero is not possible.";
    result = a / b;
  } else {
    return null;
  }
  return `${a} ${op} ${b} = ${result}`;
}

// Chatbot brain
function getBotResponse(rawInput) {
  const input = rawInput.toLowerCase().trim();

  // Empty
  if (!input) return "Ask me anything about Jagdish or try a math question like 5 * 9.";

  // Greetings
  if (["hi", "hello", "hey"].includes(input)) {
    return "Hey! I'm Jagdish's assistant. What's on your mind?";
  }

  if (input.includes("good morning")) {
    return "Good morning! Perfect time to build something futuristic.";
  }

  if (input.includes("good night")) {
    return "Good night. Rest up, future engineer.";
  }

  if (input.includes("how are you")) {
    return `I'm running at 0% error rates this ${getTimeGreeting()}. How are you?`;
  }

  if (input.includes("thank")) {
    return "Anytime. That’s what I’m here for.";
  }

  if (input.includes("sorry")) {
    return "No worries at all. We learn by trying.";
  }

  // Age
  if (input.includes("how old") || input.includes("age")) {
    return "Jagdish is 18 years old.";
  }

  // Who are you / about you
  if (input.includes("who are you") || input.includes("about you")) {
    return "I'm a pre-programmed assistant for Jagdish S Sejpal, a BSc IT student focused on cloud, app dev, and futuristic tech.";
  }

  // Creator
  if (
    input.includes("who created you") ||
    input.includes("your creator") ||
    input.includes("who is your creator")
  ) {
    return "I was created by Jagdish Sejpal.";
  }

  // What do you do
  if (input.includes("what do you do") || input.includes("what are you")) {
    return "Jagdish builds and learns in web dev, cloud, ethical hacking, and AI experiments.";
  }

  // Skills / technologies
  if (input.includes("skills") || input.includes("technologies")) {
    return "Jagdish works with HTML, CSS, JavaScript, Node.js, Virtual Machines, basics of AWS, MS Office, Photoshop, Canva, and Adobe Premiere Pro.";
  }

  // Learning
  if (input.includes("learning") || input.includes("currently exploring")) {
    return "Right now Jagdish is exploring TensorFlow fundamentals, cloud automation, advanced JavaScript, and AI-powered tools.";
  }

  // Upcoming projects
  if (
    input.includes("upcoming projects") ||
    input.includes("future projects") ||
    input.includes("projects")
  ) {
    return "Upcoming projects: a personal chatbot and an AI model tailored to his workflow.";
  }

  // Email
  if (input.includes("email")) {
    return "You can email Jagdish at: jagdish.sejpal2008@gmail.com";
  }

  // LinkedIn
  if (input.includes("linkedin")) {
    return "Jagdish’s LinkedIn: https://www.linkedin.com/in/jagdish-sejpal-538290347";
  }

  // Instagram
  if (input.includes("instagram") || input.includes("insta")) {
    return "Jagdish’s Instagram: https://www.instagram.com/jagdishsejpal_";
  }

  // Contact
  if (input.includes("contact")) {
    return "You can contact Jagdish via LinkedIn, Instagram, or email. All buttons are available in the Contact section.";
  }

  // Math
  const mathResult = trySolveMath(input);
  if (mathResult) {
    return `Here's the result: ${mathResult}`;
  }

  // Default
  return "I can tell you about Jagdish (skills, projects, links, age) or help with simple maths like 15 / 3 or 5 * 10.";
}

// Handle user send
function handleChatSend() {
  if (!chatbotInput || !chatbotMessages) return;
  const text = chatbotInput.value.trim();
  if (!text) return;
  addChatMessage(text, "user");
  chatbotInput.value = "";
  const reply = getBotResponse(text);
  botReplyWithDelay(reply);
}

if (chatbotSend) {
  chatbotSend.addEventListener("click", handleChatSend);
}

if (chatbotInput) {
  chatbotInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleChatSend();
    }
  });
}

// ================== DEBUG ==================
console.log("🔧 Portfolio Loaded: V6 with Chatbot, Terminal, Particles, and Animations.");
console.log("💡 Press Shift + C to open terminal. Scroll to bottom once to auto-open chatbot.");
