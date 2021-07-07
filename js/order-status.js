// Récupération du numéro de commande dans le localStorage
let orderId = JSON.parse(localStorage.getItem('orderId'))


//****************************** AFFICHAGE DES ELEMENTS SUR LA PAGE ******************************//

let statusContainer = document.getElementById('status-container')
let statusIconContainer = document.getElementById('status-icon')
let statusTitleContainer = document.getElementById('status-title')
let statusTextContainer = document.getElementById('status-text')
let statusBtnContainer = document.getElementById('status-btn')

// Si une commande vient d'être passée ----------
if (orderId) {
    let statusIcon = document.createElement('i')
    statusIcon.classList.add('col', 'bi', 'bi-check-circle-fill', 'fs-1', 'text-success')
    statusIconContainer.appendChild(statusIcon)

    let statusTitle = document.createElement('h1')
    statusTitle.innerText = "Félicitations, votre commande est validée !"
    statusTitleContainer.appendChild(statusTitle)

    let statusText = document.createElement('p')
    statusText.innerHTML = "Votre commande a bien été prise en compte, et sera traitée dans les meilleurs délais. <br>Nous vous tiendrons informé(e) par mail de son expédition."
    statusTextContainer.appendChild(statusText)

    let showOrderId = document.createElement('p')
    showOrderId.innerHTML = "<span class='fw-bold'>N° de commande : </span>" + orderId
    statusTextContainer.appendChild(showOrderId)

    // Suppression de l'id du localStorage
    localStorage.removeItem('orderId')
}

// Si aucune commande n'a été passée ----------
else {
    let statusIcon = document.createElement('i')
    statusIcon.classList.add('col', 'bi', 'bi-emoji-frown', 'fs-1')
    statusIconContainer.appendChild(statusIcon)

    let statusTitle = document.createElement('h1')
    statusTitle.innerText = "Oups, vous êtes perdu(e) ?"
    statusTitleContainer.appendChild(statusTitle)

    let statusText = document.createElement('p')
    statusText.innerHTML = "Il semblerait que vous vous soyez égaré(e) en naviguant sur notre site.<br> Pas de panique ! Il vous suffit de cliquer sur le bouton ci-dessous pour retourner à l'accueil et découvrir notre sélection de produits."
    statusTextContainer.appendChild(statusText)

}


// Bouton de retour vers la page d'accueil
let statusBtn = document.createElement('button')
statusBtn.classList.add('col-md-3', 'btn', 'btn-dark', 'border', 'mx-auto')
statusBtn.innerText = "Retour à l'accueil"
statusBtnContainer.appendChild(statusBtn)

statusBtn.addEventListener('click', function(e) {
    window.location.href= "index.html"
})