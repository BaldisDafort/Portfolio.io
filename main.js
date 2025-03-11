document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.getElementById("theme-switcher");
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
    
    document.addEventListener("DOMContentLoaded", () => {
        const themeButton = document.getElementById("theme-switcher");
    
        // Ajoute un gestionnaire d'événement pour changer le thème
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
        });
    });

    // Particles effect
    const particlesContainer = document.getElementById("particles");
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.top = Math.random() * 100 + "vh";
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = Math.random() * 5 + 2 + "s";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particlesContainer.appendChild(particle);
    }

    // Custom cursor
    const cursor = document.querySelector(".custom-cursor");
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Project Details
    const projectImages = document.querySelectorAll(".project-image");
    const projectDetails = document.getElementById("project-details");
    const closeDetailsButton = document.getElementById("close-details");
    const projectDescription = document.getElementById("project-description");

    projectImages.forEach(image => {
        image.addEventListener("click", () => {
            projectDetails.style.display = "block";
            const projectId = image.getAttribute("data-project");
            if (projectId === "project1") {
                projectDescription.textContent = "This is a detailed description of Project 1.";
            } else if (projectId === "project2") {
                projectDescription.textContent = "This is a detailed description of Project 2.";
            }
        });
    });

    closeDetailsButton.addEventListener("click", () => {
        projectDetails.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projectImages = document.querySelectorAll(".project-image");
    const tabContents = document.querySelectorAll(".tab-content");
    const closeTabButtons = document.querySelectorAll(".close-tab");

    // Activer un onglet au clic sur une image
    projectImages.forEach(image => {
        image.addEventListener("click", () => {
            // Masquer tous les onglets
            tabContents.forEach(tab => tab.classList.remove("active"));

            // Activer l'onglet correspondant à l'image cliquée
            const tabId = image.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("active");
        });
    });

    // Fermer un onglet au clic sur le bouton "X"
    closeTabButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.parentElement.classList.remove("active");
        });
    });
});
