import { BrowserRouter, Route, Routes } from 'react-router';
import './main.css'
import { Settings, Home, Quiz, Collections } from './pages';
import {  Navbar } from './components';
import { invoke } from '@tauri-apps/api/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



invoke('create_tables');

export const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <main className='dark'>
        <Navbar />
        <div className='p-8'>
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
