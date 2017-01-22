import React, {PropTypes} from 'react'
import rarities from "./rarityLevels.js";

class Card extends React.Component {
	render() {
		return (
			<div className={`card ${rarities[this.props.card.rarity]}`} onClick={() => {
				if (this.props.actionWhenClicked) {
					this.props.actionWhenClicked(this.props.card.id)
				}
			}}>
				<div className="card-top-bar">
					<div className="card-title">{this.props.card.title}</div>
					<div className={`card-type ${this.props.card.type}`}>{this.props.card.type}</div>
				</div>
				<div className="card-image">
					<img src="/lp_record-512.png" role="presentation"></img>
				</div>
				<div className="card-mid-bar">
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
