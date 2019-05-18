import React, { Component } from 'react';
import './Selection.css';
import '../../App.css';
import classnames from 'classnames';

export class Selection extends Component {
	onStartClicked() {
		this.props.onStartClicked();
		const inputs = Array.from(document.getElementsByTagName('input'));
		const names = [];
		inputs.forEach(input => {
			if (input.value) {
				names.push(input.value);
			}
		});
		this.props.onStartClicked(names);
	}

  render() {
		return (
      <div className={classnames('selection-wrapper', 'centered')}>
				<div className="inputs-wrapper">
					<div className={classnames('centered', 'selection-header')}>
						<span>משתתפים</span>
					</div>
					<input defaultValue="מוטי"/>
					<input defaultValue="נתי"/>
					<input defaultValue="אופיר"/>
					<input defaultValue="עמי"/>
					<input defaultValue="שחר"/>
					<input/>
					<div className="centered">
						<button onClick={() => this.onStartClicked()}>התחל</button>
					</div>
				</div>
			</div>
    );
  }
}
