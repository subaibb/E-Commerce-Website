import Data_Label from "./datalabel"
import { useQuery } from '@tanstack/react-query';
const { ipcRenderer } = require('electron')



const fetchUsers = async () => {
  
  return ipcRenderer.invoke('fetch-orders');
};

export default  function Dataholder(): JSX.Element {


  const getOrders =  useQuery({queryKey: ["orders"], queryFn: fetchUsers});
 
  
  
    if (getOrders.isLoading) return <div>Loading...</div>;
    if (getOrders.isError) return <div>Error:</div>;


    return (
      <>
    
      <div className='DataCarrier w-[71vw] max-h-[21vh] h-[21vh] absolute top-[7vh] flex flex-col overflow-auto'>
        {getOrders.data.map((order:any) => (
          <Data_Label data={order} key={order.id} />
        ))}

      </div>
      

      </>     
     
      
    )   
  }