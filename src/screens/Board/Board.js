import React, { Component } from 'react';
import './Board.css';
import { PlayersList } from './PlayersList/PlayersList';
import _ from 'lodash';
import { Header } from './Header/Header';

export class Board extends Component {
	constructor (props) {
		super();
		const players = this.createPlayers(props.players);
		this.state = {
			players,
			totalClicked: 0,
			snapshots: [players, {endRound: true}],
			lineHeight: (100 / props.players.length)
		}
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

		if (totalClickedNew === this.props.players.length) {
			totalClickedNew = 0;
			this.props.players.forEach(name => {
				playersNew[name].clicked = false;
			})
			snapshotsNew.push({endRound: true});
		}
		console.log(snapshotsNew);
		this.setState({
			players: playersNew,
			totalClicked: totalClickedNew,
			snapshots: snapshotsNew
		})
	}

	onResetLastRound() {
		const {snapshots} = this.state;
		const snapshotsNew = [].concat(snapshots);
		if (snapshotsNew[snapshotsNew.length - 1].endRound) {
			if (snapshotsNew.length < 3) return;
			snapshotsNew.pop();
		}
		while (!snapshotsNew[snapshotsNew.length - 1].endRound) {
			console.log('here');
			snapshotsNew.pop();
		}
		this.setState({
			players: snapshotsNew[snapshotsNew.length - 2],
			totalClicked: 0,
			snapshots: snapshotsNew
		})
	}

  render() {
		const {players, lineHeight} = this.state;
    return (
      <div className="board">
				<Header onResetLastRound={() => this.onResetLastRound()}/>
				<PlayersList 
					lineHeight={lineHeight}
					onPlayerClicked={(name) => this.onPlayerClicked(name)}
					players={players}/>
      </div>
    );
  }
}
