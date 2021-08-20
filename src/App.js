import React, { Component } from 'react';
import './App.css';
import { Selection } from './screens/Selection/Selection';
import { Board } from './screens/Board/Board';

export const ScreenNames = {
	selection: 'selection',
	board: 'board'
}

export class App extends Component {
	constructor () {
		super();
		this.state = {
			playersNames: [],
			screen: ScreenNames.selection,
			players: {}
		}
	}

	setScreen(screen) {
		this.setState({screen});
	}

	onStartClicked(names) {
		this.setState({
			screen: ScreenNames.board,
			playersNames: names
		});
	}

  render() {
		const {screen, playersNames} = this.state;
		if (screen === ScreenNames.selection) {
			return <Selection
				onStartClicked={names => this.onStartClicked(names)}
			/>
		}
		else if (screen === ScreenNames.board) {
			return <Board 
				timeStarted={new Date().getTime()} 
				players={playersNames}
			/>
		}
		return (<h1>Somethings wrong</h1>);
  }
}
