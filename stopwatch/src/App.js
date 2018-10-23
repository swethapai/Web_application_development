import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App"> 
      <h2> Stopwatch Application </h2>
      <Stopwatch />
      </div>
    );
  }
}

class Stopwatch extends Component {
  state = {
    on: false,
    runtime: 0,
    prev: 0
  };

  handleStartStop = () => {
    this.setState ( state => {
      if(state.on) {
        clearInterval(this.timer);
      }
      else {
        const startTime=Date.now() - this.state.runtime;
        this.timer = setInterval(() => {
          this.setState({runtime: Date.now()-startTime});
          
        });
      }
      return{on: !state.on};
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({prev: Date.now() - (Date.now() - this.state.runtime)});
    this.setState({runtime:0, running:false})
  }

  render() {
  const { on, runtime, prev} = this.state;
  return (
  <div> 
  <h3>{runtime}ms</h3>
  <button onClick={this.handleStartStop}> {on ? 'Stop' : 'Start'} </button>
  <button onClick={this.handleReset}> Reset </button>
  <p>Time elapsed until last reset-{prev}ms </p>
  </div>
  );
}
}

export default App;
