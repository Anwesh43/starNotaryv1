pragma solidity >=0.4.24;

contract StarNotary {

    address public owner;
    string public name;

    event starClaimed(address owner);

    constructor() public {
        name = "this is my star app";
    }

    function claimStar() public {
        owner = msg.sender;
        emit starClaimed(owner);
    }
}
