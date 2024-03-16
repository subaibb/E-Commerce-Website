import {motion} from 'framer-motion';
import DataLabels from './DataLabels';
import { useQuery } from '@tanstack/react-query';
const {ipcRenderer} = require('electron');



export default function OrderTable({id}): JSX.Element {


    
    const GetCompanyOrders = useQuery({queryKey: ['CompanyOrdersFetching',id], queryFn: async () => {
        return await ipcRenderer.invoke('fetch-company-orders',id);
    }});
    if (GetCompanyOrders.isLoading) return <div></div>
    if (GetCompanyOrders.isError) return <div>Error</div>

    return (
        <>
        <motion.div className="bg-default h-full w-[57.3vw] rounded-2xl shadow-[2px_4px_4px_#68B6FF0D] mr-auto flex flex-col"
        initial={{scale:0.9, opacity:0}}
        animate={{scale:1, opacity:1}}
        transition={{duration:0.2,delay:0.2}}>
            <TopLabels/>
            <DataHolder data={GetCompanyOrders.data?.Orders}/>
        </motion.div>
        </>
    )
}

function TopLabels ():JSX.Element{

    return(
        <div className='topLabels relative w-[95%] h-[4vh] m-auto ml-8 mb-1 flex  '>
        <label>Customer</label>
        <label>Unit Price</label>
        <label>Amount</label>
        <label>Total</label>
        <label>Fabric</label>
        <label>Date</label>
        <label>Type</label>
        <label>Status</label>
        <label>Action</label>
        </div>

    )
}

function DataHolder ({data}):JSX.Element{

    return(
        <div className='relative w-[96%] h-[26.8vh] m-auto ml-8 flex flex-col mt-1 overflow-auto ScrollTable '>
        {data.map((order,index)=>{
            return <DataLabels key={index} data={order}/>
        })}
        </div>

    )
}