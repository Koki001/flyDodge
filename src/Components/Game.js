// Game.js
import { useEffect, useRef, useState } from "react"
import BackgroundAnimation from "./Visual/BackgroundAnimation"

const Game = function (props){

  const [mainMenu, setMainMenu] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [exitGame, setExitGame] = useState(false)
  const [count, setCount] = useState(0)
  const [movement, setMovement] = useState(false)
  const [playerTop, setPlayerTop] = useState(300)
  const [playerLeft, setPlayerLeft] = useState(100)
 

  const blockRef = useRef()
  const holeRef = useRef()
  const playerRef = useRef()

  useEffect(function(){
    playerRef.current.style.top = playerTop + "px"
    playerRef.current.style.left = playerLeft + "px"
    document.addEventListener("keydown", function (e) {
      if (e.code === "ArrowUp") {
        setPlayerTop(playerTop - 5)
      } else if (e.code === "ArrowDown") {
        setPlayerTop(playerTop + 5)
      }
    })
  }, [])
  
  const handleMainMenu = function(){
    setMainMenu(!mainMenu)
    setGamePaused(!gamePaused)
  }
  const handleExitGame = function(){
    setExitGame(true)
    setTimeout(function(){
      props.gameExit(exitGame)
    }, 500);
  }
  const handleAnimationIteration = function(){
    setCount(count + 1)
    const random = ((Math.random() * 600) + 80)
    holeRef.current.style.top = random + "px"
    console.log(playerRef)
  }

  return (
    <div className={`gameWrapper pause${gamePaused}`}>
      <BackgroundAnimation pause={gamePaused}/>
      {
        mainMenu === true
        ? <div className="menuOn">
            <h2 className="pauseTitle">PAUSED</h2>
            <div className="inGameMenu">
              <button className="menuButtons buttonRestart" disabled={true}>Restart</button>
              <button className="menuButtons buttonOptions" disabled={true}>Options</button>
              <button className="menuButtons buttonExitGame"
              onClick={handleExitGame}
              >Exit Game
              </button>
            </div>
          </div>
        : null
      }
      <button className="gameMenuButton"
      onClick={handleMainMenu}
      >
      {mainMenu === false ? "MENU" : "RETURN"}
      </button>
      <div onAnimationIteration={handleAnimationIteration} style={{ animationPlayState: gamePaused === false ? "running" : "paused" }}className="block" ref={blockRef}>
      </div>
      <div style={{ animationPlayState: gamePaused === false ? "running" : "paused" }} className="hole" ref={holeRef}>
      </div>
      <div className="player" ref={playerRef}>
      </div>

    </div>
  )
}

export default Game