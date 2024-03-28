import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GameContext } from './contexts/GameContext';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Footer from './components/Footer';
import ScrabbleTile from './components/ScrabbleTile';
import ScrabbleHand from './components/ScrabbleHand';
import ScrabbleBoard from './components/ScrabbleBoard';
import RegisterForm from './pages/RegisterForm';
import {socket} from "./socket";

function App() {

  const { currentTile } = useContext(GameContext);

  function onConnect() {
    console.log('connected to server')
  }

  function onSocketTestClick() {
    console.log('sending an event to the server')
    socket.emit('anything-you-want', 'test');
  }

  socket.on('connect', onConnect);
  socket.on('something-else', (data) => {
    console.log('received an event from the server', data);
  })

  return (
    <BrowserRouter>
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <ScrabbleTile value={'B'} score={2} />
          <button onClick={onSocketTestClick} >websocket test</button>
          {currentTile && `The current tile value is ${currentTile.value} and score is ${currentTile.score} id is ${currentTile.id}`}
          <ScrabbleHand />
          <ScrabbleBoard />
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
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
