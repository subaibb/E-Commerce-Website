import { ProductCard } from "./_components/ProductCard";
import { Header } from "./_components/Header";
import { Filters } from "./_components/Filters";
import { ReactNode } from "react";

export default function ShopAll() {
    return (
     
     <>
      <Header/>
      <Navigation/>
      <MainSection/>
 
     </>

    );  
  }

  function ProductContainer():JSX.Element{

    return(
        <div className="w-[75%] h-full justify-center grid grid-cols-3 gap-y-6 gap-2 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1">

            <ProductCard label="6Oz. Olive Oil" price="19.99">
              <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
            </ProductCard>

            <ProductCard label="6Oz. Olive Oil" price="19.99">
              <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
            </ProductCard>

            <ProductCard label="6Oz. Olive Oil" price="19.99">
              <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
            </ProductCard>

            <ProductCard label="6Oz. Olive Oil" price="19.99">
              <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
            </ProductCard>
        </div>
    )
  }

  function Navigation():JSX.Element{
    return(
        <div className="w-full h-[5vh] flex mb-9">
        </div>
    )
  }
  
  function MainSection ():JSX.Element{
    
      return(
        <div className=" w-full h-[100vh] flex justify-center items-center ">
          <div className="w-[95%] h-full flex justify-between 0">
          <Filters/>
          <ProductContainer/>
          </div>
    
        </div>
      )
    }

  function Label({children,className}:{children:ReactNode,className:string}):JSX.Element{
    return(
      <div className="w-full relative top-24">
        <h2 className={className}>{children}</h2>
      </div>
    )
  }



