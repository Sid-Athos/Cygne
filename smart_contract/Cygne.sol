pragma solidity ^0.4.19;

contract Cygne {

    struct Teacher {
        string name;
        uint256[] coursesId;
    }

    struct Course {
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

    function registerAsTeacher(string memory _name) public view returns (uint256 teacherId) {
        uint256 id = teacherList.push(Teacher(_name, new uint[](0))) - 1;
        addressToTeacherId[msg.sender] = id;
        return id;
    }

    function createCourse(string memory datetime, string memory location, uint256 price) public view returns (uint256 courseId) {
        uint256 id = courses.push(Course(datetime, location, price, new address[](0), 0, false, msg.sender)) - 1;
        teacherList[addressToTeacherId[msg.sender]].coursesId.push(id);
        return id;
    }

    function getCourseList(address teacherAddress) public view returns (Course[] memory courseList) {
        return courses;
    }

    function getTeacherList(address teacherAddress) public view returns (Teacher[] memory teachers) {
        return teacherList;
    }

    function getTeacher(address teacherAddress) public view returns (Teacher memory teacher) {
        return teacherList[addressToTeacherId[teacherAddress]];
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

        for (i = 0; i < sizeCourses; i++) {
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
        msg.sender.send(courses[courseId].price * courses[courseId].sizeSubscribers);
    }
}