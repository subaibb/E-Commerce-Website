

export function SideBar():JSX.Element{
    return (
        <div className="h-full w-[25%]  flex justify-between items-center  m-auto">
        <div className="flex  h-[70%]">
            <div className="flex flex-col h-full  justify-center items-center" >

                <div className="w-20 h-full Cart-img cursor-pointer"/>
                <label className="text-[12px] font-medium">Cart</label>
                </div>
                <div className="flex flex-col h-full  justify-center items-center cursor-pointer">
                <div className="w-20 h-full Heart-img"/>
                <label className="text-[12px] font-medium ">Wishlist</label>
                </div>


            </div>
        <div className="w-14 h-14 Portait-img rounded-[50%] relative"/>
        </div>
    )
}