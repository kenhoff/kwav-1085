import React, {PropTypes} from 'react'

class Encounter extends React.Component {
	render() {
		return (
			<div>
				<h1>Encounter</h1>
				<div>{this.props.encounterCard.name}</div>
				<div>{this.props.encounterCard.text}</div>
			</div>
		)
	}
}

Encounter.propTypes = {
	encounterCard: PropTypes.object.isRequired
}

export default Encounter;
