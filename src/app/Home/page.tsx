'use client'
import Navbar from "@/components/Navbar";
import React, {useEffect, useState} from "react";
import "../cards.css";
import plusImage from "../../../plus.png";
import Image from "next/image";
import {CustomContext} from "@/Context/Context";
import Modal from "@/components/Modal";
import CardModal from "@/components/Modal";
import {useRouter} from "next/navigation";
import Aside_Menubar from "@/components/Aside_Menubar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../../components/Aside_Menubar.css";
import "../../app/add-icon.css"
import Link from "next/link";




const Home = () => {

    const [text, setText] = useState<any>([])
    const credentialsUser = "lsegura:12345";
    const credentialsBase64User = btoa(credentialsUser);
    const [visible, setVisible] = React.useState(false);
    const Router = useRouter();
    const userName = sessionStorage.getItem('userName');

    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();
    const [item, setItem] = useState<any>();
    const [buttonName, setButtonName] = useState<string>();



    useEffect(() => {
        if(!userName){
            Router.push("/");
        }
        getList();
        getToken();

    }, []);


    async function getToken(){
        const credentials = "userapp:12345";
        const credentialsBase64 = btoa(credentials);
        const response = await fetch("http://www.code2ever.com:8080/api/auth/csrf", {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + credentialsBase64,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        const status = response.status;
        if (status !== 200) {
            console.log("Error logging user");
            return;
        }
        setToken(response.headers.get("X-CSRF-TOKEN"));
        setSession(response.headers.get("Session"));


    }

    async function getList() {

        const result =  await fetch("http://www.code2ever.com:8080/api/list", {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + credentialsBase64User,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }).then(response => {
            return response.json();
        }).then(data => data);

        setText(result.data);


    }

    async function deleteList(id:any) {

        const data = new URLSearchParams();
        data.append('id', id);

        // const data:any = id;
        console.log(data, "TOKEN " + token, "SESION " + session);

        await fetch("http://www.code2ever.com:8080/api/list", {
            method: 'DELETE',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Session": session,
                "X-CSRF-TOKEN": token,
                "Authorization": "Basic " + credentialsBase64User,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: data
        }).then(response => console.log(response.status));
       await getList();
    }



    const addHandler = (itemProperties:any) => {

        const btnName = document.querySelector("#add")!.id;
        setButtonName(btnName);
        setVisible(true)
    };

    const editHandler = (itemProperties:any) => {

        const btnName = document.querySelector("#update")!.id;
        setButtonName(btnName);
        setItem(itemProperties);
        setVisible(true)
    };

    const closeHandler = () => {
        setVisible(false);
        getList();

    };

    const handleDetails = (id:number) => {
        Router.push(`/Details/${id}`);
    }


    return (


        <>


            <div id="left" className="left-column">
                <div className="top-left">Shopping-List</div>
                <div className="aside-menu-bottom">

                <Aside_Menubar/>

                </div>
            </div>

            <div className={"right-column"}>
                <div className={"top-right home-column"}>

                    <nav id={"navbar"} className="navbar bg-body-tertiary">
                        <div className="container d-flex justify-content-center ">

                            <form className="d-flex input-search" role="search">
                                <input id="input" className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <div className={"button-search"}>
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </div>

                            </form>
                        </div>
                    </nav>


                </div>
                <div className={"contain-bottom"}>

                    <div className={"plusIcon"}>
                        <div className={"float"}>
                            <Image className={"myfloat"}
                                   id={"add"}
                                   src={plusImage}
                                   width={64}
                                   height={64}
                                   alt="Plus"
                                // onClick={handler}
                                   onClick={addHandler}
                            />
                        </div>
                    </div>

                    {/*<div className={"main"}>*/}

                        <div className={"cards-container main d-flex flex-wrap justify-content-center align-items-center"}>

                            {text.map((items:any, index:number) => (
                                <div className={"rounded ms-4 mt-4 shadow-lg mb-4 bg-transparent zoom "}  key={items.id} onClick={() => handleDetails(items.id)}>

                                    <div className="card">
                                        <div className="card-header">
                                            <h5><b className={""}>{items.name}</b></h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text" style={{fontFamily:"monospace"}}><b>Age:</b> {items.total}</p>
                                            <p className="card-text" style={{fontFamily:"monospace"}}><b>Age:</b> {items.totalItems}</p>
                                        </div>
                                        <div className={"card-footer mt-1"}>
                                            <button id={"update"} className={"btn btn-primary"} onClick={() => editHandler(items)}>Edit Title</button>
                                            <button  className={"btn btn-danger ms-3"} onClick={() => deleteList(items.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    {/*</div>*/}

                </div>
            </div>
            <CardModal visible={visible} closeHandler={closeHandler} itemProperties={item} buttonName={buttonName!} />


        </>
    )
}

export default Home;
