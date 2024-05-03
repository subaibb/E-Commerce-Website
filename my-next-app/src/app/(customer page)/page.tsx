
import { Header } from "./_components/Header";
import { LandingImage } from "./_components/LandingImage";
import { ProductCard,AnimatedLabel} from "./_components/ProductCard";
import { FooterLink } from "./_components/FooterLink";
import { Contact } from "./_components/Contact";

export default function Home() {



  return (
    <>

    <MainSection/>
    <ProductSection/>
    <Footer/>
    <Contact/>  
    
    </>
  );  
}


function MainSection ():JSX.Element{

  return(
    <div className=" w-full h-[90vh] flex justify-between">
    <Header/> 
    <LandingImage/>
    </div>
  )
}

function ProductSection():JSX.Element{

  return(

    <div className=" w-full h-fit p-[2%] bg-[#C1C2AD] flex justify-center items-center flex-col">

      <div className="w-[92.2%] h-[15%] flex justify-between items-center mb-[2%]">
      <AnimatedLabel strength="10" className=" text-thick relative w-fit sm:text-base md:text-2xl lg:text-4xl">
      Our Favorites
      </AnimatedLabel>

      <AnimatedLabel strength="5" className=" text-thick font-wixMade relative sm:text-[12px] md:text-lg lg:text-xl sm:text-sm xs:text-[8px]">
     Embrace the Palestinian Culture with our best sellers
      </AnimatedLabel>
      </div>
   
    <div className="w-[92.2%] h-[80%] relative flex justify-between">
      <ProductCard label="6Oz. Olive Oil" price="19.99">
        <img src="/Oil.png" alt="Olive Oil" className="w-[100%]"/>
      </ProductCard>

      <ProductCard label="Sage Kick Back Hoodie" price="79.99">
        <img src="/Hoodie.png" alt="Lavender Oil" className="w-[100%]"/>
      </ProductCard>

      <ProductCard label="Classic Kuffiyah" price="15.99">
        <img src="/Kufiyah.png" alt="Lavender Oil" className="w-[100%]"/>
      </ProductCard>
    </div>
    </div>
  )
}

function Footer():JSX.Element{
  return(

    <div className="w-full h-[40vw] flex justify-center items-center"> 

        <div className="w-[90%] h-[50%] justify-center items-center flex flex-col">

        <AnimatedLabel strength="20" className=" text-textprimary sm:text-xl font-wixMade m-auto xs:text-xs">
        Introducing Our Latest Palestinian Inspired Collections
        </AnimatedLabel>

        <AnimatedLabel strength="20" className=" text-textprimary xl:text-5xl w-[60%] text-center sm:text-3xl m-auto xs:text-sm">
        Add a touch of Palestine to your home and wardrobe
        </AnimatedLabel>

        <FooterLink/>
          

        </div>
    </div>
)}

