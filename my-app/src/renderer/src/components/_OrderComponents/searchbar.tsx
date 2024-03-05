import Search from './../../public/Search.svg';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseDebounce from './hooks/useDebounce';
const { ipcRenderer } = require('electron');
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
  return await ipcRenderer.invoke('all-orders');
}


const  searchBar: React.FC = () => {
  

  const [searchResults, setSearchResults] = useState<Order[]>([]);
 
  const debouncedSearchTerm = UseDebounce({value: searchResults, delay: 700});

  const { data: getOrdersData, isLoading, isError } = useQuery<Order[], Error>({queryKey: ['allOrders',debouncedSearchTerm], queryFn: fetchOrders});


  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    if (isLoading || isError) return;

    const results = getOrdersData?.filter(order =>
      Object.values(order).some(val => {
        if (typeof val === 'object' && val !== null) {
          // If the value is an object, check its nested properties
          return Object.values(val).some(nestedVal =>
            nestedVal?.toString().toLowerCase().includes(term)
          );
        }
        // Otherwise, check the top-level properties
        return val.toString().toLowerCase().includes(term);
      })
    );
    setSearchResults(results ?? []);
  };

 

    return (
    <>
      <div className="w-[18.6vw] h-[4vh] bg-[#eaeaea] rounded-[8px] absolute top-[3.2vh] left-[2vw]">
        <img src={Search} className='absolute h-7 w-7 top-1 left-1' />
        <input onChange={handleSearch}  className="bg-[#eaeaea] w-[16.2vw] h-[3.4vh] absolute top-[0.3vh] left-[1.96vw] focus:outline-none text-secondary " type="search" placeholder='Search anything...'  />

      </div> 
    </>
    
    ) 
   }

export default searchBar;