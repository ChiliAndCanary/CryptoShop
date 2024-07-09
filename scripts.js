let cart = [];

function addToCart(id, name, price) {
    const quantity = parseInt(document.getElementById(`quantity${id}`).value);
    const item = {
        id: id,
        name: name,
        price: price,
        quantity: quantity
    };

    // Check if item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.id === id);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    updateCartDetails();
}

function updateCartDetails() {
    let cartDetails = '';
    let totalAmount = 0;

    cart.forEach(item => {
        cartDetails += `${item.name} x ${item.quantity}\n`;
        totalAmount += item.price * item.quantity;
    });

    document.getElementById('cartDetails').value = cartDetails;

    let shippingCost = parseFloat(document.getElementById('shippingCost').value);
    if (totalAmount > 25) {
        shippingCost = 0;
        document.getElementById('shippingCost').value = 0;
    }

    document.getElementById('amount').value = totalAmount + shippingCost;
}

function updateTotal() {
    updateCartDetails();
}

function clearCart() {
    cart = [];
    updateCartDetails();
}

document.getElementById('connectButton').addEventListener('click', () => {
    // Connect wallet logic
});

document.getElementById('payButton').addEventListener('click', () => {
    // Payment logic
});
