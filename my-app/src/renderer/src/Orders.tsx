import Buttons from './components/_DashComponent/Buttons'
import Status from './components/_OrderComponents/status'
import OrderTable from './components/_OrderComponents/orderTable'
import Add_Button from './components/_DashComponent/add_button'
import OrderReveiw from './components/_OrderComponents/orderreveiw'
import {  useState,useRef,useEffect } from 'react';


export default function Orders(): JSX.Element {

  const [scale, setScale] = useState(0.95);
  const [statscale, setStatscale] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);
  let [prevScrollTop, setPrevScrollTop] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const scrollY = element.scrollTop;
      const maxScroll = element.scrollHeight - element.clientHeight;
      
      // Scale for main content
      const maxScale = 1;
      const minScale = 0.95;

      // Scale for statistics section
      const maxscaleStat = 1;
      const minscaleStat = 0.95;

      // Calculate scale for main content
      const scaletest = minScale + (maxScale - minScale) * (scrollY / maxScroll);
      setScale(scaletest);

      // Calculate scale for statistics section
      const scalingtest = maxscaleStat - (maxscaleStat - minscaleStat) * (scrollY / maxScroll);
      setStatscale(scalingtest);
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
    return () => {};
  }, []);

  function scrollToTop(div, duration) {
    const scrollStep = -div.scrollTop / (duration / 15);
    
    function scroll() {
      if (div.scrollTop <= 0) return;
      div.scrollBy(0, scrollStep);
      requestAnimationFrame(scroll);
    }
    
    scroll();
  }
  
  function scrollToBottom(div, duration) {
    const scrollStep = (div.scrollHeight - div.scrollTop - div.clientHeight) / (duration / 15);
    
    function scroll() {
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) return;
      div.scrollBy(0, scrollStep);
      requestAnimationFrame(scroll);
    }
    
    scroll();
  }
  
  function handleScroll(event) {
    const div = event.target; // The div that is being scrolled
    const scrollTop = div.scrollTop;
    const scrollHeight = div.scrollHeight;
    const clientHeight = div.clientHeight;
    
    // If user is scrolling up and not already at the top
    if (scrollTop < prevScrollTop && scrollTop > 0) {
      // Scroll to the top
      scrollToTop(div, 1200); // Adjust duration as needed
    } 
    // If user is scrolling down and not already at the bottom
    else if (scrollTop > prevScrollTop && scrollTop + clientHeight < scrollHeight) {
      // Scroll to the bottom
      scrollToBottom(div, 1200); // Adjust duration as needed
    }
    
    // Update the prevScrollTop state variable
    setPrevScrollTop(scrollTop);
  }



 

    return (
      <>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards] '>Orders</h2>
      <div className=" h-[89.7vh] w-[81.9vw] bg-bg left-[12.2vw] top-[3.9vh] relative rounded-3xl ">
        <div onScroll={handleScroll} id='my-div' ref={elementRef} className=' Background  w-[99.6%] h-[97%] overflow-auto absolute top-[1vh]'>
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

