'use client'
import React, {useEffect, useState} from 'react';
import {Modal, Button, Text, Input, Row, Checkbox, Textarea} from "@nextui-org/react";
import {it} from "node:test";
export default function CardModal({visible, closeHandler} : {visible:any, closeHandler:any}) {


    const credentialsUser = "lsegura:12345";
    const credentialsBase64User = btoa(credentialsUser);
    const [item, setItem] = useState<string>();
    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();


    // let arrayList = [];
    // function loadPage() {
    //     getToken();
    //     getList();
    // }

    useEffect(() => {
        getToken();
    }, [])
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


    const handleInput = ({target}:{target:any}):void => {

        if(target.name === "item"){
            setItem(target.value);
        }

    }


    const handleSubmit = ():void => {
        // e.preventDefault();

        console.log(item);
        saveList();
        closeHandler();
    }



    function changeView(idList:any) {
        // const listObject = arrayList.filter(list => list.id ===idList)[0];
        // localStorage.setItem('idList', listObject.id);
        // localStorage.setItem('nameList', listObject.name);
    }
    async function deleteList(id:any) {

        const data = new URLSearchParams();
        data.append('id', id);

        await fetch("http://www.code2ever.com:8080/api/list", {
            method: 'DELETE',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // "Session": session,
                // "X-CSRF-TOKEN": token,
                "Authorization": "Basic " + credentialsBase64User,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: data
        }).then(response => console.log(response.status));
        // getList();
    }


    async function saveList() {
        // e.preventDefault();
        const list = {
            "name": item,
        }

        await fetch("http://www.code2ever.com:8080/api/list", {
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
            body: JSON.stringify(list)
        }).then(response => console.log(response.status));
        // getList();
    }


    function editList(id:any) {
        // const list = arrayList.filter(value => value.id === id)[0];
        // document.getElementById("idListHidden").value = list.id;
        // document.getElementById("listName").value = list.name;
    }

    async function updateList(e:any) {
        e.preventDefault();

        // const listName = document.getElementById("listName").value;
        // const listId = document.getElementById("idListHidden").value;
        // document.getElementById("listName").value = "";
        // const category = {
        //     "id":listId,
        //     "name": listName,
        // }

        await fetch("http://www.code2ever.com:8080/api/list", {
            method: 'PUT',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // "Session": session,
                // "X-CSRF-TOKEN": token,
                "Authorization": "Basic " + credentialsBase64User,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify(category)
        }).then(response => console.log(response.status));
        // getList();
    }

    return (
        <div>

            <Modal
                preventClose
                blur
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>

                    <Text id="modal-title" size={18}>
                        Add new card to <Text b size={18}>
                        Shopping List
                    </Text>

                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        name={"item"}
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Card Title"
                        onInput={handleInput}
                    />

                    {/*<Textarea bordered color={"success"} placeholder={"Card Text"} />*/}

                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}