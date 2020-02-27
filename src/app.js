import React, {useState} from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

const App = () => {

    function handleClick() {
        socket.emit("test")
    }

  return (
        <div>
            <div className="container">
                hello
            </div>
            <div id="button">
                <button onClick={() => handleClick()}>Click me!!</button>
            </div>
        </div>
    
  )
}

export default App