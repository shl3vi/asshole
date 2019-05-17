import React, { Component } from 'react';
import './App.css';

export class App extends Component {
	constructor () {
		super();
		this.state = {
			screen: 'choose',
			players: {}
		}
	}

	setScreen(screen) {
		this.setState({screen});
	}

	handleChosen() {
		this.setState({
			screen: 'game'
		})
	}

  render() {
		if (this.state.screen === 'game') {
			return <div>game</div>
		}
    return (
      <div className="App">
				<button onClick={() => this.setScreen('game')}>click</button>
				shahar is here
      </div>
    );
  }
}
