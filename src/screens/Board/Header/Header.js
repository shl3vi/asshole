import React, { Component } from 'react';
import './Header.css';

const ONE_HOUR_IN_MS = 1000 * 60 * 60;

export class Header extends Component {
  render() {
		const {onResetLastRound, gamesPlayed, timePassed} = this.props;

		const hoursPassed = Math.floor(timePassed / ONE_HOUR_IN_MS);
		const minutesPassed = Math.floor((timePassed % ONE_HOUR_IN_MS)/60000);

    return (
			<div className="board-header">
				<button className="reset-round" onClick={onResetLastRound}>חזור</button>
				<button className="reset-round">משחקים: {gamesPlayed}</button>
				<button className="reset-round">time passed: {hoursPassed}:{minutesPassed}</button>
			</div>
    );
  }
}
