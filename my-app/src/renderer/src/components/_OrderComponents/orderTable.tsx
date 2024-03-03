import TopLabels from './topLabels';
import DataLabels from './dataLabels';
import { useQuery } from '@tanstack/react-query';
const { ipcRenderer } = require('electron')

interface Order {
    id: number;
    user_name: string;
    company_name: string;
    amount: number;
    price: number;
    total_price: number;
    createdAt: string;
    status: string;
    unit: string;
  }
  

const fetchOrders = async () => {
    return await ipcRenderer.invoke('all-orders',1);
}





export default function orderTable({opacity,scale}): JSX.Element {

    





    const getOrders = useQuery({queryKey: ["allOrders"], queryFn: fetchOrders});

    if (getOrders.isLoading) return <div>Loading...</div>;
    if (getOrders.isError) return <div>Error:</div>;
    
    return (
    <>
    <div style={{opacity:opacity,transform: `scale(${scale})`}} className="w-[76.3vw] h-[66vh] absolute bg-default left-[2.3vw] top-[36vh] rounded-[14px] shadow-[2px_4px_4px_#68B6FF0D] animate-[400ms_fadeInTable_forwards] flex flex-col">
        <TopLabels/>

        <div className='topLabels w-[72vw] left-[2.1vw]  h-[55vh] absolute top-[8vh] flex flex-col'>
            
        {getOrders.data.map((order:Order) => (
          <DataLabels data={order} key={order.id}/>
        ))}
            

        </div>  



    </div>
    </>
    
    ) 
}