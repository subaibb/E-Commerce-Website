
import Link from "next/link";
import cn from "classnames";
import { ReactNode } from "react"
import { Searchbar } from "./Searchbar";
import { SideBar } from "./SideBar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Paths } from "../shopall/_components/Paths";
import  db  from "@/db/db";
//get Favs and Cart Counts 

const GetCounts = async()=>{
  const session = await getServerSession(authConfig);
  if (!session){
    return {
      favs:0,
      cart:0
    }
  }
  const favs = await db.favorite.findMany({
    where:{
      user:{
        id:session.user.id
      }
    }
  });

  const cart = await db.cart.findMany({
    where:{
      user:{
        id:session.user.id
      }
    }
  });

  return {
    favs:favs.length,
    cart:cart.length
  }
}

export async function Nav({variation}:{variation:number}){

    
    return(
       
        <nav className={cn("flex justify-center items-center flex-col absolute w-full ",{
          "h-[18vh]": variation === 0,
          "h-[16vh]": variation === 1,
        })}>
          <TopNav/>
          <BottomNav variation={variation}/>
          
          {
            variation === 0 ? <ExtraNav/> : null
          }
         
        </nav>
    )
}

function TopNav ():JSX.Element{
  
    return(
        <div className={cn("w-[95%] h-1/2 border-b-[1px] border-solid border-textprimary flex justify-center items-center")}>
          
          <div className="w-full h-full flex lg:justify-start xs:justify-center items-center top-0 relative mb-auto ">
          <a href="/">
          <h2 className=" text-2xl text-primary">PaliWear</h2>
          </a>
          </div>

           <div className="h-full w-[25%] flex justify-between items-center lg:flex xs:hidden">
            <label className=" font-wixMade xl:text-sm sm:text-[10px] text-textprimary">Free Shipping on all orders over 30$</label>
            <ShopNow>Shop Now</ShopNow>
            </div>
         
          
        </div>
    )
}
async function BottomNav ({variation}:{variation:number}){

  const {favs,cart} = await GetCounts();
  return(
      <div className="  w-[95%] h-1/2 flex justify-between items-center z-10">

        
          <Searchbar radiant={variation}/>
   
          <NavLinks>
          <NavLink radiant={variation} href="/shopall">ShopAll</NavLink>
          <NavLink radiant={variation} href="/oils">Oils</NavLink>
          <NavLink radiant={0} href="/soaps">Soaps</NavLink>
          <NavLink radiant={0} href="/clothing">Clothing</NavLink>
          <NavLink radiant={0} href="/about">About Us</NavLink>
          <NavLink radiant={0} href="/contact">Contact</NavLink>
          </NavLinks>


       

        
          <SideBar favItems={favs} cartItems={cart}/>
       
      </div>
  )
} 

function ExtraNav ():JSX.Element{
  return(
    <div className="w-[95%] h-[2vh] flex justify-start items-center">
        <Paths/>
    </div>
  )
}

function ShopNow ({children}:{children:ReactNode}):JSX.Element{
  return(
    <button className="font-wixMade xl:text-xs sm:text-[10px] text-textprimary bg-transparent border-[1px] xl:rounded-3xl md:rounded-xl sm:rounded-lg w-[28%] h-[40%] border-textprimary text-center hover:bg-[#EFDCC3] transition duration-75 z-10">
      {children}
    </button>
  )
}

function NavLink ({children , href , radiant}:{children:ReactNode , href:string , radiant:number}):JSX.Element{
  return(
    <Link href={href} className={cn(
      " hover:border-b-[1px] border-solid border-textprimary",
      {
        " text-textprimary": radiant === 0,
        " text-textscondary hover:border-b-[1px] border-solid border-textscondary": radiant === 1,
      }
    )}>
      {children}
    </Link>
  )
}

function NavLinks ({children}:{children:ReactNode}):JSX.Element{
  return(
    <div 
   className="h-full w-[40%] lg:flex xs:hidden justify-between items-center">
      {children}
     
    </div>
  )
}