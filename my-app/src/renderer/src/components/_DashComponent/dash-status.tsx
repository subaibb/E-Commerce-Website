import Dollar from '../../public/Dollar.svg';
import completed from '../../public/Com.svg';
import Time from '../../public/Time.svg';
import Arrows from './arrow-status';


import { useQuery } from '@tanstack/react-query';
const { ipcRenderer } = require('electron')


const fetchStatus = async () => {
  return await ipcRenderer.invoke('fetch-status');
};


export default  function Versions(): JSX.Element {

  const getStatus =  useQuery({queryKey: ["Status"], queryFn: fetchStatus});

  if (getStatus.isLoading) return <div>Loading...</div>;
  if (getStatus.isError) return <div>Error:</div>;

  const priceString = getStatus.data[0].total_revenue.toString();
  const formattedPrice = `$${priceString
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replace(/(\.\d*)$/, '<span class="decimal">$1</span>')}`;
  
    return (
      <div className="w-[73.9vw] h-[13.7vh] absolute left-[16.2vw] top-[14.7vh] flex">
        
        <div className="Stats mr-auto">

          <div className="Stat-Pic bg-[#EBF0FF] " style={{backgroundImage: `url(${completed})`}}/>
          <div  className='absolute h-[4vh] w-[fit] flex top-[4vh] left-[8.8vw]'>
          <label className="label-top">{getStatus.data[0].total_orders.toString()}</label>
          <Arrows img="up" percentage="12%"/>
          </div>
          
          <label className="label-bottom">Total Orders</label>
          
        </div>

        <div className="Stats ml-auto mr-auto ">
        <div className="Stat-Pic bg-[#FFF8E9]" style={{backgroundImage: `url(${Time})`}}/> 
        <div className='absolute h-[4vh] w-[fit] flex top-[4vh] left-[8.8vw]'>
        <label className="label-top">{getStatus.data[0].total_pending.toString()}</label>
        <Arrows img="down" percentage="35%"/>
        </div>
        
        <label className="label-bottom">Pending</label>
        

        </div>
       

        <div className="Stats ml-auto">

          
          <div className="Stat-Pic bg-[#FFEEF5]" style={{backgroundImage: `url(${Dollar})`}}/> 
          
          <div className='absolute h-[4vh] w-[fit] flex top-[4vh] left-[8.3vw]'>

          <label className="label-top text-3xl" dangerouslySetInnerHTML=  {{ __html: formattedPrice }}></label>
          <Arrows img="up" percentage="16%"/>
          </div>
          
          <label className="label-bottom">Revenue</label>
          
        </div>
    
      </div>
    )
  }