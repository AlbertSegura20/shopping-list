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



const Home = () => {

    const [text] = useState<string|any>([{text:"sadjdasjsdajjs"}, {text:"sadjdasjsdajjs"}, {text:"sadjdasjsdajjs"}  ,{text:"sadjdasjsdajjs"}, {text:"sadjdasjsdajjs"}])

    const [visible, setVisible] = React.useState(false);
    const Router = useRouter();
    const handler = () => setVisible(true);
    const userName = String(sessionStorage.getItem('userName')).replace(/['"]+/g, '');

    // useEffect(() => {
    //     if(userName){
    //         Router.push("/");
    //     }
    // })

    const closeHandler = () => {
        setVisible(false);
        // console.log("closed");
    };


    return (
        <main className={"main"}>
            <Navbar/>

            <div className={"plusIcon"}>
                <div className={"float"}>
                <Image className={"myfloat"}
                    src={plusImage}
                    width={64}
                    height={64}
                    alt="Plus"
                    onClick={handler}
                />
            </div>

            </div>
                <section>
                    <div className={"cards-container container-sm d-flex flex-wrap justify-content-center align-items-center"}>

                        {text.map((items:any, index:number) => (
                            <div className={"rounded ms-4 mt-4 shadow-lg mb-4 bg-transparent zoom "} style={ {width:"240px", height:"200px", boxSizing:"border-box"}} key={index}>

                                <div className="card">
                                    <div className="card-header">
                                        <h5><b className={""}>Detailed Information</b></h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text" style={{fontFamily:"monospace"}}><b>Contain:</b> {items.text}</p>
                                        <p className="card-text text-white" style={{fontFamily:"monospace"}}><b>Age:</b> {items.edad}</p>
                                    </div>
                                    <div className={"card-footer mt-1"}>
                                        <button className={"btn btn-primary"}>Edit</button>
                                        {/*<button className={"btn btn-danger ms-3"}>Delete</button>*/}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            <CardModal visible={visible} closeHandler={closeHandler} />

        </main>
    )
}

export default Home;
