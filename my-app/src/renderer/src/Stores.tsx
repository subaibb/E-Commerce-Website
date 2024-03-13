import Buttons from './components/_DashComponent/Buttons'
import Background from './components/_DashComponent/bg'
import StoreHolder from './components/_StoreComponents/StoreHolder'
import PageSwitch from './components/_StoreComponents/StorePageSwitch';
import SortDropDown from './components/_CustomerComponents/SortDropDown';
import AddStore from './components/_StoreComponents/AddStore';
import { createContext } from 'react';
import { useState } from 'react';

type PageContextType = {
  Page: number;
  setPageSwitch: (value: number) => void;
};


export const PageContext = createContext<PageContextType>({  
  Page: 1,
  setPageSwitch: (value: number) => {value},
  
});
export default function Money(): JSX.Element {


 const [Page, setPageSwitch] = useState<number>(1);

    return (
      <>
      <PageContext.Provider value={{Page, setPageSwitch}}>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards] '>Stores</h2>
      <Background />
      <StoreHolder />
      <Buttons isButton={4}/>
      <PageSwitch />
      <SortDropDown Type={1}/>
      <AddStore />
      </PageContext.Provider>
      </> 
    )
  }