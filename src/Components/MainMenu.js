// MainMenu.js
// This component will be the main menu where the user can start the game

import { useEffect, useState } from "react"
import GameStartLoading from "./Visual/GameStartLoading"

const MainMenu = function(props){

  const [gameStart, setGameStart] = useState(false)
  const [gameStartAnimation, setGameStartAnimation] = useState(false)

  const handleGameStart = function(){
    setGameStart(true)
    setGameStartAnimation(true)
    setTimeout(function(){
      props.game(gameStart)
      setGameStartAnimation(false)
    }, 2500)
  }
  if (gameStartAnimation === false){
    return (
      <div className="mainMenu">
        <h1>Dodge Stuff</h1>
        <div className="menuOptions">
          <button className="menuButtons buttonStartGame"
          onClick={handleGameStart}>Start Game</button>
          <button className="menuButtons buttonOptions" disabled={true}>Options</button>
          <button className="menuButtons buttonLevels" disabled={true}>Levels</button>
          <button className="menuButtons buttonExitGame" disabled={true}>Exit Game</button>
        </div>
      </div>
    )
  } else if (gameStartAnimation === true){
    return (
      <GameStartLoading />
    )
  }
}

export default MainMenu