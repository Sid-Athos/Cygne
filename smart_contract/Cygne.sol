// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./Teacher.sol";
import "./Token.sol";

contract Cygne {

    struct Teacher {
        Token token;
        Course[] courses;
    }

    struct Course {
        string datetime;
        string location;
    }

    mapping (address => Teacher) addressToTeacher;
}
