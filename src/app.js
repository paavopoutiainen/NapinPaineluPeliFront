import React, {useState} from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

const App = () => {

    function handleClick() {
        socket.emit("test")
    }

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
            <div id="button">
                <button onClick={() => handleClick()}>Click me!!</button>
            </div>
        </div>
    
  )
}

export default App