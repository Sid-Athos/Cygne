import {ConnectWallet, useAddress, useChainId, useContract} from "@thirdweb-dev/react";
import viteLogo from "../public/vite.svg";
import reactLogo from "./assets/react.svg";
import {useEffect, useState} from "react";

export default function Form(){
    const abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "name": "payCourse",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "name": "payTeacher",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "addressToTeacherId",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "courses",
            "outputs": [
                {
                    "name": "datetime",
                    "type": "string"
                },
                {
                    "name": "location",
                    "type": "string"
                },
                {
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "name": "sizeSubscribers",
                    "type": "uint256"
                },
                {
                    "name": "isPaid",
                    "type": "bool"
                },
                {
                    "name": "teacherAddress",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "datetime",
                    "type": "string"
                },
                {
                    "name": "location",
                    "type": "string"
                },
                {
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "createCourse",
            "outputs": [
                {
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "courseId",
                    "type": "uint256"
                }
            ],
            "name": "getCourseById",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "datetime",
                            "type": "string"
                        },
                        {
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "name": "subscribersAddress",
                            "type": "address[]"
                        },
                        {
                            "name": "sizeSubscribers",
                            "type": "uint256"
                        },
                        {
                            "name": "isPaid",
                            "type": "bool"
                        },
                        {
                            "name": "teacherAddress",
                            "type": "address"
                        }
                    ],
                    "name": "course",
                    "type": "tuple"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCourseList",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "datetime",
                            "type": "string"
                        },
                        {
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "name": "subscribersAddress",
                            "type": "address[]"
                        },
                        {
                            "name": "sizeSubscribers",
                            "type": "uint256"
                        },
                        {
                            "name": "isPaid",
                            "type": "bool"
                        },
                        {
                            "name": "teacherAddress",
                            "type": "address"
                        }
                    ],
                    "name": "courseList",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "teacherAddress",
                    "type": "address"
                }
            ],
            "name": "getCoursesByTeacher",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "datetime",
                            "type": "string"
                        },
                        {
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "name": "subscribersAddress",
                            "type": "address[]"
                        },
                        {
                            "name": "sizeSubscribers",
                            "type": "uint256"
                        },
                        {
                            "name": "isPaid",
                            "type": "bool"
                        },
                        {
                            "name": "teacherAddress",
                            "type": "address"
                        }
                    ],
                    "name": "coursesReturned",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "teacherAddress",
                    "type": "address"
                }
            ],
            "name": "getTeacher",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "name": "coursesId",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "teacher",
                    "type": "tuple"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getTeacherList",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "name": "coursesId",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "teachers",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "registerAsTeacher",
            "outputs": [
                {
                    "name": "teacherId",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "teacherList",
            "outputs": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "test",
            "outputs": [
                {
                    "name": "testR",
                    "type": "uint256"
                }
            ],
            "payable": false,
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
    const { contract } = useContract("0x7ca1b5Ae8091a2347D16aAF76e83ff1D06975C57", abi);
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
        console.log(await contract.call("getTeacher",
            [
                 "0x5DE97e84E7b0655fd229CD4B408aa706386d26c5"
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