import More from '../../public/More.svg'
import External from './external-label'
import List_1 from "./list-1"
import { useState } from 'react';

type ComponentVisibility = {
    [buttonId:string]: boolean;
   }

export default  function Data_Label({data}): JSX.Element {

    const [show, setShow] = useState<ComponentVisibility>({});
    
    const handleShow = (buttonId: string) => {
      setShow(prevState => {
        const updatedState = { ...prevState };
        // Set all keys to false except the one we want to show
        Object.keys(updatedState).forEach(key => {
          updatedState[key] = key === buttonId;
        });
        return {
          ...updatedState,
          [buttonId]: !prevState[buttonId] || false // Set to true if not already set
        };
      });
    };
    const priceString = data.total_price.toString();
    const formattedPrice = `$${priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    

    return (
      <>
     <div className="Data-Holder">
        <label>{data.user_name}</label>
        <label>${data.price}</label>
        <label>{data.amount}</label>
        <label>{formattedPrice}</label>
        <label>{data.fabricType}</label>
        <label>2024-03-02</label>
        <External isStatus={data.status}/>
        <label className='flex justify-center items-center z-10'>
            <img onClick={() => handleShow("button1")} className='h-[28px] w-[28px] cursor-pointer' src={More}/>
            {show["button1"] && <List_1 id={1} />}
        </label>
        <h1 className="w-[100%] h-[0.2vh] bg-[#f9f9f9] absolute top-[5vh]"  />
        
      </div>
      </>
      
    ) 
  }
