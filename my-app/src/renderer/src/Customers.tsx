import Buttons from './components/_DashComponent/Buttons';
import Background from './components/_DashComponent/bg';
import Dropdown from './components/_CustomerComponents/SortDropDown';
import CustomerHolder from './components/_CustomerComponents/CustomerHolder';
import PageSwitch from './components/_CustomerComponents/PageSwitch';
import { useState,createContext } from 'react';

type PageContextType = {
  Page: number;
  setPageSwitch: (value: number) => void;
};


export const PageContext = createContext<PageContextType>({  
  Page: 1,
  setPageSwitch: (value: number) => {value},
  
});


export default function Customers(): JSX.Element {
    const [Page, setPageSwitch] = useState<number>(1);

 

    return (
      <>
      <PageContext.Provider value={{Page, setPageSwitch}}>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary'>Customers</h2>
      <Background/>
      <CustomerHolder/>
      <Dropdown/>
      <PageSwitch/>
      <Buttons isButton={3}/>
      </PageContext.Provider>
      </> 
    )
  }