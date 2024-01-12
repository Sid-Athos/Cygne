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

                            {remunerateError &&
                                <Alert severity="error" sx={{maxWidth:200, margin:'auto'}} onClose={() => setRemunerateError(false)}>You already got paid for this course</Alert>
                            }
                                {subscribeToCourseError &&
                                    <Alert severity="error" sx={{maxWidth:200, margin:'auto'}} onClose={() => setSubscribeToCourseError(false)}>You are already subscribed to this course</Alert>
                                }
            <Stack direction={"row"}>
            {teacherCourses.map(course => {
                return (<>
                    <div style={{padding: 10}}>
                        <Card sx={{maxWidth: 275, minWidth: 275, minHeight:215}} key={course.id}>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {course.name}
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {course.location}
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {course.price / 1000} WEI
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
                                            Contract.subscribeToCourse(contract, course).catch(err => {

                                            setSubscribeToCourseError(true)
                                            })

                                    }} sx={{margin:'auto'}}>
                                        BOOK COURSE
                                    </Button>
                            </CardActions>
                            }
                            {
                                course.teacherAddress === userAddress.toLowerCase() && course.subscribers.length > 0 &&
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
                {teacherCourses.length < 1 &&
                <>No courses available</>
                }
            </Stack>
            </Container>
        </>
    )
}

export default CourseDetail;