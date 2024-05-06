import { ProductCard } from "./_components/ProductCard";
import { Header } from "./_components/Header";
import { Filters } from "./_components/Filters";
import { Contact } from "../(customer page)/_components/Contact";
import db from "@/db/db"

//DataBaseQueries

type ProductData = {
  id:string,
  name:string,
  price:number,
  imagepath:string,
  rating:number,
}[];

const getProducts = async () => {
  return await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      imagepath: true, // Include image property
      rating: true,
    },
  });
};



//Components

export default function ShopAll() {
    return (
     
     <>
     
      <Header/>
      <Navigation/>
      <MainSection/>  
      <Contact/>
     </>

    );  
  }

  async function ProductContainer(){
    const Products:ProductData = await getProducts();
    return(
        <div className="w-[75%] h-full justify-center grid grid-cols-3 gap-y-6 gap-2 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 relative">

        {Products.map((product) => (
          <ProductCard key={product.id} data={product} Style={{height:"fit-content"}}>
            <img loading="lazy" src={product.imagepath} alt="" className="w-full object-contain"/>
          </ProductCard>
        ))}

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
        <div className=" w-full h-fit flex justify-center items-center xs:p-[5%] sm:p-[2%] mb-5 ">
          <div className="w-[95%] h-full flex justify-between 0">
          <Filters/>
          <ProductContainer/>
          </div>
    
        </div>
      )
    }




