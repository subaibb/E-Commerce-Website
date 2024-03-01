import Buttons from './components/_DashComponent/Buttons'
import Background from './components/_DashComponent/bg'
import Status from './components/_OrderComponents/status'
import OrderTable from './components/_OrderComponents/orderTable'
export default function Orders(): JSX.Element {
 

    return (
      <>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards] '>Orders</h2>
      <Background/>
      <Status/>
      <OrderTable/>
      <Buttons isButton={2}/>
      </> 
    )
  }
  