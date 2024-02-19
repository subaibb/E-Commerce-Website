import Buttons from './components/_DashComponent/Buttons'
import Background from './components/_DashComponent/bg'
import Stats from './components/_DashComponent/dash-status'
import Table from './components/_DashComponent/order-table'
import Company from './components/_DashComponent/company'
export default function App(): JSX.Element {
 

  return (
    <>
    <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary'>Dashboard</h2>
    <Buttons/>
    <Background/>
    <Stats/>
    <Table/>
    <Company/>
    </> 
  )
}

