import { Header } from "@/app/shopall/_components/Header";
import { MainPic } from "./_components/MainPic";
import { Stars,ReviewLabel } from "@/app/shopall/_components/Stars";
import { PurchaseButton,FavoriteButton } from "../[id]/_components/PurchaseButton";
import { BottomDetail } from "./_components/Accordiations";
import { ProductCard } from "@/app/shopall/_components/ProductCard";
import { Contact } from "@/app/(customer page)/_components/Contact";
import { RatingSection } from "./_components/RatingSection";
import { Dropdown } from "./_components/Dropdown";
import { Review,ReviewsCarrier,Separator } from "./_components/Review";
import { LoginWarning } from '@/app/components/LoginWarning';
import db from "@/db/db";

type ProductData = {
    id: string;
    name: string;
    price: number;
    imagepath: string;
    createdAt: Date;
    updatedAt: Date;
    available: boolean;
    description: string;
    rating: number;
    accrdation: {
        name: string;
        description: string;
                }[];
} | null


type RelatedProductsData = {
    id: string;
    name: string;
    price: number;
    imagepath: string;
    rating: number;
}[];

const getRelatedProducts = async(id:string)=>{

    return db.product.findMany({
        select:{
            id:true,
            name:true,
            price:true,
            imagepath:true,
            rating:true,
        
        },
        where:{
           id:{
            not:id
            }
        }
});
}

const getProduct = async(id:string)=>{

    return db.product.findUnique({

        select:{
            id:true,
            name:true,
            price:true,
            imagepath:true,
            rating:true,
            createdAt:true,
            updatedAt:true,
            available:true,
            description:true,
            accrdation:{
                select:{
                    name:true,
                    description:true
                }
            }
        },
        
        where:{
            id:id
        }
    })
}

export default function ProductPage({ params }: { params: { id: string } }) {
    
    if (!params.id) return <div>404</div>;
  return (
    <div className="w-full h-full">
        <LoginWarning/>
        <Header/>
        <MainSection id={params.id} />
        <RelatedProducts id={params.id}/>
        <Reviews/>
        <Contact/>
    </div>
  );
}

async function MainSection({id}:{id:string}){
   

    const Product:ProductData= await getProduct(id);
    return(
        <div className="w-full sm:h-[75vh] xs:h-[135vh] sm:flex sm:flex-row sm:justify-center items-center xs:flex-col xs:flex xs:justify-center relative ">
                <ProductContainer imagePath={Product?.imagepath} name={Product?.name}/>
                <ProductDetails data={Product}/>
        </div>
    )
}

function ProductContainer({imagePath,name}:{imagePath?:string,name?:string}):JSX.Element{
        
    return(
        <div className=" sm:w-[45%] h-fit flex justify-center items-center xs:w-[95%] ">
        <MainPic name={name}>
        <img loading="lazy" src={
            imagePath
        } alt="" />
        </MainPic>
        </div>
        
    )
}

function ProductDetails({data}:{data:ProductData}):JSX.Element{
    return(
        <div className="sm:w-[45%] sm:h-[95%] flex-col justify-center items-center xs:w-[95%] xs:h-[50%]">
 
            <TopDetail id={idFormatter(data?.id)} name={data?.name} />
            <MiddleDetail description={data?.description} price={data?.price}/>
            <BottomDetail data={data?.accrdation}/>
        </div>
    )
}



function TopDetail({id,name}:{id?:string,name?:string}):JSX.Element{
    return(

        <div className="w-[90%] h-[18%] flex justify-start flex-col items-center  ">

        <div className="w-full h-[30%] flex justify-end items-center">
            <p className="text-sm text-[#8A8A8A] ">{id}</p>
        </div>
        <div className=" h-[10%] w-full flex justify-start items-center sm:mb-4 xs:mb-1">
            <p className="sm:text-2xl lg:text-3xl text-thick xs:text-xl">{name}</p>
        </div>

        <div className=" w-full flex justify-start items-center">
        <Stars rating={3}>
            <ReviewLabel ReviewCount={3}/>
        </Stars>
        </div>
       
        </div>

    )
}

function MiddleDetail({description,price}:{description?:string,price?:number}):JSX.Element{
    return(
        <div className="w-[90%] sm:h-[35%] flex flex-col justify-start items-center xs:h-[30%]">
            <p className="text-[#8A8A8A] text-sm w-full xs:hidden sm:flex ">{description}</p>

                
        <h2 className="w-full h-[30%] flex justify-start items-center text-4xl text-thick font-wixMade font-medium mb-4">
            ${price}
        </h2>

        <div className="flex l w-full sm:h-[22%] xs:h-[90%] justify-between">
        <PurchaseButton variant={2}>
            Add to Cart
        </PurchaseButton>
        <PurchaseButton variant={1}>
            Buy Now
        </PurchaseButton>
        <FavoriteButton variant={1}/>
        </div>
      
        </div>
    )
}

 async function RelatedProducts({id}:{id:string}){

    const RelatedProducts:RelatedProductsData = await getRelatedProducts(id);

    return(
        <div className="w-full h-fit flex justify-center items-center flex-col relative ">

            <h1 className="text-2xl h-[7vh] w-fit text-textprimary">Related Products</h1>

            <div className="w-[95%] h-[90%] flex justify-center items-center ">
                <div className="w-[85%] h-[90%] gap-2 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                {RelatedProducts.map((product) => (
                    <ProductCard key={product.id} data={product} Style={{height:"fit-content"}}>
                        <img loading="lazy" src={product.imagepath} alt="" className="w-full object-contain"/>
                    </ProductCard>
                ))}

                </div>
            </div>
        </div>
    )
}

function Reviews():JSX.Element{
    return(
        <div className="w-full lg:h-[90vh] md:h-[95vh] sm:h-[120vh] xs:h-[135vh] flex justify-center items-center flex-col  ">
            <h1 className="text-2xl h-[3vh] w-[95%] text-textprimary">Reviews</h1>
            <div className="w-[95%] h-[90%] md:flex md:flex-row xs:flex xs:flex-col-reverse justify-between items-center ">
                <ReviewSection/>
                <ExtraWidget/>
            </div>
        </div>
    )
}

function ReviewSection():JSX.Element{
    return(
        <div className=" lg:w-[74%] xl:w-[74%] md:w-[70%] xs:w-[95%] h-[90%] flex flex-col items-center ">
            <Dropdown/>
            <ReviewsCarrier>
                <Review/>
                <Separator/>
                <Review/>
                <Separator/>
                <Review/>
                <Separator/>
                <Review/>
                <Separator/>
            </ReviewsCarrier>
        </div>  
    )
}

function ExtraWidget():JSX.Element{
    return(
        <div className=" xl:w-[19%] md:w-[24%] xs:w-full h-[90%] md:flex md:flex-col md:justify-start xs:justify-center items-center">
            <RatingSection/>
        </div>  
    )
}


function idFormatter(id?:string):string | undefined{
    return id?.slice(0,9).toUpperCase() 
}




