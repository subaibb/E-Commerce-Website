"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation";
import { useForm, UseFormRegister,FieldErrors } from "react-hook-form"
import { signIn } from "next-auth/react";
import { z,ZodType } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {motion} from 'framer-motion';

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
    <div className="lg:w-[55%] lg:h-full justify-center items-center flex z-10 xs:w-full xs:h-1/2">
      <LoginForm />
    </div>
  );
}

function LoginForm(): JSX.Element {
  const router = useRouter();
  const {register,setError,handleSubmit,formState :{ errors }} = useForm<FormInfo>({
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

    if (response && response.error){
     setError("email",{message:"Incorrect Email or Password"});
    }
  
    
    
  }
  
  


  return (
    <div className="xs:w-1/2 lg:h-[40%] xs:h-[60%]  flex justify-between items-center flex-col">
      <form onSubmit={handleSubmit(PassData)} className="w-full h-full flex flex-col justify-between items-center InputForm">
      <motion.h1 className="w-full text-2xl text-textscondary text-center"
       initial={{opacity:0,transform:"translateY(5px)"}}
       animate={{opacity:1,transform:"translateY(0)"}}
       transition={{duration:1,delay:0.03}}

      >Login</motion.h1>
      <Input register={register} error={errors} Name="email" >EMAIL</Input>
      <Input register={register} error={errors} Name="password" > PASSWORD</Input>
      <LoginButton>Login</LoginButton>
      </form>
    </div>
  );
}

function Input({Name,children,error,register}:{Name:"email" | "password",children:ReactNode,error:FieldErrors<FormInfo>,register:UseFormRegister<FormInfo>}): JSX.Element {

  return (
    <motion.div className="w-full lg:h-[20%] xs:h-[25%] flex flex-col"
    initial={{opacity:0,transform:"translateY(5px)"}}
    animate={{opacity:1,transform:"translateY(0)"}}
    transition={{duration:1,delay:0.1}}
    >
      <label className="w-full">{children}</label>
      <input {...register(Name)} id="name" type="text" required className="w-full h-full bg-default border-b-[1px] border-solid border-textprimary focus:outline-none"
       />
        {error[Name] ? <p className="text-red-500 text-sm h-0"> {error[Name]?.message} </p> : null}

    </motion.div>
  );
}

function LoginButton({children}:{children:ReactNode}): JSX.Element {
  const {pending} = useFormStatus();
  return (
    <motion.button type="submit" disabled={pending} className="w-full lg:h-[15%] xs:h-[20%] bg-[#8D8B8A] text-default transition-all duration-150 pointer-events-none"
    initial={{opacity:0,transform:"translateY(5px)"}}
    animate={{opacity:1,transform:"translateY(0)"}}
    transition={{duration:1,delay:0.2}}

    >{children}</motion.button>
  );
}