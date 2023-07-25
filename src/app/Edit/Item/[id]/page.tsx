'use client'
import React, {useEffect, useState} from "react";
import {CustomContext} from "@/Context/Context";
import {useRouter} from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
// import "../../../../components/Aside_Menubar.css";
import Link from "next/link";
import Aside_Menubar from "@/components/Aside_Menubar";
import { Table, Button, Dropdown } from '@nextui-org/react';
import Image from "next/image";
import "./Id.css";


const Item = () => {

    const [text, setText] = useState<any>([])
    const credentialsUser = "lsegura:12345";
    const credentialsBase64User = btoa(credentialsUser);
    const [visible, setVisible] = React.useState(false);
    const Router = useRouter();
    const userName = sessionStorage.getItem('userName');
    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();
    const [objectItem, setObjectItem] = useState<any>({});

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

    const ItemSelected = (data:any) => {
        console.log(data);
        setObjectItem(data);
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
                <div className={"contain-bottom mt-4"}>

                  <div className={"form-container1"}>


                      <div className={"form-container "}>
                          <div className={"d-flex align-items-center justify-content-center mt-3"}>

                              <form className={"shadow-lg rounded px-3 py-3 border form-container-edit   "} id={"formContainer"} style={{width: "400px"}}>
                                  <div className="mb-3">
                                      <label htmlFor="exampleInputItem" className="form-label">Name</label>
                                      <input id={"input-name"} name={"Name"} defaultValue={objectItem?.name} type="text" className="form-control" placeholder={"Item"}/>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="exampleInputPrice" className="form-label">Price</label>
                                      <input id={"input-price"} name={"Price"} defaultValue={objectItem?.total} type="number" className="form-control"  placeholder={'0.00'}/>
                                  </div>


                                <div className={"d-flex"}> Choose a category

                                    <div className={"ms-2 pb-auto"}>
                                        <Dropdown>
                                            <Dropdown.Button flat color={"secondary"} size={"xs"}>Category</Dropdown.Button>
                                            <Dropdown.Menu aria-label="Static Actions" >
                                                <Dropdown.Item key="new">New file</Dropdown.Item>
                                                <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                                                <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                                                <Dropdown.Item key="delete" color="error">
                                                    Delete file
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                </div>

                                  <div className={"d-flex justify-content-center mt-3"}>
                                      <button id={"button-submit-edit"} type="submit" className="btn btn-primary me-2">Submit</button>
                                      <button id={"button-submit-edit"} type="submit" className="btn text-white" style={{backgroundColor:"#0D98BA"}}>Update</button>
                                  </div>
                              </form>

                          </div>
                      </div>


                  </div>


                    <div className={"table-container1 d-flex justify-content-center me-5 pe-5"}>



                        <div className={"table-container border  rounded mt-4"}>

                            <Table
                                className={"table-items"}
                                shadow={false}
                                color="success"
                                aria-label="Example pagination  table"
                                css={{
                                    height: "auto",
                                }}

                                selectionMode="single"
                            >

                                <Table.Header>
                                    <Table.Column>Id</Table.Column>
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Price</Table.Column>
                                    <Table.Column>Category</Table.Column>
                                    <Table.Column></Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {text.map((items:any) => (
                                       <Table.Row key={items.id}>
                                           <Table.Cell><div onClick={() => ItemSelected(items)}>{items.id}</div></Table.Cell>
                                           <Table.Cell><div onClick={() => ItemSelected(items)}>{items.name}</div></Table.Cell>
                                           <Table.Cell><div onClick={() => ItemSelected(items)}>{items.total}</div></Table.Cell>
                                           <Table.Cell><div onClick={() => ItemSelected(items)}>{items.totalItems}</div></Table.Cell>
                                           <Table.Cell>  <Button color="error" auto>
                                               X
                                           </Button></Table.Cell>
                                       </Table.Row>

                                    ))}
                                </Table.Body>

                                <Table.Pagination
                                    color={"secondary"}
                                    shadow
                                    noMargin
                                    align="center"
                                    rowsPerPage={3}
                                    onPageChange={(page) => console.log({ page })}
                                />
                            </Table>

                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Item;