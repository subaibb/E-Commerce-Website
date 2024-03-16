import Home from '../../public/Home.svg'
import Orders from '../../public/Orders.svg'
import Group from '../../public/Group.svg'
import Shop from '../../public/shop-repo.svg'
import { Link } from 'react-router-dom';
import { ButtonContext } from '../../main'
import { useContext } from 'react';


type ButtonType = {
  Button: number;
  setButton: (value: number) => void;
};



export default  function Buttons(): JSX.Element {

  

  const { Button, setButton } = useContext<ButtonType>(ButtonContext);
  const handleclick = (value:number) => () => {
    setButton(value);
  }

  return (
    <nav>
    <div className="flex flex-col absolute w-[10.1vw] h-[25.6vh] top-[23.6vh] left-[0.7vw] bg-[url(/Home.svg)]">
       <Link className='w-fit h-[5.7vh] mb-auto'  to={"/"}>
      <button onClick={handleclick(1)}  className="primary-btn" style={{ backgroundImage: `url(${Home})`,backgroundColor:Button===1?'#F7F5F7':'' }}><label>Dashboard</label></button>
      </Link> 
      <Link className='w-fit h-[5.7vh] mb-auto' to={"/Orders"}>
      <button onClick={handleclick(2)} className="primary-btn" style={{ backgroundImage: `url(${Orders})`,backgroundColor:Button===2?'#F7F5F7':''  }}><label>Orders</label></button>
      </Link>
      
      <Link className='w-fit h-[5.7vh] mb-auto' to={"/Customers"}>
      <button onClick={handleclick(3)} className="primary-btn" style={{ backgroundImage: `url(${Group})`,backgroundColor:Button===3?'#F7F5F7':''  }}><label>Customers</label></button>
      </Link>
      <Link className='w-fit h-[5.7vh] mb-auto'  to={"/Stores"}>
      <button onClick={handleclick(4)} className="primary-btn" style={{ backgroundImage: `url(${Shop})`,backgroundColor:Button===4?'#F7F5F7':''  }}><label>Stores</label></button>
      </Link>
    </div>
    </nav>
  )
}

