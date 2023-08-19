'use client'
import React, {useEffect, useState} from "react";
import Aside_Menubar from "@/components/Aside_Menubar";
import Image from "next/image";
import Greater from "../../../../menor-que.png";
import Less from "../../../../menor-que.png";
import {useRouter} from "next/navigation";
import "../../../components/Aside_Menubar.css"
import "./Buy.css";

const Buy = ({params}:{params:any}) => {

    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();
    let idList;
    const credentialsUser = "lsegura:12345";
    const credentialsBase64User = btoa(credentialsUser);
    const [items, setItems] = useState<any>([]);
    const Router = useRouter();
    // const userName = sessionStorage.getItem('userName');
    const [addedDetail, setAddedDetail] = useState<any>([]);
    const [addedDetailtoBuy, setAddedDetailtoBuy] = useState<any>([]);
    const [amount, setAmount] = useState<any>();

    useEffect(() => {
        getDetailToBuy();
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



    async function getDetailToBuy() {
        const data = new URLSearchParams();
        // const idList = localStorage.getItem('idList');

        data.append('idList', params.Info[1]);
       const result = await fetch("http://www.code2ever.com:8080/api/detail/buy?" + data, {
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
        })

        setAddedDetailtoBuy(result.data);
       drawList();
    }



    async function buyDetail(id:any) {
        const data = new URLSearchParams();
        data.append('idDetail',  id);

        await fetch("http://www.code2ever.com:8080/api/detail/to/buy", {
            method: 'PUT',
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
        }).then(response => {console.log(response.status); getDetailToBuy();});
    }

    async function cancelBuyDetail(id:any) {
        const data = new URLSearchParams();
        data.append('idDetail',  id);

        await fetch("http://www.code2ever.com:8080/api/detail/cancel/buy", {
            method: 'PUT',
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
        }).then(response => {console.log(response.status); getDetailToBuy();});
    }


    function sortElements(elementArray:any) {
        return elementArray.sort((a:any,b:any) => {
            let aContent = a.querySelector('label').textContent
            let bContent = b.querySelector('label').textContent
            return aContent < bContent ? -1 : 1
        })
    }

    function drawList(){
        const list = document.getElementById('addedDetailTable') as any;
        const itemArray = [...list?.children];

        const checked = itemArray.filter(item => item.querySelector('input').checked)
        const notChecked = itemArray.filter(item => !item.querySelector('input').checked)

        const sortedUnchecked = sortElements(notChecked);
        const sortedChecked = sortElements(checked);

        list.innerHTML = '';
        list.append(...sortedUnchecked, ...sortedChecked);
    }


    const handleCheckBox = async (data:any) => {
        const checkValue = document.querySelector('#check-' + data.idDetail)! as HTMLInputElement | null;
        data.bought = checkValue?.checked;
        drawList();

        if(data.bought){
           await buyDetail(data.idDetail)
        }else {
          await cancelBuyDetail(data.idDetail)
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

                        <div className={"details-title"}>
                            Note Title: {params.Info[0].replace(/%20/g, " ")}
                        </div>

                    </div>

                    <div className={"table-container-buy border border-danger  d-flex flex-column align-items-center"}>
                        {/*<h3 className={"ItemsAdded1 me-2"}>Items Added</h3>*/}
                        <h3 className={"ItemsAdded me-2 mb-4"}>Items Added</h3>


                        <div className={"d-flex justify-content-center"}>

                            <div>

                                <table className="table  table-2 table-hover">
                                    <thead className={"thead-2"}>
                                    <tr>
                                        <th scope="col" className={"text-white"}>Item Name</th>
                                        <th scope="col" className={"text-white"}>Total</th>
                                        <th scope="col" className={"text-white"}>Amount</th>
                                        <th scope="col" className={"text-white"}>Bought</th>
                                    </tr>
                                    </thead>
                                    <tbody id={"addedDetailTable"}>

                                    {addedDetail.map((data:any, index:number) => (
                                        <tr key={index}>

                                            <td><label>{data.itemName}</label></td>
                                            <td>{data.total}</td>
                                            <td>{data.amount}</td>
                                            <td>
                                                <input id={"check-" + data.idDetail}
                                                       className={"form-check-input bg-black"}
                                                       onClick={() => handleCheckBox(data)} defaultChecked={data.bought}
                                                       type="checkbox" value={data.idDetail}/>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>


                </div>
            </div>



        </>


    )
}


export default Buy;