/* ========================================================= */
/* Function thème clair/sombre */
/* ========================================================= */
// récupère le bouton et la page
const themeButton = document.getElementById("theme-mode-button");
const page = document.body;

// Si on clique sur le bouton alors la page prend un .light-mode
themeButton.addEventListener("click", () => {
  page.classList.toggle("light-mode");

  // Si light-mode activer alors le text est Sombre sinon c'est Clair
  if (page.classList.contains("light-mode")) {
    themeButton.textContent = "Sombre";
  } else {
    themeButton.textContent = "Clair";
  }
});

/* ========================================================= */
/* Function navigation changer le aria-current */
/* ========================================================= */
// récupère les a du menu de navigation, ainsi que les sections
const navLinks = document.querySelectorAll(".nav-header a");
const sections = document.querySelectorAll("section[id]");

//  si on click sur un lien alors enlève le aria-current puis le met sur le bon
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => {
      item.removeAttribute("aria-current");
    });

    this.setAttribute("aria-current", "page");
  });
});

// option pour l'observer
const observerOptions = {
  root: null,
  rootMargin: "0px -40% 0px -40%",
  threshold: 0.0,
};

// mise en place de l'observer des sections, est renvoie l'id de la section
const observeSections = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // récupère l'id de la sections qui vient d'entrés dans l'observer
    if (entry.isIntersecting) activeLink(entry.target.id);
  });
}, observerOptions);

// fonction qui change le aria-current pour le mettre sur le bon (celui correspondent au href)
function activeLink(id) {
  navLinks.forEach((link) => {
    link.removeAttribute("aria-current");

    if (link.getAttribute("href") === `#${id}`) {
      link.setAttribute("aria-current", "page");
    }
  });
}

// observe les sections
sections.forEach((section) => {
  // observe les sections
  observeSections.observe(section);
});

/* ========================================================= */
/* Function pour les filtres */
/* ========================================================= */

/* ========================================================= */
/* Function pour le formulaire */
/* ========================================================= */
