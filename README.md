# Eth-intermediate-module_2

**Aim of the Project**

Create and integrate two to three functions in a smart contract with the Frontend application.

**Code of the project**

        // SPDX-License-Identifier: UNLICENSED
        
        pragma solidity ^0.8.9;

       //import "hardhat/console.sol";

       contract Assessment {
       
      //Contract variables
      
      address payable public owner;
      
      uint256 public balance;

     //Contract events
    event Deposit_eth(uint256 amount);
    event Withdraw_eth(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }


    //function which returns the balance of the account
    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "Invalid Account Owner");

        //Perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit_eth(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "Invalid Account Owner");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        //Withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw_eth(_withdrawAmount);}


         //return the owner's name
        function ownerName()public pure returns(string memory){
            string memory name="Sehajpreet Kaur";
            return name;
        }

        //return owner's city
        function ownerCity()public pure returns(string memory){
            string memory city="Chandigarh";
            return city;
        }

        //return the owner's status
        function ownerStatus()public pure returns(string memory){
            string memory status="Eligible Owner";
            return status;
        }


        //perform the addition of two unsigned integers
        function addition(uint a, uint b) public pure returns(uint){
                return a+b;
            }
        }
**Logic of the code**

1. Write the license identifier and pragma solidity version.

2. In the contract Assessment, declare two variables owner and balance of type address and unsigned int respectively.

3. Create two events Deposit_eth and Withdraw_eth with the amount to be deposited and withdrawn as its parameters.

4. Declare a  payable constructor which initializes the owner as msg.sender and balance set to initial balance.

5. The getBalance() function is declared pure and view only, which in turn returns the balance of the connected account.

6. The deposit function is declared payable and public to interact with the metamask and front end. It takes the amount to be deposited as its parameter. The current balance is declared as the previous balance. It uses the require statement to verify that the msg.sender is the real owner. If this condition returns to true then the amount is added to the balance and the new balance is updated using the assert statement. At last, emit the Deposit_eth event.

7. The withdraw function is declared public and takes the amount to be  withdrawn as its parameter. It uses the require statement to verify that the msg.sender is the real owner. The current balance is declared as the previous balance. If the balance is less than the withdrawn amount, the transaction reverts to the insufficient balance custom error. Else if not then the withdrawn amount is deducted from the current balance. The new balance is updated using the assert statement. At last, emit the Withdraw_eth event.

8. Additionally, there are three more functions named as ownerName(), ownerCity(), and ownerStatus() which are declared as public and pure. They return the name, city, and status of the owner of the account/transaction.

9. Lastly, we have an addition function that is declared public and pure. It returns the summation of two unsigned integers.


**Functionality of the code**

1. Clone the module's repository into the working space of the gitpod.

2. Make three different terminals. In the first terminal type "npm i"  to install the project dependencies. In the second terminal, type "npx hardhat node" which provides the accounts and private keys. In the third terminal, type "npm run dev" to start the front end at the localhost port 3000.

3. Open the site. There we encounter the frontend user interface with the heading "Welcome to the Metacrafters ATM Transaction and Management System!".Also, we find the "connect to the metamask wallet". Click on it. There we find the account, balance of the account, name, city, and status of the current owner.

4. Below it, click the deposit 1 eth or the withdraw 1 eth. There we get a notification from the metamask to confirm the transaction.

5. Also there is a Calculator for Mathematics. It requires two unsigned integers. After entering, click on add button, and refresh the page, we get the addition of the two unsigned integers.


With this, the project is successfully completed satisfying all the conditions.

**Image of the Frontend**

(https://github.com/SK-4518/Eth-intermediate-module_2-/assets/136696857/a05c4f26-4af3-452b-b127-e61ab2069213)


**Author**

Sehajpreet Kaur

(21BCS4518@cuchd.in)

