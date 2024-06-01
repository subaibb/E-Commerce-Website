"use client";
import cn from "classnames";
import Image from "next/image";
export function Searchbar ({radiant}:{radiant:number}):JSX.Element{

    return(
      <div className="bg-transparent lg:w-[19%] xs:w-[35%] h-[40px] rounded-[40px] flex items-center Search-Bar transition duration-150">
        <div className="Search-img w-[10%] h-full bg-transparent flex justify-center items-center ">
          {
            radiant === 1 ? <Image src="/search.svg" width={16} height={16} alt="Search" className=" sm:w-[16px] sm:h-[16px] xs:w-[14px] xs:h-[14px]  xs:mr-2  " /> : <Image width={16} height={16} src="/SearchPrimary.svg" alt="Search" className="sm:w-[16px] sm:h-[16px] xs:w-[14px] xs:h-[14px]  xs:mr-2 " />
          }
        </div>
        <input placeholder="Search" type="text" className={cn("bg-transparent w-[90%] h-[100%] SearchBar-Input sm:text-base focus:outline-none xs:text-xs xs:text-[12px]"

          ,
          {
            " text-textprimary placeholder:text-textprimary": radiant === 0,
            " text-textscondary placeholder:text-textscondary": radiant === 1,
          }
        )
          
        } />
      </div>
    )
}