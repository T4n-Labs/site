/* ============================================================
   T4n Labs — assets/script.js
   File ini WAJIB dimuat di <head>, TEPAT SETELAH Tailwind CDN,
   karena berisi konfigurasi tailwind.config.
   Seluruh logika DOM dibungkus dalam DOMContentLoaded.
   ============================================================ */

// ------------------------------------------------------------
// 0. Tailwind Configuration (harus jalan setelah CDN Tailwind)
// ------------------------------------------------------------
if (typeof tailwind !== "undefined") {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          bg: "#0d0d0d",
          neon: "#00ff9f",
          neonDim: "rgba(0, 255, 159, 0.1)",
          darkCard: "#161616",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          mono: ["JetBrains Mono", "monospace"],
        },
        animation: {
          "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          float: "float 6s ease-in-out infinite",
        },
        keyframes: {
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
        },
      },
    },
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Typing Animation ---
  const textElement = document.getElementById("typewriter");
  const phrases = [
    "Build. Break. Innovate.",
    "Code. Secure. Deploy.",
    "Research. Develop. Share.",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();

  // --- 2. Scroll Reveal Animation ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // --- 3. Hero Canvas Animation (Moving Grid) ---
  const canvas = document.getElementById("heroCanvas");
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Grid Configuration
  const gridSize = 40;
  let offset = 0;

  // Particle Configuration
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.fillStyle = `rgba(0, 255, 159, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize Particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw Perspective Grid
    ctx.strokeStyle = "rgba(0, 255, 159, 0.05)";
    ctx.lineWidth = 1;

    // Moving grid
    offset = (offset + 0.3) % gridSize;

    // Vertical lines
    for (let x = -offset; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = -offset; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update & Draw Particles
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  // Start Animation
  animate();

  // --- 4. Mobile Menu Toggle (dipindah dari atribut onclick) ---
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // --- 5. Footer Year (dipindah dari document.write) ---
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
