import React from 'react';
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as Scale from '../models/Scale';

const style = {
	title   : {
		marginTop: 45
	},
	toneCell: {
		fontSize  : 20,
		marginLeft: 5
	},
	cell    : {
		verticalAlign: 'middle'
	}
};

export const HarmonizationComponent = props => (
	<ReactCSSTransitionGroup
		transitionName="section"
		transitionEnterTimeout={0}
		transitionAppear={true}
		transitionAppearTimeout={0}
		transitionLeaveTimeout={0}>

		<h1>
			{props.tone.toString()} harmonization
		</h1>
		
		<br/>
		
		<p>
			<Link to="/">
				<i className="fa fa-arrow-left"/> Back
			</Link>
		</p>
		
		<table className="table table-bordered">
			<tbody>
				<tr>
					<td style={style.cell}>Major scale</td>
					<td className="text-right">
						{getMajorModeIntervals(props.tone, 1)}
					</td>
				</tr>
			</tbody>
		</table>
  </ReactCSSTransitionGroup>
);

const getMajorModeIntervals = (tone, modeIndex) => {
	const intervalRef = Scale.MAJOR[modeIndex];
	const majorMode   = Scale.MAJOR
		.map(interval => Math.abs(interval - intervalRef + 12) % 12)
		.sort((a, b) => a > b);
	
	return getMajorScale(tone, majorMode);
};

const getMajorScale = (tone, mode) => {
	let scale = [];
	
	for (let interval of mode) {
		scale.push(tone.next(interval))
	}
	
	return optimizeScale(scale).map((t, i) => (
		<span key={i} className="badge badge-primary" style={style.toneCell}>
	    {t.toString()}
    </span>
	));
};

const optimizeScale = (scaleToTest) => {
	const firstResults = [];
	const lastResults  = [];
	let cursor         = 1;
	
	for (let i = 0; i <= Math.pow(2, scaleToTest.length); i++) {
		let tmp = scaleToTest.map((tone, index) => (i & Math.pow(2, index)) === Math.pow(2, index) ? tone.twin() || tone : tone);
		if (isValid(tmp)) {
			firstResults.push(tmp);
		}
	}
	
	for (let i = 0; i < firstResults.length; i++) {
		const scale         = firstResults[i];
		const firstNoteSame = scale[0].note === scaleToTest[0].note;
		
		let hasNoDuplicates = true;
		
		for (let j = 0; j < scale.length; j++) {
			const tone = scale[j];
			
			if (scale.some((t, index) => j !== index && tone.note === t.note)) {
				hasNoDuplicates = false;
				break;
			}
		}
		
		if (firstNoteSame && hasNoDuplicates) {
			return scale;
		}
		else if (hasNoDuplicates) {
			lastResults.unshift(scale);
		}
		else if (firstNoteSame) {
			lastResults.push(scale);
		}
	}
	
	return lastResults[0];
};

function isValid(arr) {
	let i = 0;
	
	while (i < arr.length) {
		if (arr.some((tone, index) => tone.alt === 'FLAT' && arr[i].alt === 'SHARP' || tone.alt === 'SHARP' && arr[i].alt === 'FLAT')) {
			return false;
		}
		
		i++;
	}
	
	return true;
}

HarmonizationComponent.propTypes = {
	tone: React.PropTypes.object,
	
	onBack: React.PropTypes.func.isRequired
};
