import {useEffect, useState} from "react";
import {useContract} from "@thirdweb-dev/react";
import ABI from "../abi.js";
import {useParams} from "react-router-dom";

function CourseDetail(){
    const abi = ABI
    const [teacherCourses, setTeacherCourses] = useState([])
    const { contract } = useContract(import.meta.env.VITE_CONTRACT, abi);
    const params = useParams()
    useEffect(  () => {
        async function fetchData(){
            if(contract){
                const es = await contract.call("getCoursesByTeacher",
                    [
                        params.address
                    ])
                console.log(es)
            }

        }
        fetchData()

    },[contract])
}

export default CourseDetail;