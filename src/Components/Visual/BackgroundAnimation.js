// BackgroundAnimation.js
import { useEffect, useState } from "react"

const BackgroundAnimation = function (props) {

  const [gamePaused, setGamePaused] = useState(false)

  useEffect(function(){
    setGamePaused(props.pause)
  }, [props])

  return (
    <>
      <div 
      style={{animationPlayState: gamePaused === false ? "running" : "paused"}} id="stars">
      </div>
      <div 
      style={{ animationPlayState: gamePaused === false ? "running" : "paused"}} id="stars2">
      </div>
      <div 
      style={{ animationPlayState: gamePaused === false ? "running" : "paused"}} id="stars3">
      </div>
    </>
  )
}

export default BackgroundAnimation