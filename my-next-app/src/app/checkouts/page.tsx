import { ReactNode } from "react";
import { Header } from "./Header";
import { Product } from "./_components/Product";
import { Totals } from "./_components/Totals";
import { CheckoutForm } from "./_components/CheckoutForm";
import db from "@/db/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
type ProductProps = {
  total: number;
  subtotal: number;
  quantity: number;
  products: {
      id: string;
      name: string;
      price: number;
      imagepath: string;
      rating: number;
  }[];
}[]





export default function Page():JSX.Element{
    return(
      <>
        <Header/>
        <MainSection/>
      </>
    )
}


// get user Cart 



const getCart =  async () => {
    const session = await getServerSession(authConfig);
    if (!session) {
      return [];
    }
  
    const carts = await db.cart.findMany({
      select: {
        quantity: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            imagepath: true,
            rating: true,
            
          },  
      },
      
      },
      where: {
        user:{
          id:session.user.id
        }
      },
    });

    // get Subtotal
    const cartsWithSubtotal = carts.map(cart => {
      // Calculate subtotal for each cart
      const subtotal = cart.products.reduce((acc, product) => {
          return acc + product.price * cart.quantity;
      }, 0);



  
      return {
        ...cart,
        subtotal: subtotal,
        
    };
  })
      // add the total to the cart object
      const total = cartsWithSubtotal.reduce((acc, cart) => {
        return acc + cart.subtotal;
      }, 0);
    
      return cartsWithSubtotal.map((cart) => {
        return {
          ...cart,
          total: total,
          }
        });

}


async function MainSection(){
  const getProducts = await getCart();
  if (getProducts.length === 0 )
    redirect("/shopall");
  
    return(
        <div className="w-full h-[100vh] bg-transparent lg:flex lg:flex-row xs:flex xs:flex-col-reverse absolute">
            <FormInfo total={getProducts[0]?.total}/>
            <Products data={getProducts}/>
        </div>
    )
}


async function Products({data}:{data:ProductProps}){

    return(
        <div className="lg:w-1/2 lg:h-full xs:w-full xs:h-1/2 bg-[#DDD7CE] flex flex-col lg:items-start xs:items-center">
            <Seperator/>
            <h3 className="w-[60%] text-xl font-wixMade text-textprimary h-[5%] font-medium "></h3>
            <ProductHolder>
               {
                    data.map((product) => {
                        return(
                            <Product data={product} key={product.products[0].id}/>
                        )
                    })
               }
            </ProductHolder>

            <div className="w-[65%] h-[15%] flex items-center justify-center">
            <Totals total={data[0].total}/>
            </div>
            
        </div>

    )
}

function FormInfo({total}:{total:number}):JSX.Element{

    return(
        <div className="lg:w-1/2 lg:h-full xs:w-full xs:h-1/2 bg-transparent flex flex-col lg:items-end xs:items-center justify-center">
               <div className="w-full lg:min-h-[18vh] lg:h-[18vh] xs:min-h-[2vh] ">

                </div>    
            <h3 className="w-[65%] lg:text-xl xs:text-base font-wixMade text-textprimary h-[5%] font-medium mb-1 ">Delivery</h3>
            <div className="w-[65%] h-fit items-start justify-start flex">
              <div className="w-[95%] bg-textprimary lg:h-[2px] xs:h-[1px]"/>
            </div>

            <CheckoutForm total={total}/>

        </div>
    )
}

function Seperator():JSX.Element{

    return(
        <div className="w-full min-h-[18vh] h-[18vh] ">

        </div>
    )

}

function ProductHolder({children}:{children:ReactNode}):JSX.Element{


    return(
        <div className="w-[65%] h-fit flex flex-col space-y-4 justify-center items-center max-h-[58vh] overflow-auto Products">
            {children}
        </div>
    )


}