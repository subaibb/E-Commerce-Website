import Time from '../../public/TimeLeft.svg';
import Multiply from '../../public/Multiply.svg';
import BoxOrder from '../../public/BoxOrder.svg';
import Check from '../../public/Check.svg';

export default function Element({location,data}): JSX.Element {

    const marginStyle = location === 1 ? { marginRight: 'auto' } : location=== 4 ? { marginLeft: 'auto' }:{ margin: 'auto' };
    const img = location === 1 ? Check : location === 2 ? Time : location === 3 ? Multiply : BoxOrder;
    const color = location === 1 ? '#EBFFE4' : location === 2 ? '#FFF8E9' : location === 3 ? '#FCDFE1' : '#EBF0FF';
    const label = location === 1 ? 'Paid' : location === 2 ? 'Pending' : location === 3 ? 'Cancelled' : 'Orders';
  

    return(
        <div style={marginStyle} className="Stat-Order w-[16vw] h-[100%] bg-default rounded-xl shadow-[2px_4px_4px_#68B6FF0D]">
            
            <div style={{backgroundImage:`url(${img})`,backgroundColor:color}} className="w-[5.5vw] h-[8.8vh] relative top-[2.4vh] left-[1.2vw] rounded-xl bg-[length:60px_60px] bg-no-repeat bg-center "/>
            <div className='w-[6.5vw] h-[7.7vh] bottom-[6vh] left-[8.2vw] relative flex flex-col'>
            <label className='w-[8vw] h-[2.7vh] text-[32px] relative text-[#363447] font-medium mb-8'>{data}</label>
            <label className='w-[4.1vw] h-[2.7vh] relative text-[17px] text-[#B8B7BC] font-medium'>{label}</label>
            </div>
            
        </div>
    )
}   