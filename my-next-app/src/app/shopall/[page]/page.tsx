import { ProductCard } from "../_components/ProductCard";
import { Header } from "../_components/Header";
import { Filters } from "../_components/Filters";
import { Contact } from "../../(customer page)/_components/Contact";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { LoginWarning } from "../../components/LoginWarning";
import { PageSwitch } from "../_components/PageSwitch";
import db from "@/db/db";
import Image from "next/image";

//DataBaseQueries

type Product = {
  id: string;
  name: string;
  rating: number;
  price: number;
  imagepath: string;
}[];

const getProducts = async () => {
  return await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      imagepath: true,
      rating: true,
    },
  });
};


const getFavs = async () => {
  const session = await getServerSession(authConfig);
  if (!session) {
    return [];
}

  const favs = await db.favorite.findMany({
    select: {
      postId: true,
    },
    where: {
      user: {
        id: session.user.id,
      },
    },
  });

  return favs.map((fav) => fav.postId);
}


//Components

export default function ShopAll({ params }: { params: { page: string } }) {

    return (
     <>
     <LoginWarning/>
      <Header/>
      <Navigation/>
      <MainSection page={params.page}/>  
      <Contact/>
     </>

    );  
  }

  async function ProductContainer({page,data}:{page:string,data:Product}){
    const Favs = await getFavs();
    const Page = parseInt(page);
    
   
    return(
        <div className="w-fullh-full justify-center grid grid-cols-3 gap-y-6 gap-2 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 relative">

        {data.splice((Page-1)*6,Page*6).map((product) => (
          Favs.includes(product.id) ? 
          <ProductCard key={product.id} favs={true}  data={product} Style={{height:"fit-content"}}>
            <Image width={400} height={400} loading="lazy" src={product.imagepath} alt="" className="w-full object-contain"/>
          </ProductCard>:
          <ProductCard key={product.id} favs={false}  data={product} Style={{height:"fit-content"}}>
            <Image width={400} height={400} loading="lazy" src={product.imagepath} alt="" className="w-full object-contain"/>
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
  
  async function MainSection ({page}:{page:string}){
    const Products = await getProducts();
    const CalculatedPages = Math.ceil(Products.length/6);
      return(
        <div className=" w-full h-fit flex justify-center items-center xs:p-[5%] sm:p-[2%]  ">
          <div className="w-[95%] h-full flex justify-between ">
          <Filters/>
          <div className="w-[75%] h-full flex justify-center flex-col items-center">
          <ProductContainer data={Products} page={page}/>
          <PageSwitch page={page} CalculatedPages={CalculatedPages}/>
          </div>
          </div>
    
        </div>
      )
    }




