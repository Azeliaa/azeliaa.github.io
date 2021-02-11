// REQUETE HTML GET
const ajaxGet = function (url) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();

        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(req);
                }
            }
        }
    
        req.open('GET', url);
        req.send();
    })
}

// REQUETE HTML POST
const ajaxPost = function (url, data) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();

        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 201) {
                    resolve(req.responseText);
                } else {
                    reject(req);
                }
            }
        }

        req.open('POST', url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(data));
    })
}
