let username = document.getElementById('name').value;
const formattedName = username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : "";
const sizeForm = document.getElementById('sizeForm');
const toppingsForm = document.getElementById('toppings');
const summary = document.getElementById('ordersummary');
const submitBtn = document.getElementById('submitOrder');

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




