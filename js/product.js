// Récupération de l'ID de l'article dans l'URL
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
console.log(productId);

// Récupération des données de l'API
fetch("http://localhost:3000/api/cameras/" + productId)
.then(
    function(result) {
        if (result.ok) {
            return result.json();
        }
    }
)
.then(data => {

     ////// Création d'une div pour la colonne de l'image
     let productImageContainer = document.createElement('div');
     productImageContainer.classList.add('col-md-7', 'p-0');

     let productContainer = document.getElementById('product-container');
     productContainer.appendChild(productImageContainer);

     ////// Création d'une img
     let productImage = document.createElement('img');
     productImage.classList.add('w-100')
     productImage.src = data.imageUrl;

     productImageContainer.appendChild(productImage);

     ////// Création d'une div pour la colonne infos
     let productInfosContainer = document.createElement('div');
     productInfosContainer.classList.add('col-md-5', 'p-5');

     productContainer.appendChild(productInfosContainer);

     ////// Création d'un h1 pour le titre de l'article
     let productHeading = document.createElement('h1');
     productHeading.classList.add('mb-4')
     productHeading.innerText = data.name;
     
     productInfosContainer.appendChild(productHeading);

     ////// Création d'un p pour la description
     let productDescription = document.createElement('p');
     productDescription.innerText = data.description;

     productInfosContainer.appendChild(productDescription);

     ////// Création d'un p pour le prix
     let productPrice  = document.createElement('p');
     productPrice.classList.add('fs-4');
     productPrice.innerText = data.price/100 + " €";

     productInfosContainer.appendChild(productPrice);

     ////// Création d'un bouton 
     let productBuyButton = document.createElement('button');
     productBuyButton.classList.add('btn', 'btn-lg', 'btn-dark', 'text-white', 'btn-outline-secondary',);
     productBuyButton.innerText = "Ajouter au panier";

     productInfosContainer.appendChild(productBuyButton);
})
