pragma solidity ^0.8.22;

contract Cygne {

    struct Teacher {
        address adr;
        string name;
        uint256[] coursesId;
        bool deleted;
    }

    struct TestStruct {
        string name;
    }

    struct Course {
        uint256 id;
        string name;
        string datetime;
        string location;
        uint256 price;
        address[] subscribersAddress;
        uint256 sizeSubscribers;
        bool isPaid;
        address teacherAddress;
        bool deleted;
    }

    Course[] public courses;
    Teacher[] public teacherList;
    address[] public teacherAddressList;
    uint256 sizeCourses = 0;

    mapping(address => uint256) public addressToTeacherId;

    function teacherExists(address adr) private view returns (bool) {
        for (uint256 i = 0; i < teacherAddressList.length; i++) {
            if (teacherAddressList[i] == adr && !teacherList[addressToTeacherId[adr]].deleted) {
                return true;
            }
        }
        return false;
    }

    function teacherIsDeleted(address adr) private view returns (bool) {
        for (uint256 i = 0; i < teacherAddressList.length; i++) {
            if (teacherAddressList[i] == adr && teacherList[addressToTeacherId[adr]].deleted) {
                return true;
            }
        }
        return false;
    }

    function checkTeacherCoursesPaid(address adr) private view returns (bool) {
        for (uint256 i = 0; i < teacherList[addressToTeacherId[adr]].coursesId.length; i++) {
            if (!courses[teacherList[addressToTeacherId[adr]].coursesId[i]].isPaid) {
                return false;
            }
        }
        return true;
    }

    function registerAsTeacher(string memory _name) public returns (uint256 teacherId) {
        require(!teacherExists(msg.sender));

        uint256 id = 0;

        if (teacherIsDeleted(msg.sender)) {
            id = addressToTeacherId[msg.sender];
            teacherList[id].deleted = false;
            teacherList[id].name = _name;
        } else {
            teacherList.push(Teacher(msg.sender, _name, new uint[](0), false));
            id = teacherList.length - 1;
            addressToTeacherId[msg.sender] = id;
            teacherAddressList.push(msg.sender);
        }

        return id;
    }

    function unregisterTeacher() public {
        require(teacherExists(msg.sender) && checkTeacherCoursesPaid(msg.sender));

        removeAllTeacherCourse(msg.sender);
        teacherList[addressToTeacherId[msg.sender]].deleted = true;
    }

    function removeAllTeacherCourse(address adr) private {
        for (uint256 i = 0; i < teacherList[addressToTeacherId[adr]].coursesId.length; i++){
            removeCourseById(teacherList[addressToTeacherId[adr]].coursesId[i]);
        }
    }

    function removeCourseById(uint256 id) private {
        courses[id].deleted = true;
    }

    function createCourse(string memory name, string memory datetime, string memory location, uint256 price) public returns (uint256 courseId) {
        courses.push(Course(0, name, datetime, location, price, new address[](0), 0, false, msg.sender, false));
        uint256 id = courses.length - 1;
        courses[id].id = id;
        teacherList[addressToTeacherId[msg.sender]].coursesId.push(id);
        sizeCourses++;
        return id;
    }

    function getCourseList() public view returns (Course[] memory courseList) {

        Course[] memory coursesNotDeleted;
        uint256 sizeCoursesNotDeleted = 0;

        for (uint256 i = 0; i < sizeCourses; i++) {
            if (!courses[i].deleted) {
                sizeCoursesNotDeleted++;
            }
        }

        coursesNotDeleted = new Course[](sizeCoursesNotDeleted);
        sizeCoursesNotDeleted = 0;

        for (uint256 i = 0; i < sizeCourses; i++) {
            if (!courses[i].deleted) {
                coursesNotDeleted[sizeCoursesNotDeleted] = courses[i];
                sizeCoursesNotDeleted++;
            }
        }

        return coursesNotDeleted;
    }

    function getTeacherList() public view returns (Teacher[] memory teachers) {

        Teacher[] memory teacherNotDeleted;
        uint256 sizeTeacherNotDeleted = 0;

        for (uint256 i = 0; i < teacherAddressList.length; i++) {
            if (!teacherList[addressToTeacherId[teacherAddressList[i]]].deleted) {
                sizeTeacherNotDeleted++;
            }
        }

        teacherNotDeleted = new Teacher[](sizeTeacherNotDeleted);
        sizeTeacherNotDeleted = 0;

        for (uint256 i = 0; i < teacherAddressList.length; i++) {
            if (!teacherList[addressToTeacherId[teacherAddressList[i]]].deleted) {
                teacherNotDeleted[sizeTeacherNotDeleted] = teacherList[addressToTeacherId[teacherAddressList[i]]];
                sizeTeacherNotDeleted++;
            }
        }

        return teacherNotDeleted;
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
            if (!courses[i].deleted && courses[i].teacherAddress == teacherAddress) {
                size++;
            }
        }

        coursesFromTeacher = new Course[](size);
        size = 0;

        for (uint256 i = 0; i < sizeCourses; i++) {
            if (!courses[i].deleted && courses[i].teacherAddress == teacherAddress) {
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