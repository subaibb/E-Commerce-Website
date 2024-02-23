import Arrows from '../../public/Arrow.svg';
import { useState } from 'react';
import All_Orders from './all-orders';



export default  function Arrow(): JSX.Element {

 const  [shown, setShown] = useState(false);
 const  [IsTransition, SetTransition] = useState(false);


  const handleClick = () => {
    setShown(prevState => !prevState);
    SetTransition(false);
  }
  const handleOut = () => {
    SetTransition(true);
    setTimeout(() => {
      setShown(prevState => !prevState);
    }, 200); 
  }




    return (
        <>
        <div onClick={handleClick} className=' absolute w-fit h-fit flex justify-center align-middle left-[85vw] top-[34.3vh] cursor-pointer animate-[500ms_fadeIn_forwards]'>
        <label  className='text-[#904EFE] text-[14px] cursor-pointer'>View all</label>
        <img  src={Arrows} className='h-[24px] w-[24px] relative left-[0.2vw] top-[-0.15vh]'/>
      </div>    
      <div onClick={handleClick}   className=' absolute w-fit h-fit flex justify-center align-middle left-[82.8vw] top-[70.3vh] cursor-pointer animate-[500ms_fadeIn_forwards]'>
        <label  className='text-[#904EFE] text-[14px] cursor-pointer'>View all</label>
        <img  src={Arrows} className='h-[24px] w-[24px] relative left-[0.2vw] top-[-0.15vh]'/>
      </div>
      <div className={`${IsTransition ? 'fade-out' : 'fade-in'}`}> 
      {shown && <All_Orders />}
      {shown && <div onClick={handleOut} className="h-[100%] w-[100%] absolute top-0 left-0 bg-[#00000025] z-[999] animate-[200ms_fadeIn_forwards]"/>}
      </div>
        </>     
    )       
  }