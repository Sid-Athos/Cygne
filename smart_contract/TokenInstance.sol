// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Token.sol";

contract TokenInstance is Token {
    constructor(address initialOwner, string _name, string _symbol)
    ERC20(_name, _symbol)
    Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
