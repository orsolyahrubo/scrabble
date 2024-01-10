import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Footer from './components/Footer';
import ScrabbleTile from './components/ScrabbleTile';
import ScrabbleHand from './components/ScrabbleHand';
import ScrabbleBoard from './components/ScrabbleBoard';

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <ScrabbleTile value={'B'} score={2} />
          <ScrabbleTile />
          <ScrabbleHand arrOfPlayersCurrentLetters={[{ value: 'C', score: 3 }, { value: 'D', score: 4 }, { value: 'C', score: 3 }, { value: 'D', score: 4 }, { value: 'C', score: 3 }, { value: 'D', score: 4 }, { value: 'C', score: 3 }, { value: 'D', score: 4 }]} />
          <ScrabbleBoard />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/register" element={<RegisterForm />} /> */}
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter >
  );
}

export default App;
