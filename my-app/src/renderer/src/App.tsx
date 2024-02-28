import Buttons from './components/_DashComponent/Buttons'
import Background from './components/_DashComponent/bg'
import Stats from './components/_DashComponent/dash-status'
import Table from './components/_DashComponent/order-table'
import Company from './components/_DashComponent/company'
import Arrow from './components/_DashComponent/Arrows'
import Labels from './components/_DashComponent/labels'
import Add_Button from './components/_DashComponent/add_button'



export default function App(): JSX.Element {
  
  return (
    <> 
    <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards]'>Dashboard</h2>
    <Buttons isButton={1}/>
    <Background/>
    <Stats/>
    <Table/>
    <Company/>
    <Labels/>
    <Add_Button/>
    <Arrow/>  
    </>
  )
}



