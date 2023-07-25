
'use client'
import Image from 'next/image'
import styles from './page.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import {useState} from "react";
import Link from "next/link";
import {CustomContext} from "@/Context/Context";

const Aside_Menubar = () => {


    const [ischecked, setIsChecked] = useState(false);
    const {getUserName} = CustomContext();
    const userName = String(sessionStorage.getItem('userName')).replace(/['"]+/g, '');
    const DarkMode = () => {
        // const valor = document.querySelector("#flexSwitchCheckChecked")!.value;
      const active=  document.querySelector('#flexSwitchCheckChecked') as HTMLInputElement | null;


        if (active?.value === "on") {
            const element = document.body;
            element.classList.toggle("dark-mode");
            setIsChecked(!ischecked);
        }
    }

    return (
        <>

                    <div className={"sidebar-container"}>
                        <div>
                            <div className={"d-flex"}>

                                <div
                                    className={"d-flex border border-white flex-column rounded sidebar  shadow-lg "}>

                                    <div className={"mx-4 mt-4 mb-4"}>
                                        <h5><b>Menu</b></h5>
                                    </div>

                                    <div className='mb-auto'>

                                        <div className={"mx-4 "}>
                                            <p className={"items"}
                                               style={{fontFamily: "monospace", fontSize: "12px"}}>CONTENT</p>
                                        </div>

                                        <Link href={"/Home"} className={"home-icon"}> <div className={"mx-4 d-flex home align-items-center"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                 fill="currentColor"
                                                 className="bi bi-house " viewBox="0 0 16 16">
                                                <path
                                                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                                            </svg>
                                            <div className={"d-flex align-items-center"}>
                                                <span className={"ps-1 pt-2"}>Home</span>
                                            </div>
                                        </div></Link>

                                        <Link href={"/Edit/Item/Id"} className={"edit-icon"}>
                                            <div className={"mx-4 d-flex item item-icon mt-3 align-items-center"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                     fill="currentColor"
                                                     className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                                                    <path
                                                        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                                </svg>
                                                <div className={"d-flex align-items-center"}>
                                                    <span className={"ps-1 pt-2"}>Item</span>

                                                </div>
                                            </div>
                                        </Link>

                                        <Link href={"/Category"} className={"category-icon"}>   <div className={"mx-4 d-flex category category-item align-items-center mt-3"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                 fill="currentColor"
                                                 className="bi bi-list-check" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                            </svg>
                                            <div className={"d-flex align-items-center"}>
                                                <span className={"ps-1 pt-2"}>Category</span>
                                            </div>
                                        </div></Link>

                                        <div className={"mx-4 d-flex trash trash-icon align-items-center mt-3"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                 fill="currentColor"
                                                 className="bi bi-trash" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                <path
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg>
                                            <div className={"d-flex align-items-center"}>
                                                <span className={"ps-1 pt-2"}>Trash</span>
                                            </div>
                                        </div>

                                        <div className={"mx-4 d-flex align-items-center mt-3"}>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch"
                                                       id="flexSwitchCheckChecked" onClick={DarkMode}
                                                       defaultChecked={ischecked}/>
                                            </div>

                                            <span className={"ps-1"}>Theme</span>

                                        </div>

                                    </div>


                                    <div className={"mx-4 profile-container d-flex align-items-center my-auto"}>


                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                             fill="currentColor"
                                             className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fillRule="evenodd"
                                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg>
                                        <span className={"ps-1"}>{userName}</span>

                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>


            <div className={"sidebar-mobile-container"}>
                        <div
                            className={"d-flex border border-white flex-column rounded sidebar-mobile col-md-1   shadow-lg "}>

                            <div className={"d-flex justify-content-center mt-4 mb-4"}>
                                <h5><b>Menu</b></h5>
                            </div>

                            <div className='mb-auto'>

                                <div className={"mx-4 "}>
                                    <p className={"items"}
                                       style={{fontFamily: "monospace", fontSize: "12px"}}>CONTENT</p>
                                </div>

                                <Link href={"/Home"} className={"home-icon"}>
                                    <div className={"d-flex home justify-content-center"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                                             fill="currentColor"
                                             className="bi bi-house" viewBox="0 0 16 16">
                                            <path
                                                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                                        </svg>
                                        <div className={"d-flex align-items-center"}>
                                            <span className={"ps-1 pt-2 items"}>Home</span>
                                        </div>
                                    </div>
                                </Link>

                                <Link href={"/Edit/Item/Id"} className={"edit-icon"}>
                                    <div className={"d-flex item  mt-3 justify-content-center"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                                             fill="currentColor"
                                             className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                            <path
                                                d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                                            <path
                                                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                        </svg>


                                        <div className={"d-flex align-items-center"}>
                                            <span className={"ps-1 pt-2 items"}>Item</span>

                                        </div>
                                    </div>
                                </Link>


                                <div className={"d-flex category category-item justify-content-center mt-3"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                                         fill="currentColor"
                                         className="bi bi-list-check" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                    <div className={"d-flex align-items-center"}>
                                        <span className={"ps-1 pt-2 items"}>Category</span>
                                    </div>
                                </div>

                                <div className={"d-flex trash trash-icon justify-content-center mt-3"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                                         fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                    <div className={"d-flex align-items-center"}>
                                        <span className={"ps-1 pt-2 items"}>Trash</span>
                                    </div>
                                </div>

                                <div className={"mx-4 d-flex justify-content-center mt-3"}>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch"
                                               id="flexSwitchCheckChecked" onClick={DarkMode}
                                               defaultChecked={ischecked}/>
                                    </div>

                                    <span className={"ps-1 items"}>Theme</span>

                                </div>

                            </div>


                            <div className={"mx-4 profile-container d-flex justify-content-center my-auto"}>


                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                                     fill="currentColor"
                                     className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd"
                                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                                <span className={"ps-1 items"}>User</span>

                            </div>


                </div>
            </div>








        </>
    )
}

export default Aside_Menubar;