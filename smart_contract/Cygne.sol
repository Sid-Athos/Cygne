pragma solidity ^0.8.22;

contract Cygne {

    struct Teacher {
        address adr;
        string name;
        uint256[] coursesId;
    }

    struct TestStruct {
        string name;
    }

    struct Course {
        uint256 id;
        string datetime;
        string location;
        uint256 price;
        address[] subscribersAddress;
        uint256 sizeSubscribers;
        bool isPaid;
        address teacherAddress;
    }

    Course[] public courses;
    Teacher[] public teacherList;
    uint256 sizeCourses = 0;

    mapping(address => uint256) public addressToTeacherId;
//uint tokenValue = 0.01 ether;

    function registerAsTeacher(string memory _name) public returns (uint256 teacherId) {
        teacherList.push(Teacher(msg.sender, _name, new uint[](0)));
        uint256 id = teacherList.length - 1;
        addressToTeacherId[msg.sender] = id;
        return id;
    }

    function createCourse(string memory datetime, string memory location, uint256 price) public returns (uint256 courseId) {
        courses.push(Course(0, datetime, location, price, new address[](0), 0, false, msg.sender));
        uint256 id = courses.length - 1;
        courses[id].id = id;
        teacherList[addressToTeacherId[msg.sender]].coursesId.push(id);
        return id;
    }

    function getCourseList() public view returns (Course[] memory courseList) {
        return courses;
    }

    function getTeacherList() public view returns (Teacher[] memory teachers) {
        return teacherList;
    }

    function getTeacher(address teacherAddress) public view returns (Teacher memory teacher) {
        return teacherList[addressToTeacherId[teacherAddress]];
    }

    function test() public view returns (uint testR) {
        return 10;
    }

    function testObj() public view returns (TestStruct memory te) {
        TestStruct memory tet = TestStruct("test");
        return tet;
    }

    function getCoursesByTeacher(address teacherAddress) public view returns (Course[] memory coursesReturned) {
        Course[] memory coursesFromTeacher;
        uint256 size = 0;

        for (uint256 i = 0; i < sizeCourses; i++) {
            if (courses[i].teacherAddress == teacherAddress) {
                size++;
            }
        }

        coursesFromTeacher = new Course[](size);
        size = 0;

        for (uint256 i = 0; i < sizeCourses; i++) {
            if (courses[i].teacherAddress == teacherAddress) {
                coursesFromTeacher[size] = courses[i];
                size++;
            }
        }

        return coursesFromTeacher;
    }

    function getCourseById(uint256 courseId) public view returns (Course memory course) {
        return courses[courseId];
    }

    function payCourse(uint256 courseId) public payable {
        require(msg.value == courses[courseId].price && msg.sender != courses[courseId].teacherAddress);
        courses[courseId].sizeSubscribers++;
        courses[courseId].subscribersAddress.push(msg.sender);
    }

    function payTeacher(uint256 courseId) public {
        require(msg.sender == courses[courseId].teacherAddress);
        courses[courseId].isPaid = true;
        payable(msg.sender).send(courses[courseId].price * courses[courseId].sizeSubscribers);
    }
}