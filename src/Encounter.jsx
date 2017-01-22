import React, {PropTypes} from 'react'

class Encounter extends React.Component {
	render() {
		let text;
		if (this.props.gameState === "encounter-success") {
			text = this.props.encounterCard.successText
		} else if (this.props.gameState === "encounter-failed") {
			text = this.props.encounterCard.failureText
		} else {
			text = this.props.encounterCard.text
		}
		let continueButton = null;
		if (((this.props.gameState === "encounter-success") || (this.props.gameState === "encounter-failed"))) {
			continueButton = (
				<button onClick={this.props.continue}>Continue</button>
			);
		}
		let imageSrc = this.props.encounterCard.image
		if (this.props.gameState == "encounter-success") {
			imageSrc = this.props.encounterCard.successImage
		} else if (this.props.gameState == "encounter-failed") {
			imageSrc = this.props.encounterCard.failureImage
		}

		return (
			<div className="encounter">
				<img src={imageSrc} role="presentation"></img>
				<div className={this.props.encounterCard.resistance}>{text}</div>
				{continueButton}
			</div>
		)
	}
}

// <div>{this.props.encounterCard.name}</div>
Encounter.propTypes = {
	encounterCard: PropTypes.object.isRequired,
	continue: PropTypes.func.isRequired,
	gameState: PropTypes.string.isRequired
}

export default Encounter;
