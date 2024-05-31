import type { Metadata } from "next";
import { Marcellus } from 'next/font/google'
import AuthProvider from "./hooks/AuthProvider";
import { LoginWarningContextWrapper,ShowCartContextWrapper,SideBarWrapper,ShowFavoriteContextWrapper,FavContextWrapper } from "./hooks/Contexts";
import { ProductView } from "./product/[id]/_components/SideCart";
import { CartBar,SideNavigation,FavBar } from "./components/SideBar";
import { Label,LabelWrapper } from "./components/SideNav";
import { Counter,DeleteButton,AddCartButton } from "./product/[id]/_components/Counter";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { cache } from "@/lib/cache";
import db from "../db/db";
import cn from "classnames";
import "./globals.css";
import Image from "next/image";


  const marcellus = Marcellus({ weight: '400', subsets: ['latin']});

  //get customer Cart

  const getCart = cache ( async () => {
    
    const session = await getServerSession(authConfig);
    if (!session) {
      return [];
    }
    const carts = db.cart.findMany({
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
        userId:session.user.id
      },
    });

    // get Subtotal
    const cartsWithSubtotal = (await carts).map(cart => {
      // Calculate subtotal for each cart
      const subtotal = cart.products.reduce((acc, product) => {
          return acc + product.price * cart.quantity;
      }, 0);



  
      return {
        ...cart,
        subtotal: subtotal,
        
    };
  });
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

},['/','maincart'],{revalidate:60})


  const getFavs = cache ( async () => {
    const session = await getServerSession(authConfig);
    if (!session) {
      return [];
    }
  
    const favs = await db.favorite.findMany({
      select: {
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
  
    return favs.map((fav) => fav.products);
  },['/','mainfav'],{revalidate:60})



export const metadata: Metadata = {
  title: "PaliWear",
  description: "By Palestinians, for Palestinians",
};

export default async function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
    const cart = await getCart();
    const fav = await getFavs();
  return (
    <html lang="en" className={marcellus.className}>
      <body className={cn("h-full w-full bg-default")}>
        <AuthProvider>

          <LoginWarningContextWrapper>
            <ShowCartContextWrapper>
              <ShowFavoriteContextWrapper>
                <FavContextWrapper>
              <SideBarWrapper>



                {

                    

                    <CartBar total={cart[0]?.total}>
                    {

                  
                        
                      cart.length  > 0 ?
                      cart.map((cartItem,index)=>{
                        return(
                          
                          <ProductView TypeForDelete="Cart"  extras={
                            <>
                            <Counter quantity={cartItem.quantity} id={cartItem.products[0]?.id} />
                            <DeleteButton type="Cart" id={cartItem.products[0]?.id} variant={1}/>
                            </>
                          } data={cartItem.products} key={index} delay={index/10}>
                            <Image width={250} height={250} src={cartItem.products[0]?.imagepath} alt={cartItem.products[0]?.name} className="sm:w-[35%] xs:w-[50%] bg-productBackground" />

                          </ProductView>
                        )
                      }):<p className="text-center text-textprimary top-1/2 relative">Your Cart is Empty</p>
                      
                    }
                    </CartBar>
                  
                }
            


              {
                   
                  <FavBar>
                  {
                     fav.length > 0 ?
                    fav.map((favItem,index)=>{
                      return(

                       
                        <ProductView TypeForDelete="Fav" extras={
                          <>
                          <AddCartButton id={favItem[0]?.id}/>
                          <DeleteButton type="Fav" id={favItem[0]?.id} variant={1}/>
                          </>
                        } data={favItem} key={index} delay={index/10}>
                          <Image width={250} height={250} src={favItem[0]?.imagepath} alt={favItem[0]?.name} className="sm:w-[35%] xs:w-[50%] bg-productBackground" />
                        </ProductView>
                      )
                    }):<p className="text-center text-textprimary top-1/2 relative">Your Favorites is Empty</p>
                  }
                  </FavBar>

              }




          <SideNavigation>
            <LabelWrapper>
            <Label delay={0.1} link="/shopall">
                        Shop All
                        </Label>

                        <Label delay={0.2} link="/oils">
                        Oils
                        </Label>

                        <Label delay={0.3} link="/clothing">
                        Clothing
                        </Label>

                        <Label delay={0.36} link="/aboutus">
                        About Us
                        </Label>

                        <Label delay={0.4} link="/contact">
                        Contact
                        </Label>
            </LabelWrapper>
          </SideNavigation>


          {children}

          </SideBarWrapper>
          </FavContextWrapper>
          </ShowFavoriteContextWrapper>
          </ShowCartContextWrapper>
          </LoginWarningContextWrapper>
          
          </AuthProvider>
        </body>
    </html>
  );
}
