import Home from '../../public/Home.svg'
import Orders from '../../public/Orders.svg'
import Group from '../../public/Group.svg'
import Money from '../../public/Money.svg'

export default  function Versions(): JSX.Element {

  return (
    <div className="flex flex-col absolute w-[10.1vw] h-[23.6v  h] top-[23.6vh] left-[1vw] bg-[url(/Home.svg)]">
      <button className="primary-btn" style={{ backgroundImage: `url(${Home})` }}><label>Dashboard</label></button>
      <link rel="stylesheet" href="/Orders" />
      <button className="primary-btn" style={{ backgroundImage: `url(${Orders})` }}><label>Orders</label></button>
     
      <button className="primary-btn" style={{ backgroundImage: `url(${Group})` }}><label>Customers</label></button>
      <button className="primary-btn" style={{ backgroundImage: `url(${Money})` }}><label>Money</label></button>
    </div>
  )
}

