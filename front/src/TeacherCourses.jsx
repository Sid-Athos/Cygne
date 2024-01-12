import {useEffect, useState} from "react";
import {useContract} from "@thirdweb-dev/react";
import ABI from "../abi.js";
import {Link, useParams} from "react-router-dom";
import mapCourseList from "./mappers/courseMapper.js";
import {Alert, Button, Card, CardActions, CardContent, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Contract from "./contractService";
import Container from "@mui/material/Container";

function CourseDetail(){
    const abi = ABI
    const [teacherCourses, setTeacherCourses] = useState([])
    const [userAddress, setUserAddress] = useState(null)
    const [remunerateError, setRemunerateError] = useState(false)
    const [subscribeToCourseError, setSubscribeToCourseError] = useState(false)
    const { contract } = useContract(import.meta.env.VITE_CONTRACT, abi);
    const params = useParams()
    useEffect(  () => {
        async function fetchData(){
            if(contract){
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                setUserAddress(accounts[0])
                const es = await contract.call("getCoursesByTeacher",
                    [
                        params.address
                    ])
                setTeacherCourses(mapCourseList(es))
            }

        }
        fetchData()

    },[contract])

    return (
        <>
            <Container>

            <Stack direction={"row"}>
            {teacherCourses.map(course => {
                return (<>
                    <div style={{padding: 10}}>
                        <Card sx={{maxWidth: 275, minWidth: 275, minHeight:150}} key={course.id}>
                            <CardContent>
                            {remunerateError &&
                                <Alert severity="error" onClose={() => setRemunerateError(false)}>You already got paid for this course</Alert>
                            }
                                {subscribeToCourseError &&
                                    <Alert severity="error" onClose={() => setSubscribeToCourseError(false)}>You are already subscribed to this course</Alert>
                                }
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {course.name}
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {course.location}
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {course.price}
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {course.dateTime}
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Subscribers amount :&nbsp;{course.subscribers.length}
                                </Typography>
                            </CardContent>
                            {
                                course.teacherAddress !== userAddress.toLowerCase() &&
                                <CardActions sx={{margin:'auto'}}>
                                    <Button onClick={() => {
                                        try {
                                            Contract.subscribeToCourse(contract, course)

                                        } catch {
                                            setSubscribeToCourseError(true)
                                        }
                                    }} sx={{margin:'auto'}}>
                                        BOOK COURSE
                                    </Button>
                            </CardActions>
                            }
                            {
                                course.teacherAddress === userAddress.toLowerCase() &&
                                <CardActions sx={{margin:'auto'}}>
                                    <Button onClick={() => {
                                            Contract.remunerateTeacher(contract, course).catch(error => {

                                            setRemunerateError(true)
                                            })

                                    }} sx={{margin:'auto'}}>
                                        Retrieve ethers
                                    </Button>
                                </CardActions>
                            }
                        </Card>
                    </div>
                </>)
            })}
            </Stack>
            </Container>
        </>
    )
}

export default CourseDetail;