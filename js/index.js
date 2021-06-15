fetch("http://localhost:3000/api/cameras")
.then(
    function(result) {
        if (result.ok) {
            return result.json();
        }
    }
)
.then(data => { 
    let l = data.length; /* Déclaration d'une variable qui contiendra le nombre de caméras */
    for (let i = 0; i < l; i++) { 

        ////// Creation d'une div avec une classe col
        let col = document.createElement('div'); 
        col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-5');
        
        let productsContainer = document.getElementById('products-list'); // On crée une variable pour l'élément parent
        productsContainer.appendChild(col); // On déclare l'élément parent

        ////// Création d'une figure avec une classe card
        let card = document.createElement('figure');
        card.classList.add('card', 'shadow', 'h-100');

        col.appendChild(card);

        ////// Création du conteneur de l'image
        let imgContainer = document.createElement('div');
        imgContainer.id = "image-container"
        card.appendChild(imgContainer)

        ////// Création d'une image 
        let img = document.createElement('img');
        img.classList.add('card-img-top', 'h-100');
        img.src = data[i] ['imageUrl'];
        img.css = 'width:100%';
        
        imgContainer.appendChild(img);

        ////// Création d'un figcaption pour le contenu de la carte
        let cardBody = document.createElement('figcaption');
        cardBody.classList.add('card-body');

        card.appendChild(cardBody);

        ////// Création d'une div pour le titre + le prix de l'article
        let cardTop = document.createElement('div');
        cardTop.classList.add('d-flex', 'mt-2');

        cardBody.appendChild(cardTop);

        ////// Création d'un h2 pour le nom du produit
        let cardHeader = document.createElement('h3');
        cardHeader.classList.add('card-title', 'col-9', 'fs-5', 'fw-bold');
        cardHeader.innerText = data[i] ['name'];

        cardTop.appendChild(cardHeader);

        ////// Création d'un paragraphe pour le prix du produit
        let cardPrice = document.createElement('p');
        cardPrice.classList.add('col-3', 'text-center');
        cardPrice.innerText = data[i] ['price']/100 + ' €';

        cardTop.appendChild(cardPrice);

        ////// Création d'un paragraphe pour la description du produit
        let cardDescription = document.createElement('p');
        cardDescription.innerText = data[i] ['description'];

        cardBody.appendChild(cardDescription);

        ////// Création d'un bouton 
        let cardButton = document.createElement('a');
        cardButton.href = "./product.html?id=" + data[i] ['_id'];
        cardButton.classList.add('btn', 'btn-dark', 'text-white', 'btn-outline-secondary', 'col-12');
        cardButton.innerText = "Acheter";
        cardBody.appendChild(cardButton);
    }
})
.catch(
    function(error) {

        ////// Création d'une div avec une classe col
        let col = document.createElement('div');
        col.classList.add('col', 'text-center', 'bg-light', 'text-secondary', 'p-4', 'border')

        let errorContainer = document.getElementById('products-list');
        errorContainer.appendChild(col);

        ////// Création d'un paragraphe pour l'icone du message d'erreur
        let errorIcon = document.createElement('p')
        errorIcon.classList.add('fs-1')
        errorIcon.innerHTML = "<i class=\"bi bi-emoji-frown-fill\"></i>";

        col.appendChild(errorIcon);

        ////// Création d'un h2 pour le titre du message d'erreur
        let errorTitle = document.createElement('h2')
        errorTitle.classList.add('fs-3');
        errorTitle.innerHTML = "Oups, une erreur est survenue.";

        col.appendChild(errorTitle)

        ////// Création d'un paragraphe pour le contenu du message d'erreur
        let errorContent = document.createElement('p');
        errorContent.innerHTML = "Notre site rencontre actuellement un problème lié au serveur.<br> Nous vous prions de nous excuser pour la gêne occasionnée et vous invitons à réessayer ultérieurement.";

        col.appendChild(errorContent);
    }
);