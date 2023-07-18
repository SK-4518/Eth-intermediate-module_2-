// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit_eth(uint256 amount);
    event Withdraw_eth(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "Invalid Account Owner");

        // perform transaction
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

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw_eth(_withdrawAmount);}

        function ownerName()public pure returns(string memory){
            string memory name="Sehajpreet Kaur";
            return name;
        }

        function ownerCity()public pure returns(string memory){
            string memory city="Chandigarh";
            return city;
        }
        
        function ownerStatus()public pure returns(string memory){
            string memory status="Eligible Owner";
            return status;
        }

        function addition(uint a, uint b) public pure returns(uint){
                return a+b;
            }
        }
    

