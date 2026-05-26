/* =====================================================
   ENGAGEMENT INVITATION — JAVASCRIPT
   CONFIG: All personalizable details in one place.
===================================================== */

const CONFIG = {
  groomName: "L. Vasanth",
  brideName: "M. Saraswathi",

  // Engagement date & time (ISO 8601 format)
  engagementDate: "2026-06-21T10:30:00",

  // Venue
  venueName: "Rani Krishna Mahal",
  venueAddress: "Nearby New Bus Stand, Villupuram, Tamil Nadu",

  // WhatsApp number for RSVP (country code + number, no spaces or dashes)
  hostWhatsApp: "919876543210",

  // RSVP deadline
  rsvpDeadline: "June 15, 2026",

  // Google Maps Embed URL for Villupuram
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62417.6!2d79.4921!3d11.9401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361b5c3b3b3b3%3A0x1a2b3c4d5e6f7a8b!2sVillupuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123",
};

// =====================================================
//  FLOATING PETALS CANVAS
// =====================================================
(function initPetals() {
  const canvas = document.getElementById("petals-canvas");
  const ctx = canvas.getContext("2d");
  let petals = [];
  let W, H;

  const PETAL_COLORS = [
    "rgba(201,99,122,0.25)",
    "rgba(197,162,83,0.2)",
    "rgba(155,142,196,0.22)",
    "rgba(237,217,144,0.28)",
    "rgba(255,214,221,0.3)",
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createPetal() {
    return {
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 7 + 3,
      speed: Math.random() * 1.2 + 0.4,
      wind: (Math.random() - 0.5) * 0.6,
      spin: (Math.random() - 0.5) * 0.04,
      angle: Math.random() * Math.PI * 2,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: Math.random() * 0.5 + 0.2,
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r, p.r * 1.8, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach((p, i) => {
      p.y += p.speed;
      p.x += p.wind;
      p.angle += p.spin;
      if (p.y > H + 20) petals[i] = createPetal();
      drawPetal(p);
    });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 35; i++) {
    const p = createPetal();
    p.y = Math.random() * H; // spread existing petals
    petals.push(p);
  }
  animate();
})();

// =====================================================
//  COUNTDOWN TIMER
// =====================================================
function updateCountdown() {
  const target  = new Date(CONFIG.engagementDate).getTime();
  const now     = Date.now();
  const diff    = target - now;

  if (diff <= 0) {
    document.getElementById("days").textContent    = "00";
    document.getElementById("hours").textContent   = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent    = String(days).padStart(2, "0");
  document.getElementById("hours").textContent   = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =====================================================
//  SCROLL REVEAL (Intersection Observer)
// =====================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// =====================================================
//  GALLERY LIGHTBOX
// =====================================================
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox     = document.getElementById("lightbox");
const lbImg        = document.getElementById("lbImg");
const lbClose      = document.getElementById("lbClose");
const lbPrev       = document.getElementById("lbPrev");
const lbNext       = document.getElementById("lbNext");
let currentIndex   = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = galleryItems[index].querySelector("img");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const img = galleryItems[currentIndex].querySelector("img");
  lbImg.src = img.src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  const img = galleryItems[currentIndex].querySelector("img");
  lbImg.src = img.src;
}

galleryItems.forEach((item, i) => item.addEventListener("click", () => openLightbox(i)));
lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", showPrev);
lbNext.addEventListener("click", showNext);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "ArrowLeft")  showPrev();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "Escape")     closeLightbox();
});



// =====================================================
//  MUSIC TOGGLE (ambient background)
// =====================================================
let audio = null;
let musicPlaying = false;
const musicBtn  = document.getElementById("musicBtn");
const musicIcon = musicBtn.querySelector(".music-icon");

// Using a royalty-free ambient music URL (web audio context fallback)
// Replace MUSIC_URL with your own hosted .mp3 for custom music
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3";

musicBtn.addEventListener("click", () => {
  if (!audio) {
    audio = new Audio(MUSIC_URL);
    audio.loop   = true;
    audio.volume = 0.25;
  }
  if (musicPlaying) {
    audio.pause();
    musicIcon.textContent = "♪";
    musicPlaying = false;
    musicBtn.style.background = "linear-gradient(135deg, #C9637A, #9B8EC4)";
  } else {
    audio.play().catch(() => {
      // Autoplay blocked — show user feedback
      musicIcon.textContent = "♪";
    });
    musicIcon.textContent = "♬";
    musicPlaying = true;
    musicBtn.style.background = "linear-gradient(135deg, #25D366, #128C7E)";
  }
});

// =====================================================
//  SMOOTH SECTION NAV (active state)
// =====================================================
const sections = document.querySelectorAll("section[id]");

function onScroll() {
  const scrollY = window.scrollY;
  sections.forEach((sec) => {
    const top    = sec.offsetTop - 80;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      sec.style.setProperty("--active", "1");
    }
  });
}
window.addEventListener("scroll", onScroll, { passive: true });

// =====================================================
//  INJECT DYNAMIC CONFIG VALUES INTO THE DOM
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  // Update map src from config
  const mapIframe = document.getElementById("venueMap");
  if (mapIframe && CONFIG.mapEmbedUrl) {
    mapIframe.src = CONFIG.mapEmbedUrl;
  }
});
