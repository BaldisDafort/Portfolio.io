// Sélectionner tous les liens de navigation
const navLinks = document.querySelectorAll('.nav-link');

// Ajouter un écouteur d'événement pour détecter le défilement de la page
window.addEventListener('scroll', () => {
    let currentSection = '';

    // Parcourir toutes les sections pour déterminer laquelle est visible
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    // Mettre à jour la classe "active" sur les liens de navigation
    navLinks.forEach(link => {
        link.classList.remove('active'); // Supprimer la classe active de tous les liens
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active'); // Ajouter la classe active au lien correspondant
        }
    });
});



// Gestion des onglets de projets
document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('click', () => {
        const tabId = image.dataset.tab; // Récupérer l'ID de l'onglet associé
        const tabContent = document.getElementById(tabId); // Trouver le contenu de l'onglet

        // Masquer tous les contenus d'onglets
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });

        // Afficher le contenu de l'onglet sélectionné
        tabContent.style.display = 'block';

        // Ajouter un bouton de fermeture pour masquer l'onglet
        const closeButton = tabContent.querySelector('.close-tab');
        closeButton.addEventListener('click', () => {
            tabContent.style.display = 'none';
        });
    });
});