
var ethers = require('ethers');
var provider = ethers.providers.getDefaultProvider('ropsten');
const ethTx = require('ethereumjs-tx');
provider.getTransactionCount('<ADD SENDING ADDRESS>', 'pending').then(function (nonce) {
  const txParams = {
    nonce: nonce, // Replace by nonce for your account on geth node
    gasPrice: '0x6FC23AC00', // this is 30 gwei in wei to hex
    gasLimit: '0x5208',
    to: '<TARGET ADDRESS>',
    value: '0x429D069189E0000'} // this is 0.5 eth in wei to hex
  // Transaction is created
  const tx = new ethTx(txParams);
  const privKey = Buffer.from('<ADD PRIVATE KEY>', 'hex');
  // Transaction is signed
  tx.sign(privKey);
  const serializedTx = tx.serialize();
  const rawTx = '0x' + serializedTx.toString('hex');
  console.log(rawTx, ethers.utils.keccak256(rawTx)); // the second parameter is for the raw tx
  provider.sendTransaction(rawTx);
});

