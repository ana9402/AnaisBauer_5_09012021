// --------------- Récupération de l'ID de l'article dans l'URL ---------------
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
console.log(productId);

// --------------- Récupération des données de l'API ---------------
fetch("http://localhost:3000/api/cameras/" + productId)
.then(
    function(result) {
        if (result.ok) {
            return result.json();
        }
    }
)
.then(data => {

    // --------------- Mise en forme du produit ---------------

    /// Création d'une div pour la colonne de l'image
    let productImageContainer = document.createElement('div');
    productImageContainer.classList.add('col-md-7', 'p-0');

    let productContainer = document.getElementById('product-container');
    productContainer.appendChild(productImageContainer);

    /// Création d'une img
    let productImage = document.createElement('img');
    productImage.classList.add('w-100', 'h-100')
    productImage.src = data.imageUrl;

    productImageContainer.appendChild(productImage);

    /// Création d'une div pour la colonne infos
    let productInfosContainer = document.createElement('div');
    productInfosContainer.classList.add('col-md-5', 'p-5');

    productContainer.appendChild(productInfosContainer);

    /// Création d'un h1 pour le titre de l'article
    let productHeading = document.createElement('h1');
    productHeading.classList.add('mb-4')
    productHeading.innerText = data.name;
    
    productInfosContainer.appendChild(productHeading);

    /// Création d'un p pour la description
    let productDescription = document.createElement('p');
    productDescription.innerText = data.description;

    productInfosContainer.appendChild(productDescription);

    /// Création d'un p pour le prix
    let productPrice  = document.createElement('p');
    productPrice.classList.add('fs-4', 'mb-5');
    productPrice.innerText = data.price/100 + " €";

    productInfosContainer.appendChild(productPrice);

    /// Création d'une liste déroulante pour les options
    let optionForm = document.createElement('form');
    optionForm.classList.add('mb-4')

    productInfosContainer.appendChild(optionForm);

    let optionLabel = document.createElement('label');
    optionLabel.classList.add('me-3')
    optionLabel.innerText = "Personnalisez la lentille :"

    optionForm.appendChild(optionLabel);

    let optionSelect = document.createElement('select');

    optionForm.appendChild(optionSelect);

    /// affichage des options
    for (i = 0; i < data.lenses.length; i++) {
    let optionElement = document.createElement('option');
    optionElement.innerText = data.lenses[i];
    optionElement.value = data.lenses[i];

    optionSelect.appendChild(optionElement);
}


    /// Création d'un bouton 
    let productBuyButton = document.createElement('button');
    productBuyButton.classList.add('btn', 'btn-lg', 'btn-dark', 'text-white', 'btn-outline-secondary',);
    productBuyButton.id = "add-to-cart-btn"
    productBuyButton.innerText = "Ajouter au panier";

    productInfosContainer.appendChild(productBuyButton);


    // --------------- Ajout des articles dans le panier ---------------

    let selectedProduct = {
        productImage: data.imageUrl,
        productName: data.name,
        productDescription: data.description,
        productId: data._id,
        productQuantity: 1,
        productPrice: data.price /100 + " €"
    };

    // création d'un événement au clic sur le bouton
    productBuyButton.addEventListener('click', function() {

        let productsInCart = JSON.parse(localStorage.getItem('product'));

        /// s'il n'y a pas de produit dans le local storage
        if (productsInCart === null) {
            productsInCart = [];
            productsInCart.push(selectedProduct);
            localStorage.setItem('product', JSON.stringify(productsInCart));
            alert("L'article a bien été ajouté au panier");
            location.reload();
        }

        /// s'il y a des produits dans le local storage
        else {
            let alreadyInCart = false;
            //// Si le produit sélectionné est déjà présent dans le panier
            for (j = 0; j < productsInCart.length; j++) {
                
                if (selectedProduct.productId == productsInCart[j].productId) {
                    productsInCart[j].productQuantity++;
                    alreadyInCart = true;
                    location.reload();
                    break;
                }

            }
            //// Si le produit sélectionné n'est pas présent dans le panier
            if (!alreadyInCart) {

                productsInCart.push(selectedProduct);
                localStorage.setItem('product', JSON.stringify(productsInCart));
            }

            alert("Le produit a bien été ajouté au panier !")
            localStorage.setItem('product', JSON.stringify(productsInCart));
        } 
    });
})

/// --------- Configuration du message d'erreur ---------
.catch(
    function(error) {

        ////// Création d'une div avec une classe col
        let col = document.createElement('div');
        col.classList.add('col', 'text-center', 'bg-light', 'text-secondary', 'p-4', 'border')

        let errorContainer = document.getElementById('product-container');
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