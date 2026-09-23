const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const rotatingText = document.querySelector(".text-rotator");

const rotatingWords = [
  "modern web experiences.",
  "responsive websites.",
  "React applications.",
  "Next.js projects.",
];

let rotatingIndex = 0;
let rotatingChar = rotatingWords[0].length;
let isDeleting = true;

function rotateHeroText() {
  if (!rotatingText) return;

  const currentWord = rotatingWords[rotatingIndex];

  if (isDeleting) {
    rotatingChar -= 1;
    rotatingText.textContent = currentWord.slice(0, rotatingChar);

    if (rotatingChar === 0) {
      isDeleting = false;
      rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
      setTimeout(rotateHeroText, 350);
      return;
    }
  } else {
    const nextWord = rotatingWords[rotatingIndex];
    rotatingChar += 1;
    rotatingText.textContent = nextWord.slice(0, rotatingChar);

    if (rotatingChar === nextWord.length) {
      isDeleting = true;
      setTimeout(rotateHeroText, 1800);
      return;
    }
  }

  setTimeout(rotateHeroText, isDeleting ? 55 : 80);
}

setTimeout(rotateHeroText, 2200);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document
  .querySelectorAll(".section, .skill-card, .project-card, .timeline-item, .contact-card")
  .forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--delay", `${(i % 6) * 70}ms`);
    revealObserver.observe(el);
  });
