// Game.js
import { useEffect, useRef, useState } from "react"
import BackgroundAnimation from "./Visual/BackgroundAnimation"

const Game = function (props){

  const [mainMenu, setMainMenu] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [exitGame, setExitGame] = useState(false)
  const [count, setCount] = useState(0)
  const [gameReset, setGameReset] = useState(false)


  const blockRef = useRef()
  const holeRef = useRef()
  const playerRef = useRef()
  const keyState = []
  let blockWall = ""
  
  useEffect(function(){
    blockRef.current.style.left = 1210 + "px"
    playerRef.current.style.top = 300 + "px"
    playerRef.current.style.left = 100 + "px"
 
  }, [])
  useEffect(function(){
    blockRef.current.style["animation-duration"] = 2 + "s"
    holeRef.current.style["animation-duration"] = 2 + "s"
  }, [])

  useEffect(function(){
    if (gameReset === true){
      props.reset(true)
      setGameReset(false)
    }
  }, [gameReset])

  useEffect(function(){

      blockWall = setInterval(function(){
        
        if (playerRef.current.getBoundingClientRect().right > blockRef.current.getBoundingClientRect().left && (playerRef.current.getBoundingClientRect().top < holeRef.current.getBoundingClientRect().top || playerRef.current.getBoundingClientRect().bottom > holeRef.current.getBoundingClientRect().bottom) && playerRef.current.getBoundingClientRect().left < blockRef.current.getBoundingClientRect().right){
          setGamePaused(true)
          alert(`GAME OVER you scored ${count}`)
          setGameReset(true)
          return function () {
            clearInterval(blockWall)
          }
        } 

        if (keyState["ArrowUp"] && parseInt(playerRef.current.style.top) > 20) {
          playerRef.current.style.top = parseInt(playerRef.current.style.top) - 15 + "px"
        } else if (keyState["ArrowDown"] && parseInt(playerRef.current.style.top) < 755) {
          playerRef.current.style.top = parseInt(playerRef.current.style.top) + 15 + "px"
        } else if (keyState["ArrowLeft"] && parseInt(playerRef.current.style.left) > 10) {
          playerRef.current.style.left = parseInt(playerRef.current.style.left) - 15 + "px"
        } else if (keyState["ArrowRight"] && parseInt(playerRef.current.style.left) < 1100) {
          playerRef.current.style.left = parseInt(playerRef.current.style.left) + 15 + "px"
        }
      
      }, 20)
      return function(){
        clearInterval(blockWall)
      }
    }, [count, gameReset, mainMenu, keyState])

  const handleMovement = function(e){
    if (mainMenu === false){
      keyState[e.code] = true
    }
  }


  const handleMovementStop = function(e){
    keyState[e.code] = false
  }
  const handleUp = function(){
    playerRef.current.style.top = parseInt(playerRef.current.style.top) - 15 + "px"
  }
  const handleDown = function () {
    playerRef.current.style.top = parseInt(playerRef.current.style.top) + 15 + "px"
  }
  const handleLeft = function () {
    playerRef.current.style.left = parseInt(playerRef.current.style.left) - 15 + "px"
  }
  const handleRight = function () {
    playerRef.current.style.left = parseInt(playerRef.current.style.left) + 15 + "px"
  }
  
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
    const random = ((Math.random() * 600) + 80)
    holeRef.current.style.top = random + "px"
    setCount(count + 1)
  }
  if (gameReset === false){
    return (
     
      <div tabIndex="0" onKeyDown={handleMovement} onKeyUp={handleMovementStop} className={`gameWrapper pause${gamePaused}`}>
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
          <img src="/spaceship.png" alt="" />
        </div>
        <div className="scoreDiv">
          <p className="score">SCORE: {count}</p>
        </div>
        <div className="controls">
          <button disabled={true} type="button" onClick={handleUp}>UP</button>
          <button disabled={true} type="button" onClick={handleDown}>DOWN</button>
          <button disabled={true} type="button" onClick={handleLeft}>LEFT</button>
          <button disabled={true} type="button" onClick={handleRight}>RIGHT</button>
        </div>
      </div>
    )
  }
}

export default Game