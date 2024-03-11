import Buttons from './components/_DashComponent/Buttons';
import Background from './components/_DashComponent/bg';
import Dropdown from './components/_CustomerComponents/SortDropDown';
import CustomerHolder from './components/_CustomerComponents/CustomerHolder';
import PageSwitch from './components/_CustomerComponents/PageSwitch';



export default function Customers(): JSX.Element {
  
 

    return (
      <>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary'>Customers</h2>
      <Background/>
      <CustomerHolder/>
      <Dropdown/>
      <PageSwitch/>
      <Buttons isButton={3}/>
      
      </> 
    )
  }