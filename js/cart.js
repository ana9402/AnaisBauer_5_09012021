
//****************************** AFFICHAGE DU PANIER ******************************//

let cartContainer = document.getElementById('cart-container');


// Si le localStorage est vide ----------
if (productsInCart == null || productsInCart.length == 0) {
    
    let emptyCart = document.createElement('p');
    emptyCart.innerText = 'Votre panier est vide.';
    cartContainer.appendChild(emptyCart);
} 

// Si le localStorage contient des produits ----------
else {

    /// Quantité totale d'articles dans le panier ///
    let quantityRow = document.createElement('div')
    quantityRow.classList.add('row', 'mb-4')
    cartContainer.appendChild(quantityRow)

    let cartQuantity = document.createElement('div');
    cartQuantity.classList.add('col', 'mb-3', 'mb-md-0', 'fst-italic', 'd-flex', 'align-items-center')
    if (totalQuantity === 1) {
        cartQuantity.innerText = "Votre panier contient 1 article.";
    } else if (totalQuantity > 1) {
        cartQuantity.innerText = "Votre panier contient " + totalQuantity + " articles.";
    }
    quantityRow.appendChild(cartQuantity)

    /// Bouton vider le panier ///
    let clearCartButton = document. createElement('button');
    clearCartButton.classList.add('col-md-3', 'btn', 'btn-secondary', 'border');
    clearCartButton.id = "clear-cart-btn";
    clearCartButton.innerHTML = "Vider le panier";
    quantityRow.appendChild(clearCartButton)


    /// Affichage des cartes des produits ///
    for (k = 0; k < productsInCart.length; k++) {

        let product = productsInCart[k]

        // Conteneur du produit
        let productLine = document.createElement('div');
        productLine.classList.add('row', 'd-flex', 'border');
        cartContainer.appendChild(productLine);

        // Colonne image
        let productImgContainer = document.createElement('div');
        productImgContainer.classList.add('col-md-4', 'p-0')
        productLine.appendChild(productImgContainer);

        // Image du produit
        let productImg = document.createElement('img');
        productImg.classList.add('h-100', 'w-100');
        productImg.src = product.productImage;
        productImgContainer.appendChild(productImg);

        // Colonne Infos
        let productInfosContainer = document.createElement('div')
        productInfosContainer.classList.add('col', 'p-3')
        productLine.appendChild(productInfosContainer);

        // Nom du produit
        let productName = document.createElement('h3');
        productName.classList.add('fs-5', 'fw-bold')
        productName.innerText = product.productName;
        productInfosContainer.appendChild(productName);

        // Description du produit
        let productDescription = document.createElement('p');
        productDescription.innerText = product.productDescription;
        productInfosContainer.appendChild(productDescription);

        // Conteneur pour la quantité du produit
        let productQuantityContainer = document.createElement('div')
        productQuantityContainer.classList.add('d-flex', "gap-3", 'mb-3')
        productInfosContainer.appendChild(productQuantityContainer)

        // Réduire la quantité 
        let lessQuantityButton = document.createElement('button')
        lessQuantityButton.classList.add('btn', 'btn-dark', 'px-2')
        lessQuantityButton.innerText = "-";
        productQuantityContainer.appendChild(lessQuantityButton)

        lessQuantityButton.addEventListener('click', function() {
            reduceQuantity(product)
            
            if (product.productQuantity ===0) {
                remove(product);
                
            }
        })

        // Afficher la quantité
        let productQuantity = document.createElement('p');
        productQuantity.classList.add('my-auto')
        productQuantity.innerText = product.productQuantity;
        productQuantityContainer.appendChild(productQuantity);


        // Augmenter la quantité
        let moreQuantityButton = document.createElement('button')
        moreQuantityButton.classList.add('btn', 'btn-dark', 'px-2')
        moreQuantityButton.innerText = "+";
        productQuantityContainer.appendChild(moreQuantityButton)

        moreQuantityButton.addEventListener('click', function() {
            addQuantity(product)
        })

        // Conteneur prix + corbeille
        let bottomProductLine = document.createElement('div');
        bottomProductLine.classList.add('row')
        productInfosContainer.appendChild(bottomProductLine)

        // Prix total par type de produit

        let totalPerProduct = (product.productPrice * product.productQuantity)

        let productPrice = document.createElement('p');
        productPrice.classList.add('col', 'fs-6','my-auto')
        productPrice.innerText = totalPerProduct + "€ ";
        bottomProductLine.appendChild(productPrice);

        // Bouton suppression
        let deleteArea = document.createElement('div');
        deleteArea.classList.add('col', "text-end")
        bottomProductLine.appendChild(deleteArea)

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "<i class=\"bi bi-trash\"></i>"
        deleteButton.classList.add('btn', 'fs-5', 'deleteButton')

        deleteArea.appendChild(deleteButton)

        // Suppression d'un type de produit
        deleteButton.addEventListener('click', function() {
            remove(product)
        });
    }

    /// Montant total du panier en € ///
    let totalCart = 0;
    for (let l = 0; l < productsInCart.length; l++) {
        totalCart = totalCart + (productsInCart[l].productPrice * productsInCart[l].productQuantity);
    }

    let totalCartSum = document.createElement('p')
    totalCartSum.classList.add('pt-5', 'fw-bold', 'fs-5')
    totalCartSum.innerText = "Total du panier : " + totalCart + " €";
    cartContainer.appendChild(totalCartSum);

}


