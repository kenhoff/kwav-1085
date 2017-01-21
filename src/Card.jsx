import React, {PropTypes} from 'react'
import rarities from "./rarityLevels.js";

class Card extends React.Component {
	render() {
		return (
			<div onClick={() => {
				if (this.props.actionWhenClicked) {
					this.props.actionWhenClicked(this.props.card.id)
				}
			}}>{`${this.props.card.title} (${rarities[this.props.card.rarity]}) (${this.props.card.type})`}</div>
		)
	}
}

Card.propTypes = {
	card: PropTypes.object.isRequired
}

export default Card;
