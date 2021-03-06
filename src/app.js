import React, {useState, useEffect} from 'react'
import './App.css'
import io from "socket.io-client"
import Tryagain from "./components/Tryagain"

const socket = io.connect("http://localhost:3001")

const App = () => {

    const [points, setPoints] = useState(20)
    const [untilPoints, setUntilPoints] = useState(null)
    const [notification, setNotification] = useState(null)

    //after initial render, checking for points in the localstorage
    useEffect(() => {
        const pointsInLocalStorage = window.localStorage.getItem("points")
        if(pointsInLocalStorage){
          setPoints(parseInt(pointsInLocalStorage))
        }
    }, [])
  
    //saving the points into localStorage everytime it changes
    useEffect(() => {
        window.localStorage.setItem("points", points)
    }, [points])

    //handling game clicks
    function handleClick() {
        socket.emit("click")
        setPoints(points - 1)
    }
    
    //handling try again click
    const handleTryAgainYes = () => {
        setPoints(20)
        setNotification(null)
    }
    
    //socketcontrol
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

    //renders
    if(points === 0) {
        return <Tryagain handleTryAgainYes={handleTryAgainYes}></Tryagain>
    }

    return (
        <div className="App">
             <div className="instructions">
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
            <div className="gameStats">
                <div id="points">
                    <p><strong>Points: </strong>{points}</p>
                </div>
                <div className="clickInformation">
                    <p><strong>Number of clicks to points at your last click: </strong>{untilPoints}</p>
                </div>
            </div>
            <div id="button">
                <button onClick={() => handleClick()}>Click me!!</button>
            </div>
            <div className="notification">
                {notification ? <p><strong>{notification}</strong></p> : null}
            </div>
        </div>
    
  )
}

export default App