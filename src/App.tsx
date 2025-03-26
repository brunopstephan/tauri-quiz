import { BrowserRouter, Route, Routes } from 'react-router';
import './main.css'

function App() {

  return (
    <main >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><h1>home</h1></>} />
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
