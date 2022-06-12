import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialCoordinates = {
  x: 2,
  y: 2
}

// const initialState = {
//   message: initialMessage,
//   email: initialEmail,
//   index: initialIndex,
//   steps: initialSteps,
// }

export default class AppClass extends React.Component {

  state = {
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
    coordinates: initialCoordinates
  }

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = (index) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    switch(index){
      case 0: 
        this.setState({...this.state, coordinates: {x: 1, y: 1 }});
        return this.state;
      case 1:
        this.setState({...this.state, coordinates: {x: 2, y: 1 }});
        return this.state;
      case 2:
        this.setState({...this.state, coordinates: {x: 3, y: 1 }});
        return this.state;
      case 3:
        this.setState({...this.state, coordinates: {x: 1, y: 2 }});
        return this.state;
      case 4:
        this.setState({...this.state, coordinates: {x: 2, y: 2 }});
        return this.state;
      case 5:
        this.setState({...this.state, coordinates: {x: 3, y: 2 }});
        return this.state;
      case 6:
        this.setState({...this.state, coordinates: {x: 1, y: 3 }});
        return this.state;
      case 7:
        this.setState({...this.state, coordinates: {x: 2, y: 3 }});
        return this.state;
      case 8:
        this.setState({...this.state, coordinates: {x: 3, y: 3 }});
        return this.state;

      default: console.log('Something is Wrong')
    }
  }

  componentDidMount(){
    this.getXYMessage(this.state.index);
  }

  getXYMessage = (index) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${this.getXY(index)}`
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.index !== prevState.index){
      this.getXYMessage(this.state.index);
    }
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      coordinates: initialCoordinates
    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && this.state.index % 3 !== 0){
      this.setState({
        ...this.state,
        index: this.state.index - 1,
        steps: this.state.steps + 1,
        message: initialMessage
      });
    }
    else if(direction === 'right' && this.state.index % 3 !== 2){
      this.setState({
        ...this.state,
        index: this.state.index + 1,
        steps: this.state.steps + 1,
        message: initialMessage
      });
    }
    else if(direction === 'up' && this.state.index > 2){
      this.setState({
        ...this.state,
        index: this.state.index - 3,
        steps: this.state.steps + 1,
        message: initialMessage
      });
    }
    else if(direction === 'down' && this.state.index < 6){
      this.setState({
        ...this.state,
        index: this.state.index + 3,
        steps: this.state.steps + 1,
        message: initialMessage
      });
    } else {
      this.setState({
        ...this.state,
        message: `You can't go ${direction}`
      });
    }

    return this.state.index;
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.getNextIndex(evt.target.id);
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    });
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.coordinates.x}, {this.state.coordinates.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email" />
          <input onSubmit={this.onSubmit} id="submit" type="submit" />
        </form>
      </div>
    )
  }
}

