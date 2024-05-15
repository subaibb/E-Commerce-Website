import type { Metadata } from "next";
import { Marcellus } from 'next/font/google'
import AuthProvider from "./hooks/AuthProvider";
import { LoginWarningContextWrapper,ShowCartContextWrapper,SideBarWrapper,ShowFavoriteContextWrapper } from "./hooks/Contexts";
import { ProductView } from "./product/[id]/_components/SideCart";
import { CartBar,SideNavigation,FavBar } from "./components/SideBar";
import { Label,LabelWrapper } from "./components/SideNav";
import { Counter,DeleteButton,AddCartButton } from "./product/[id]/_components/Counter";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import db from "../db/db";
import cn from "classnames";
import "./globals.css";


  const marcellus = Marcellus({ weight: '400', subsets: ['latin']});

  //get customer Cart

  const getCart = async () => {
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


  const getFavs = async () => {
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
  }



export const metadata: Metadata = {
  title: "PaliWear",
  description: "By Palestinians, for Palestinians",
};

export default async function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cart = await getCart();
    const fav = await getFavs();
  return (
    <html lang="en" className={marcellus.className}>
      <body className={cn("h-full w-full bg-default")}>
        <AuthProvider>

          <LoginWarningContextWrapper>
            <ShowCartContextWrapper>
              <ShowFavoriteContextWrapper>

              <SideBarWrapper>


            <CartBar total={cart[0].total}>
             {
             
                cart.map((cartItem,index)=>{
                  
                  return(
                    
                    <ProductView TypeForDelete="Cart"  extras={
                      <>
                      <Counter quantity={cartItem.quantity} id={cartItem.products[0].id} />
                      <DeleteButton type="Cart" id={cartItem.products[0].id} variant={1}/>
                      </>
                    } data={cartItem.products} key={index} delay={index/10}>
                      <img src={cartItem.products[0].imagepath} alt={cartItem.products[0].name} className="w-[75%] bg-productBackground" />
    
                    </ProductView>
                  )
                })
                
             }
             </CartBar>

            <FavBar>
            {
              fav.map((favItem,index)=>{
                return(
                  <ProductView TypeForDelete="Fav" extras={
                    <>
                    <AddCartButton id={favItem[0].id}/>
                    <DeleteButton type="Fav" id={favItem[0].id} variant={1}/>
                    </>
                  } data={favItem} key={index} delay={index/10}>
                    <img src={favItem[0].imagepath} alt={favItem[0].name} className="w-[75%] bg-productBackground" />
                  </ProductView>
                )
              })
            }
            </FavBar>



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
          </ShowFavoriteContextWrapper>
          </ShowCartContextWrapper>
          </LoginWarningContextWrapper>
          
          </AuthProvider>
        </body>
    </html>
  );
}
