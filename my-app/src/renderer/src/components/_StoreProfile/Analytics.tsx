import {motion} from "framer-motion";
import { useQuery } from "@tanstack/react-query";
const {ipcRenderer} = require('electron');

type AnalyticsProps = {
    ThisMonthPaid: number,
    LastMonthPaid: number,
    TwoMonthsAgoPaid: number,
    ThreeMonthsAgoPaid: number,
    FourMonthsAgoPaid: number,
    FiveMonthsAgoPaid: number,
    ThisMonthPending: number,
    LastMonthPending: number,
    TwoMonthsAgoPending: number,
    ThreeMonthsAgoPending: number,
    FourMonthsAgoPending: number,
    FiveMonthsAgoPending: number,
}

export default function Analytics({id}): JSX.Element {
    console.log(id);
    const GetAnalytics = useQuery({queryKey:['GetAnalytics',id],queryFn: async () => {
        return await ipcRenderer.invoke('fetch-analytics',id)
    }});
    if (GetAnalytics.isLoading) return <div></div>
    if (GetAnalytics.isError) return <div>Error</div>

    
    return (
        <>
        <motion.div className="bg-default h-full w-[57.3vw] rounded-2xl shadow-[2px_4px_4px_#68B6FF0D] mr-auto"
         initial={{scale:0.9, opacity:0}}
         animate={{scale:1, opacity:1}}
         transition={{duration:0.2,delay:0.1}}>

        <h2 className="absolute w-[10.4vw] h-[6.1vh] top-[0.3vh] flex justify-center items-center text-[18px] text-secondary">Orders Report</h2>

        <AnalyticAmounts />
        <AnalyticLines />
        <MonthLabels />
        <StaticHolder data={GetAnalytics.data} />
        </motion.div>
        </>
    )
}







function AnalyticAmounts (): JSX.Element{
    return (
        <div className="Analytic-Amounts absolute top-[6.1vh] left-[1.9vw] h-fit w-fit">
            <label>200K</label>
            <label>180K</label>
            <label>160K</label>
            <label>140K</label>
            <label>120K</label>
            <label>100K</label>
            <label>80K</label>
            <label>60K</label>
            <label>40K</label>
            <label>20K</label>
            <label>0</label>
        </div>
    )
}

function AnalyticLines (): JSX.Element{
    return (
        <div className="w-[51.7vw] h-[35.1vh] absolute left-[4.9vw] top-[8.2vh] flex flex-col ">
            <Line />
            <Line />
            <Line />
            <Line />
            <Line />
            <Line />
            <Line />
            <Line />
            <Line />
            <Line />
            <Line />
        </div>
       
    )
}
function Line (){
    return (
        <div className="dashed-line mb-[30px]"></div>
    )
}



const GetMonth = (Month:number) =>{
    let date = new Date();
    date.setMonth(date.getMonth()-Month); 
    return date.toLocaleString('default', { month: 'short' });
}

function MonthLabels (): JSX.Element{

    return (
        <div className="Month-Analytic w-[52.4vw] h-[3.22vh] absolute left-[4.9vw] top-[41.1vh] flex">
            <label>{GetMonth(5)}</label>
            <label>{GetMonth(4)}</label>
            <label>{GetMonth(3)}</label>    
            <label>{GetMonth(2)}</label>
            <label>{GetMonth(1)}</label>
            <label>{GetMonth(0)}</label>
        </div>
    )
}

function StaticHolder ({data}:{data:AnalyticsProps}):JSX.Element{


    return (
        <div className="w-[52.4vw] h-[35.1vh] absolute left-[4.9vw] top-[5vh] flex ">
            <Static heightGreen={(data.FiveMonthsAgoPaid/606)} heightGray={(data.FiveMonthsAgoPending/606)} />
            <Static heightGreen={(data.FourMonthsAgoPaid/606)} heightGray={(data.FourMonthsAgoPending/606)} />
            <Static heightGreen={(data.ThreeMonthsAgoPaid/606)}heightGray= {(data.ThreeMonthsAgoPending/606)} />
            <Static heightGreen={(data.TwoMonthsAgoPaid/606)}  heightGray={(data.TwoMonthsAgoPending/606)} />
            <Static heightGreen={(data.LastMonthPaid/606)}     heightGray={(data.LastMonthPending/606)} />
            <Static heightGreen={(data.ThisMonthPaid/606)}     heightGray={(data.ThisMonthPending/606)} />
        </div>
    )
}
function Static ({heightGreen,heightGray}):JSX.Element{
    const FormatGreenheight = Math.min(330, heightGreen);
    const FormatGrayheight = Math.min(330, heightGray);

    return (
        <div className="w-[5.6vw] h-[35.1vh] relative mr-auto flex">
            <AnalyticGreenBar height={FormatGreenheight} />
            <AnalyticLightGreenBar height={FormatGrayheight} />
        </div>
    )   
}
function AnalyticGreenBar ({height}):JSX.Element{
    return (
        <motion.div className={`absolute w-[2.4vw] bg-[#45C49C] rounded-t-xl rounded-tr-xl bottom-0 mr-auto`}
        initial={{height:0}}
        animate={{height:height}}
        transition={{duration:0.5,delay:0.2}}
        >
           
        </motion.div>
    )
}
function AnalyticLightGreenBar ({height}):JSX.Element{
    
    return (
        <motion.div className={`absolute ${height} w-[2.4vw] bg-[#C7EDE1] rounded-t-xl rounded-tr-xl bottom-0 right-0`}
        initial={{height:0}}
        animate={{height:height}}
        transition={{duration:0.5,delay:0.3}}
        >
           
        </motion.div>
    )
}