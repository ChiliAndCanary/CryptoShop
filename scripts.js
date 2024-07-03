document.getElementById('connectButton').addEventListener('click', async () => {
    const blockchain = document.getElementById('blockchain').value;
    if (blockchain === 'eth' || blockchain === 'bsc') {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                document.getElementById('status').innerText = 'Wallet connecté';
                document.getElementById('status').style.color = '#28a745';
            } catch (error) {
                console.error(error);
                document.getElementById('status').innerText = 'Connexion au wallet échouée';
            }
        } else {
            document.getElementById('status').innerText = 'MetaMask non détecté';
        }
    } else if (blockchain === 'sol') {
        try {
            const provider = window.solana;
            if (provider.isPhantom) {
                await provider.connect();
                document.getElementById('status').innerText = 'Wallet Solana connecté';
                document.getElementById('status').style.color = '#28a745';
            } else {
                document.getElementById('status').innerText = 'Phantom Wallet non détecté';
            }
        } catch (error) {
            console.error(error);
            document.getElementById('status').innerText = 'Connexion au wallet échouée';
        }
    }
});

document.getElementById('payButton').addEventListener('click', async () => {
    const product = document.getElementById('product').value.trim();
    const amount = parseFloat(document.getElementById('amount').value.trim());
    const blockchain = document.getElementById('blockchain').value;

    if (!product || isNaN(amount) || amount <= 0) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
    }

    if (blockchain === 'eth' || blockchain === 'bsc') {
        const accounts = await window.web3.eth.getAccounts();
        const usdtAddress = blockchain === 'eth' ? 'ADRESSE_ETH_USDT' : 'ADRESSE_BSC_USDT';

        try {
            await window.web3.eth.sendTransaction({
                from: accounts[0],
                to: usdtAddress,
                value: window.web3.utils.toWei(amount.toString(), 'ether')
            });
            alert('Paiement effectué avec succès');
        } catch (error) {
            console.error(error);
            alert('Erreur lors du paiement');
        }
    } else if (blockchain === 'sol') {
        const provider = window.solana;
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: provider.publicKey,
                toPubkey: 'ADRESSE_SOL_USDT',
                lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
            })
        );

        try {
            const signature = await provider.signAndSendTransaction(transaction);
            await connection.confirmTransaction(signature);
            alert('Paiement effectué avec succès');
        } catch (error) {
            console.error(error);
            alert('Erreur lors du paiement');
        }
    }
});
