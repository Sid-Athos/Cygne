// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./Teacher.sol";
import "./Token.sol";
import "./TokenInstant.sol";

contract Cygne {

    struct Teacher {
        string name;
        Token token;
        Course[] courses;
    }

    struct Course {
        string datetime;
        string location;
    }

    mapping (address => Teacher) private addressToTeacher;
    uint tokenValue = 0.01 ether;

    function registerAsTeacher(string name, string tokenName, string symbol) public {
        require(!addressToTeacher[msg.sender].isValue);
        addressToTeacher[msg.sender] = Teacher(
            name,
            TokenInstance(msg.sender, tokenName, symbol),
            Course[]
        );
    }

    function createCourse(string datetime, string location) public {
        require(addressToTeacher[msg.sender].isValue);
        addressToTeacher[msg.sender].courses.push(Course(datetime, location));
    }

    function getTeacher(address teacherAddress) public view returns (Teacher teacher) {
        return addressToTeacher[teacherAddress];
    }

    function mintToken(uint256 amount, address teacherAddress) public payable {
        require(amount * tokenValue == msg.value);
        addressToTeacher[teacherAddress].token.mint(msg.sender, amount);
    }

    function burnToken(uint256 amount) public {
        require(addressToTeacher[msg.sender].isValue);
        addressToTeacher[msg.sender].token.burn(amount);
        msg.sender.send(tokenValue * amount);
    }

    function participateCourse() public {

    }
}
