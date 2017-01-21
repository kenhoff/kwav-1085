import React, {PropTypes} from 'react'

class CardList extends React.Component {
	render() {
		return (
			<div>
				<div>{Object.keys(this.props.cards).map((key) => {
						return (
							<div key={key}>
								<div >{`${this.props.allAbilityCards[key].title}: ${this.props.cards[key]}`}</div>
							</div>
						)
					})}</div>

			</div>
		)
	}
}

CardList.propTypes = {
	cards: PropTypes.object,
	allAbilityCards: PropTypes.object.isRequired
}

CardList.defaultProps = {
	cards: {}
}

export default CardList;
