let productsInCart = JSON.parse(localStorage.getItem('product'));

//------------------------- AFFICHAGE DU PANIER -------------------------//

let cartContainer = document.getElementById('cart-container');

function cartDisplay() {
    // Si le localStorage est vide ----------
    if (productsInCart === null || productsInCart.length === 0) {
        
        let emptyCart = document.createElement('p');
        emptyCart.innerText = 'Votre panier est vide.';
        cartContainer.appendChild(emptyCart);
    } 
    // Si le localStorage contient des produits ----------
    else {

        /// Quantité totale d'articles dans le panier ///
        let totalQuantity = 0;
        for (let l = 0; l < productsInCart.length; l++) {
            totalQuantity = totalQuantity + productsInCart[l].productQuantity;
        }

        console.log(totalQuantity)

        let cartQuantity = document.createElement('p');
        cartQuantity.classList.add('mb-4', 'fst-italic')
        if (totalQuantity === 1) {
            cartQuantity.innerText = "Votre panier contient 1 article.";
        } else if (totalQuantity > 1) {
            cartQuantity.innerText = "Votre panier contient " + totalQuantity + " articles.";
        }
        cartContainer.appendChild(cartQuantity)

        /// Affichage des cartes des produits ///
        for (k = 0; k < productsInCart.length; k++) {

            let productLine = document.createElement('div');
            productLine.classList.add('row', 'd-flex', 'border');
            cartContainer.appendChild(productLine);

            // Colonne IMG
            let productImgContainer = document.createElement('div');
            productImgContainer.classList.add('col-md-4', 'p-0')
            productLine.appendChild(productImgContainer);

            let productImg = document.createElement('img');
            productImg.classList.add('h-100', 'w-100');
            productImg.src = productsInCart[k].productImage;
            productImgContainer.appendChild(productImg);

            // Colonne INFOS
            let productInfosContainer = document.createElement('div')
            productInfosContainer.classList.add('col', 'p-3')
            productLine.appendChild(productInfosContainer);

            let productName = document.createElement('h3');
            productName.classList.add('fs-5', 'fw-bold')
            productName.innerText = productsInCart[k].productName;
            productInfosContainer.appendChild(productName);

            let productDescription = document.createElement('p');
            productDescription.innerText = productsInCart[k].productDescription;
            productInfosContainer.appendChild(productDescription);

            let productQuantity = document.createElement('p');
            productQuantity.innerText = "Quantité : " + productsInCart[k].productQuantity;
            productInfosContainer.appendChild(productQuantity);

            let totalPerProduct = (productsInCart[k].productPrice * productsInCart[k].productQuantity)

            let bottomProductLine = document.createElement('div');
            bottomProductLine.classList.add('row')
            productInfosContainer.appendChild(bottomProductLine)

            let productPrice = document.createElement('p');
            productPrice.classList.add('col', 'fs-6')
            productPrice.innerText = totalPerProduct + "€ ";
            bottomProductLine.appendChild(productPrice);

            let deleteArea = document.createElement('div');
            deleteArea.classList.add('col', "text-end")
            bottomProductLine.appendChild(deleteArea)

            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = "<i class=\"bi bi-trash\"></i>"
            deleteButton.classList.add('btn', 'fs-5', 'deleteButton')

            deleteArea.appendChild(deleteButton)
            
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

}
cartDisplay();

//------------------------- SUPPRESSION DES PRODUITS DANS LE PANIER -------------------------//

// Suppression des produits individuellement ----------
let deleteButtons = document.querySelectorAll('.deleteButton')
function productRemove() {
    for (let m = 0; m < deleteButtons.length; m++) {
        deleteButtons[m].addEventListener('click', function(e) {
            e.preventDefault();
            let id = productsInCart[m].productId;
            productsInCart.splice(id, 1);
            
            // enregistrement du localStorage
            localStorage.setItem('product', JSON.stringify(productsInCart));
            
            // message de confirmation
            alert(" L'article a bien été supprimé du panier !")

            // on rafraîchit la page
            location.reload();
        })
    }
}
productRemove();

