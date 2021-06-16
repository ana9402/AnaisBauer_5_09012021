// Récupération de l'ID de l'article dans l'URL
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
console.log(productId);

