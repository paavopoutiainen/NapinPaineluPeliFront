import React, {useState, useEffect} from 'react'
import io from "socket.io-client"
import Tryagain from "./components/Tryagain"

const socket = io.connect("http://localhost:3001")

const App = () => {

    const [points, setPoints] = useState(20)
    const [untilPoints, setUntilPoints] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const pointsInLocalStorage = window.localStorage.getItem("points")
        if(pointsInLocalStorage){
          setPoints(parseInt(pointsInLocalStorage))
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem("points", points)
    }, [points])

    function handleClick() {
        socket.emit("click")
        setPoints(points - 1)
    }

    const handleTryAgainYes = () => {
        setPoints(20)
        setNotification(null)
      }

    socket.on("clickResponse", (data) => {
        if(data.pointsIncreased !== 0) {
            setNotification(`You earned ${data.pointsIncreased} points`)
          setPoints(points + data.pointsIncreased)
          setTimeout(()=> {
            setNotification(null) 
          }, 4000)
        }
        setUntilPoints(data.clicksLeftBeforePoints)
    })

    if(points === 0) {
        return <Tryagain handleTryAgainYes={handleTryAgainYes}></Tryagain>
    }

    return (
        <div>
             <div id="instructions">
                <p>Hey there, your job is to click the button. Every click will decrease your points by one.<br></br>
                After each click you will be provided with the number of clicks before the next click resulting in increase in points.<br></br>
                But remember there are other people clicking the button too!<br></br>
                Points are given as follows: <br></br> 
                    5 points for every 10th click.<br></br>
                    40 points for every 100th click<br></br>
                    and 250 points for every 500th click.<br></br>
                    In case of overlap only the bigger increase in points will result.
                </p>
            </div>
            <div id="gameStats">
                <div id="points">
                    <p><strong>Points: </strong>{points}</p>
                </div>
                <div id="clickInformation">
                    <p><strong>Number of clicks to points at your last click: </strong>{untilPoints}</p>
                </div>
            </div>
            <div id="button">
                <button onClick={() => handleClick()}>Click me!!</button>
            </div>
            <div id="notification">
                {notification ? <p><strong>{notification}</strong></p> : null}
            </div>
        </div>
    
  )
}

export default App