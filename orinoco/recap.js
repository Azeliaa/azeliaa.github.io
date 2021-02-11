let orderIdElt = document.getElementById("order_id");
orderIdElt.textContent = localStorage.getItem("orderID");

let totalAmountElt = document.getElementById("totalAmount");
totalAmountElt.textContent = localStorage.getItem("totalAmount");