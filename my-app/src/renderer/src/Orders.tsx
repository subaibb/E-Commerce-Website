import Buttons from './components/_DashComponent/Buttons'
import Status from './components/_OrderComponents/status'
import OrderTable from './components/_OrderComponents/orderTable'
import Add_Button from './components/_DashComponent/add_button'
import OrderReveiw from './components/_OrderComponents/orderreveiw'
import {  useState,useRef } from 'react';


export default function Orders(): JSX.Element {

  const [scale, setScale] = useState(0.95);
  const elementRef = useRef<HTMLDivElement>(null)
  const [statscale, setStatscale] = useState(1);

 

  const handlscroll = () => {
    const element = document.getElementById('my-div');
    const scrollY = element?.scrollTop;

    const maxScroll = (element?.scrollHeight ?? 0) - (element?.clientHeight ?? 0);
  



    const maxScale = 1; // Maximum scale value
    const minScale = 0.95; // Minimum scale value

    const maxscaleStat= 1;
    const minscaleStat= 0.95;
    
    if (scrollY) {
      const scaletest = minScale + (maxScale - minScale) * (scrollY / maxScroll);
      setScale(scaletest);
      if (scrollY === maxScroll) {
        setStatscale(1);
      }
    }


  if (scrollY) {
  const scalingtest = maxscaleStat - (maxscaleStat - minscaleStat) * (scrollY / maxScroll);
  setStatscale(scalingtest);
  if (scrollY === 1) {
    setStatscale(1);
  }
}
    
  }



 

    return (
      <>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards] '>Orders</h2>
      <div className=" h-[89.7vh] w-[81.9vw] bg-bg left-[12.2vw] top-[3.9vh] relative rounded-3xl ">
        <div id='my-div'  onScroll={handlscroll} ref={elementRef} className=' Background  w-[99.6%] h-[97%] overflow-auto absolute top-[1vh]'>
        <OrderReveiw opacity ={statscale} scale={statscale}/>
        <OrderTable opacity ={scale} scale={scale}/>
        <Status/> 
        </div>
     
      </div>
      
      <Add_Button/>
      <Buttons isButton={2}/>
      </> 
    )
  }

