import { useState } from 'react';
import './App.scss';
import Game from './Components/Game';
import MainMenu from './Components/MainMenu';

function App() {

  const [gameStartApp, setGameStartApp] = useState(false)

  const handleGameStartApp = function(){
    setGameStartApp(true)
  }
  const handleExitGame = function(){
    setGameStartApp(false)
  }

  return (
    <div className="mainGame">
      {
        gameStartApp === false 
        ? <MainMenu game={handleGameStartApp}/>
        : gameStartApp === true
        ? <Game gameExit={handleExitGame}/>
        : null
      }
    </div>
  )
}

export default App;
