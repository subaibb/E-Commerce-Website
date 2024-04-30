
import cn from "classnames";

export function Searchbar ({radiant}:{radiant:number}):JSX.Element{

    return(
      <div className="bg-transparent lg:w-[19%] xs:w-[35%] h-[40px] rounded-[40px] flex items-center Search-Bar transition duration-150">
        <div className="Search-img w-[10%] h-full bg-transparent flex justify-center items-center ">
          {
            radiant === 1 ? <img src="/search.svg" alt="Search" className=" xl:w-[20px] xl:h-[20px] sm:w-[10px] sm:h-[10px] sm:mr-2 xs:mr-2  " /> : <img src="/SearchPrimary.svg" alt="Search" className="xl:w-[20px] xl:h-[20px] sm:w-[10px] sm:h-[10px] sm:mr-2 xs:mr-2" />
          }
        </div>
        <input placeholder="Search" type="text" className={cn("bg-transparent w-[90%] h-[100%] SearchBar-Input xl:text-base focus:outline-none md:text-xs xs:text-[12px]"

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