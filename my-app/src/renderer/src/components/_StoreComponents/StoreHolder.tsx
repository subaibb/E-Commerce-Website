
import {motion,AnimatePresence} from 'framer-motion';
import Store_1 from '../../public/Store_1.png';
import Money from '../../public/Money.svg';
import Orders_pic from '../../public/Orders.svg';
import Arrowbtn from '../../public/Arrow-btn.svg';
import Setting from '../../public/Setting.svg';
import SearchBar from '../_OrderComponents/searchbar';
import { useState } from 'react';
export default function StoreHolder(): JSX.Element {

    const [Customers, setCustomers] = useState([]);

    const setOrdes = [
        {
            id:1,
            store:"Store 1",
            Revenue:10000,
            Orders:100
        },
        {
            id:2,
            store:"Store 2",
            Revenue:10000,
            Orders:100
        },
        {
            id:3,
            store:"Store 3",
            Revenue:10000,
            Orders:100
        },
        {
            id:4,
            store:"Store 4",
            Revenue:10000,
            Orders:100
        },
        {
            id:5,
            store:"Store 5",
            Revenue:10000,
            Orders:100
        },
        {
            id:6,
            store:"Store 6",
            Revenue:10000,
            Orders:100
        }
    ]

    const data = setOrdes;
    return (
        <>  
        <div className='w-fit h-fit absolute left-[71.2vw] top-[13vh]'>
        <SearchBar data={data} setOrders={setCustomers} />
        </div>
        
        <div className=" absolute w-[78.8vw] h-[72vh] top-[20vh] left-[14.2vw] grid grid-cols-2 gap-[50px] ">
            <Store delay={0.1} data="Store 1" Revenue={10000} Orders={100} />
            <Store delay={0.15} data="Store 2" Revenue={10000} Orders={100} />
            <Store delay={0.2} data="Store 3" Revenue={10000} Orders={100} />
            <Store delay={0.25} data="Store 4" Revenue={10000} Orders={100} />
            <Store delay={0.3} data="Store 5" Revenue={10000} Orders={100} />  
            <Store delay={0.35} data="Store 6" Revenue={10000} Orders={100} />
        </div>
        </>
        
    )
}


const Store = ({data,Revenue,Orders,delay}) => {
    const priceString = (Revenue).toFixed(0).toString();
    const formattedPrice = `$${priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    return (
     
      <AnimatePresence>
      <motion.div className=" w-[32.8vw] h-[20.5vh] bg-default m-auto rounded-2xl relative shadow-[2px_4px_4px_#68B6FF0D]"
       initial={{scale:0.9, opacity:0}}
       animate={{scale:1, opacity:1}}
       transition={{duration:0.2,delay:delay}}
       >

      <h2 className="text-2xl font-medium text-secondary absolute left-[9.2vw] top-[3.2vh]">{data}</h2>

        <div className="h-[11.2vh] w-[6.2vw] bg-company rounded-xl relative left-[1.6vw] top-[3.2vh] ">
          <img src={Store_1} />
        </div>
        <div className="h-[3.6vh] w-[2vw] bg-company rounded-xl absolute left-[9.2vw] top-[7.8vh] bg-[length:32px_32px] bg-no-repeat bg-center"style={{ backgroundImage: `url(${Money})` }} />

        <label className="text-secondary absolute left-[11.8vw] top-[7.5vh] text-[14px] font-medium">Revenue</label>
        <label className="text-secondary absolute left-[11.8vw] top-[9.5vh] text-[14px] font-bold">{formattedPrice}</label>
        <div className="h-[3.6vh] w-[2vw] bg-company rounded-xl absolute left-[21.5vw] top-[7.8vh] bg-[length:32px_32px] bg-no-repeat bg-center"style={{ backgroundImage: `url(${Orders_pic})` }}/>
        <label className="text-secondary absolute left-[24.1vw] top-[7.5vh] text-[14px] font-medium">Orders</label> 
        <label className="text-secondary absolute left-[24.1vw] top-[9.5vh] text-[14px] font-bold">{Orders}</label><br />
        <button className="h-[4.8vh] w-[9.5vw] bg-[#F1F8F2] rounded-xl left-[8.9vw] top-[13vh] absolute bg-[length:27px_27px] bg-no-repeat bg-[1vh] hover:bg-[#E6EEE7] transition duration-150" style={{ backgroundImage: `url(${Setting})` }}><label  className=" text-[#96CB9C] cursor-pointer relative left-[0.3vw]  text-[14px]">Manage Shop</label></button> 
        <button className="h-[4.8vh] w-[9.5vw] bg-[#70B877] rounded-xl left-[21.3vw] top-[13vh] absolute bg-[length:32px_32px] bg-no-repeat bg-[12vh] hover:bg-[#61AC68] transition duration-150" style={{ backgroundImage: `url(${Arrowbtn})` }}><label className=" text-[#FEFEFE] cursor-pointer relative right-[1vw] text-[14px] ">View Store</label></button>    


    </motion.div>
    </AnimatePresence>  
    )
  }