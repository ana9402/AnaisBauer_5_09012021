//****************************** AFFICHAGE DU PANIER ******************************//

let cartContainer = document.getElementById('cart-container');
let totalCart = 0;


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
let fieldset = document.querySelector('fieldset')
let inputs = document.querySelectorAll('form inputs')
let submitButton = document.getElementById('submit-btn')
let firstNameField = document.getElementById('first-name')
let lastNameField = document.getElementById('last-name')
let emailField = document.getElementById('email-address')
let addressField = document.getElementById('address')
let zipCodeField = document.getElementById('zip-code')
let cityField = document.getElementById('city')
let firstNameError = document.getElementById('first-name-error')
let lastNameError = document.getElementById('last-name-error')
let emailError = document.getElementById('email-error')
let addressError = document.getElementById('address-error')
let zipCodeError = document.getElementById('zip-code-error')
let cityError = document.getElementById('city-error')
let order;

// Désactivation du formulaire si le panier est vide ----------
if (productsInCart == null || productsInCart == 0) {
    
    // Désactiver le formulaire
    fieldset.setAttribute('disabled', '');
}


// Vérification de la validité des champs (regex) sur l'événement change ----------

let validation = false;

function checkInputs() {
    // Prénom
    firstNameField.addEventListener('change', function() {
        isValidGlobal(this, firstNameError)
    })

    // Nom
    lastNameField.addEventListener('change', function() {
        isValidGlobal(this, lastNameError)
    })

    // Email
    emailField.addEventListener('change', function() {
        isValidEmail(this, emailError)
    })

    // Code postal
    zipCodeField.addEventListener('change', function() {
        isValidZipCode(this, zipCodeError)
    })

    // Ville
    cityField.addEventListener('change', function() {
        isValidGlobal(this, cityError)
    })

    return validation;
}
checkInputs();

//****************************** ENVOI DU FORMULAIRE ******************************//

// Evénement au clic sur le bouton de validation ----------
submitButton.addEventListener('click', function (e) {

    // Vérification des champs vides
    emptyField(firstNameField, firstNameError)
    emptyField(lastNameField, lastNameError)
    emptyField(emailField, emailError)
    emptyField(addressField, addressError)
    emptyField(zipCodeField, zipCodeError)
    emptyField(cityField, cityError)

  

    // Si les données ne sont pas validées
    if (validation == false) {
        e.preventDefault();
        console.log("Les données ne sont pas valides.")
    } 
    // Si les données sont validées
    else {
        console.log("Les données sont valides")
        e.preventDefault();
        let productsList = [];

        // Objet
        order = {
            contact: {
                firstName: firstNameField.value,
                lastName: lastNameField.value,
                address: addressField.value,
                city: cityField.value,
                email: emailField.value
            },
            products: productsList
        }

        for (let q = 0; q < productsInCart.length; q++) {
            productsList.push(productsInCart[q].productId)
        }

        // Stockage du prix total du panier
        let orderSum = []
        orderSum.push(totalCart)
        localStorage.setItem('totalCart', JSON.stringify(orderSum))

        postData();
    }

})


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

function isValidGlobal(input, inputError) {
    let validGlobal = /^[^-\s][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;

    if (validGlobal.test(input.value) == false) {
        input.classList.add('border-danger')
        inputError.innerText = "Le champ n'est pas valide."
        validation = false;
    } else if (validGlobal.test(input.value) == true) {
        input.classList.remove('border-danger')
        input.classList.add('border-success')
        inputError.innerText = "";
        validation = true;
    }
    return validGlobal.test(input.value);

}

function isValidEmail(input, inputError) {
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (validEmail.test(input.value) == false) {
        input.classList.add('border-danger')
        inputError.innerText = "Le champ n'est pas valide."
        validation = false;
    } else if (validEmail.test(input.value) == true) {
        input.classList.remove('border-danger')
        input.classList.add('border-success')
        inputError.innerText = "";
        validation = true;
    }
    return validEmail.test(input.value)
}

function isValidZipCode(input, inputError) {
    let validZipCode = /^(?:[0-8]\d|9[0-8])\d{3}$/;
    if (validZipCode.test(input.value) == false) {
        input.classList.add('border-danger')
        inputError.innerText = "Le champ n'est pas valide."
        validation = false;
    } else if (validZipCode.test(input.value) == true) {
        input.classList.remove('border-danger')
        input.classList.add('border-success')
        inputError.innerText = "";
        validation = true;
    }
    return validZipCode.test(input.value)
}

// Si les champs du formulaire sont vides au clic sur le bouton de validation ---
function emptyField(fieldName, errorFieldName) {
    if (fieldName.validity.valueMissing) {
        errorFieldName.innerText = "Veuillez renseigner ce champ."
        fieldName.classList.add('border-danger')
    }
}

// Envoi des données ---
function postData() {
    fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
    })
    .then(function(result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then(data => {
        console.log(data)

        // Récupération et stockage du numéro de commande
        let orderId = data.orderId;
        console.log(orderId)
        let orderProducts = [];
        orderProducts.push(orderId)
        localStorage.setItem('orderId', JSON.stringify(orderProducts));

        // Suppression des articles du local storage
        localStorage.removeItem('product');

        // Redirection
        window.location.href = "./order-status.html"

        console.log("Le POST fonctionne")
    })
    .catch(function(error) {
        console.log(error)
        alert("Le serveur a rencontré une erreur. Veuillez réessayer plus tard.")
    })
}
