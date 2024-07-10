let cart = [];
let totalAmount = 0;
let shippingCost = 4.00;

function generateOrderNumber() {
    const now = new Date();
    const orderNumber = now.toISOString().replace(/[-:.TZ]/g, "");
    document.getElementById('orderNumber').value = orderNumber;
}

function updateShippingCost() {
    const totalWithoutShipping = totalAmount;
    shippingCost = totalWithoutShipping >= 25 ? 0 : 4;
    document.getElementById('shippingCost').value = shippingCost.toFixed(2);
}

function updateCartDetails() {
    let cartDetails = '';
    totalAmount = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        cartDetails += `${item.name} x${item.quantity} - ${itemTotal.toFixed(2)} USDT\n`;
    });

    document.getElementById('cartDetails').value = cartDetails.trim();
    updateShippingCost();
    document.getElementById('amount').value = (totalAmount + shippingCost).toFixed(2);
}

function addToCart(id, name, price) {
    const quantity = parseInt(document.getElementById(`quantity${id}`).value);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
        if (cart.length === 1) {
            generateOrderNumber();
        }
    }

    updateCartDetails();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDetails();
}

function clearCart() {
    cart = [];
    updateCartDetails();
    document.getElementById('amount').value = '0.00';
    document.getElementById('shippingCost').value = '4.00';
}

document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('status').textContent = 'Wallet connected';
        } catch (error) {
            console.error(error);
            document.getElementById('status').textContent = 'Failed to connect wallet';
        }
    } else {
        document.getElementById('status').textContent = 'Please install a Web3 wallet';
    }
});

document.getElementById('payButton').addEventListener('click', () => {
    // Logique de paiement à implémenter ici
    alert('Payment processing...');
});

