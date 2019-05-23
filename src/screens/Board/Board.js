import React, { Component } from 'react';
import './Board.css';
import { PlayersList } from './PlayersList/PlayersList';
import _ from 'lodash';
import { Header } from './Header/Header';

const ONE_MINUTE_IN_MS = 1000 * 60;

export class Board extends Component {
	constructor (props) {
		super();
		const players = this.createPlayers(props.players);
		this.state = {
			players,
			totalClicked: 0,
			snapshots: [players, {endRound: true}],
			lineHeight: (100 / props.players.length),
			gamesPlayed: 0,
			timeStarted: new Date().getTime(), 
			timePassed: 0
		}
		this.timer();
	}

	timer() {
		setTimeout(() => {
			this.setState({
				timePassed: new Date().getTime() - this.state.timeStarted
			})
			this.timer();
		}, ONE_MINUTE_IN_MS);
	}

	createPlayers(playersNames) {
		const players = {};
		playersNames.forEach(name => {
			players[name] = {
				name,
				score: 0,
				positions: playersNames.map(() => 0)
			}
		});
		return players;
	}

	endGame(playersNew, snapshotsNew) {
		this.props.players.forEach(name => {
			playersNew[name].clicked = false;
		})
		snapshotsNew.push({endRound: true});

		this.setState({
			players: playersNew,
			totalClicked: 0,
			snapshots: snapshotsNew,
			gamesPlayed: this.state.gamesPlayed + 1
		})
	}

	onPlayerClicked(name) {
		const {players, totalClicked, snapshots} = this.state;
		if (players[name].clicked) {
			return;
		}
		const playersNew = _.cloneDeep(players);;
		
		playersNew[name].clicked = true;
		let totalClickedNew = totalClicked + 1;
		
		const position = totalClicked;
		playersNew[name].positions = [].concat(playersNew[name].positions);
		playersNew[name].positions[position]++;

		const scoreForRound = this.props.players.length - totalClicked;
		playersNew[name].score += scoreForRound;

		const snapshotsNew = [].concat(snapshots);
		snapshotsNew.push(playersNew);

		console.log(snapshotsNew);

		if (totalClickedNew === this.props.players.length) {
			return this.endGame(playersNew, snapshotsNew);
		}

		this.setState({
			players: playersNew,
			totalClicked: totalClickedNew,
			snapshots: snapshotsNew
		})
	}

	onResetLastRound() {
		const {snapshots, gamesPlayed} = this.state;
		const snapshotsNew = [].concat(snapshots);
		let shouldDecreaseGamesCount = false;
		
		const isInitialState = snapshotsNew.length < 3;
		const isNoOneClicked = snapshotsNew[snapshotsNew.length - 1].endRound;
		if (isNoOneClicked && !isInitialState) {
			snapshotsNew.pop();
			shouldDecreaseGamesCount = true; 
		}
	
		while (!snapshotsNew[snapshotsNew.length - 1].endRound) {
			snapshotsNew.pop();
		}
		this.setState({
			players: snapshotsNew[snapshotsNew.length - 2],
			totalClicked: 0,
			snapshots: snapshotsNew,
			gamesPlayed: shouldDecreaseGamesCount ? gamesPlayed - 1 : gamesPlayed
		})
	}

  render() {
		const {players, lineHeight, gamesPlayed, timePassed} = this.state;
    return (
      <div className="board">
				<Header 
					onResetLastRound={() => this.onResetLastRound()}
					gamesPlayed={gamesPlayed}
					timePassed={timePassed}
				/>
				<PlayersList 
					lineHeight={lineHeight}
					onPlayerClicked={(name) => this.onPlayerClicked(name)}
					players={players}/>
      </div>
    );
  }
}
