import './assets/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {lazy,Suspense}from 'react';
import { QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createRoot } from 'react-dom/client';
import React from 'react';





const queryClient = new QueryClient();
const App = lazy(() => import('./App'));
const Orders = lazy(() => import('./Orders'));
const Customers = lazy(() => import('./Customers'));
const Money = lazy(() => import('./Stores'));
const CustomerProfile = lazy(() => import('./CustomerProfile'));
const StoreProfile = lazy(() => import('./StoreProfile'));
const root = document.getElementById('root') as HTMLElement;
function Main(): JSX.Element {
  
return (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
          <Router>
            <Suspense>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/Stores" element={<Money />} />
                <Route path="/CustomerProfile/:id" element={<CustomerProfile />} />
                <Route path="/StoreProfile/:id" element={<StoreProfile />} />
            </Routes>
            <ReactQueryDevtools />
            </Suspense>
        </Router>
      </QueryClientProvider>
      </React.StrictMode>
)
}
createRoot(root).render(<Main />);


