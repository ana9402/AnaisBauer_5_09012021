//****************************** VARIABLES ******************************//


// Récupération des produits dans le localStorage
let productsInCart = JSON.parse(localStorage.getItem('product')); 

// Calcul de la quantité totale d'articles dans le panier
let totalQuantity = 0;
if (productsInCart != null) {
    for (let l = 0; l < productsInCart.length; l++) {
        totalQuantity = totalQuantity + productsInCart[l].productQuantity;
    }
}


//****************************** FONCTIONS ******************************//


// Affichage de la quantité d'articles dans le panier
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