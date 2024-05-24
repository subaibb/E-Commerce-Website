




export function Totals({total}:{total:number}):JSX.Element{

    let shipping = (total/10).toFixed(2);
    let Total = total + parseFloat(shipping);

    return(
        <div className="h-full w-[90%] flex flex-col items-center space-y-3 ">

            <div className="w-full h-[1px] bg-[#B5A4A3] relative mb-2 mt-4"/>


             <div className="w-full h-[20%] flex justify-between items-center">
             <h3 className="text-base font-wixMade text-textprimary ">Subtotal</h3>

             <h3 className="text-base font-wixMade text-textprimary">${total.toFixed(2)}</h3>    

            </div>

            <div className="w-full h-[20%] flex justify-between items-center">
            <p className="text-base font-wixMade text-textprimary w-full">Shipping and taxes</p>
            <p className="text-base font-wixMade text-textprimary">${shipping}</p>
            </div>

            <div className="w-full h-[20%] flex justify-between items-center">
            <p className="text-lg font-semibold font-wixMade text-textprimary w-full">Total</p>
            <p className=" font-wixMade text-lg font-semibold text-textprimary">${(Total.toFixed(2))}</p>
            </div>
            
            
            

        </div>

    )
}
