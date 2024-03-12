import Buttons from './components/_DashComponent/Buttons'
import Background from './components/_DashComponent/bg'
import StoreHolder from './components/_StoreComponents/StoreHolder'
import PageSwitch from './components/_CustomerComponents/PageSwitch';
import SortDropDown from './components/_CustomerComponents/SortDropDown';
export default function Money(): JSX.Element {
 

    return (
      <>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards] '>Stores</h2>
      <Background />
      <StoreHolder />
      <Buttons isButton={4}/>
      <PageSwitch />
      <SortDropDown Type={1}/>
      </> 
    )
  }