import filters from '../../public/Filters.svg';
import Arrow from '../../public/dropDown.svg';
import { useState,useRef,useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion';

export default function SortDropDown(): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const [dropDown, setDropDown] = useState(false);

    const handleButtonClick = () => {
        setDropDown(!dropDown);
    };
    return (
        <>
        <button onClick={handleButtonClick} className="  dropDown w-[8.7vw] h-[4.8vh] bg-default border-2 border-[#EAEAEA] absolute left-[14.6vw] top-[12vh] rounded-[12px] transition duration-150">
        <img src={filters} className=' absolute h-[26px] w-[26px] top-2 left-3'/>
        <label className=" font-semibold absolute top-3 left-[2.6vw] ">Sort By</label>  
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
    <DropDown setDropDown={setDropDown}/>
    </motion.div>
    }
    </AnimatePresence>
    
    </>
            
    )
}



function DropDown ({setDropDown}): JSX.Element {
    return (
        <>
       <ul className='customers-list w-[8.7vw] h-[13vh] bg-default rounded-[12px] border-2 border-[#EAEAEA] left-[14.6vw] top-[17vh] absolute flex flex-col'>
              <li  onClick={()=>{setDropDown(pervstate=>(!pervstate));}}>Name</li>
              <li  onClick={()=>{setDropDown(pervstate=>(!pervstate));}}>Orders</li>
              <li  onClick={()=>{setDropDown(pervstate=>(!pervstate));}}>Date</li>
       </ul>
        </>
    )
}
    