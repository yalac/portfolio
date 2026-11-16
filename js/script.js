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
  rootMargin: "-50%",
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
const filterButtons = document.querySelectorAll(".button-filter");
const projects = document.querySelectorAll(".card-project");
const counter = document.getElementById("project-counter");
const buttonMoreProject = document.getElementById("more-projects-button");
const listProject = document.querySelector(".cards");

//  si on click sur un bouton de filtre alors enlève le aria-current puis le met sur le bon
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((item) => {
      item.removeAttribute("aria-current");
    });
    button.setAttribute("aria-current", "filter-choice");
  });
});

// function pour filtrer les projects en function de leur filtre (class)
function filterProject(filter) {
  let projectCount = 0;

  projects.forEach((card) => {
    if (filter === "all" || card.classList.contains(filter)) {
      card.classList.remove("hidden");
      projectCount++;
      card.classList.toggle("more-card-hide", projectCount > 4);
    } else {
      card.classList.add("hidden");
    }
  });

  counter.textContent = projectCount;

  if (projectCount > 4) {
    buttonMoreProject.classList.remove("hidden");
  } else {
    buttonMoreProject.classList.add("hidden");
    listProject.classList.remove("show-all");
    buttonMoreProject.textContent = "Voir plus";
  }
}

// pour chaque bouton, j'appelle la function et récupère data-filter pour comparer
filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const filter = event.currentTarget.getAttribute("data-filter");
    filterProject(filter);
  });
});

// initialiser a all pour par défaut (permet aussi d'avoir le bon nombre de project)
filterProject("all");

/* ========================================================= */
/* Function pour le formulaire */
/* ========================================================= */
// récupére le message de réponse et le formulaire
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", async (event) => {
  // Permet de rester sur la page lors de l'envoie du formulaire et de ne pas être redirigé
  event.preventDefault();

  // récupére les donné de nom, email, et contact-message
  const name = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  // si nom vide alors erreur
  if (name === "") {
    formMessage.style.color = "red";
    formMessage.textContent = "Erreur : entrez un nom";
    return;
  }

  // si email vide ou pas @ ou pas de . alors erreur
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    formMessage.style.color = "red";
    formMessage.textContent = "Erreur : entrez un courriel valide";
    return;
  }

  // si message vide alors erreur
  if (message === "") {
    formMessage.style.color = "red";
    formMessage.textContent = "Erreur : entrez un message";
    return;
  }

  // Envoie le formulaire à web3Forms et attend sa réponse
  const answer = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: new FormData(form),
  });

  // si la réponse est bonne alors affiche envoyé, reset le form puis disparait apres 5s
  // sinon affiche echec
  if (answer.ok) {
    formMessage.style.color = "green";
    formMessage.textContent = "Mail envoyé avec succès !";
    form.reset();

    setTimeout(() => {
      formMessage.textContent = "";
    }, 5000);
  } else {
    formMessage.style.color = "red";
    formMessage.textContent = "Échec de l'envoie du mail";
  }
});

/* ========================================================= */
/* Function pour afficher tous les projects */
/* ========================================================= */
const projectSection = document.getElementById("projects");

buttonMoreProject.onclick = () => {
  listProject.classList.toggle("show-all");

  if (listProject.classList.contains("show-all")) {
    buttonMoreProject.textContent = "Voir moins";
  } else {
    buttonMoreProject.textContent = "Voir plus";
    projectSection.scrollIntoView({ behavior: "smooth" });
  }
};
