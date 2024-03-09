import ProfileButton from "./ProfileButton"
import ManageButton from "./ManageButton"
import LabelCounters from "./LabelCounters"
import {motion} from "framer-motion"
export default function CustomerLabel({delay,customer}): JSX.Element {


    return (
        <motion.div className="Customer-Label relative w-[18vw] h-[33vh]  bg-default rounded-xl shadow-[2px_4px_4px_#68B6FF0D]"
        initial={{scale:0.9, opacity:0}}
        animate={{scale:1, opacity:1}}
        transition={{duration:0.2,delay:delay}}
        >
            <div className=" relative w-[100%] h-[3vh] top-[1vh]  flex">
            <h2 className="w-[6vw] h-[3vh] relative text-[#D9D9D9] flex items-center justify-start mr-auto ml-2">2024/01/03</h2>
            <LabelCounters orders={customer.orders.length}/>
            </div>
            
            <hr className="relative w-[100%] top-[1.3vh] bg-[#D9D9D9] h-[1px]" />

            <div className=" relative w-[5.72vw] h-[10.1vh] left-[6.1vw] top-[3vh] rounded-full bg-[#F6F8FF] flex justify-center items-center">
                <h2 className=" text-secondary text-5xl">{customer.name.split(' ')[0][0].toUpperCase()}</h2>
            </div> 
            
            <div className=" relative w-[12.7vw] h-[5vh] top-[3vh] left-[2.6vw] items-center justify-center flex flex-col">
            <label className="p-[1vw] relative text-[17px] text-secondary font-normal ">{customer.name}</label> 
            <label className=" text-[#aba9a9]">0544249195</label>
            </div>
            <div className="relative top-[7.8vh] left-[4%] w-[92%] h-[5vh] flex">
                <ProfileButton id={customer.id}/>
                <ManageButton/>
            </div>
        
             
        </motion.div>
    )
}