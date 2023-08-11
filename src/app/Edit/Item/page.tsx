'use client'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Aside_Menubar from "@/components/Aside_Menubar";
import { Table, Button, Dropdown } from '@nextui-org/react';
import "./item.css";


const Item = () => {

    const credentialsUser = "lsegura:12345";
    const credentialsBase64User = btoa(credentialsUser);
    // const [visible, setVisible] = React.useState(false);
    const Router = useRouter();
    const userName = sessionStorage.getItem('userName');
    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();
    const [categories, setCategories] = useState<any>([]);
    const [items, setItems] = useState<any>([]);
    const [objectItem, setObjectItem] = useState<any>({});
    // const [itemName, setItemName] = useState<string>();
    // const [itemPrice, setItemPrice] = useState<any>();
    const [itemCategory, setItemCategory] = useState<number>();
    const [idCategory, setIdCategory] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    // const [id, setId] = useState();

    useEffect(() => {
        if(!userName){
            Router.push("/");
        }
        getItem();
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
        setCategories(result.data);
    }
    async function getItem() {

       const result = await fetch("http://www.code2ever.com:8080/api/item", {
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

    const handleInput = ({target}:{target:any}) => {

        if(target.name === "Name"){
            objectItem.name = target.value;
        }
        if(target.name === "Price"){
            objectItem.price = target.value;
        }
    }

    const handleChange = (data:any) => {
        setItemCategory(data.target.value);
        console.log(itemCategory);

    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if(objectItem.id){
            updateItem(e);
            objectItem.id = null;
            return;
        }
        saveItem(e);


    }
    async function saveItem(e:any) {
        e.preventDefault();

        const itemObject = {
            "name":  objectItem.name,
            "price":  objectItem.price,
            "idCategory": Number(itemCategory)
        }

        await fetch("http://www.code2ever.com:8080/api/item", {
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
            body: JSON.stringify(itemObject)
        }).then(response => console.log(response.status));

        getItem();
        e.target.reset();
    }

    async function deleteItem(id:any) {


        const data = new URLSearchParams();
        data.append('id', id);

        await fetch("http://www.code2ever.com:8080/api/item", {
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
        getItem();
    }

    async function updateItem(e:any) {
        e.preventDefault();
        const item = {
            "id":objectItem.id,
            "name": objectItem.name,
            "price": objectItem.price,
            "idCategory":itemCategory
        }


        await fetch("http://www.code2ever.com:8080/api/item", {
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
            body: JSON.stringify(item)
        }).then(response => console.log(response.status));
        getItem();
        // setObjectItem("");
    }

    const ItemSelected = (data:any) => {
        console.log(data);
        setObjectItem(data);
        setIdCategory(data.idCategory);
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


                      <div className={"form-container d-flex align-items-center justify-content-center mt-3"}>
                          <div className={""}>

                              <form onSubmit={handleSubmit} className={"shadow-lg rounded px-3 py-3 border form-container-edit   "} id={"formContainer"} style={{width: "300px"}}>
                                  <div className="mb-3">
                                      <label htmlFor="exampleInputItem" className="form-label">Name</label>
                                      <input id={"input-name"} name={"Name"} defaultValue={objectItem?.name} onInput={handleInput} type="text" className="form-control" placeholder={"Item"}/>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="exampleInputPrice" className="form-label">Price</label>
                                      <input id={"input-price"} name={"Price"} defaultValue={objectItem?.price} onInput={handleInput} type="number" className="form-control"  placeholder={'0.00'}/>
                                  </div>


                                <div>Category
                                    <div className={"mt-1 pb-auto"}>

                                        <select value={idCategory} className={"px-2 rounded"} aria-label="Default select example" onChange={handleChange} required>
                                            <option value="" className={"align-items-center"}>Category</option>
                                            {categories?.map((category:any, index:number) => (
                                                <option value={category.id} key={index}>{category.description}</option>))}
                                        </select>
                                    </div>

                                </div>

                                  <div className={"d-flex justify-content-center mt-3"}>
                                      <button id={"button-submit-edit"} type="submit" className="btn btn-primary me-2">Submit</button>
                                  </div>
                              </form>

                          </div>
                      </div>


                  </div>


                    <div className={"table-container1 d-flex justify-content-center"} style={{width:"95%"}}>

                        <div className={"table-container border rounded mt-2"}>

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
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Price</Table.Column>
                                    <Table.Column>Category</Table.Column>
                                    <Table.Column>Edit</Table.Column>
                                    <Table.Column>Delete</Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {items.map((item:any) => (
                                        <Table.Row key={item.id}>
                                            <Table.Cell><div>{item.name}</div></Table.Cell>
                                            <Table.Cell><div>{item.price}</div></Table.Cell>
                                            <Table.Cell><div>{categories.filter((category:any) => category.id === item.idCategory)[0]?.description}</div></Table.Cell>
                                            <Table.Cell>  <Button color="success" auto onPress={() => ItemSelected(item)}>
                                                Edit
                                            </Button></Table.Cell>
                                            <Table.Cell>  <Button color="error" auto onPress={() => deleteItem(item.id)}>
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