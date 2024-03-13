import OrderTable from "./OrderTable"
import StatusHolder from "./StatusHolder"


export default function  BottomBar (): JSX.Element {

    return (
        <div className=" relative w-[78.9vw] h-[36.1vh]  mt-auto flex">
            <OrderTable />
            <StatusHolder />
        </div>
    )
    
}