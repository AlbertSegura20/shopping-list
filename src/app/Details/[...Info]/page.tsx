'use client'
import Aside_Menubar from "@/components/Aside_Menubar";
import Image from "next/image";
import plusImage from "../../../../plus.png";
import CardModal from "@/components/Modal";
import React, {useEffect, useState} from "react";
import "../../../components/Aside_Menubar.css";
import "./details.css";
import {useRouter} from "next/navigation";
// import Menor from "../../../../menor-que (1).png";
import Greater from "../../../../menor-que.png";
import Less from "../../../../menor-que.png";
const Details = ({params}:{params:any}) => {

    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();
    let idList;
    const credentialsUser = "lsegura:12345";
    const credentialsBase64User = btoa(credentialsUser);
    const [items, setItems] = useState<any>([]);
    const Router = useRouter();
    const userName = sessionStorage.getItem('userName');
    const [addedDetail, setAddedDetail] = useState<any>([]);
    const [amount, setAmount] = useState<any>();
    // const [visibleAmount, setVisibleAmount] = useState();

    let arrayList = [];
    let arrayItem = [];
    let arrayAddedItem = [];

    useEffect(() => {
        if(!userName){
            Router.push("/");
        }
        getItem();
        getToken();
        getAddedDetail();
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

    async function getItem() {
        const data = new URLSearchParams();
        const idList:any = localStorage.getItem('idList');
        data.append('idList', params.Info[1]);
       const result =  await fetch("http://www.code2ever.com:8080/api/item/not/in/list?" + data, {
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
        });

       setItems(result.data);
    }

    async function saveItem(idItem:number) {
        // const amount = document.getElementById("itemAmount"+idItem).value;
        // const idList = localStorage.getItem('idList');

        const item = {
            "idItem":idItem,
            "amount": amount === undefined ? 0 : amount,
            "bought": false,
            "idList": params.Info[1]
        }



         await fetch("http://www.code2ever.com:8080/api/detail", {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "Session": session,
                "X-CSRF-TOKEN": token,
                "Authorization": "Basic " + credentialsBase64User,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(item)
        }).then(response => {console.log(response.status); getAddedDetail(); getItem();});


    }


    async function getAddedDetail() {
        const data = new URLSearchParams();
        data.append('idList', params.Info[1]);

        const result = await fetch("http://www.code2ever.com:8080/api/detail/list?" + data, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + credentialsBase64User,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }).then(response => {
            return response.json();
        });

        setAddedDetail(result.data);


    }



    async function deleteDetail(id:any) {
        console.log(id);
        const data = new URLSearchParams();
        data.append('id', id);

        await fetch("http://www.code2ever.com:8080/api/detail", {
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
        }).then(response => {console.log(response.status); getAddedDetail(); getItem();});
    }


    const AddItemList = (data:any) => {
        saveItem(data.id);
    }

    const handleAmount = ({target}:{target:any}) => {
        if(target.name==="amount"){
            setAmount(target.value);
        }
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

                    <div className={"d-flex justify-content-center mb-3 mt-5"} style={{width:"95%"}}>

                        <h2>Note Title: {params.Info[0].replace(/%20/g, " ")}</h2>

                    </div>


                    <div className={"container-fluid justify-content-evenly  d-flex ms-1"}>


                        <div className={"container-fluid d-flex flex-column align-items-center"}>
                            <h3 className={"QueueItems1 me-2"}>Queue Items</h3>
                            <h3 className={"QueueItems"}>Queue Items</h3>
                            <table className="table table-1 table-hover me-2">
                                <thead className={"thead-1"}>
                                <tr>
                                    <th scope="col" className={"text-white"}>Name</th>
                                    <th scope="col" className={"text-white"}>Price</th>
                                    <th scope="col" className={"text-white"}>Amount</th>
                                    <th scope="col" className={"text-white text-center"}>Category</th>
                                    <th scope="col" className={"text-white"}></th>

                                </tr>
                                </thead>
                                <tbody>
                                {items.map((data:any, index:number) => (
                                    <tr key={index} tabIndex={0}>
                                        <td>{data.name}</td>
                                        <td>{data.price}</td>

                                        <td>
                                            <input
                                                name={"amount"}
                                                onInput={handleAmount}
                                                className="form-control inputAmount"
                                                placeholder="Amount"/>
                                        </td>

                                        <td className={"text-center"}>{data.idCategory}</td>
                                        <td onClick={() => AddItemList(data)}>
                                            {/*<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 384 512" className={"lessThan"}>*/}
                                            {/*    <path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z"/>*/}
                                            {/*</svg>*/}

                                            <Image className={"greater"}
                                                   id={"greater"}
                                                   src={Greater}
                                                   width={32}
                                                   height={32}
                                                   alt="greaterThan"
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>



                        <div className={"container-fluid d-flex flex-column align-items-center"}>
                            <h3 className={"ItemsAdded1 me-2"}>Items Added</h3>
                            <h3 className={"ItemsAdded me-2"}>Items Added</h3>
                            <table className="table table-2 table-hover">
                                <thead className={"thead-2"}>
                                <tr>
                                    <th scope="col" className={"text-white"}></th>
                                    <th scope="col" className={"text-white"}>Item Name</th>
                                    <th scope="col" className={"text-white"}>Total</th>
                                    <th scope="col" className={"text-white"}>Amount</th>
                                    <th scope="col" className={"text-white"}>Bought</th>
                                </tr>
                                </thead>
                                <tbody>

                                {addedDetail.map((data:any, index:number) => (
                                    <tr key={index}>
                                        <td onClick={() => deleteDetail(data.idDetail)}>
                                            {/*<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 384 512" className={"lessThan"}>*/}
                                            {/*    <path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z"/>*/}
                                            {/*</svg>*/}
                                            <div className={"d-flex justify-content-center"}>
                                                <Image className={"less"}
                                                       id={"less"}
                                                       src={Less}
                                                       width={32}
                                                       height={32}
                                                       alt="lessThan"
                                                />
                                            </div>
                                        </td>
                                        <td>{data.itemName}</td>
                                        <td>{data.total}</td>
                                        <td>{data.amount}</td>
                                        <td>{String(data.bought)}</td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>



        </>



    )
}

export default Details;