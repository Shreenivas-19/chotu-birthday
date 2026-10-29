/* =========================================================
   CHOTU'S BIRTHDAY WEBSITE
   Personal settings and interactions
========================================================= */

/* Edit photo URLs here when you have real photos.
   Keep the rest of the website code unchanged. */
const birthdaySettings = {
  name: "Chotu",
  fullName: "Kavya Devagiri",
  dateLabel: "31 October",
  age: 24,
  heroPhoto: "images/chotu.png",
  memoryPhotos: [
    "images/chotu1.png",
    "images/chotu2.png",
    "images/mychotu3.jpeg",
    "images/chotu4.png",
    "images/chotu5.jpeg",
    "images/chotu6.jpeg"
  ]
};

const heroPhoto = document.querySelector("#hero-photo");
if (heroPhoto) {
  heroPhoto.src = birthdaySettings.heroPhoto;
  heroPhoto.alt = `Portrait placeholder for ${birthdaySettings.fullName}`;
}

document.querySelectorAll(".memory img").forEach((image, index) => {
  const replacement = birthdaySettings.memoryPhotos[index];
  if (replacement) image.src = replacement;
});

/* Soft reveal animation as each section enters the viewport. */
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

/* Hidden quote: click/tap to open or close. */
const quoteToggle = document.querySelector("#quote-toggle");
const quoteReveal = document.querySelector("#quote-reveal");

quoteToggle?.addEventListener("click", () => {
  const isOpen = quoteToggle.getAttribute("aria-expanded") === "true";
  quoteToggle.setAttribute("aria-expanded", String(!isOpen));
  quoteToggle.classList.toggle("is-open", !isOpen);
  quoteReveal.hidden = isOpen;
  quoteToggle.querySelector(".quote-prompt").textContent =
    isOpen ? "ಚೋಟು, ನಿನಗೊಂದು ಪುಟ್ಟ ನೆನಪು" : "ಚೋಟುಗಾಗಿ ಮಾತ್ರ ♡";
  quoteToggle.querySelector(".quote-title").hidden = !isOpen;
  quoteToggle.querySelector(".quote-action").hidden = !isOpen;
  quoteToggle.querySelector(".quote-star").hidden = !isOpen;
});

/* Gift button reveals the personal brother-to-sister message. */
const giftOpen = document.querySelector("#gift-open");
const giftMessage = document.querySelector("#gift-message");

giftOpen?.addEventListener("click", () => {
  const isOpen = giftOpen.getAttribute("aria-expanded") === "true";
  giftOpen.setAttribute("aria-expanded", String(!isOpen));
  giftMessage.hidden = isOpen;
  giftOpen.innerHTML = isOpen
    ? 'ನಿನ್ನ ಉಡುಗೊರೆ ತೆರೆ <span>♡</span>'
    : 'ನಿನ್ನ ಉಡುಗೊರೆ ತೆರೆದಿದೆ <span>♥</span>';

  if (!isOpen) {
    window.setTimeout(() => {
      giftMessage.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest"
      });
    }, 80);
  }
});

/* Final wish button: a small celebratory interaction, no intrusive popups. */
const wishButton = document.querySelector("#wish-button");
const wishConfirmation = document.querySelector("#wish-confirmation");

wishButton?.addEventListener("click", () => {
  wishConfirmation.hidden = false;
  wishButton.textContent = "ಆಸೆ ಮಾಡಿಕೊಂಡೆ ♡";
  wishButton.disabled = true;
  wishButton.setAttribute("aria-label", "Your birthday wish has been made");
});

/* Graceful image fallback if an external placeholder URL ever fails. */
document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-unavailable");
    image.alt = "Sample image unavailable. Replace this photo with your own.";
  });
});
