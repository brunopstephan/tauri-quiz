import { BrowserRouter, Route, Routes } from 'react-router';
import './main.css'
import { Settings, Home, Quiz } from './pages';
import { BackToHome, Navbar } from './components';

function App() {
  const url = window.location.pathname
  return (
    <main className='dark'>
      <Navbar />
      <div className='p-8'>
        {/* {url !== '/' && <BackToHome />} */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
