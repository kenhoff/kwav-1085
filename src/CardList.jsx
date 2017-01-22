import React, {PropTypes} from 'react'
import Card from "./Card.jsx";

class CardList extends React.Component {
	render() {
		let sortedCards = this.props.cards.sort(function(a, b) {
			if (a.rarity > b.rarity) {
				return -1;
			} else if (b.rarity > a.rarity) {
				return 1;
			} else {
				// js-fu
				return ((a.type > b.type) - (a.type < b.type))
			}
		})
		return (
			<div className="card-list">{sortedCards.map((card) => {
					return (
						<div key={Math.random()}>
							<Card card={card} actionWhenClicked={this.props.actionWhenClicked}></Card>
						</div>
					)
				})}
			</div>
		)
	}
}

CardList.propTypes = {
	cards: PropTypes.array,
	actionWhenClicked: PropTypes.func
}

CardList.defaultProps = {
	cards: []
}

export default CardList;
