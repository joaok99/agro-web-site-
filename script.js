document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const reveals = document.querySelectorAll(".reveal");
  const floatingTop = document.querySelector(".floating-top");
  const scrollProgress = document.querySelector("#scroll-progress");
  const contactForm = document.querySelector("#contact-form");
  const formFeedback = document.querySelector("#form-feedback");

  function loadTheme() {
    const saved = localStorage.getItem("agrofuturo-theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      themeIcon.textContent = "☀";
    }
  }

  function toggleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeIcon.textContent = isDark ? "☀" : "☾";
    localStorage.setItem("agrofuturo-theme", isDark ? "dark" : "light");
  }

  function revealOnScroll() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.2 });
    reveals.forEach(el => observer.observe(el));
  }

  function updateScrollProgress() {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    const percent = h > 0 ? (top / h) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
  }

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("active"));
  });

  themeToggle.addEventListener("click", toggleTheme);

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", () => {
    floatingTop.classList.toggle("show", window.scrollY > 500);
    updateScrollProgress();
  });

  floatingTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome").value.trim();
    formFeedback.textContent = `Obrigado, ${nome || "visitante"}! Sua mensagem foi enviada com sucesso.`;
    contactForm.reset();
  });

  loadTheme();
  revealOnScroll();
  updateScrollProgress();
});