import { BrowserRouter, Route, Routes } from 'react-router';
import './main.css'
import { Settings, Home, Quiz, Collections } from './pages';
import { BackToHome, Navbar } from './components';
import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



invoke('create_tables');

export const queryClient = new QueryClient()

export default function App() {
/*   const url = window.location.pathname
 */
  
  return (
    <QueryClientProvider client={queryClient}>
      <main className='dark'>
        <Navbar />
        <div className='p-8'>
          {/* {url !== '/' && <BackToHome />} */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/collections" element={<Collections />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </QueryClientProvider>
  );
}
