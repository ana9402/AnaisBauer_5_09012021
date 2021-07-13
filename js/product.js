// --------------- Récupération de l'ID de l'article dans l'URL ---------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');


// --------------- Récupération des données de l'API ---------------
function getProduct() {
    fetch("http://localhost:3000/api/cameras/" + productId)
    .then(
    function(result) {
        if (result.ok) {
            return result.json();
        }
    })
    // Données
    .then(data => {
        console.log(data)
        displayProduct(data)
    })

    // Message d'erreur
    .catch(error => {
        console.log(error)
        errorMessage('product-container')
    });
}
getProduct()

// --------------- Mise en forme du produit ---------------
function displayProduct(data) {
    
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
    productPrice.innerText = data.price/100 + "€";

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

    productBuyButton.addEventListener('click', function() {
        addToCart(data)
    });
}

// --------------- Ajout des articles dans le panier ---------------
function addToCart(data) {
    
    let selectedProduct = {
        productImage: data.imageUrl,
        productName: data.name,
        productDescription: data.description,
        productId: data._id,
        productQuantity: 1,
        productPrice: data.price /100
    };

    /// s'il n'y a pas de produit dans le local storage
    if (productsInCart === null) {
        productsInCart = [];
        productsInCart.push(selectedProduct);
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
        }
    } 
    localStorage.setItem('product', JSON.stringify(productsInCart));
    alert("L'article a bien été ajouté au panier");
    location.reload();
}