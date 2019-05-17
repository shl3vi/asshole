import React, { Component } from 'react';
import './App.css';

class Board extends Component {
	constructor () {
		super();
		this.state = {}
	}

  render() {
		if (this.state.screen === 'game') {
			return <div>game</div>
		}
    return (
      <div className="Board">
				Game
      </div>
    );
  }
}
