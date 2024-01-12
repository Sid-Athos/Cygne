import hexToDec from "./hexMapper.js";
import {array} from "prop-types";

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
        arrayBg.push(course)
    })
    return arrayBg
}


export default mapCourseList;