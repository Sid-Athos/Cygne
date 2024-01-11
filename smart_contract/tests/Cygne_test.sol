// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "remix_tests.sol";
import "remix_accounts.sol";

import "contracts/Cygne.sol";

contract TestCygne {

    Cygne cygne;

    function beforeEach() public {
        cygne = new Cygne();  // Deploy a new contract instance for each test
    }

    // Test the registerAsTeacher function
    function testValidTeacherCreation() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");
        Cygne.Teacher memory teacher = cygne.getTeacher(address(this));
        // Assert that the result is created
        Assert.equal(teacher.adr == address(this), true, "Teacher should exist");
    }

    // Test the getTeacher function
    function testValidGetTeacher() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");
        Cygne.Teacher memory teacher = cygne.getTeacher(address(this));
        // Assert that the teacher is retrieved
        Assert.equal(teacher.adr == address(this), true, "Teacher should exist");
    }

    // Test the unregisterTeacher function
    function testValidUnregisterTeacher() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");
        Cygne.Teacher memory teacher = cygne.getTeacher(address(this));
        // Unregister teacher
        cygne.unregisterTeacher();
        teacher = cygne.getTeacher(address(this));
        // Assert that the result is flagged as deleted
        Assert.equal(teacher.deleted, true, "Teacher should be unregistered");
    }

    // Test the getTeacherList function
    function testGetTeacherList() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");
        Cygne.Teacher[] memory teachers = cygne.getTeacherList();

        // Assert that the teacher is in the list
        Assert.equal(teachers[0].adr == address(this), true, "Teacher should be in the list of teachers");
    }

    // Test the createCourse function
    function testValidCreateCourse() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");

        // Create a course
        uint256 courseId = cygne.createCourse("Test", "14/02/2023", "Paris", 4);
        Cygne.Course memory course = cygne.getCourseById(courseId);

        // Assert that the teacher is retrieved
        Assert.equal(course.teacherAddress == address(this), true, "Teacher should exist");
    }

    // Test the getCourseById function
    function testValidGetCourseById() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");

        // Create a course
        uint256 courseId = cygne.createCourse("Test", "14/02/2023", "Paris", 4);
        Cygne.Course memory course = cygne.getCourseById(courseId);

        // Assert that the course is retrieved
        Assert.equal(course.teacherAddress == address(this), true, "Teacher should exist");
    }

    // Test the getCourseList function
    function testValidGetCourseList() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");

        // Create a course
        cygne.createCourse("Test", "14/02/2023", "Paris", 4);
        Cygne.Course[] memory courses = cygne.getCourseList();

        // Assert that the course is in the list
        Assert.equal(courses[0].teacherAddress == address(this), true, "Course should be in the list of courses");
    }

    // Test the getCourseList function
    function testValidGetCoursesByTeacher() public {
        // Add a teacher to the contract
        cygne.registerAsTeacher("John Doe");

        // Create a course
        cygne.createCourse("Test", "14/02/2023", "Paris", 4);
        Cygne.Course[] memory courses = cygne.getCoursesByTeacher(address(this));

        // Assert that the course is in the list
        Assert.equal(courses[0].teacherAddress == address(this), true, "Course should be in the list of courses");
    }
}
    