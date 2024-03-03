
import Arrow from '../../public/dropDown.svg';
import priceTag from '../../public/priceTag.svg';
import calendar from '../../public/Calendar.svg';
import filters from '../../public/Filters.svg';
import {motion,AnimatePresence } from 'framer-motion';
import { useState,useRef,useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
const { ipcRenderer } = require('electron');

export default function dropDown({label,img,id}): JSX.Element {



  const [dropDown, setDropDown] = useState(false);
  const [buttonId, setButtonId] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const handleButtonClick = (buttonId) => {
    setButtonId(buttonId);
    setDropDown((prevId) => (prevId === buttonId ? null : buttonId));
  };


  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    
    return (
    <>
    <button id={id} onClick={()=>{handleButtonClick(id)}} className=" dropDown w-[8.7vw] h-[4.8vh] border-2 border-[#EAEAEA] relative m-auto rounded-[12px] transition duration-150">
        <img src={img = img === 1 ? priceTag : img === 2 ? calendar : filters} className=' absolute h-[26px] w-[26px] top-2 left-3'  />
        <label className=" font-semibold absolute top-3 left-[2.6vw] ">{label}</label>
            
        <img src={Arrow} className='absolute h-[22px] w-[17px] left-[6.8vw] top-3'/>
    </button>
    <AnimatePresence>
   {dropDown && 
   
   <motion.div ref={ref}
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.07}}
   >
    {buttonId === 1 ? <DropDownList_1 setDropDown={setDropDown}/> : buttonId===2? <DropDownList_2 setDropDown={setDropDown} />: <DropDownList_3 setDropDown={setDropDown}/>}
   </motion.div>
    
   }
    </AnimatePresence>
    </>
    
    ) 
}

const fetchStatus = async () => {
  return await ipcRenderer.invoke('all-orders',);
}


function DropDownList_1({setDropDown}): JSX.Element {

  const ChooseStatus =useQuery({queryKey: ["Status-Query"], queryFn: fetchStatus});

  return (
  <>
  <ul className="ul-list-1">
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Default</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Name</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Company</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Total</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Fabric</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Type</li>
      


  </ul>
  </>
  
  ) 
}

function DropDownList_2({setDropDown}): JSX.Element {

  return (
  <>
  <ul className="ul-list-2">
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Default</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Paid</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Pending</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Cancelled</li>
  </ul>
  </>
  
  ) 
}

function DropDownList_3({setDropDown}): JSX.Element {

  return (
  <>
  <ul className="ul-list-3">
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>Default</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>6 months ago</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>a year ago</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate))}}>2 years ago</li>
  </ul>
  </>
  
  ) 
}
