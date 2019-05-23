import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
  render() {
		const {onResetLastRound, gamesPlayed} = this.props;
    return (
			<div className="board-header">
				<button className="reset-round" onClick={onResetLastRound}>חזור</button>
				<button className="reset-round">משחקים: {gamesPlayed}</button>
			</div>
    );
  }
}
