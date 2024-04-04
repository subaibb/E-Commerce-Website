
import { Selector } from "./_components/Selector";
import { Header } from "./_components/Header";
import { Section } from "./_components/Section";
export default function Home() {
  return (
    <>


    <Header/>
    <div className="  w-[1746px] h-[47px] absolute left-1/2 -translate-x-1/2 top-[65%] flex justify-between">
      <div className="flex justify-between w-[50%]">
        
      <Selector>
        Seller
      </Selector>

      <Selector>
        Color
      </Selector>

      <Selector>
        Size
      </Selector>

      <Selector>
        Reviews
      </Selector>

      <Selector>
        Offers
      </Selector>

      </div>

      <div>
      <Selector>
        Sort By
      </Selector>
      </div>
    
    </div>
    <Sections/>
    </>
  );  
}

function Sections():JSX.Element{
  return(
    <div className="w-fit h-auto absolute left-1/2 -translate-x-1/2 top-[72%] ">
      <Section props={"Featured Sneakers"}/>  
      <Section props={"Headphones For You"}/>
    </div>
  )
}
