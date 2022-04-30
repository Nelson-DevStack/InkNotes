import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import MainGrid from './components/MainGrid';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Read from './pages/Read';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      
      <main className="container">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainGrid />}/>
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:noteId" element={<Edit />} />
          <Route path="/read/:noteId" element={<Read />} />
        </Routes>
      </main>
    </Router>
    </> 
  );
}

export default App;
