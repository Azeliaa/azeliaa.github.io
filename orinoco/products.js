ajaxGet('https://oc-p5-api.herokuapp.com/api/teddies')
    .then(function (response) {
        let product = JSON.parse(response);      
        for (i=0; i < product.length; i++) {
            // Product cards on the main page
            let imgElt = document.getElementById("img" + (i+1));
            imgElt.src = product[i].imageUrl;
            let nameElt = document.getElementById("name" + (i+1));
            nameElt.textContent = product[i].name;
            let descriptionElt = document.getElementById("description" + (i+1));
            descriptionElt.textContent = product[i].description;
            let priceElt = document.getElementById("price" + (i+1));
            priceElt.textContent = product[i].price / 100 + "€";
            // New URL using product ID
            let linkElt = document.getElementById("link" + (i+1));
            linkElt.setAttribute("href", "product.html?id=" + product[i]._id);
        }
    })
    .catch(function (error) {
        console.log(error);
    });


/*     for (i=0; i < product.length; i++) {
        let imgElt = document.createElement("img");
        imgElt.id = "img" + i;
        imgElt.setAttribute("class", "card-img-top");
        imgElt.src = product[i].imageUrl;

        let cardElt = document.getElementById("card");
        cardElt.app

    } */