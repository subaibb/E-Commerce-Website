import cn from "classnames";




export function Product():JSX.Element{  



    return(
        
        <div className="w-[90%] h-fit flex space-x-4 items-center justify-start ">


        <ImageHolder imagepath="/Hoodie.png"/>
        <div className="w-[80%] h-[6vh] flex justify-between items-start">
            <h3 className="text-textprimary">Calbin Carbens Palestinain Hoodie</h3>
            <h2>$25</h2>
        </div>
        </div>      
       
    )
}

function ImageHolder({imagepath}:{imagepath:string}):JSX.Element{
    return(
        <div className="w-fit h-fit bg-transparent flex flex-col justify-end items-end ">
            <Notifaction count={12}/>
            <img src={imagepath} alt="product" className="w-[100x] h-[100px] bg-productBackground border-[1px] border-solid border-textprimary "/>
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