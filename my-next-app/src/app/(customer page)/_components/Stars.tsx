


export function Stars ():JSX.Element{
    return(
        <div className="flex">
            <StarYellow/>
            <StarYellow/>
            <StarYellow/>
            <StarGray/>
            <StarGray/>
        </div>

    )
}


function StarGray():JSX.Element{
    return(
        <div className="w-[15px] h-[15px] StarsGray ">

        </div>
    )
}

function StarYellow():JSX.Element{
    return(
        <div className="w-[15px] h-[15px] StarsYellow ">

        </div>
    )
}