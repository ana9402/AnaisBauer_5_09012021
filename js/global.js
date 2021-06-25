//*******************  VARIABLES *******************//

let productsInCart = JSON.parse(localStorage.getItem('product')); // Récupération des produits dans le localStorage

// Calcul de la quantité totale d'articles dans le panier
let totalQuantity = 0;
if (productsInCart != null) {
    for (let l = 0; l < productsInCart.length; l++) {
        totalQuantity = totalQuantity + productsInCart[l].productQuantity;
    }
}

//*******************  FONCTIONS *******************//

function cartQuantityDisplay() {

    let cartLink = document.getElementById('cart-link');
    let cartQuantity = document.createElement('span');
    cartLink.appendChild(cartQuantity)

    if (totalQuantity === 0) {
        cartQuantity.innerText = "(0)";
    } else if (totalQuantity > 0) {
        cartQuantity.innerText = "(" + totalQuantity + ")";
    }

}
cartQuantityDisplay();