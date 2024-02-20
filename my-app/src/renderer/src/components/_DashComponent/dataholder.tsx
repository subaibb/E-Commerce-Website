import More from '../../public/More.svg'
import External from './external-label'
import List_1 from "./list-1"
import { useState } from 'react';

 type ComponentVisibility = {
  [buttonId:string]: boolean;
 }
export default  function Dataholder(): JSX.Element {
    const [show, setShow] = useState<ComponentVisibility>({});

    const handleShow = (buttonId:string) => {
      setShow(prevState => ({
        ...prevState,
        [buttonId]: !prevState[buttonId] || false // Set to true if not already set
      }));
    }

    return (
      <>
       
      <div className='DataCarrier w-[71vw] max-h-[20vh] h-[20vh] absolute top-[7vh] flex flex-col overflow-auto'>

      <div className="Data-Holder">
        <label>Kashi Amro</label>
        <label>13</label>
        <label>1,200</label>
        <label>$5,670</label>
        <label>Jerse</label>
        <label>2023-01-03</label>
        <External isStatus={'Paid'}/>
        <label className='flex justify-center items-center z-10'>
            <img onClick={() => handleShow("button1")} className='h-[28px] w-[28px] cursor-pointer' src={More}/>
            {show["button1"] && <List_1 />}
        </label>
        <h1 className="w-[100%] h-[0.2vh] bg-[#f9f9f9] absolute top-[4vh]"  />
        
      </div>
      

      <div className="Data-Holder">
        <label>Kashi Amro</label>
        <label>13</label>
        <label>1,200</label>
        <label>$5,670</label>
        <label>Jerse</label>
        <label>2023-01-03</label>
        <External isStatus={'Canceled'}/>
        <label className='flex justify-center items-center'>
            <img onClick={() => handleShow("button2")} className='h-[28px] w-[28px] cursor-pointer' src={More}/>
            {show["button2"] && <List_1 />}
        </label>
        <h1 className="w-[100%] h-[0.2vh] bg-[#f9f9f9] absolute top-[4vh]"  />
      </div>
     
      </div>
      

      </>     
     
      
    )   
  }