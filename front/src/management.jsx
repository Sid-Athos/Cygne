import {useContract} from "@thirdweb-dev/react";
import {useEffect, useState} from "react";
import ABI from "../abi"
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    Modal,
    Stack,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {Link} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Management() {
    const abi = ABI

    const [tabValue, setTabValue] = useState("courses");
    const [teachers, setTeachers] = useState([])
    const [courses, setCourses] = useState([])
    const [userName, setUsername] = useState("");
    const [courseName, setCourseName] = useState("");
    const [coursePrice, setCoursePrice] = useState(0);
    const [userAddress, setUserAddress] = useState(null)
    const [isUserRegistered,setIsUserRegistered] = useState(false)
    const [isUserATeacher,setIsUserATeacher] = useState(false)
    const [courseLocation, setCourseLocation] = useState("");

    const [openTeacherModal, setOpenTeacherModal] = useState(false);
    const handleOpenTeacherModal = () => setOpenTeacherModal(true);
    const handleCloseTeacherModal = () => setOpenTeacherModal(false);
    const [openCourseModal, setOpenCourseModal] = useState(false);
    const handleOpenCourseModal = () => setOpenCourseModal(true);
    const handleCloseCourseModal = () => setOpenCourseModal(false);
    const {contract} = useContract(import.meta.env.VITE_CONTRACT, abi);

    const hexToDec = (hex) => {
        if (!isNaN(hex)) {
            return parseInt(hex, 16)
        }
    }

    function extractTeachersFromSmartContractResponse(arrayQuiPue) {
        let arrayBg = []
        arrayQuiPue.forEach(item => {
            let teacher = {}
            teacher.address = item[0].toLowerCase()
            if(teacher.address === userAddress){
                console.log("ouai")
                setIsUserATeacher(true)
            }
            teacher.name = item[1]
            arrayBg.push(teacher)
        })
        setTeachers([...arrayBg])
    }

    useEffect(() => {
        async function fetchData() {
            if (contract) {
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                setUserAddress(accounts[0])
                extractTeachersFromSmartContractResponse(await contract.call("getTeacherList"))
            }

        }

        fetchData()

    }, [contract])


    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const addTeacher = async () => {
        if(!teachers.find(teacher => teacher.address === userAddress)){
            setIsUserRegistered(false)
            if (userName.match("^[a-zA-Z]{10,}$")) {

                const res = await contract.call("registerAsTeacher",
                    [
                        userName
                    ])
                console.log(res)
                setUsername("")
            }

        } else {
            setIsUserRegistered(true)
        }
    }

    const addCourse = async () => {

    }

    return (
        <>
            <Box sx={{width: '80%', marginLeft: 20, typography: 'body1', textAlign: 'center'}}>
                <TabContext value={tabValue}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Cours" value="courses" key={"courses"}/>
                            <Tab label="Enseignants" value="teachers" key={"teachers"}/>
                        </TabList>
                    </Box>
                    <TabPanel value="courses">
                        {courses.length === 0 &&
                            <>
                                <Button variant="outlined" onClick={handleOpenCourseModal}>Add Course</Button>
                                <Modal
                                    open={openCourseModal}
                                    onClose={handleCloseCourseModal}
                                    aria-labelledby="modal-add-course"
                                    aria-describedby="modal-course-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-add-course" variant="h6" component="h2">
                                            Plan a course
                                        </Typography>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': {m: 1, width: '25ch'},
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <div>

                                                <FormControl>
                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Course name"
                                                        placeceholder={"Your name"}
                                                        onChange={(event) => {
                                                            console.log(event.target.value)
                                                            setCourseName(event.target.value)
                                                        }}
                                                    />
                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Location"
                                                        placeceholder={"Where is the course happening"}
                                                        onChange={(event) => {
                                                            console.log(event.target.value)
                                                            setCourseLocation(event.target.value)
                                                        }}
                                                    />
                                                    <Stack spacing={2}>
                                                        <Typography id="modal-add-course" variant="h6" component="h2">
                                                            Prices are in thousandth of Ethers
                                                        </Typography>
                                                        <Divider></Divider>
                                                        <input type={"number"} defaultValue={coursePrice}
                                                               className={"MuiInputBase-input MuiOutlinedInput-input css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input"}
                                                               onChange={(event) => {
                                                                   setCoursePrice(Number(event.target.value))
                                                               }}></input>
                                                    </Stack>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker/>
                                                    </LocalizationProvider>
                                                    <Button onClick={addCourse}>Add course </Button>
                                                </FormControl>
                                            </div>
                                        </Box>
                                    </Box>
                                </Modal>
                            </>
                        }
                        {courses.length > 0 &&
                            <>
                                Y a qqchose
                            </>
                        }
                    </TabPanel>
                    <TabPanel value="teachers">
                        <Stack direction={"horizontal"}>
                            <Button variant="outlined" onClick={handleOpenTeacherModal}>Add teacher</Button>
                            {isUserATeacher &&
                                <Button variant="outlined" onClick={handleOpenTeacherModal}>Remove teacher</Button>
                            }

                        </Stack>
                        <Modal
                            open={openTeacherModal}
                            onClose={handleCloseTeacherModal}
                            aria-labelledby="modal-add-teacher"
                            aria-describedby="modal-teacher-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-add-teacher" variant="h6" component="h2">
                                    Subscribe as a teacher
                                </Typography>
                                {isUserRegistered &&
                                    <Alert severity="error" onClose={() => setIsUserRegistered(false)}>A teacher is already registered with this address !</Alert>
                                }
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <FormControl>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Teacher's name"
                                                placeceholder={"Your name"}
                                                onChange={(event) => {
                                                    console.log(event.target.value)
                                                    setUsername(event.target.value)
                                                }}
                                            />
                                            <Button onClick={addTeacher}>Subscribe</Button>
                                        </FormControl>
                                    </div>
                                </Box>
                            </Box>
                        </Modal>
                        <Stack direction="row" spacing={2}>
                            {teachers.map(teacher => {
                                return (<>
                                    <div style={{padding: 10}}>


                                        <Card sx={{maxWidth: 275}} key={teacher.address}>
                                            <CardContent>
                                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                    {teacher.name}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Link to={`/teacher/${teacher.address}/courses`}>See teacher
                                                    courses</Link>
                                            </CardActions>
                                        </Card>
                                    </div>
                                </>)
                            })}
                        </Stack>

                    </TabPanel>
                </TabContext>
            </Box>
        </>
    )
}