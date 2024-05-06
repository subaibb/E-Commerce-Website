"use client";
import { useContext,createContext,useState, ReactNode } from "react";

type SideBarContextType = {
  show: boolean;
  setShow: (value: boolean) => void;
};

type LoginWarningContextType = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

type CartsContext = {
  cart: number;
  setCart: (value: number) => void;
};

type FavsContext = {
  fav: number;
  setFav: (value: number) => void;
};

type PathContext = {
  Product: string;
  setProduct: (value: string) => void;
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






const cartsContext = createContext<CartsContext>({
cart: 0,
setCart: (value: number) => {value},
}); 

export function CartContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
  const [cart, setCart] = useState(0);
  return (
    <cartsContext.Provider value={{cart,setCart}}>
      {children}
    </cartsContext.Provider>
  )
}

export function useCartCount(): CartsContext {
  return useContext(cartsContext);
}







 const FavsContext = createContext<FavsContext>({
fav: 0,
setFav: (value: number) => {value},
}); 

export function FavContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
  const [fav, setFav] = useState(0);
  return (
    <FavsContext.Provider value={{fav,setFav}}>
      {children}
    </FavsContext.Provider>
  )
}

export function useFavCount(): FavsContext {
  return useContext(FavsContext);
}







const ProductContext = createContext<PathContext>({
  Product: "",
  setProduct: (value: string) => {value},
  }); 
  
  export function ProductContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
    const [Product, setProduct] = useState("");
    return (
      <ProductContext.Provider value={{Product,setProduct}}>
        {children}
      </ProductContext.Provider>
    )
  }
  
  export function useProduct(): PathContext {
    return useContext(ProductContext);
  }





  const LoginWarningContext = createContext<LoginWarningContextType>({
    visible: false,
    setVisible: (value: boolean) => {value},
    }); 
    
    export function LoginWarningContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
      const [visible, setVisible] = useState(false);
      return (
        <LoginWarningContext.Provider value={{visible,setVisible}}>
          {children}
        </LoginWarningContext.Provider>
      )
    }
    
    export function useLoginWarning(): LoginWarningContextType {
      return useContext(LoginWarningContext);
    }