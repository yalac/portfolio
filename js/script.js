/* Function thème clair/sombre */
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

/* Function navigation changer le aria-current */

/* Function pour les filtres */

/* Function pour le formulaire */
