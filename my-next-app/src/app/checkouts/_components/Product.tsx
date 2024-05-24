import cn from "classnames";
import { CSSProperties } from "react";



type dataProps = {
    quantity: number;
    products: {
        imagepath: string;
        name: string;
        id: string;
        price: number;
        rating: number;
    }[];
}


export function Product(
    {data,Style}:{data:dataProps,Style?:CSSProperties}
    
):JSX.Element{  

    return(
        
        <div className="w-[90%] h-fit flex space-x-4 items-center justify-start ">


        <ImageHolder Style={Style} quantity={data.quantity} imagepath={data.products[0].imagepath}/>
        <div className="w-[80%] h-[6vh] flex justify-between items-start">
            <h3 className="text-textprimary">{data.products[0].name}</h3>
            <h2 className=" font-wixMade">${data.products[0].price}</h2>
        </div>
        </div>      
       
    )
}

function ImageHolder({imagepath,quantity,Style}:{imagepath:string,quantity:number,Style?:CSSProperties}):JSX.Element{
    return(
        <div className="w-fit h-fit bg-transparent flex flex-col justify-end items-end ">
            <Notifaction count={quantity}/>
            <img style={Style} src={imagepath} alt="product" className="w-[100x] h-[100px] bg-productBackground border-[1px] border-solid border-textprimary "/>
        </div>
    )
}


function Notifaction({count}:{count:number}):JSX.Element{

    return(
        <span className={cn('font-wixMade relative top-2 left-2 bg-[#FAC303] rounded-full p-[2px] pl-2 pr-2 flex justify-center items-center text-xs text-textprimary',{
            'opacity-0': count === 0
        })}>{count}</span>   
    )
}