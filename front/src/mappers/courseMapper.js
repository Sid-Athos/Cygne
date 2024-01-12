import hexToDec from "./hexMapper.js";

function mapCourseList(arrayQuiPue) {
    let arrayBg = []
    arrayQuiPue.forEach(item => {
        let course = {}
        course.id = hexToDec(item[0])
        course.teacherAddress = item.teacherAddress.toLowerCase()
        course.name = item.name
        course.location = item.location
        course.dateTime = item.datetime.substring(0,21)
        course.price = hexToDec(item.price)
        course.subscribers = item.subscribersAddress
        console.log(item.price)
        console.log(course)
        arrayBg.push(course)
    })
    return arrayBg
}


export default mapCourseList;