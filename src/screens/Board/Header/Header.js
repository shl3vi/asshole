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
				<div>
					<span className="reset-round">
						<button onClick={onResetLastRound}>חזור</button>
					</span>
				</div>
				<div>
					<span className="games-played">
						משחקים {gamesPlayed}
					</span>
				</div>
				<div>
					<span className="time-passed">
						זמן משחק {hoursPassed}:{minutesPassed}
					</span>
				</div>
			</div>
    );
  }
}
