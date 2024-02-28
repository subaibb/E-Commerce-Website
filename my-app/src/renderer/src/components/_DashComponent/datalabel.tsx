
import External from './external-label'
import More from '../../public/More.svg'
import { useState,useRef,useEffect } from 'react';
import {useMutation,useQueryClient} from '@tanstack/react-query';
import {motion,AnimatePresence} from 'framer-motion';
const { ipcRenderer } = require('electron');




export default  function Data_Label({data}): JSX.Element {

  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const [Position,setPosition] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShow(false);
      setHover(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  //placement of the dropdown
  const handleShow = (event) => {
    const { clientY } = event;
    if (clientY > 550) {
      setPosition(true);
    } else {
      setPosition(false);
    }
    setShow(pervsetsgate => !pervsetsgate);
  };

  //price formatting

    const priceString = (data.price * data.amount).toFixed(2).toString();
    const formattedPrice = `$${priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;


    // up or down arrow



    return (  
      <>
     
     <div className="Data-Holder">
        <label>{data.user.name}</label>
        <label>${data.price.toString()}</label>
        <label>{data.amount.toString()}</label>
        <label className='total'>{formattedPrice}</label>
        <label>{data.fabricType}</label>
        <label>{formatDate(data.createdAt)}</label>
        <External isStatus={data.status}/>
        <label className='flex justify-center items-center z-100'>
        <img onClick={handleShow} className='h-[28px] w-[28px] cursor-pointer' src={More}/>
      
            <div ref={ref}
            >
                      {show  && 
                    <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.01 }}
                      exit={{ opacity: 0 }}
                    >
                          <List_1 id={data.id} setShow={setShow} Position={Position} setHover={setHover}  />
                    </motion.div>
                    </AnimatePresence>
                   
                  
                        }

                    {hover &&
                      <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.01 }}
                      exit={{ opacity: 0 }}>
                        <List_2 id={data.id} setShow={setShow} Position={Position} setHover={setHover} />
                        </motion.div>
                      </AnimatePresence>
                        }

            </div>

        </label>
       
        <h1 className="w-[100%] h-[0.2vh] bg-[#f9f9f9] absolute top-[5vh]"  />
        
      </div>
      
      </>
      
    ) 
    
  }





 function List_1({id,setShow,Position,setHover}): JSX.Element {

  //customer removal 
  
  const queryClient = useQueryClient();

const Delete_Mutation = useMutation({
  mutationFn: async () => {
    console.log(id);
    await ipcRenderer.invoke('remove-orders', id);
  },
  onSuccess: () => {
    queryClient.refetchQueries({ queryKey: ['orders'] });
    queryClient.refetchQueries({ queryKey: ['Status'] });
    queryClient.refetchQueries({queryKey: ['Percentage']});
    queryClient.refetchQueries({queryKey: ['Company']});
  }
});
  
const Delete = (id:any) => {
  try {
    Delete_Mutation.mutate(id);
  }
  catch (error) {
    console.error('Mutation failed:', error);
  }
}



   

    return(
       

      
        <ul className="List-1" style={{top:Position?'-7vh':'2.9vh'}}>

         <li onMouseEnter={()=>{setHover(true);}}>Status</li>
         <li onMouseEnter={()=>{setHover(false)}} onClick={()=>{setShow(pervsetsgate => !pervsetsgate);}}>Edit</li>
         <li onMouseEnter={()=>{setHover(false)}} onClick={()=>{setShow(pervsetsgate => !pervsetsgate); Delete(id)} }>Remove</li>
        </ul>
       

    )

}

const Change = async (status) => {
  await ipcRenderer.invoke('change-status',status);
}


function List_2({id,setShow,Position,setHover}): JSX.Element {

  const queryClient = useQueryClient();

  const change = useMutation({
  
    mutationFn: Change,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['orders'] });
      queryClient.refetchQueries({ queryKey: ['Status'] });
      queryClient.refetchQueries({queryKey: ['Percentage']});
      queryClient.refetchQueries({queryKey: ['Company']});
    }
  });
    

  const changeStatus = (status,id) => {
    try {
      change.mutate({status,id});
    }
    catch (error) {
      console.error('Mutation failed:', error);
    }
  }
  

  return(
     
      <ul className="List-2" style={{top:Position?'-7vh':'2.9vh'}}>
       <li onClick={()=>{setShow(pervsetsgate => !pervsetsgate);setHover(pervsetsgate => !pervsetsgate); changeStatus("Paid",id)}}>Paid</li>
       <li onClick={()=>{setShow(pervsetsgate => !pervsetsgate);setHover(pervsetsgate => !pervsetsgate); changeStatus("Pending",id)}}>Pending</li>
       <li onClick={()=>{setShow(pervsetsgate => !pervsetsgate);setHover(pervsetsgate => !pervsetsgate); changeStatus("Cancelled",id)}}>Cancelled </li>
      </ul>
     
  )
}










  
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
