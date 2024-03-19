import Home from '../../public/Home.svg'
import Orders from '../../public/Orders.svg'
import Group from '../../public/Group.svg'
import Shop from '../../public/shop-repo.svg'
import HomeClicked from '../../public/Home-Clicked.svg'
import OrdersClicked from '../../public/Orders-Clicked.svg'
import GroupClicked from '../../public/Group-Clicked.svg'
import ShopClicked from '../../public/shop-repo-Clicked.svg'
import { Link } from 'react-router-dom';



export default  function Buttons({Button}): JSX.Element { 

  



  return (
    <nav>
    <div className="flex flex-col absolute w-[10.1vw] h-[25.6vh] top-[23.6vh] left-[0.7vw] bg-[url(/Home.svg)]">
       <Link className='w-fit h-[5.7vh] mb-auto'  to={"/"}>
      <button   className="primary-btn" style={{ backgroundImage : Button===1? ` url(${HomeClicked})` : ` url(${Home})` ,backgroundColor:Button===1?'#F7F5F7':'' }}><label>Dashboard</label></button>
      </Link> 
      <Link className='w-fit h-[5.7vh] mb-auto' to={"/Orders"}>
      <button  className="primary-btn" style={{ backgroundImage: Button===2? ` url(${OrdersClicked})` : ` url(${Orders})`,backgroundColor:Button===2?'#F7F5F7':''  }}><label>Orders</label></button>
      </Link>
      
      <Link className='w-fit h-[5.7vh] mb-auto' to={"/Customers"}>
      <button  className="primary-btn" style={{ backgroundImage: Button===3? ` url(${GroupClicked})` : ` url(${Group})`,backgroundColor:Button===3?'#F7F5F7':''  }}><label>Customers</label></button>
      </Link>
      <Link className='w-fit h-[5.7vh] mb-auto'  to={"/Stores"}>
      <button  className="primary-btn" style={{ backgroundImage: Button===4? ` url(${ShopClicked})` : ` url(${Shop})`,backgroundColor:Button===4?'#F7F5F7':''  }}><label>Companies</label></button>
      </Link>
    </div>
    </nav>
  )
}

