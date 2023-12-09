import {ConnectWallet, useAddress, useChainId, useContract} from "@thirdweb-dev/react";
import viteLogo from "../public/vite.svg";
import reactLogo from "./assets/react.svg";
import {useEffect, useState} from "react";

export default function Form(){
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "datetime",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "createCourse",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "name": "payCourse",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "name": "payTeacher",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "registerAsTeacher",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "teacherId",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "addressToTeacherId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "courses",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "datetime",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "sizeSubscribers",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isPaid",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "teacherAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "name": "getCourseById",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "datetime",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address[]",
                            "name": "subscribersAddress",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sizeSubscribers",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isPaid",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "teacherAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct Cygne.Course",
                    "name": "course",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCourseList",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "datetime",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address[]",
                            "name": "subscribersAddress",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sizeSubscribers",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isPaid",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "teacherAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct Cygne.Course[]",
                    "name": "courseList",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "teacherAddress",
                    "type": "address"
                }
            ],
            "name": "getCoursesByTeacher",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "datetime",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address[]",
                            "name": "subscribersAddress",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sizeSubscribers",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isPaid",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "teacherAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct Cygne.Course[]",
                    "name": "coursesReturned",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "teacherAddress",
                    "type": "address"
                }
            ],
            "name": "getTeacher",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "coursesId",
                            "type": "uint256[]"
                        }
                    ],
                    "internalType": "struct Cygne.Teacher",
                    "name": "teacher",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTeacherList",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "coursesId",
                            "type": "uint256[]"
                        }
                    ],
                    "internalType": "struct Cygne.Teacher[]",
                    "name": "teachers",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "teacherList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "test",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "testR",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "testObj",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Cygne.TestStruct",
                    "name": "te",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const chainId = useChainId();
    const [count, setCount] = useState(0)
    const [teachers, setTeachers] = useState([])
    const [courses, setCourses] = useState([])
    const [account, setAccount] = useState();
    const [userName, setUsername] = useState("");
    const address = useAddress();
    const [contractToUse, setContractToUse] = useState();
    const { contract } = useContract("0x92d0477B577505912c4c59EB886C268aeB5Cd8B3", abi);
    console.log(contract)

    const hexToDec = (hex) => {
        if(!isNaN(hex)){
            return parseInt(hex, 16)
        }
    }
    const getCourses = async () => {
        const data = await contract.call("test")
        console.log(hexToDec(data[Object.keys(data)[0]]))
        console.log(await contract.call("getCourseList"))
        console.log(await contract.call("getTeacherList"))
        console.log(await contract.call("getTeacher",
            [
                 "0x5DE97e84E7b0655fd229CD4B408aa706386d26c5"
            ]))
        console.log(await contract.call("registerAsTeacher",
            [
                "Sidou"
            ]))
    }
   return (
       <>
           <ConnectWallet />
           <form>
               <div style={{flexDirection:"column"}}>
                   <div>
                       <label>Nom</label>

                   </div>
                   <div>
                       <input type={"text"} value={userName} placeholder={"Entrez votre nom"}
                              onChange={(e) => {
                                  setUsername(e.target.value)
                              }}/>

                   </div>
                   <div style={{paddingTop:10}}>

                       <button type={"submit"}>Soumettre</button>
                   </div>
               </div>
           </form>
           <div className="App">
               <button onClick={getCourses}></button>
            lodsqdnkqs
           </div>
           <div>
               <a href="https://vitejs.dev" target="_blank">
                   <img src={viteLogo} className="logo" alt="Vite logo" />
               </a>
               <a href="https://react.dev" target="_blank">
                   <img src={reactLogo} className="logo react" alt="React logo" />
               </a>
           </div>
           <h1>Vite + React</h1>
           <div className="card">
               <button onClick={() => setCount((count) => count + 1)}>
                   count is {count}
               </button>
               <p>
                   Edit <code>src/App.jsx</code> and save to test HMR
               </p>
           </div>
           <p className="read-the-docs">
               Click on the Vite and React logos to learn more
           </p>

           <table className="table">
               <thead>
               <tr>
                   <th scope="col">#</th>
                   <th scope="col">First</th>
                   <th scope="col">Last</th>
                   <th scope="col">Handle</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                   <th scope="row">1</th>
                   <td>Mark</td>
                   <td>Otto</td>
                   <td>@mdo</td>
               </tr>
               <tr>
                   <th scope="row">2</th>
                   <td>Jacob</td>
                   <td>Thornton</td>
                   <td>@fat</td>
               </tr>
               <tr>
                   <th scope="row">3</th>
                   <td>Larry</td>
                   <td>the Bird</td>
                   <td>@twitter</td>
               </tr>
               </tbody>
           </table>
       </>
       )
}