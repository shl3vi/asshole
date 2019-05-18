import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
  render() {
		const {onResetLastRound} = this.props;
    return (
			<div className="board-header">
				<button className="reset-round" onClick={onResetLastRound}>Reset</button>
			</div>
    );
  }
}
