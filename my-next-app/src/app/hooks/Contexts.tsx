"use client";
import { useContext,createContext,useState, ReactNode } from "react";
import { Dispatch, SetStateAction } from "react";
type SideBarContextType = {
  show: boolean;
  setShow: (value: boolean) => void;
};

type LoginWarningContextType = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

type CartsContext = {
  cart: string[];
  setCart: Dispatch<SetStateAction<string[]>>;
};

type FavsContext = {
  fav: string[];
  setFav: Dispatch<SetStateAction<string[]>>;
};

type PathContext = {
  Product: string;
  setProduct: (value: string) => void;
};

type ShowCartContext = {  
  showCart: boolean;
  setShowCart: (value: boolean) => void;
};

type ShowFavoriteContext = {
  showFavorite: boolean;
  setShowFavorite: (value: boolean) => void;
};


type ShowSuccessContext = {
  showSuccess: boolean;
  setShowSuccess: (value: boolean) => void; 
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
cart: [],
setCart: () => {},
}); 

export function CartContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
  const [cart, setCart] = useState<string[]>([]);
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
fav: [],
setFav: () => {},
}); 

export function FavContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
  const [fav, setFav] = useState <string[]>([]);
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


const ShowCartContext = createContext<ShowCartContext>({
  showCart: false,
  setShowCart: (value: boolean) => {value},
  }); 
  
  export function ShowCartContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
    const [showCart, setShowCart] = useState(false);
    return (
      <ShowCartContext.Provider value={{showCart,setShowCart}}>
        {children}
      </ShowCartContext.Provider>
    )
  }
  
  export function useShowCart(): ShowCartContext {
    return useContext(ShowCartContext);
  }


  const ShowFavoriteContext = createContext<ShowFavoriteContext>({
    showFavorite: false,
    setShowFavorite: (value: boolean) => {value},
    }); 
    
    export function ShowFavoriteContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
      const [showFavorite, setShowFavorite] = useState(false);
      return (
        <ShowFavoriteContext.Provider value={{showFavorite,setShowFavorite}}>
          {children}
        </ShowFavoriteContext.Provider>
      )
    }
    
    export function useShowFavorite(): ShowFavoriteContext {
      return useContext(ShowFavoriteContext);
}



const ShowSuccessContext = createContext<ShowSuccessContext>({
  showSuccess: false,
  setShowSuccess: (value: boolean) => {value},
  }); 
  
  export function ShowSuccessContextWrapper  ({children}:{children:ReactNode}):JSX.Element  {
    const [showSuccess, setShowSuccess] = useState(false);
    return (
      <ShowSuccessContext.Provider value={{showSuccess,setShowSuccess}}>
        {children}
      </ShowSuccessContext.Provider>
    )
  }
  
  export function useShowSuccess(): ShowSuccessContext {
    return useContext(ShowSuccessContext);
}