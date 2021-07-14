let totalQuantity;
// Récupération des produits dans le localStorage
let productsInCart = JSON.parse(localStorage.getItem('product')); 

// Calcul de la quantité totale d'articles dans le panier
function getTotalQuantity() {
    totalQuantity = 0;
    if (productsInCart != null) {
        for (let l = 0; l < productsInCart.length; l++) {
            totalQuantity = totalQuantity + productsInCart[l].productQuantity;
        }
    }
    return totalQuantity;
}
getTotalQuantity();

// Affichage de la quantité d'articles dans le panier
function displayQuantityOnHeader(quantity) {
    let cartLink = document.getElementById('cart-link');
    let cartQuantity = document.createElement('span');
    cartLink.appendChild(cartQuantity)

    if (quantity === 0) {
        cartQuantity.innerText = "(0)";
    } else if (quantity > 0) {
        cartQuantity.innerText = "(" + quantity + ")";
    }
}
displayQuantityOnHeader(totalQuantity);

// Affichage d'un message d'erreur en cas d'échec de la requête API
function errorMessage(messageContainer) {
    console.log("Erreur de connexion au serveur")

    ////// Création d'une div avec une classe col
    let col = document.createElement('div');
    col.classList.add('col', 'text-center', 'bg-light', 'text-secondary', 'p-4', 'border')
    let errorContainer = document.getElementById(messageContainer);
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