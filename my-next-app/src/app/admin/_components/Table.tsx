import { ReactNode } from "react"




export function Table({children,extras}:{children:ReactNode,extras?:ReactNode}):JSX.Element{
    return(
        <div className="w-full h-[80vh]  flex-col flex justify-evenly items-center">
            <div className="w-[95%] h-[7vh]  flex items-center justify-end">
                {extras}
            </div>
                

            <div className="w-[95%] h-[85%] bg-[#eadecf] rounded-2xl" >

               {children}

            </div>

        </div>
    )
}

export function TableHeader({children}:{children:ReactNode}):JSX.Element{

    return(
        <div className="w-full h-[5vh] flex justify-center items-center">
            <div className="w-[95%] h-full flex justify-between items-center">
            {children}
            </div>
            
        </div>
    )

}

export function Label({children}:{children:ReactNode}):JSX.Element{
    return(
        <div className="w-[15%] h-full  flex justify-center items-center">
            <h2 className="text-base font-wixMade font-semibold text-textprimary">{children}</h2>
        </div>
    )
}
export function TableRow({children}:{children:ReactNode}):JSX.Element{
    return(
        <>
        <div className="w-full min-h-[5vh] flex justify-between items-center">
            {children}
        </div>
        <div className="w-full min-h-[1px] bg-[#cdbdb5]"/>
        </>
    )
}

export function TableData({children}:{children:ReactNode}):JSX.Element{
    return(
        <div className="w-full h-[90%] flex justify-center items-center TableData overflow-auto">
             <div className="w-[96%] h-[98%] flex flex-col justify-start items-start ">
            {children}
            </div>

        </div>
       
    )
}

export function Seperator():JSX.Element{
    return(
        <div className="w-full flex justify-center items-center">
                <div className="w-[95%] bg-textprimary h-[1px] mb-1 mt-1"/>
        </div>
       
    )
}

export function DataCell({children}:{children:ReactNode}):JSX.Element{

    return(
      
        <div className="w-[15%] h-full  flex justify-center items-center">
            <h2 className="text-base font-wixMade text-textprimary flex justify-start items-start">{children}</h2>
        </div>
        
       
    )
}