import React, { Component } from 'react';
import './PlayersList.css';
import { PlayerLine } from '../PlayerLine/PlayerLine';

export class PlayersList extends Component {

	onPlayerClicked(name) {
		const {onPlayerClicked} = this.props;
		console.log('clicked', name);
		onPlayerClicked(name);
	}
	
  render() {
		const {players, lineHeight} = this.props;
		
		const sortedPlayers = [].concat(Object.keys(players))
			.sort((player1, player2) => players[player2].score - players[player1].score)
		
		return (
      <div className="list-wrapper">
			<table>
				<tbody>
					{sortedPlayers.map((name, i) => {
						const playerScore = players[name].score;
						const gap = i === sortedPlayers.length - 1 ?
							0 :
							playerScore - players[sortedPlayers[i+1]].score;

						return <PlayerLine 
							isSomePlayerClicked={Object.keys(players).some(name => players[name].clicked)}
							currentPosition={i + 1}
							key={name}
							lineHeight={lineHeight}
							player={players[name]}
							handleClick={(name) => this.onPlayerClicked(name)}
							gap={gap}
						/>}
					)}
				</tbody>
			</table>	
		</div>
    );
  }
}
