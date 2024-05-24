
import Image from "next/image";
import { CartItem } from "./CartItem";

import { $Enums } from "@prisma/client";

//get user Orders



type OrderData = {
        id: string;
        createdAt: Date;    
        status: $Enums.OrderStatus
        total: number;
        products: {
            id: string;
            name: string;
            price: number;
            imagepath: string;
            rating: number;
        }[];

        _count: {
            products: number;
        };
}

type ProductData = {
    
        id: string;
        name: string;
        price: number;
        imagepath: string;
        rating: number;
};

//get Order total 




export async function Order({data}:{data:OrderData}){
    
    return(
        <div className="w-[95%] h-fit flex flex-col items-center">
        <OrderHeader data={data}/>
        {
            data.products.map((product)=>(
                <OrderItem key={product.id} data={product}/>
            ))
        }
        <div className="w-[95%] min-h-[1px] bg-textprimary mt-2 mb-2"/>
        </div>
    )
}

 function OrderHeader({data}:{data:OrderData}):JSX.Element{
    const date = new Date(data.createdAt);
    const formattedDate = date.toDateString();
    let shipping = (data.total/10).toFixed(2);
    let Total = data.total + parseFloat(shipping);
    return(
        <div className="w-[95%] bg-[#DDD7CE] h-[6vh] flex items-start justify-between">
            
            <div className="w-[20%] h-[80%] flex flex-col justify-evenly items-center">
                <h3 className="sm:text-xs xs:text-[10px] font-wixMade text-textprimary font-medium">Order Placed</h3>
                <h4 className="text-sm font-wixMade text-textprimary font-medium">{formattedDate}</h4>
            </div>

            <div className="w-[20%] h-[80%] flex flex-col justify-evenly items-center">
                <h3 className=" sm:text-xs xs:text-[10px] font-wixMade text-textprimary font-medium">Status</h3>
                <h4 className="text-sm font-wixMade text-textprimary font-medium">{data.status}</h4>
            </div>

            <div className="w-[20%] h-[80%] flex flex-col justify-evenly items-center">
                <h3 className=" sm:text-xs xs:text-[10px] font-wixMade text-textprimary font-medium">Items</h3>
                <h4 className="text-sm font-wixMade text-textprimary font-medium">{data._count.products}</h4>
            </div>

            <div className="w-[20%] h-[80%] flex flex-col justify-evenly items-center">
                <h3 className="sm:text-xs xs:text-[10px] font-wixMade text-textprimary font-medium">Total</h3>
                <h4 className="text-sm font-wixMade text-textprimary font-medium">${Total.toFixed(2)}</h4>
            </div>

            
        </div>
    )
}

 function OrderItem({data}:{data:ProductData}):JSX.Element{
    return(
        <div className="w-[95%] h-fit flex items-center justify-between">
            <CartItem delay={0} TypeForDelete="Cart" data={data}>
                <Image width={400} height={400} src={data.imagepath} alt="product" className="sm:w-[12%] xs:w-[60%] xs:mt-4 sm:mt-1 bg-productBackground"/>
            </CartItem>
        </div>
    )
}

