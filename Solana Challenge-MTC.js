// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Import user input functionality
const prompt = require('prompt-sync')();

// Connect to the Devnet
const connection = new Connection("http://127.0.0.1:8899", "confirmed");

// Function to get the wallet balance from a given public key
const getWalletBalance = async (publicKey) => {
    try {
        // Get balance of the provided wallet address
        const walletBalance = await connection.getBalance(new PublicKey(publicKey));
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

// Function to request airdrop of SOL
const airDropSol = async (publicKey) => {
    try {
        // Request airdrop of 2 SOL to the provided wallet
        console.log("Airdropping some SOL to the wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
        console.log("Airdrop successful!");
    } catch (err) {
        console.log(err);
    }
};

// Main function
const mainFunction = async () => {
    let userPublicKey = process.argv[2]; // Get public key from command-line argument
    if (!userPublicKey) {
        // If public key not provided as argument, prompt user for input
        userPublicKey = prompt("Enter your public key: ");
    }
    
    // Get wallet balance before airdrop
    console.log(`Wallet balance for ${userPublicKey} before airdrop:`);
    await getWalletBalance(userPublicKey);
    
    // Perform airdrop
    await airDropSol(userPublicKey);
    
    // Get wallet balance after airdrop
    console.log(`Wallet balance for ${userPublicKey} after airdrop:`);
    await getWalletBalance(userPublicKey);
};

// Execute main function
mainFunction();
