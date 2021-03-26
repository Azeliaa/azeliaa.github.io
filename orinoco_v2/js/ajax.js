// TESTER SI LA FONCTION RETOURNE BIEN LA REPONSE

function ajaxGet(url) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            return response;
        }
    request.open('GET', url);
    request.send();
    };
};

console.log(ajaxGet('https://oc-p5-api.herokuapp.com/api/teddies'));
