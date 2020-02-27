import React from 'react'

const Tryagain = ({ handleTryAgainYes }) => {
   
    return (
        <div id="tryAgain">
            <p><strong>You have zero points left. Do you wanna try again?</strong></p>
            <button onClick={() => handleTryAgainYes()}>Try Again!</button> 
        </div>
    );
};

export default Tryagain;