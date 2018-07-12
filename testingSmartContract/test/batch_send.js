var batchSend = artifacts.require('./batchSend.sol');
expect = require('chai').expect;
console.log(expect);
contract('batchSend.GetMessage', function(accounts) {
  
  describe("Contract Should Deploy", function() {
	  it("Catch an instance of the batchSend Contract", async function(done) {
	    	// testing creating the contact
	      	var batch_send = await batchSend.new({ from: accounts[0], value: 10000});
	      	let owner = await batch_send.owner()

	      	expect(owner).to.be.equal(accounts[1]);
	      	console.log(owner);
	   });

	   it("Should return addresses in addresses[] and values in values[]", async function() {
	    	//testing if addresses and values were added
	    	var batch_send = await batchSend.new({ from: accounts[0] })
	        await batch_send.addRecipient(accounts[1] , 10000 ,{ from:accounts[0] } );
	        let addressesRecipientOne = await batch_send.addresses(0);
	        expect(accounts[1]).to.be.equal(addressesRecipientOne);
	      	console.log("Address of first recipient is", addressesRecipientOne);

	      	let valueOne = await batch_send.values(0);
	        expect(valueOne.toString() == '10000').to.be.equal(true);
	      	console.log("valueOne: 10000 is equal to", valueOne.toString() == '10000'); 
	    }); 

	   it("Should distribute funds to the addresses", async function() {
	   		//testing if function returned true
	   		var batch_send = await batchSend.new({ from: accounts[0] });
	   		await batch_send.addRecipient(accounts[1] , 10000 ,{ from:accounts[0] } );

	      	var bool = await batch_send.distributeFunds({from: accounts[0]});
	      	console.log(bool);

	   });

	     it("should send coin correctly", async function() {

		    // Get initial balances of first and second account.
		    let amount = 10000;
		    let owner = accounts[0];
		    let reciever = accounts[1];

		    var batch_send = await batchSend.new({ from: owner, value: 10000})
	   		
		    balance = web3.eth.getBalance(reciever);
		    let recieverStart = balance.toNumber();
			
			await batch_send.addRecipient(reciever , 10000 ,{ from: owner } );
			await batch_send.distributeFunds({from: owner});

		    balance = web3.eth.getBalance(reciever);
		    let recieverEnd = balance.toNumber();

		    assert.equal(recieverEnd, recieverStart + amount, "Amount wasn't correctly sent to the receiver");
		    
		  }); 	
	});

});
