import { Header } from "@/app/shopall/_components/Header";
import { MainPic } from "./_components/MainPic";
import { Stars,ReviewLabel } from "@/app/shopall/_components/Stars";
import { PurchaseButton,FavoriteButton } from "../[id]/_components/PurchaseButton";
import { AccordionSection } from "./_components/Accordiations";
import { ProductCard } from "@/app/shopall/_components/ProductCard";
import { Contact } from "@/app/(customer page)/_components/Contact";
import { RatingSection } from "./_components/RatingSection";
import { Dropdown } from "./_components/Dropdown";
import { Review,ReviewsCarrier,Separator } from "./_components/Review";

export default function ProductPage() {
  return (
    <div className="w-full h-full">
        <Header/>
        <MainSection/>
        <RelatedProducts/>
        <Reviews/>
        <Contact/>
    </div>
  );
}

function MainSection():JSX.Element{
    return(
        <div className="w-full sm:h-[75vh] xs:h-[120vh] sm:flex sm:flex-row sm:justify-center items-center xs:flex-col xs:flex xs:justify-center ">
                <ProductContainer/>
                <ProductDetails/>

        </div>
    )
}

function ProductContainer():JSX.Element{

    return(
        <div className=" sm:w-[45%] h-fit flex justify-center items-center xs:w-[95%] ">
        <MainPic>
        <img src="/Oil.png" alt="" />
        </MainPic>
        </div>
        
    )
}

function ProductDetails():JSX.Element{

    return(
        <div className="sm:w-[45%] sm:h-[95%] flex-col justify-center items-center xs:w-[95%] xs:h-[50%]">
 
            <TopDetail/>
            <MiddleDetail/>
            <BottomDetail/>
        </div>
    )
}



function TopDetail():JSX.Element{
    return(

        <div className="w-[90%] h-[18%] flex justify-start flex-col items-center  ">

        <div className="w-full h-[30%] flex justify-end items-center">
            <p className="text-sm text-[#8A8A8A] ">LSKFEOWA1</p>
        </div>
        <div className=" h-[10%] w-full flex justify-start items-center sm:mb-4 xs:mb-1">
            <p className="sm:text-3xl text-thick xs:text-xl">6Oz. Olive Oil</p>
        </div>

        <div className=" w-full flex justify-start items-center">
        <Stars rating={3}>
            <ReviewLabel ReviewCount={3}/>
        </Stars>
        </div>
       
        </div>

    )
}

function MiddleDetail():JSX.Element{
    return(
        <div className="w-[90%] sm:h-[35%] flex flex-col justify-start items-center xs:h-[30%]">
            <p className="text-[#8A8A8A] text-sm w-full xs:hidden sm:flex ">
                Indulge in our luxurious olive oil product, crafted from the finest organic olives for intense hydration
                and a radiant glow. Pamper your skin with its lightweight formula, leaving it irresistibly soft and smooth.</p>

                
        <h2 className="w-full h-[30%] flex justify-start items-center text-4xl text-thick font-wixMade font-medium mb-4">
            $15.00
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

function BottomDetail():JSX.Element{
    return(
        <div className="w-[90%] h-[30%] flex justify-start items-center ">
            <AccordionSection/>
        </div>
    )
}

function RelatedProducts():JSX.Element{
    return(
        <div className="w-full h-fit flex justify-center items-center flex-col  ">

            <h1 className="text-2xl h-[7vh] w-fit text-textprimary">Related Products</h1>

            <div className="w-[95%] h-[90%] flex justify-center items-center ">
                <div className="w-[85%] h-[90%] grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                

                <ProductCard Style={{
                    width:"90%",
                    margin:"auto"
                }} label="6Oz. Olive Oil" price="19.99">
                <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
                </ProductCard>

                <ProductCard Style={{
                    width:"90%",
                    margin:"auto"
                }} label="6Oz. Olive Oil" price="19.99">
                <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
                </ProductCard>

                <ProductCard Style={{
                    width:"90%",
                    margin:"auto"
                }} label="6Oz. Olive Oil" price="19.99">
                <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
                </ProductCard>

                <ProductCard Style={{
                    width:"90%",
                    margin:"auto"
                }} label="6Oz. Olive Oil" price="19.99">
                <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
                </ProductCard>
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







