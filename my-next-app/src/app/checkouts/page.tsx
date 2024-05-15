import { ReactNode } from "react";
import { Header } from "./Header";
import { Product } from "./_components/Product";

export default function Page():JSX.Element{
    return(
      <>
        <Header/>
        <MainSection/>
      </>
    )
}



function MainSection():JSX.Element{

    return(
        <div className="w-full h-[100vh] bg-transparent flex absolute">
            <Products/>
            <SideInfo/>
        </div>
    )
}


function SideInfo():JSX.Element{


    return(
        <div className="w-[40%] h-full bg-[#DDD7CE]">
            <Seperator/>
            <ProductHolder>
                <Product/>
                <Product/>
                <Product/>
            </ProductHolder>
        </div>

    )
}

function Products():JSX.Element{

    return(
        <div className="w-[60%] h-full bg-transparent flex flex-col items-end">
            <Seperator/>
            <h3 className="w-[98%] text-2xl font-wixMade text-textprimary mb-2 font-medium ">Checkout</h3>
            <div className="w-[98%] bg-textprimary h-[2px]"></div>
            
        </div>
    )
}

function Seperator():JSX.Element{

    return(
        <div className="w-full h-[22vh] ">

        </div>
    )

}

function ProductHolder({children}:{children:ReactNode}):JSX.Element{


    return(
        <div className="w-full h-fit flex flex-col space-y-4 justify-center items-center">
            {children}
        </div>
    )


}