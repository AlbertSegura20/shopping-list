'use client'
import {createContext, useContext, useState} from "react";
export const Context = createContext();
export const CustomContext = () => {

    const context = useContext(Context);

    if(!Context){
        console.log("Error, Context is empty")
    }

    return context;
}

export const MyContext = ({children}) => {

    const [getUserName, setGetUserName] = useState();

    const getUser = (user) => {
        // let name = sessionStorage.getItem('userName').replace(/['"]+/g, '');
        setGetUserName(user);
        //
        // console.log(getUserName);
        // setGetUserName();


    }

    return (
        <Context.Provider value={{getUser, getUserName}}>
            {children}
        </Context.Provider>
    )
}