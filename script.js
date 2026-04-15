const prices = {
    "Small": 10.00,
    "Medium": 15.00,
    "Large": 18.00,
    "Xtra™ Large": 25.00
};

function calculateTotal(size, toppingCount) {
    let basePrice = prices[size] || 0;
    let extraCost = 0;

    if (toppingCount > 2) {
        extraCost = (toppingCount - 2) * 1.50;
    }

    return basePrice + extraCost;
}

function updateOrderSummary() {
    let username = document.getElementById('name').value;
    const formattedName = username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : "Customer";
    let selectedsize = document.querySelector('input[name="size"]:checked');

    let toppingarray = [];
    document.querySelectorAll('input[name="freetoppings"]:checked').forEach(el => {
        toppingarray.push(el.value);
    });

    let userdeliver = document.querySelector('input[name="deliverymethod"]:checked');
    let deliverymethod = userdeliver ? userdeliver.value : "None";

    let baseprice = selectedsize ? prices[selectedsize.value] : 0;

    let extratoppingcost = 0;
    if (toppingarray.length > 2) {
        extratoppingcost = (toppingarray.length - 2) * 1.50;
    }
    let deliverycost = 0;
    if (deliverymethod === "curbside") deliverycost = 3;
    if (deliverymethod === "delivery") deliverycost = 15;
    
    let firstTotal = baseprice + extratoppingcost + deliverycost;
    let finalTotal = firstTotal.toFixed(2);
    summary.textContent = `${formattedName}, your ${selectedsize?.value || "Pizza"} with [${toppingarray.join(", ") || "no toppings"}] costs $${finalTotal}`;
}

document.addEventListener('input', updateOrderSummary);



