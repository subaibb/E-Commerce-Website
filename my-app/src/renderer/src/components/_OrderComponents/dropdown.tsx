
import Arrow from '../../public/dropDown.svg';
import priceTag from '../../public/priceTag.svg';
import calendar from '../../public/Calendar.svg';
import filters from '../../public/Filters.svg';
import {motion,AnimatePresence } from 'framer-motion';
import { useState,useRef,useEffect } from 'react';
import { useMutation,useQueryClient } from '@tanstack/react-query';
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



function DropDownList_1({setDropDown}): JSX.Element {

  const [style, setStyles] = useState(null);



  const toggleStyle = (buttonId) => {
    setStyles(buttonId); // Set the clicked button as active
    // If there was a previously clicked button, reset its style
    if (style) {
      const buttonOld = document.getElementById(style);
      if (buttonOld) {
        buttonOld.style.backgroundColor = 'red'; // Replace 'defaultColor' with your default color
      }
    }

    // Toggle style for the clicked button
    const button = document.getElementById(buttonId);
    if (button) 
    {
        button.style.backgroundColor = button.style.backgroundColor === 'red' ? 'blue' : 'red'; // Toggle background color
    }
};


  const queryClient = useQueryClient();
  
  const Status = useMutation({
    mutationFn: async (id) => {
     
       await ipcRenderer.invoke('all-orders',id);
    },
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['allOrders']});
    }
  });
    
  const ChooseStatus = (id:any) => {
    try {
      Status.mutate(id);
    }
    catch (error) {
      console.error('Mutation failed:', error);
    }
  }
  

  return (
  <>
  <ul className="ul-list-1">
      <li id='list-1' onClick={()=>{setDropDown(pervstate=>(!pervstate)); ChooseStatus(1); toggleStyle('list-1')}}>Default</li>
      <li id='list-2' onClick={()=>{setDropDown(pervstate=>(!pervstate)); ChooseStatus(2); toggleStyle('list-2')}}>Name</li>
      <li id='list-3' onClick={()=>{setDropDown(pervstate=>(!pervstate)); ChooseStatus(3); toggleStyle('list-3')}}>Company</li>
      <li id='list-4' onClick={()=>{setDropDown(pervstate=>(!pervstate)); ChooseStatus(4); toggleStyle('list-4')}}>Total</li>
      <li id='list-5' onClick={()=>{setDropDown(pervstate=>(!pervstate)); ChooseStatus(5); toggleStyle('list-5')}}>Fabric</li>
      <li id='list-6' onClick={()=>{setDropDown(pervstate=>(!pervstate)); ChooseStatus(6); toggleStyle('list-6')}}>Type</li>
      


  </ul>
  </>
  
  ) 
}

function DropDownList_2({setDropDown}): JSX.Element {

  const queryClient = useQueryClient();
  
  const Status = useMutation({
    mutationFn: async (id) => {
     
       await ipcRenderer.invoke('all-orders',id);
    },
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['allOrders']});
    }
  });
    
  const ChooseStatus = (id:any) => {
    try {
      Status.mutate(id);
    }
    catch (error) {
      console.error('Mutation failed:', error);
    }
  }
  

  return (
  <>
  <ul className="ul-list-2">
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(7);}}>Default</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(8);}}>Paid</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(9);}}>Pending</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(10);}}>Cancelled</li>
  </ul>
  </>
  
  ) 
}

function DropDownList_3({setDropDown}): JSX.Element {

  const queryClient = useQueryClient();
  
  const Status = useMutation({
    mutationFn: async (id) => {
     
       await ipcRenderer.invoke('all-orders',id);
    },
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['allOrders']});
    }
  });
    
  const ChooseStatus = (id:any) => {
    try {
      Status.mutate(id);
    }
    catch (error) {
      console.error('Mutation failed:', error);
    }
  }
  

  return (
  <>
  <ul className="ul-list-3">
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(7);}}>Default</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(11);}}>6 months ago</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(12);}}>a year ago</li>
      <li onClick={()=>{setDropDown(pervstate=>(!pervstate));ChooseStatus(13);}}>2 years ago</li>
  </ul>
  </>
  
  ) 
}
