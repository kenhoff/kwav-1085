import React, {PropTypes} from 'react'
import rarities from "./rarityLevels.js";

class Card extends React.Component {
	render() {
		let cardImg = "vinyl-icon.png";
		if (this.props.card.image) {
			cardImg = this.props.card.image
		}

		return (
			<div className={`card ${rarities[this.props.card.rarity]}`} onClick={() => {
				if (this.props.actionWhenClicked) {
					this.props.actionWhenClicked(this.props.card.id)
				}
			}}>
				<div className="card-image">
					<img src={cardImg} role="presentation"></img>
				</div>
				<div className="card-bottom-bar">
					<div className={`card-type ${this.props.card.type}`}>{this.props.card.type}</div>
					<div className={`card-rarity ${rarities[this.props.card.rarity]}`}>{rarities[this.props.card.rarity]}</div>
				</div>
			</div>
		)
	}
}

Card.propTypes = {
	card: PropTypes.object.isRequired
}

export default Card;
