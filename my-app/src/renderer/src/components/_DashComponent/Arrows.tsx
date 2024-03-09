import Arrows from '../../public/Arrow.svg';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState,useEffect } from 'react';
const { ipcRenderer } = require('electron');

const getCompany = async () => {
  return await ipcRenderer.invoke('fetch-company');
}



export default  function Arrow(): JSX.Element {

  const [Show , setShow] = useState(false);

  const Companies = useQuery({queryKey: ["Company"], queryFn: getCompany});
 
  useEffect(() => {
    if (Companies.isSuccess && Companies.data.length > 2) {
      setShow(true);
    }
  }, [Companies]); 
  

    return (
        <>
        <Link to={"/Orders"}>
        
        <div  className=' absolute w-fit h-fit flex justify-center align-middle left-[85vw] top-[34.3vh] cursor-pointer animate-[500ms_fadeIn_forwards]'>
        <label  className='text-[#904EFE] text-[14px] cursor-pointer'>View all</label>
        <img  src={Arrows} className='h-[24px] w-[24px] relative left-[0.2vw] top-[-0.15vh]'/>
      </div>  
      </Link>  

      {
       Show && <Link to={"/Stores"}>
       <div    className=' absolute w-fit h-fit flex justify-center align-middle left-[82.8vw] top-[70.3vh] cursor-pointer animate-[500ms_fadeIn_forwards]'>
         <label  className='text-[#904EFE] text-[14px] cursor-pointer'>View all</label>
         <img  src={Arrows} className='h-[24px] w-[24px] relative left-[0.2vw] top-[-0.15vh]'/>
       </div>
       </Link>
      }
      
        </>     
    )       
  }