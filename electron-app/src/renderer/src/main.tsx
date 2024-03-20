import './assets/main.css'
import {lazy,Suspense}from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'

const App = lazy(() => import('./App'));
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
)
