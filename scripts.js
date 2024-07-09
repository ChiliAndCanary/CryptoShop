let cart = [];
let orderNumber = '';

function addToCart(id, name, price) {
    if (cart.length === 0) {
        generateOrderNumber();
    }

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
        const itemTotal = item.price * item.quantity;
        cartDetails += `${item.name} x ${item.quantity} = ${itemTotal.toFixed(2)} USDT\n`;
        totalAmount += itemTotal;
    });

    document.getElementById('cartDetails').value = cartDetails;

    let shippingCost = totalAmount >= 25 ? 0 : 4;
    document.getElementById('shippingCost').value = shippingCost.toFixed(2);
    document.getElementById('amount').value = (totalAmount + shippingCost).toFixed(2);
}

function clearCart() {
    cart = [];
    updateCartDetails();
    document.getElementById('shippingCost').value = '4';
    generateOrderNumber();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDetails();
}

function generateOrderNumber() {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    orderNumber = formattedDate + '-' + formattedTime;
    document.getElementById('orderNumber').value = orderNumber;
}

document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('status').innerText = 'Wallet connected!';
        } catch (error) {
            console.error('User denied account access');
            document.getElementById('status').innerText = 'User denied account access';
        }
    } else {
        document.getElementById('status').innerText = 'No Ethereum provider detected';
    }
});

document.getElementById('payButton').addEventListener('click', () => {
    // Payment logic
});

document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    // Additional logic to handle form submission
    alert('Form submitted successfully!');
});

