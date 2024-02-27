import Home from '../../public/Home.svg'
import Orders from '../../public/Orders.svg'
import Group from '../../public/Group.svg'
import Money from '../../public/Money.svg'
import { Link } from 'react-router-dom';



export default  function Buttons({isButton}): JSX.Element {

  return (
    <nav>
    <div className="flex flex-col absolute w-[10.1vw] h-[25.6vh] top-[23.6vh] left-[0.7vw] bg-[url(/Home.svg)]">
       <Link className='w-fit h-[5.7vh] mb-auto'  to={"/"}>
      <button  className="primary-btn" style={{ backgroundImage: `url(${Home})`,backgroundColor:isButton===1?'#F7F5F7':'' }}><label>Dashboard</label></button>
      </Link> 
      <Link className='w-fit h-[5.7vh] mb-auto' to={"/Orders"}>
      <button className="primary-btn" style={{ backgroundImage: `url(${Orders})`,backgroundColor:isButton===2?'#F7F5F7':''  }}><label>Orders</label></button>
      </Link>
      
      <Link className='w-fit h-[5.7vh] mb-auto' to={"/Customers"}>
      <button className="primary-btn" style={{ backgroundImage: `url(${Group})`,backgroundColor:isButton===3?'#F7F5F7':''  }}><label>Customers</label></button>
      </Link>
      <Link className='w-fit h-[5.7vh] mb-auto'  to={"/Money"}>
      <button className="primary-btn" style={{ backgroundImage: `url(${Money})`,backgroundColor:isButton===4?'#F7F5F7':''  }}><label>Money</label></button>
      </Link>
    </div>
    </nav>
  )
}

