import React, {useState} from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

const App = () => {

    const [points, setPoints] = useState(20)
    const [untilPoints, setUntilPoints] = useState(null)

    function handleClick() {
        socket.emit("click")
        setPoints(points - 1)
    }

    socket.on("clickResponse", (data) => {
        if(data.pointsIncreased !== 0) {
          setPoints(points + data.pointsIncreased)
        }
        setUntilPoints(data.clicksLeftBeforePoints)
    })

  return (
        <div>
            <div id="instructions">
                <p>Hey there, your job is to click the button. Every click will decrease your points by one.<br></br>
                After each click you will be provided with the number of clicks before the next click resulting in increase in points.<br></br>
              <br></br>
                Points are given as follows: <br></br> 
                    5 points for every 10th.<br></br>
                    40 points for every 100th<br></br>
                    and 250 points for every 500th click.<br></br>
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
        </div>
    
  )
}

export default App