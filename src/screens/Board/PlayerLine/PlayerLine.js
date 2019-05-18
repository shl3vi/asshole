import React, { Component } from 'react';
import './PlayerLine.css';
import '../../../App.css';
import classNames from 'classnames';

export class PlayerLine extends Component {
	createTd(val) {
		return (
			<td>
				<div className={classNames('centered', 'td-wrapper')}>
					<div><span>{val}</span></div>
				</div>
			</td>
		);
	}
  render() {
		const {player, handleClick, lineHeight, gap} = this.props;
		const {name, score, clicked} = player;
    return (
			<tr
				style={ { height:  `${lineHeight}%`} }
				className={classNames("player-line", {clicked} )}
				id={name}
				onClick={_e => handleClick(name)}>
				{this.createTd(`+${gap}`)}
				{this.createTd(score)}
				{this.createTd(name)}
			</tr>
    );
  }
}
