pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract LuckToken is StandardToken, Ownable {
    string public name = "幸运币";
    string public symbol = "LUCK";
    uint8 public decimals = 0;
    uint public INITIAL_SUPPLY = 999999999;

    event Bless(address indexed from, string words, uint256 value);
    event LogBuy(address user, uint amount);

    function LuckToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    function buy() payable public returns (bool) {
        require(msg.value >= 0.0001 ether);

        uint _value = msg.value / 0.0001 ether;

        balances[owner] = balances[owner].sub(_value);
        balances[msg.sender] = balances[msg.sender].add(_value);
        LogBuy(msg.sender, _value);
        
        return true;
    }

    function bless(string _words, uint256 _value) public returns (bool) {
        require(_value >= bytes(_words).length);
        require(_value <= balances[msg.sender]);

        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[owner] = balances[owner].add(_value);
        Bless(msg.sender, _words,  _value);

        return true;
    }

    function reclaimEther() onlyOwner public {
        assert(owner.send(address(this).balance));
    }

    function() payable public {
        buy();
    }
}