import './assets/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {lazy,Suspense}from 'react';
import { QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createContext } from 'react';
import Buttons from './components/_DashComponent/Buttons';
import Background from './components/_DashComponent/bg';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';





const queryClient = new QueryClient();
const App = lazy(() => import('./App'));
const Orders = lazy(() => import('./Orders'));
const Customers = lazy(() => import('./Customers'));
const Stores = lazy(() => import('./Stores'));
const CustomerProfile = lazy(() => import('./CustomerProfile'));
const StoreProfile = lazy(() => import('./StoreProfile'));
let container;
type ButtonType = {
  Button: number;
  setButton: (value: number) => void;
};

export const ButtonContext = createContext<ButtonType>({  
  Button: 1,
  setButton: (value: number) => {value},
  
});

document.addEventListener('DOMContentLoaded', function(event) {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container)
  
   root.render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
          <Router>
            <Suspense fallback={
              <>
              <Background/>
              <Buttons Button={1}/>
              </>

            }>
            
            
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/Stores" element={<Stores />} />
                <Route path="/CustomerProfile/:id" element={<CustomerProfile />} />
                <Route path="/StoreProfile/:id" element={<StoreProfile />} />
            </Routes>
            
            <ReactQueryDevtools />
            </Suspense >
        </Router>
      </QueryClientProvider>
      </React.StrictMode>
)
}
});



