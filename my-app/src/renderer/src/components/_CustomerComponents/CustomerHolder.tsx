import CustomerLabel from './CustomerLabel';
import { useQuery } from '@tanstack/react-query';
import { useContext,useState } from 'react';
import { PageContext } from '../../Customers';
import SearchBar from './../_OrderComponents/searchbar';
const { ipcRenderer } = require('electron');

export default function CustomerHolder(): JSX.Element {
    const [Customers, setCustomers] = useState([]);
    const { Page } = useContext(PageContext);

    const CustomerData = useQuery({queryKey:['CustomerData'],queryFn:async () => {
        const result = ipcRenderer.invoke('fetch-customers');
        return result;
    }});
    if (CustomerData.isLoading) return <div>Loading...</div>;
    if (CustomerData.isError) return <div>Error: Unable to fetch customers</div>;

    
    return (
        <>  
        <div className='w-fit h-fit absolute left-[75vw] top-[13vh]'>
        <SearchBar data={CustomerData.data} setOrders={setCustomers} />
        </div>
        <div className=" absolute w-[78.8vw] h-[72vh] top-[20vh] left-[14.6vw] grid grid-cols-4 gap-10">
                
            {Customers.length !== 0 && Customers.slice((Page-1)*8,Page*8).map((customer,index) => (
                <CustomerLabel key={index} delay={index*0.1} customer={customer}/>
            ))}

            
        </div>
        </>
    )
}