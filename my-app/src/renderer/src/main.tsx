import './assets/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {lazy,Suspense}from 'react';
import { QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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


const queryClient = new QueryClient();
const App = lazy(() => import('./App'));
const Orders = lazy(() => import('./Orders'));
const Customers = lazy(() => import('./Customers'));
const Money = lazy(() => import('./Stores'));
const CustomerProfile = lazy(() => import('./CustomerProfile'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

function Main(): JSX.Element {
  const [Page, setPageSwitch] = useState<number>(1);
return (
<PageContext.Provider value={{Page, setPageSwitch}}>
    <QueryClientProvider client={queryClient}>
          <Router>
            <Suspense>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/Stores" element={<Money />} />
                <Route path="/CustomerProfile/:id" element={<CustomerProfile />} />
            </Routes>
            <ReactQueryDevtools />
            </Suspense>

        </Router>
      </QueryClientProvider>
      </PageContext.Provider>
)
}
root.render(<Main />)

