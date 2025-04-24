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

// Gestion des veilles technologiques
async function fetchRSSFeed(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        return xml;
    } catch (error) {
        console.error("Erreur lors de la récupération du flux RSS:", error);
        return null;
    }
}

function displayRSSItems(xml, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !xml) return;

    const items = xml.getElementsByTagName("item");
    container.innerHTML = ""; // Vider le conteneur

    for (let i = 0; i < Math.min(items.length, 5); i++) {
        const item = items[i];
        const title = item.getElementsByTagName("title")[0].textContent;
        const link = item.getElementsByTagName("link")[0].textContent;
        const pubDate = new Date(item.getElementsByTagName("pubDate")[0].textContent);
        
        const article = document.createElement("div");
        article.className = "veille-article";
        article.innerHTML = `
            <h4>${title}</h4>
            <p class="date">${pubDate.toLocaleDateString()}</p>
            <a href="${link}" target="_blank" class="veille-link">Lire l'article</a>
        `;
        container.appendChild(article);
    }
}

// Configuration des flux RSS
const rssFeeds = {
    "react-feed": "URL_DE_VOTRE_FLUX_RSS_REACT",
    "unreal-feed": "URL_DE_VOTRE_FLUX_RSS_UNREAL"
};

// Fonction pour mettre à jour tous les flux
async function updateAllFeeds() {
    for (const [feedId, url] of Object.entries(rssFeeds)) {
        const xml = await fetchRSSFeed(url);
        displayRSSItems(xml, feedId);
    }
}

// Mise à jour initiale des flux
updateAllFeeds();

// Mise à jour toutes les heures
setInterval(updateAllFeeds, 3600000);

// Gestion des détails des projets
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const detailsContainer = document.getElementById(`${projectId}-details`);
        
        // Masquer tous les détails
        document.querySelectorAll('.project-details').forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Afficher les détails du projet sélectionné
        if (detailsContainer) {
            detailsContainer.classList.add('active');
            // Défilement vers les détails avec un offset pour la navigation
            const offset = window.innerWidth <= 768 ? 80 : 0; // Offset pour mobile
            const detailsPosition = detailsContainer.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: detailsPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Gestion du glissement dans la section À propos
document.querySelector('.about-arrow').addEventListener('click', () => {
    const aboutSlide = document.querySelector('.about-slide');
    const aboutContent = document.querySelector('.about-content');
    const isMobile = window.innerWidth <= 768;
    
    // Si on est déjà sur le slide, retourner au début
    if (aboutSlide.classList.contains('active')) {
        aboutSlide.classList.remove('active');
        if (!isMobile) {
            aboutContent.style.transform = 'translateX(0)';
        }
        // Réactiver le défilement de la page
        document.body.style.overflow = 'auto';
        // Réinitialiser le zoom
        if (isMobile) {
            window.scrollTo(0, 0);
        }
    } else {
        // Aller au slide
        aboutSlide.classList.add('active');
        if (!isMobile) {
            aboutContent.style.transform = 'translateX(-100%)';
        }
        // Empêcher le défilement de la page sur mobile
        if (isMobile) {
            document.body.style.overflow = 'hidden';
            // Réinitialiser le zoom
            window.scrollTo(0, 0);
        }
    }
});

// Empêcher le zoom sur mobile
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });