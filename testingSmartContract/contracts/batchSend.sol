 pragma solidity ^0.4.21;

contract batchSend {

//variables
   address public owner;
   address[] public addresses;
   uint[] public values;

//events   
   event sentEther(string msg);

//modifiers   
      modifier ownerFunc{
        require (owner == msg.sender);
        _;
   }
    
// constructor function  
   function batchSend() payable{
        owner = msg.sender;
   }
   
//constructor for the recipient
   function addRecipient(address _address, uint256 _owed ) public {
        addresses.push(_address)-1;
        values.push(_owed)-1;
   }
    
//distribution function    
    function distributeFunds() ownerFunc external returns (bool){
       for(uint i=0; i < addresses.length; i++){
           addresses[i].send(values[i]);
       }
       sentEther("Ether has been distributed");
    }

//secondary function --> lists addresses
   function viewAddresses() ownerFunc view returns (address[]){
       return addresses;
   }

}