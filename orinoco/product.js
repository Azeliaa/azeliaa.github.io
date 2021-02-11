function getId() {
    const param = window.location.search;
    const id = param.replace("?id=", "");
    return id;
}

id = getId();
let newAjaxUrl = "https://oc-p5-api.herokuapp.com/api/teddies/" + id;

ajaxGet(newAjaxUrl)
    .then(function (response) {
        let product = JSON.parse(response);
        let imgElt = document.getElementById("img");
        imgElt.src = product.imageUrl;
        let nameElt = document.getElementById("name");
        nameElt.textContent = product.name;
        let descriptionElt = document.getElementById("description");
        descriptionElt.textContent = product.description;
        let priceElt = document.getElementById("price");
        priceElt.textContent = product.price / 100 + "€";
    
        // CHOIX DE LA COULEUR
        let colorElt = document.getElementById("color-select");
        for (i = 0; i < product.colors.length; i++) {
            let choiceElt = document.createElement("option");
            choiceElt.setAttribute("value", product.colors[i]);
            choiceElt.id = "color" + i;
            choiceElt.textContent = product.colors[i];
            colorElt.appendChild(choiceElt);
        }

        // AJOUT D'UN PRODUIT AU PANIER
        let btnElt = document.getElementById("btn");

        btnElt.addEventListener("click", function() {
            let productId = product._id;
            let productName = product.name;
            let productColor = document.getElementById("color-select").value;
            let productQuantity = parseInt(document.getElementById("quantity").value);
            let productPrice = product.price / 100;
               
            let addedProduct = {
                "id" : productId, 
                "name" : productName, 
                "color": productColor, 
                "quantity" : productQuantity,
                "price" : productPrice
            }
            
            let cartContent;

            localStorage.getItem("cartContent") === null ? cartContent = [] : cartContent = JSON.parse(localStorage.getItem("cartContent"));

            cartContent.push(addedProduct);

            localStorage.setItem("cartContent", JSON.stringify(cartContent));

            alert("Article ajouté au panier !"); // A ne pas utiliser dans un produit fini, mais pratique pour le MVP
        });
    })

    .catch(function(error){
        console.log(error);
    });
