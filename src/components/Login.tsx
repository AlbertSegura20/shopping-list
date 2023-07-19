'use client';
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {CustomContext} from "@/Context/Context";
import {json} from "stream/consumers";


const Login = () => {

    const Router = useRouter();
    const [token, setToken] = useState<any>();
    const [session, setSession] = useState<any>();
    const [userName, setUserName] = useState<string|any>();
    const [password, setPassword] = useState<string>();
    const [status, setStatus] = useState<any>();
    const {getUser} = CustomContext();


    useEffect(() => {
        getToken();
    }, []);

    const handleInput = ({target}: {target:any}):void => {

        if(target.name === "userName"){
            setUserName(target.value);
        }
        if(target.name === "password"){
            setPassword(target.value);
        }
    }

    async function getToken(){
        const credentials = "userapp:12345";
        const credentialsBase64 = btoa(credentials);
        const securityUrl = "http://www.code2ever.com:8080/api/auth/csrf";
        // const securityUrl = "http://localhost:8080/api/auth/csrf";
        const response = await fetch(securityUrl, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + credentialsBase64,
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });

        const status = response.status;

        if (status !== 200) {
            console.error("Error, logging user");
            return;
        }


        setToken(response.headers.get("X-CSRF-TOKEN"));
        setSession(response.headers.get("Session"));
    }

    async function login(e:any) {
        e.preventDefault();
        const credentials = "userapp:12345";
        const credentialsBase64 = btoa(credentials);

        const user = {"userName": userName, "password": password}
        const urlLogin = "http://www.code2ever.com:8080/api/auth/signing";
        // const urlLogin = "http://localhost:8080/api/auth/signing";
        let result: any;

        result = await fetch(urlLogin, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Session": session,
                "X-CSRF-TOKEN": token,
                "Authorization": "Basic " + credentialsBase64,
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(user) // body data type must match "Content-Type" header
        }).then(response => response);

        if(result.status===200){
            sessionStorage.setItem('userName', userName);
            Router.push("/Home");
        }else{
            console.error("Invalid credentials");
        }
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        await login(e);
    }

    return (

        <>
            <div className={"min-vh-100 d-flex align-items-center justify-content-center"}>

                <form onSubmit={handleSubmit} className={"shadow-lg rounded px-3 py-3 col-md-4 "} id={"formContainer"}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input name={"userName"} type="text" className="form-control" placeholder={"Username"} onInput={handleInput}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name={"password"} type="password" className="form-control"  placeholder={'*************'} onInput={handleInput}/>
                    </div>

                    <div className={"d-flex justify-content-center"}>
                        <button type="submit" className="btn btn-primary">Log in</button>
                    </div>
                </form>

            </div>

        </>
    )
}

export default Login;