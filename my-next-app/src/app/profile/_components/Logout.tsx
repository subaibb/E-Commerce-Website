"use client"
import { signOut } from 'next-auth/react';



export function Logout():JSX.Element{

    const handleLogout = async()=>{
        await signOut();
    }
    return(
        <button onClick={handleLogout} className=" bg-transparent text-center text-textprimary">
         Logout
        </button>
     )

}