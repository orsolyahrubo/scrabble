import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { useState, useEffect } from 'react';
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
  const [currentBoard, setCurrentBoard] = useState(Array(15).fill(Array(15).fill(null)));

  useEffect(() => {
    const fakeTile = { value: 'A', score: 1 };
    setCurrentBoard(currentBoard => {
      const newBoard = currentBoard.map((row, rowIndex) => {
        return row.map((element, columnIndex) => {
          if (rowIndex === 3 && columnIndex === 2) {
            return fakeTile;
          }
          return element;
        });
      }
      );
      return newBoard;
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <ScrabbleTile value={'B'} score={2} />
          <ScrabbleHand arrOfPlayersCurrentLetters={[{ value: 'C', score: 3 }, { value: 'D', score: 4 }, { value: 'C', score: 3 }, { value: 'D', score: 4 }, { value: 'C', score: 3 }, { value: 'D', score: 4 }, { value: 'C', score: 3 }, { value: 'D', score: 4 }]} />
          <ScrabbleBoard currentBoard={currentBoard} />
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
