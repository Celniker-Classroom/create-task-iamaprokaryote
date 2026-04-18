const summary = document.getElementById('ordersummary');
const orderBtn = document.getElementById('submitorder');
const prices = {
    "Small": 10.00,
    "Medium": 15.00,
    "Large": 18.00,
    "Xtra™ Large": 25.00
};

function calculateTotal(size, toppingcount, deliverytype) {
    let baseprice = prices[size] || 0;
    let extracost = 0;
    let deliverycost = 0;
    if (toppingcount > 2) {
        extracost = (toppingcount - 2) * 0.50;
    }
    if (deliverytype === "curbside") {
        deliverycost = 3;
    }
    else if (deliverytype === "delivery") {
        deliverycost = 15;
    }
    return baseprice + extracost + deliverycost;
}

function updateOrderSummary() {
    let username = document.getElementById('name').value;
    const formattedname = username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : "Customer";
    let sizeselect = document.querySelector("input[name='size']:checked");
    let deliverselect = document.querySelector("input[name='deliverymethod']:checked");
    let toppingarray = [];
    document.querySelectorAll("input[name='freetoppings']:checked").forEach(el => {
        toppingarray.push(el.value);
    }); //Gemini helped explain the logic for this selector/list appender.
    if (!sizeselect) {
        summary.textContent = "Please select a pizza size";
        return;
    }
    const grandtotal = calculateTotal(sizeselect.value, toppingarray.length, deliverselect?.value);
    summary.textContent = formattedname + ", you ordered a " + sizeselect.value + " pizza with " + toppingarray.join(", ") + ". Your total is $" + grandtotal.toFixed(2) + ".";
} 

orderBtn.addEventListener('click', updateOrderSummary);


