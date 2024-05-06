"use client";
import { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler, UseFormRegister,FieldErrors } from "react-hook-form"
import { signIn } from "next-auth/react";
import { z,ZodType } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

type FormInfo = {
  email:string,
  password:string
}

const schema :ZodType<FormInfo> = z.object({
  email:z.string().email(),
  password:z.string().min(8).max(24)
})

export function Login(): JSX.Element {
  
  return (
    <div className="w-[55%] h-full justify-center items-center flex">
      <LoginForm />
    </div>
  );
}

function LoginForm(): JSX.Element {
  const router = useRouter();
  const {register,handleSubmit,formState :{ errors }} = useForm<FormInfo>({
    resolver:zodResolver(schema)
  });

  

  
  const PassData = async (data:FormInfo) => {
    
      const response = await signIn("credentials",{
        email:data.email,
        password:data.password,
        redirect: false
    });

    if (response && !response.error){
      router.push("/shopall");
    }
  
    
    
  }
  
  


  return (
    <div className="w-1/2 h-[40%] flex justify-between items-center flex-col">
      <form onSubmit={handleSubmit(PassData)} className="w-full h-full flex flex-col justify-between items-center InputForm">
      <h1 className="w-full text-2xl text-textscondary text-center">Login</h1>
      <Input register={register} error={errors} Name="email" >EMAIL</Input>
      <Input register={register} error={errors} Name="password" > PASSWORD</Input>
      <LoginButton>Login</LoginButton>
      </form>
    </div>
  );
}

function Input({Name,children,error,register}:{Name:"email" | "password",children:ReactNode,error:FieldErrors<FormInfo>,register:UseFormRegister<FormInfo>}): JSX.Element {

  return (
    <div className="w-full h-[20%] flex flex-col">
      <label className="w-full">{children}</label>
      <input {...register(Name)} id="name" type="text" required className="w-full h-full bg-default border-b-[1px] border-solid border-textprimary focus:outline-none"
       />
        {error[Name] ? <p className="text-red-500 text-sm h-0"> {error[Name]?.message} </p> : null}

    </div>
  );
}

function LoginButton({children}:{children:ReactNode}): JSX.Element {
  const {pending} = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full h-[15%] bg-[#8D8B8A] text-default transition-all duration-150 pointer-events-none">{children}</button>
  );
}