import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialCoordinates = {
  x: 2,
  y: 2
}

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  

  function getXY(index){
    switch(index){
      case 0: 
        setCoordinates({x: 1, y: 1 });
        return coordinates;
      case 1:
        setCoordinates({x: 2, y: 1 });
        return coordinates;
      case 2:
        setCoordinates({x: 3, y: 1 });
        return coordinates;
      case 3:
        setCoordinates({x: 1, y: 2 });
        return coordinates;
      case 4:
        setCoordinates({x: 2, y: 2 });
        return coordinates;
      case 5:
        setCoordinates({x: 3, y: 2 });
        return coordinates;
      case 6:
        setCoordinates({x: 1, y: 3 });
        return coordinates;
      case 7:
        setCoordinates({x: 2, y: 3 });
        return coordinates;
      case 8:
        setCoordinates({x: 3, y: 3 });
        return coordinates;

      default: console.log('Something is Wrong')
    }
  }

  function getXYMessage(index) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${getXY(index)}`
  }

  useEffect(() => {
    getXYMessage(index)
  }, [index])

  function reset() {
    // Use this helper to reset all states to their initial values.
    // setCoordinates(initialCoordinates);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && index % 3 !== 0){
      setIndex(index - 1);
      setSteps(steps + 1);
      setMessage(initialMessage);
      
    }

    else if(direction === 'right' && index % 3 !== 2){
      setIndex(index + 1);
      setSteps(steps + 1);
      setMessage(initialMessage);
    }

    else if(direction === 'up' && index > 2){
      setIndex(index - 3);
      setSteps(steps + 1);
      setMessage(initialMessage);
    }

    else if(direction === 'down' && index < 6){
      setIndex(index + 3);
      setSteps(steps + 1);
      setMessage(initialMessage);
    } else {
        setMessage(`You can't go ${direction}`);
    }

    return index;
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(evt.target.id);
    
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    setEmail(initialEmail);
    // setIndex(initialIndex);
    // setSteps(initialSteps);
    
    
    // Use a POST request to send a payload to the server.
    const newPost = {
      x: coordinates.x,
      y: coordinates.y,
      steps: steps,
      email: email
    }
    
    
    axios.post('http://localhost:9000/api/result', newPost)
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        if(!email){
          setMessage(`Ouch: email is required`);
        } 
        else if (email === 'foo@bar.baz'){
          console.log(err);
          setMessage(err.response.data.message);
        }
        else {
          setMessage(`Ouch: email must be a valid email`)
        }
      });
    }
    
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({coordinates.x}, {coordinates.y})</h3>
        <h3 id="steps">{steps === 1 ? `You moved ${steps} time` : `You moved ${steps} times`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} value='left' id="left">LEFT</button>
        <button onClick={move} value='up' id="up">UP</button>
        <button onClick={move} value='right' id="right">RIGHT</button>
        <button onClick={move} value='down' id="down">DOWN</button>
        <button onClick={reset} value='reset' id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={email} id="email" type="email" placeholder="type email"></input>
        <input  id="submit" type="submit"></input>
      </form>
    </div>
  )
}
