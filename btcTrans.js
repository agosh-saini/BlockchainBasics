const Btc = require('bitcoinjs-lib')
var express = require('express');

const TestNet = Btc.networks.testnet

const BigInteger = require('bigi')
let passphrase = '<ADD RANDODM PASSPHRASE>'
let keyPair = generateAddressFromSHA256Hash(passphrase);
function generateAddressFromSHA256Hash(passphrase) {
  let hash = Btc.crypto.sha256(passphrase);
  let d = BigInteger.fromBuffer(hash);
  let keyPair = new Btc.ECPair(d, null, { network: TestNet });
  return keyPair;
}

//---- Checking Balances
const request = require('request');
let addr = keyPair.getAddress();
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/' //THIS URL RETURNED ERROR 500 WHEN I RAN IT
// log unspent transactions
request.get(apiUrl + addr + '/utxo', (err, req, body) => {
  console.log(JSON.parse(body))
 }
);

let amountWeHave = 110000000 // 2 BTC
request.get(apiUrl + addr + '/balance', (err, req, body) => {
  //amountWeHave = JSON.parse(body)
  //txId = JSON.parse()
  //console.log(JSON.parse(body))
 }
);


//--- Constructing a transaction

let tx = new Btc.TransactionBuilder(TestNet);

let keyPair1 = generateAddressFromSHA256Hash('<ADD RANDOM PASSPHRASE'); //
console.log(keyPair1);
let keyPair2 = generateAddressFromSHA256Hash('B*tc0in');

let amountToKeep = 10000000
let transactionFee = 1000 // .00001 BTC
let amountToSend = amountWeHave - amountToKeep - transactionFee


tx.addInput("<INSERT YOUR ACCOUNT'S TRANSACTION INPUT>", 0);
tx.addOutput(keyPair2.getAddress(), amountToSend);
tx.addOutput(keyPair1.getAddress(), amountToKeep);
tx.sign(0, keyPair1);

let tx_hex = tx.build().toHex()

let JSONtx = {
    rawtx: tx_hex
}

console.log(tx_hex);


//AS POST REQUST IS NOT FORMATTED PROPERLY, YOU NEED TO SEND THIS tx_hex TO API USING POSTman

//POST REQUEST NOT FORMATTED PROPERLY: WORKS IN POSTman APPLICATION
/*
// Configure the request
var options = {
    url: 'http://ec2-18-218-227-40.us-east-2.compute.amazonaws.com:3001/insight-api/tx/send/',
    method: 'POST',
    form: {'rawTx': tx_hex}
}

// Start the request
request(options, function (error, response, body) {
    console.log("sent tx to API")
    if (!error && response.statusCode == 200) {
        console.log("got response from API")
        console.log(body)
    }
})  

*/ 
