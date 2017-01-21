import React, {PropTypes} from 'react'
import Card from "./Card.jsx";

class CardList extends React.Component {
	render() {
		return (
			<div>
				<div>{this.props.cards.map((card) => {
						return (
							<div key={Math.random()}>
								<Card card={card} actionWhenClicked={this.props.actionWhenClicked}></Card>
							</div>
						)
					})}</div>
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
