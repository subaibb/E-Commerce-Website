"use client";
import Link from 'next/link';
import { Blackout } from './SideNav';
import { FooterLink } from '../(customer page)/_components/FooterLink';
import { useEffect } from 'react';
import { useLoginWarning } from '../hooks/Contexts';

export function LoginWarning(): JSX.Element {

    const {visible} = useLoginWarning();

    useEffect(()=>{
        if(visible){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    },[visible])
  return (
            <>
        {
            visible?
            <div className="w-full h-full flex justify-center items-center absolute">
            <Blackout/>
            <Warning/>
            </div>
            :
            null
            
        }
      
        </>
  );
} 

function Warning(): JSX.Element {
  return (
    <div className=" flex justify-center items-center absolute z-[1000] bg-default w-1/3 h-[30%] ">
      <div className="w-1/2 h-[60%] flex justify-between items-center flex-col">
        <h1 className="w-full text-2xl text-textscondary text-center">You must be logged in to be able to purchase,like and add items.</h1>
        <FooterLink Link="/login">Login Page</FooterLink>
      </div>
    </div>
  );
}


