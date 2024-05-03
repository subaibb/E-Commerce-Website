"use client";
import { usePathname } from "next/navigation"
import { useIsSmallScreen } from "@/app/hooks/MediaQuery";
import Link from "next/link";
export function Paths ():JSX.Element{

    let SplitPath = [""];
    const pathname = usePathname();
    SplitPath = pathname.split('/');
    const {isSmallScreen} = useIsSmallScreen();
    Mapper({SplitPath});
    SplitPath = Mapper({SplitPath});
    return(
        <div style={{
            display: !isSmallScreen ? 'none' : 'flex'
        

        }} className="w-[15%] h-1/4 flex justify-start items-center">
            <div className="flex justify-center items-center">
            <a href="/">
            <p  className="text-textprimary lg:text-sm xs:text-[8px] sm:text-[10px]">{SplitPath[0]}</p>
            </a>
            </div>
           {
                    
                
                SplitPath.splice(1).map((path:string,index:number)=>(

                    <PathComponent key={index} SplitPath={SplitPath} index={index} path={path}/>
                     
                ))
           }
        </div>
    )

}

function Mapper ({SplitPath}:{SplitPath:string[]}){

    if(SplitPath[0]==""){
        SplitPath[0]="Home";
    }
    return SplitPath.map(word => word.charAt(0).toUpperCase() + word.slice(1));
}

function PathComponent({path,index,SplitPath}:{path:string,index:number,SplitPath:string[]}):JSX.Element{
    const pathname = usePathname();

    return(
        <Link href={`/${pathname.split('/').slice(1,index+2).join('/')}`}>
        <div key={index} className="flex  justify-center items-center">
        <img src="/SmallArrow.svg" alt="Arrow" className="lg:w-4 lg:h-4 mr-2 ml-2 m:w-3 m:h-3 xs:w-2 xs:h-2" key={index+"1"}/>
        <p style={{
            fontWeight: index==SplitPath.length? 'bold' : 'normal'
        }}  className="text-textprimary lg:text-sm xs:text-[8px] sm:text-[10px]">{path}</p>
        </div>
        </Link>
    )
}