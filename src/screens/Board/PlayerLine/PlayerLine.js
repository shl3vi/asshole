import React, { Component } from 'react';
import './PlayerLine.css';
import '../../../App.css';
import classNames from 'classnames';

export class PlayerLine extends Component {
	createTd(val) {
		return (
			<td>
				<div className={classNames('centered', 'td-wrapper')}>
					<div>
						<span>
							{val}
						</span>
					</div>
				</div>
			</td>
		);
  }

  createNameTd = (val, {withCrown, withClown}, isStarted) => {
	return this.createTd(<div className='td-content-container'>
			{val}
			{isStarted && withCrown && <img className={classNames("status-image","status-image-crown")} src='./crown.png'/>}
			{isStarted && withClown && <img className={classNames("status-image","status-image-clown")} src='./clown.png'/>}
		</div>	)
  }

  createCardsTd = (lastPosition, numOfPlayers, isSomePlayerClicked) => {
	  console.log(lastPosition);
	  const aCard = (color) => <img className={classNames("card")} src={`./${color}_card.png`}/>
	  const blueCard = aCard('blue');
	  const redCard = aCard('red');
	
	  if (!isSomePlayerClicked) {
		  if (lastPosition === 1) {
			  return this.createTd(<div>{blueCard}{blueCard}</div>);
		  }
		  if (lastPosition === 2) {
			  return this.createTd(<div>{blueCard}</div>);
		  }
		  if (lastPosition === numOfPlayers - 1) {
			  return this.createTd(<div>{redCard}</div>);
		  }
		  if (lastPosition === numOfPlayers) {
			  return this.createTd(<div>{redCard}{redCard}</div>);
		  }
	  }
	
	return this.createTd(<div className={"cards-placeholder"}></div>);
  }

	createPositionsStatisticsTdContent(positions) {
		return this.createTd(
      <table className={`positions-statistics-table-${positions.length}`}>
        {positions.map((position) => {
          return <tr>
            <td><span>{position}</span></td>
          </tr>
        })}
      </table>
		);
  }

  render() {
    const {player, handleClick, lineHeight, gap, currentPosition, isSomePlayerClicked} = this.props;
		const {name, score, clicked, positions, lastPosition} = player;
		const isStarted = positions.some(position => position);
    return (
			<tr
				style={ { height:  `${lineHeight}%`} }
				className={classNames("player-line", {clicked} )}
				id={name}
				onClick={_e => handleClick(name)}>
				{this.createTd(`+${gap}`)}
				{this.createTd(score)}
				{this.createNameTd(name, {withCrown: currentPosition === 1, withClown: currentPosition === positions.length}, isStarted)}
				{this.createCardsTd(lastPosition, positions.length, isSomePlayerClicked)}
        		{this.createPositionsStatisticsTdContent(positions)}
			</tr>
    );
  }
}
