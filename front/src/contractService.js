async function subscribeToCourse(contract, course) {
    let res = await contract.call("payCourse",
        [
            course.id
        ], {value: course.price})
}

async function payTeacher(contract, course) {
    let res = await contract.call("payTeacher",
        [
            course.id
        ])
}


const Contract = {
    subscribeToCourse : subscribeToCourse,
    remunerateTeacher : payTeacher
}

export default Contract;