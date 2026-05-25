// Shared: mark active nav link
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.primary a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
})();

/* ---------- Home: click-to-play video ---------- */
(function () {
  const poster = document.getElementById("video-poster");
  const video = document.getElementById("intro-video");
  if (!poster || !video) return;
  poster.addEventListener("click", () => {
    poster.classList.add("hidden");
    video.setAttribute("controls", "");
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // If autoplay blocked, the user still has native controls
      });
    }
  });
})();

/* ---------- Sports page logic ---------- */
(function () {
  const cards = document.querySelectorAll(".sport-card[data-sport]");
  const detail = document.getElementById("sport-detail");
  const arrow = document.getElementById("scroll-arrow");
  const otherCard = document.querySelector(".sport-card.other");
  const toast = document.getElementById("toast");

  if (!cards.length || !detail) return;

  const data = {
    "blind-football": {
      title: "Blind Football",
      text:
        "Blind football is a five-a-side game adapted for athletes with visual impairments. Outfield players wear opaque eyeshades to ensure fair play, while the goalkeeper is sighted. The ball contains noise-making elements so players can locate it by sound. Communication, spatial awareness and trust between teammates are at the heart of every match.",
      photos: ["assets/sports/blind-football.jpg"],
    },
    "wheelchair-basketball": {
      title: "Wheelchair Basketball",
      text:
        "Wheelchair basketball follows the same fundamental rules as the standing game, played on a standard court with the same basket height. Athletes use specially designed sport wheelchairs that allow rapid pivots, sprints and contact. Each team must balance players of different functional classifications, making strategy and chemistry essential.",
      photos: ["assets/sports/wheelchair-basketball.jpg"],
    },
    "boccia": {
      title: "Boccia",
      text:
        "Boccia is a precision ball sport, closely related to bowls, designed for athletes with severe physical impairments. Players throw, kick or use a ramp to propel leather balls as close as possible to a white target ball (the jack). Control, tactics and concentration matter far more than physical power, making it one of the most strategic Paralympic disciplines.",
      photos: ["assets/sports/boccia.jpg"],
    },
    "adaptive-skiing": {
      title: "Adaptive Skiing",
      text:
        "Adaptive skiing brings the thrill of alpine descents to athletes with physical or visual impairments. Sit-skis, mono-skis and outriggers allow skiers to carve down slopes at high speed, while guides ski alongside visually impaired athletes giving real-time audio directions. It combines freedom, adrenaline and finely tuned technical equipment.",
      photos: ["assets/sports/adaptive-skiing.jpg"],
    },
  };

  let userScrolled = false;
  let arrowVisible = false;

  function showArrow() {
    if (!arrow) return;
    arrow.classList.add("show");
    arrow.classList.remove("gone");
    arrowVisible = true;
  }

  function hideArrowForever() {
    if (!arrow || !arrowVisible) return;
    arrow.classList.add("gone");
    arrowVisible = false;
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.getAttribute("data-sport");
      const entry = data[key];
      if (!entry) return;

      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      detail.innerHTML = `
        <h2>${entry.title}</h2>
        <p>${entry.text}</p>
        <div class="sport-photos">
          ${entry.photos
            .map(
              (src) =>
                `<img src="${src}" alt="${entry.title}" loading="lazy" />`
            )
            .join("")}
        </div>
      `;
      detail.classList.add("visible");

      userScrolled = false;
      showArrow();

      // Smooth scroll a bit so the user sees that content appeared
      setTimeout(() => {
        detail.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    });
  });

  if (arrow) {
    arrow.addEventListener("click", () => {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!arrowVisible) return;
      if (!userScrolled) {
        userScrolled = true;
        hideArrowForever();
      }
    },
    { passive: true }
  );

  if (otherCard && toast) {
    let toastTimer = null;
    otherCard.addEventListener("click", () => {
      toast.textContent =
        "Sorry — the archive of our other events is currently being rebuilt. Please check back soon!";
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 3800);
    });
  }
})();