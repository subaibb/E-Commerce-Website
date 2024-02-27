import './assets/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React,{lazy,Suspense}from 'react';
import { QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const App = lazy(() => import('./App'));
const Orders = lazy(() => import('./Orders'));
const Customers = lazy(() => import('./Customers'));
const Money = lazy(() => import('./Money'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode> 

    <QueryClientProvider client={queryClient}>
          <Router>
            <Suspense>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/Money" element={<Money />} />
                
            </Routes>
            <ReactQueryDevtools />
            </Suspense>

        </Router>
      </QueryClientProvider>
  </React.StrictMode>
)


