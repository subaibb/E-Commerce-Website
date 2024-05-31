"use client";
import { CSSProperties, ReactNode } from "react"
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form"
import { motion } from "framer-motion"
import {z,ZodType} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Purchase } from "../_actions/Purchase"
import {  useFormStatus } from "react-dom"
type FormInfo = {
    firstName:string,
    lastName:string,
    street:string,
    city:string,
    state:string,
    zip:string,
    phoneNumber:string,
  }

  const schema :ZodType<FormInfo> = z.object({
    firstName:z.string().min(2).max(50),
    lastName:z.string().min(2).max(50),
    street:z.string().min(2).max(50),
    city:z.string().min(2).max(50),
    state:z.string().min(2).max(50),
    zip:z.string().min(5).max(8),
    phoneNumber:z.string().min(10).max(10).regex(/^[0-9]+$/),
  })

export function CheckoutForm({total}:{total:number}):JSX.Element{

 
    const {register,handleSubmit,formState :{ errors }} = useForm<FormInfo>({
        resolver:zodResolver(schema)
      });
      
    const PassData = async (data:FormInfo) => {
        
        const res = Purchase.bind(null,{data:data,total:total});
        if (await res()){
           console.log("Success");
        }
    }
    const { pending } = useFormStatus()

    
    return(
        <div className="w-[65%] h-full ">

            <form onSubmit={handleSubmit(PassData)} className="w-[95%] h-full flex flex-col items-center space-y-6 PayForm">

                    <div className="w-full h-[2%]"/>    
                    <Carrier>
                        <Input Name="firstName" error={errors} register={register}>First Name</Input>
                        <Input Name="lastName" error={errors} register={register}>Last Name</Input>
                    </Carrier>

                    <Carrier>
                        <Input Name="street" error={errors} register={register}>Street</Input>
                        <Input Name="city" error={errors} register={register}>City</Input>
                    </Carrier>

                    <Carrier>
                        <Input Name="state" error={errors} register={register}>State</Input>
                        <Input Name="zip" error={errors} register={register}>Zip</Input>
                    </Carrier>

                    <Carrier>
                        <Input Style={
                            {width:"100%"}
                        } Name="phoneNumber" error={errors} register={register}>Phone Number</Input>
                    </Carrier>

                    <Carrier>
                        <button type="submit" disabled={pending} className="w-full h-1/2 bg-[#8D8B8A] text-default font-wixMade text-lg text-center  duration-150 pointer-events-none">Checkout</button>
                    </Carrier>
                   
                   


            </form>

        </div>
    )


}


function Carrier({children}:{children:ReactNode}):JSX.Element{

    return(
        <div className="w-[95%] h-[13%]  flex justify-between items-center">
                {children}
        </div>
    )

}


function Input({Name,children,error,register,Style}:{Name:"firstName"|"lastName"|"street" | "city"|"state"|"zip"|"phoneNumber",children:ReactNode,error:FieldErrors<FormInfo>,register:UseFormRegister<FormInfo>,Style?:CSSProperties}): JSX.Element {

    return (
      <motion.div style={Style} className="w-[45%] lg:h-[80%] xs:h-[70%] flex flex-col"
      initial={{opacity:0,transform:"translateY(5px)"}}
      animate={{opacity:1,transform:"translateY(0)"}}
      transition={{duration:1,delay:0.1}}
      >
        <label className="w-full text-sm ">{children}</label>
        <input {...register(Name)} id="name" type="text" required className="w-full h-full bg-default border-b-[1px] border-solid border-textprimary focus:outline-none"
         /> 
          {error[Name] ? <p className="text-red-500 text-sm h-0"> {error[Name]?.message} </p> : null}
  
      </motion.div> 
    );
  }