let productsInCart = JSON.parse(localStorage.getItem('product'));

//------------------------- AFFICHAGE DES PRODUITS DANS LE  PANIER -------------------------

// Si le localStorage est vide
if (productsInCart === null) {
    let cartContainer = document.getElementById('cart-container');

    let emptyCart = document.createElement('p');
    emptyCart.innerText = 'Votre panier est vide.';
    cartContainer.appendChild(emptyCart);
} 
// Si le localStorage contient des produits
else {

    let cartContainer = document.getElementById('cart-container');

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

        let productPrice = document.createElement('p');
        productPrice.classList.add('fs-6')
        productPrice.innerText = productsInCart[k].productPrice;
        productInfosContainer.appendChild(productPrice);

        console.log(productsInCart.length);
        
    }
}