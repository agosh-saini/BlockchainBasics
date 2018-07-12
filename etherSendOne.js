var ethers = require('ethers');

var provider = ethers.providers.getDefaultProvider('ropsten');

var newAddress = '<ADD TARGET ADDRESS HERE';
var privateKey = '0x<ADD PRIVATE KEY FROM METAMASK HERE>';

var wallet = new ethers.Wallet(privateKey, provider);
Promise.all([
    wallet.getBalance(),
    provider.getGasPrice(),
    provider.getCode(newAddress)
]).then(function(results) {
        var balance = results[0];
        var gasPrice = results[1];
        var code = results[2];

        // The exact cost (in gas) to send to an Externally Owned Account (EOA)
        var gasLimit = 21000;

        // sends one ether
        var value = 1000000000000000000;

        wallet.send(newAddress, value, {gasLimit: gasLimit}).then(function(transaction) {
            console.log(transaction);
        });
});