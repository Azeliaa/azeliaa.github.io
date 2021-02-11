// RECUPERATION DU LOCALSTORAGE POUR AFFICHAGE DU PANIER

if (localStorage.getItem("cartContent") === null) {         // SI PANIER VIDE
    // Masquer bouton "vider le panier"
    let emptyBtnElt = document.getElementById("emptyBtn");
    if (getComputedStyle(emptyBtnElt).display != "none") {
        emptyBtnElt.style.display = "none";
    }; 
    // Masquer le formulaire
    let form = document.getElementById("form");
    if (getComputedStyle(form).display != "none") {
        form.style.display = "none";
    }; 
} else {
    let emptyCartMessage = document.getElementById("emptyCartMessage");
    if (getComputedStyle(emptyCartMessage).display != "none") {
        emptyCartMessage.style.display = "none";
    };

    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    let totalAmount = 0;
    let sum = 0;

    for (i=0; i < cartContent.length; i++) {
        let cartElt = document.getElementById("cart");

            let newRow = document.createElement("tr");

                let productElt = document.createElement("td");
                productElt.id = "product";
                productElt.textContent = cartContent[i].name + " - " + cartContent[i].color;

                let priceElt = document.createElement("td");
                priceElt.id = "price";
                priceElt.textContent = cartContent[i].price + "€";

                let quantityElt = document.createElement("td");
                quantityElt.id = "quantity";
                quantityElt.textContent = cartContent[i].quantity;

                let subtotalElt = document.createElement("td");
                subtotalElt.id = "subtotal" + i;
                subtotalElt.textContent = cartContent[i].price * cartContent[i].quantity + "€";

            newRow.append(
                productElt,
                priceElt,
                quantityElt,
                subtotalElt
            );

        cartElt.append(newRow);

        sum = totalAmount + parseInt(subtotalElt.textContent);
        totalAmount = sum;

    }; 

    let totalElt = document.getElementById("total");
    totalElt.textContent = totalAmount + " €";

    // Vider entièrement le panier
    let emptyBtnElt = document.getElementById("emptyBtn");
    emptyBtnElt.addEventListener("click", function () {
        // Supprime les produits du LocalStorage
        localStorage.removeItem("cartContent");
        
        // Vider le tableau "Panier"
        let cartElt = document.getElementById("cart");
        cartElt.innerHTML = "";
        
        // Afficher un montant nul
        totalElt.textContent = 0 + " €";

        // Masquer le formulaire
        let form = document.getElementById("form");
        if (getComputedStyle(form).display != "none") {
            form.style.display = "none";
        };
    });
   

    // ENVOI DES DONNEES

    // Tableau des produits commandés
    let products = [];
    for (let i=0; i < cartContent.length; i++) {
        products.push(cartContent[i].id);
    };

    // Envoi des données de formulaire
    let submitElt = document.getElementById("submit");
    submitElt.addEventListener("click", function() {

        let formElt = document.getElementById("form");
        formElt.addEventListener("submit", function (e) {
            e.preventDefault();

            let contact = {
                "lastName" : document.getElementById("lastName").value,
                "firstName" : document.getElementById("firstName").value,
                "address" : document.getElementById("address").value,
                "optionalAddress" : document.getElementById("addressOptional").value,
                "code" : document.getElementById("code").value,
                "city" : document.getElementById("city").value,
                "email" : document.getElementById("email").value
                }

                let data = {
                    "products" : products,
                    "contact" : contact,
                };
            
                 ajaxPost('https://oc-p5-api.herokuapp.com/api/teddies/order', data)
                    .then(function (response) {
                        let orderId = JSON.parse(response);
                        localStorage.setItem("orderID", orderId.orderId);
                        localStorage.setItem("totalAmount", totalElt.textContent)
                        window.location.assign("../orinoco/recap.html");
                    })
                    .catch(function (error) {
                        console.log(error);
                    }) 
        })
    });
};
