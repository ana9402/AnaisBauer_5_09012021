let productsInCart = JSON.parse(localStorage.getItem('product'));
console.log(productsInCart)

// Si le localStorage est vide
if (productsInCart == null) {
    let cartContainer = document.getElementById('cart-container');

    let emptyCart = document.createElement('p');
    emptyCart.innerText = 'Votre panier est vide.';
    cartContainer.appendChild(emptyCart);
} 
// Si le localStorage contient des produits
else {

}