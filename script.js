//javascript code
window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  setTimeout(function() {
        loader.classList.add('loader-hidden');
    }, 1500);
});

const summary = document.getElementById('ordersummary');
const toppingsmsg = document.getElementById('toppingsmsg');
const orderbtn = document.getElementById('submitorder');
const prices = {
    "Small": 10.00,
    "Medium": 15.00,
    "Large": 18.00,
    "Xtra™ Large": 25.00
};

function calculateTotal(size, toppingarray, deliverytype) {
    let baseprice = prices[size] || 0;
    let extracost = 0;
    let deliverycost = 0;
    for (let i = 0; i < toppingarray.length; i++) {
        if (i == 2) { 
            summary.textContent = "Each additional topping after the first two costs $0.50 each.";
        }
        else if (i > 2) {
            extracost += 0.50;
        }
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
    let deliverselect = document.querySelector("input[name='deliverymethod']:checked");
    if (!deliverselect) {
        summary.textContent = "Please select a delivery method!";
        return;
    }
    let grandtotal = 0;
    let orderdescrip = "";

    if (orderbtn.dataset.isShizza === "true") {
        let deliverycost = 0;
        if (deliverselect.value === "curbside pickup") deliverycost = 3;
        if (deliverselect.value === "delivery") deliverycost = 15;
        
        grandtotal = 30 + deliverycost;
        orderdescrip = "Sushi Pizza";
    }

    else {
    let sizeselect = document.querySelector("input[name='size']:checked");
    let toppingarray = [];
    document.querySelectorAll("input[name='freetoppings']:checked").forEach(el => {
        toppingarray.push(el.value);
    }); //Gemini helped explain the logic for this selector/list appender.
    if (!sizeselect) {
        summary.textContent = "Please select a pizza size";
        return;
    }
    grandtotal = calculateTotal(sizeselect.value, toppingarray, deliverselect.value);
    let toppingsText = toppingarray.length > 0 ? " with " + toppingarray.join(", ") : " with no toppings";
    orderdescrip = sizeselect.value + " pizza" + toppingsText;
    }

    summary.textContent = formattedname + ", you ordered a " + orderdescrip + ". Your total is $" + grandtotal.toFixed(2) + ". Please come get your pizza via " + deliverselect.value + ".";
    } 

const shizzabtn = document.getElementById('shizzabtn');

//below is the event listener for the shizza button. During the debugging process, I used gemini to help me understand how to disable the other options and update the summary text. I also added a scrollIntoView method to guide the user to the delivery options after selecting the shizza, since it bypasses the size and topping selections.
shizzabtn.addEventListener('click', function() {
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    const toppingInputs = document.querySelectorAll('input[name="freetoppings"]');
    
    sizeInputs.forEach(input => {
        input.disabled = true;
        input.checked = false; 
    });
    toppingInputs.forEach(input => {
        input.disabled = true;
        input.checked = false;
    });
    orderbtn.dataset.isShizza = "true";
    summary.textContent = "Sushi Pizza selected ($30.00). Please choose a delivery method below!";
    document.querySelector('input[name="deliverymethod"]').scrollIntoView({ behavior: 'smooth' });
});

orderbtn.addEventListener('click', updateOrderSummary);

//--------------------------------------------------------------------------------------------------------

const toppinginput = document.querySelectorAll("input[name='freetoppings']");
toppinginput.forEach(function(input) {
    input.addEventListener('change', function() {
        const usertoppings = document.querySelectorAll("input[name='freetoppings']:checked").length;
        if (usertoppings >= 2) {
            toppingsmsg.textContent = "Each additional topping costs $0.50 each.";
        } else {
            toppingsmsg.textContent = "Select 2 base toppings (free of charge)";
        }
    });
});

//w3schools aided in explaining date/time: https://www.w3schools.com/js/js_dates.asp
function updateStoreStatus() {
    const statustext = document.getElementById('store-status');
    const now = new Date();
    const hour = now.getHours();
    const open = 11;
    const close = 23;

    if (hour >= open && hour < close) {
        statustext.textContent = "We are currently open! Our hours are from 11:00 AM to 11:00 PM.";
    } else {
        statustext.textContent = "We are currently closed. Our hours are from 11:00 AM to 11:00 PM.";
    }
}
window.addEventListener('DOMContentLoaded', updateStoreStatus);



