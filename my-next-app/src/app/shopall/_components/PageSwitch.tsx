import Image from "next/image"
import Link from "next/link"
import { CSSProperties, ReactNode } from "react"



export function PageSwitch({page,CalculatedPages}:{page:string,CalculatedPages:number}):JSX.Element{
    const currentPage = parseInt(page)
    if (CalculatedPages===0) return(<></>)

    return(
      
        <div className="w-1/2 h-[8vh]  flex justify-center items-center">
            <div className="w-fit h-[80%]  flex space-x-6 items-center">
                <Element Style={{
                    pointerEvents:currentPage===1 ? "none" : "auto",
                    opacity:currentPage===1 ? 0.5 : 1,
                    marginLeft:"3px"
                }} currentPage={currentPage-1}>
                <Image width={4} height={4} src="/SmallArrow.svg" alt="Previous" className="w-4 h-4 rotate-180 mr-1" />
                    <p className="text-textprimary">Previous</p>
                    
                </Element>
               {
                Array.from({length:CalculatedPages},(_,i)=>(
                    <Element currentPage={i+1} key={i}>
                        <p className={i+1===currentPage ? "text-textscondary" : "text-textprimary"}>{i+1}</p>
                    </Element>
                ))
               }

                <Element Style={{
                    pointerEvents:currentPage===CalculatedPages ? "none" : "auto",
                    opacity:currentPage===CalculatedPages ? 0.5 : 1,
                    marginRight:"3px"
                }} currentPage={currentPage+1}>
                
                    <p className="text-textprimary">Next</p>
                    <Image width={4} height={4}  src="/SmallArrow.svg" alt="Previous" className="w-4 h-4 ml-1" />
                </Element>
            </div>
        </div> 
    )
}


function Element({children,currentPage,Style}:{children:ReactNode,currentPage:number,Style?:CSSProperties}):JSX.Element{
    return(
      <Link style={Style} href={`/shopall/${currentPage}`} className="flex justify-center items-center">
            {children}
    </Link>

    )
}
