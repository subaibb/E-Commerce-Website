
import { ReactNode } from "react";
import { CSSProperties } from "react";
import { HTMLInputTypeAttribute } from "react";


  type errors={
    name?: string[] | undefined;
    image?: string[] | undefined;
    available?: string[] | undefined;
    price?: string[] | undefined;
    productType?: string[] | undefined;
    description?: string[] | undefined;
} | undefined




export function Input({Name,children,error,Style,Type}:{Name:"name"|"price"|"available" | "productType"|"description"|"image",children:ReactNode,error:errors,Style?:CSSProperties,Type:HTMLInputTypeAttribute}): JSX.Element {

    return (
      <div style={Style} className="w-[45%] lg:h-[70%] xs:h-[60%] flex flex-col"
      >
        <label className="w-full text-sm ">{children}</label>
        <input id={Name} name={Name} type={Type} required className="w-full h-full bg-default border-b-[1px] border-solid border-textprimary focus:outline-none"
         /> 
          {error?.[Name] ? <p className="text-red-500 text-sm h-0"> {error?.[Name]} </p> : null}
  
      </div> 
    );
  }