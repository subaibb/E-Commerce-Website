"use client";
import { usePathname } from "next/navigation"

export function Paths ():JSX.Element{

    let SplitPath = [""];
    const pathname = usePathname();
    SplitPath = pathname.split('/');
    
    Mapper({SplitPath});
    return(
        <div className="w-[15%] h-1/4 flex justify-start items-center">
            <div className="flex justify-center items-center">
            <a href="/">
            <p  className="text-textprimary lg:text-sm xs:text-[8px] sm:text-[10px]">{SplitPath[0]}</p>
            </a>
            </div>
           {
                    
                
                SplitPath.splice(1,1).map((path,index)=>(
                    <div key={index} className="flex  justify-center items-center">
                    <img src="/SmallArrow.svg" alt="Arrow" className="lg:w-4 lg:h-4 mr-2 ml-2 m:w-3 m:h-3 xs:w-2 xs:h-2" key={index+"1"}/>
                    <p  className="text-textprimary lg:text-sm xs:text-[8px] sm:text-[10px]">{path}</p>
                    </div>
                 
                     
                ))
           }
        </div>
    )

}

function Mapper ({SplitPath}:{SplitPath:string[]}){

    if (SplitPath[0] === ""){
        SplitPath[0] = "Home";
    }

    if (SplitPath[1] === "shopall"){
        SplitPath[1] = "All Products";
    }

    if (SplitPath[1] === "aboutus"){
        SplitPath[1] = "About Us";
    }

    if (SplitPath[1] === "soaps"){
        SplitPath[1] = "Soaps";
    }

}