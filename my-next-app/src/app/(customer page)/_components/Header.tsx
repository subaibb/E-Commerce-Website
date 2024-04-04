
import { HeaderButton } from "./HeaderButton";

export function Header ():JSX.Element{
    return(
        <>
        <div className="absolute top-[35%] left-1/2 transfrom -translate-x-1/2 w-[65%] h-[50%] -translate-y-1/2 bg-[#EFEFEF]  Header">
                
        <div className="w-[60%] h-[45%] items-center flex flex-col justify-center absolute left-1/2 -translate-x-1/2">
        <h1 className="text-5xl text-default font-black text-center mb-auto mt-auto select-none ">
         Sales Up To 50% On Selected Sneakers
        </h1>
        <HeaderButton>
        Shop Now
      </HeaderButton>
      </div>
      
      </div>
      </>
    )
}