'use client'
import Aside_Menubar from "@/components/Aside_Menubar";
import {Button, Dropdown, Table} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CustomContext} from "@/Context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
// import "../../../../components/Aside_Menubar.css";
import Link from "next/link";
import "../../components/Aside_Menubar.css";

const Category = () => {


    const [text, setText] = useState<any>([])
    const credentialsUser = "lsegura:12345";
    const credentialsBase64User = btoa(credentialsUser);
    const [visible, setVisible] = React.useState(false);
    const Router = useRouter();
    const userName = sessionStorage.getItem('userName');
    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();
    const [objectItem, setObjectItem] = useState<any>({});
    const [arrayCategory, setArrayCategory] = useState<any>([]);

    useEffect(() => {
        if(!userName){
            Router.push("/");
        }
        // getList();
        getToken();
        getCategory();
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

    // async function getList() {
    //
    //     const result =  await fetch("http://www.code2ever.com:8080/api/list", {
    //         method: 'GET',
    //         mode: 'cors',
    //         cache: 'default',
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Authorization": "Basic " + credentialsBase64User,
    //         },
    //         redirect: 'follow',
    //         referrerPolicy: 'no-referrer',
    //     }).then(response => {
    //         return response.json();
    //     }).then(data => data);
    //
    //     setText(result.data);
    //
    //
    // }

    const handleInputCategory = ({target}:{target:any}):void => {

            if(target.name === "category"){
                objectItem.description = target.value;
            }
    }

    const ItemSelected = (data:any) => {
        console.log(data);
        setObjectItem(data);
    }


    async function getCategory() {

        const result = await fetch("http://www.code2ever.com:8080/api/category", {
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

        setArrayCategory(result.data);

    }
    async function deleteCategory(id:any) {

        const data = new URLSearchParams();
        data.append('id', id);

        await fetch("http://www.code2ever.com:8080/api/category", {
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
        getCategory();
    }


    async function saveCategory(e:any) {
        e.preventDefault();

        const categoryName = document.getElementById("category") as any | null;
        const category = {
            "description": categoryName?.value,
        }

        await fetch("http://www.code2ever.com:8080/api/category", {
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
            body: JSON.stringify(category)
        }).then(response => console.log(response.status));
        e.target.reset();
        getCategory();
        console.log(e);
        // e.target.reset();
    }



    const handleSubmit = (e:any) => {
        if(objectItem.id){
            updateCategory(e);
            objectItem.id = null;
            return;
        }
        saveCategory(e);




    }


    async function updateCategory(e:any) {
        e.preventDefault();
        const category = {
            "id":objectItem.id,
            "description": objectItem.description
        }

        await fetch("http://www.code2ever.com:8080/api/category", {
            method: 'PUT',
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
            body: JSON.stringify(category)
        }).then(response => console.log(response.status));
        getCategory();

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
                                <div className={"d-flex  align-items-center justify-content-center mt-3"}>

                                    <form onSubmit={handleSubmit}  className={"shadow-lg rounded px-3 py-3 border form-container-edit   "} id={"formContainer"} style={{width: "400px"}}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputItem" className="form-label">Category</label>
                                            <input id={"category"} name={"category"} defaultValue={objectItem?.description} onInput={handleInputCategory}  type="text" className="form-control" placeholder={"Category"}/>
                                        </div>

                                        <div className={"d-flex justify-content-center mt-4"}>
                                            <button id={"button-submit-edit"} type="submit" className="btn btn-primary me-2">Submit</button>
                                        </div>
                                    </form>

                                </div>
                            </div>


                        </div>


                        <div className={"table-container1 d-flex justify-content-center"} style={{width:"95%"}}>



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
                                        {/*<Table.Column>Id</Table.Column>*/}
                                        <Table.Column>Category</Table.Column>
                                        <Table.Column>Edit</Table.Column>
                                        <Table.Column>Delete</Table.Column>
                                    </Table.Header>

                                    <Table.Body>
                                        {arrayCategory.map((items:any) => (
                                            <Table.Row key={items.id}>
                                                {/*<Table.Cell><div onClick={() => ItemSelected(items)}>{items.id}</div></Table.Cell>*/}
                                                <Table.Cell><div>{items.description}</div></Table.Cell>
                                                <Table.Cell>  <Button color="success" auto onPress={() => ItemSelected(items)}>
                                                    Edit
                                                </Button></Table.Cell>
                                                <Table.Cell>  <Button color="error" auto onPress={() => deleteCategory(items.id)}>
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

export default Category;