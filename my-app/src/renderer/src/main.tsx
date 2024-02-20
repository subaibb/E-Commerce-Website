import './assets/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import Orders from './Orders';
import Customers from './Customers';
import Money from './Money';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/Orders" element={<Orders />} />
    <Route path="/Customers" element={<Customers />} />
    <Route path="/Money" element={<Money />} />
  </Routes>
</Router>
)
