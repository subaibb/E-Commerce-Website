import Dollar from '../../public/Dollar.svg';
import completed from '../../public/Com.svg';
import Time from '../../public/Time.svg';
import Arrows from './arrow-status';
export default  function Versions(): JSX.Element {

    return (
      <div className="w-[73.2vw] h-[13.7vh] absolute left-[16.2vw] top-[14.7vh] flex">
        
        <div className="Stats">

          <div className="Stat-Pic bg-[#EBF0FF] " style={{backgroundImage: `url(${completed})`}}/>
          <label className="label-top">1234</label>
          <label className="label-bottom">Total Orders</label>
          <Arrows img="up" percentage="12%"/>
        </div>

        <div className="Stats ">
        <div className="Stat-Pic bg-[#FFF8E9]" style={{backgroundImage: `url(${Time})`}}/> 
        <label className="label-top">1234</label>
        <label className="label-bottom">On Hold</label>
        <Arrows img="down" percentage="35%"/>

        </div>
       

        <div className="Stats">

          <div className="Stat-Pic bg-[#FFEEF5]" style={{backgroundImage: `url(${Dollar})`}}/> 
          <label className="label-top">1234</label>
          <label className="label-bottom">Revenue</label>
          <Arrows img="up" percentage="16%"/>
        </div>
    
      </div>
    )
  }