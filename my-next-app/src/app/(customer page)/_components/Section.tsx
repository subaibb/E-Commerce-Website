import { FeaturedSwitch } from "./FeaturedSwitch";
import { ProductCard } from "./ProductCard";
import { ReactNode } from "react";
export function Section ({props}:{props:ReactNode}):JSX.Element{
    return(
        <>
        <div className="w-[1746px] h-[60px] flex justify-between  ">
      <h1 className="text-4xl font-bold">{props}</h1>
      <div className="w-[6%] h-[48px] flex justify-between">
      <FeaturedSwitch childern={1}/> 
      <FeaturedSwitch childern={2}/>
      </div>
      
      </div>

        <ProductCardHolder/>
    
      
      </>
    )
}


function ProductCardHolder ():JSX.Element{
        return(
            <div className="w-[1746px] h-[42%] justify-between relative flex overflow-auto">


                <ProductCard label="Rebook Zig Dynamica" price="$69.56">
                    <img src="/Shoe1.png" alt="Shoe1"/>
                </ProductCard>

                <ProductCard label="Rebook Women’s Dynamica" price="$109.56">
                    <img src="/Shoe2.png" alt="Shoe2"/>
                </ProductCard>

                <ProductCard label="New Balance 560" price="$99.56">
                    <img src="/Shoe3.png" alt="Shoe3"/>
                </ProductCard>

                <ProductCard label="New Balance 990" price="$49.56">
                    <img src="/Shoe4.png" alt="Shoe4"/>
                </ProductCard>

                <ProductCard label="New Balance 990" price="$49.56">
                    <img src="/Shoe4.png" alt="Shoe4"/>
                </ProductCard>

        

            </div>
        )
}
