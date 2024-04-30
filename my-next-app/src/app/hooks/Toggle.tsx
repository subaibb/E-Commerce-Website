"use client";
import { useContext,createContext,useState, ReactNode } from "react";

type SideBarContextType = {
  show: boolean;
  setShow: (value: boolean) => void;
};

 const SideBarContext = createContext<SideBarContextType>({
  show: false,
  setShow: (value: boolean) => {value},
});

export function SideBarWrapper  ({children}:{children:ReactNode}):JSX.Element  {
  const [show, setShow] = useState(false);
  return (
    <SideBarContext.Provider value={{show,setShow}}>
      {children}
    </SideBarContext.Provider>
  )
}

export function useSideBar(): SideBarContextType {
  return useContext(SideBarContext);
}