//****************************** CONFIGURATION DU FORMULAIRE ******************************//

let form = document.getElementsByTagName('form')
let fieldset = document.querySelector('fieldset');
let submitButton = document.getElementById('submit-btn');
let firstNameField = document.getElementById('first-name')
let lastNameField = document.getElementById('last-name')
let emailField = document.getElementById('email-adress')
let zipCodeField = document.getElementById('zip-code')
let cityField = document.getElementById('city')

// Désactivation du formulaire si le panier est vide ----------
if (productsInCart == null || productsInCart == 0) {
    
    // Désactiver le formulaire
    fieldset.setAttribute('disabled', '');
}

// Vérification de la validité des champs ----------

// Prénom
firstNameField.addEventListener('change', function() {
    isValidGlobal(this)
})

// Nom
lastNameField.addEventListener('change', function() {
    isValidGlobal(this)
})

// Email
emailField.addEventListener('change', function() {
    isValidEmail(this)
})

// Code postal
zipCodeField.addEventListener('change', function() {
    isValidZipCode(this)
})

// Ville
cityField.addEventListener('change', function() {
    isValidGlobal(this)
})

// Affichage du message d'erreur



//****************************** FONCTIONS ******************************//


// Suppression des produits individuellement ---
function remove(item) {
    let index = productsInCart.indexOf(item);
    productsInCart.splice(index, 1);
    
    // enregistrement du localStorage
    localStorage.setItem('product', JSON.stringify(productsInCart));
    
    // message de confirmation
    alert(" L'article a bien été supprimé du panier !")

    // on rafraîchit la page
    location.reload();
}


// Vider le panier ---
let clearCartButton = document.getElementById('clear-cart-btn');
clearCartButton.addEventListener('click', function(e) {
    e.preventDefault();

    // demande de confirmation
    if (confirm("Etes-vous sûr(e) de vouloir vider votre panier ?")) {
        localStorage.removeItem('product');
    }

    // on rafraîchit la page
    location.reload();
})

// Augmenter les quantités d'un article ---
function addQuantity(item) {
    item.productQuantity++;
    localStorage.setItem('product', JSON.stringify(productsInCart));
    location.reload();
}

// Diminuer les quantités d'un article ---
function reduceQuantity(item) {
    item.productQuantity--;
    localStorage.setItem('product', JSON.stringify(productsInCart));
    location.reload();
}

// Configuration des RegExp ---

function isValidGlobal(input) {
    let validGlobal = /^[^-\s][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    let testGlobal = validGlobal.test(input.value);
    console.log(testGlobal)
}

function isValidEmail(input) {
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let testEmail = validEmail.test(input.value)
    console.log(testEmail)
}

function isValidZipCode(input) {
    let validZipCode = /^(?:[0-8]\d|9[0-8])\d{3}$/;
    let testZipCode = validZipCode.test(input.value)
    console.log(testZipCode)
}