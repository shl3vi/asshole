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

	createPositionsStatisticsTdContent(positions) {
		return (
      <table>
        {positions.map((position,i) => {
          return <tr>
            <td><span>{position}</span></td>
          </tr>
        })}
      </table>
		);
  }

  render() {
    const {player, handleClick, lineHeight, gap} = this.props;
		const {name, score, clicked, positions} = player;
    return (
			<tr
				style={ { height:  `${lineHeight}%`} }
				className={classNames("player-line", {clicked} )}
				id={name}
				onClick={_e => handleClick(name)}>
				{this.createTd(`+${gap}`)}
				{this.createTd(score)}
				{this.createTd(name)}
        {this.createTd(this.createPositionsStatisticsTdContent(positions))}
			</tr>
    );
  }
}
