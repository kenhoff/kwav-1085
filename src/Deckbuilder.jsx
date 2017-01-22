import React, {PropTypes} from 'react'
// import Card from "./Card.jsx";
import CardList from "./CardList.jsx";

class Deckbuilder extends React.Component {

	render() {
		return (
			<div className="deckbuilder">
				<div className="library">
					<h2>Library</h2>
					<CardList cards={this.props.playerWorkingLibrary} actionWhenClicked={(cardID) => {
						this.props.addCardFromWorkingLibraryToDeck(cardID);
					}}></CardList>
				</div>
				<div className="deck">
					<h2>{`Deck ${this.props.playerDeck.length} / ${this.props.maxCardsAllowed} cards`}</h2>
					<CardList cards={this.props.playerDeck} actionWhenClicked={(cardID) => {
						this.props.putCardBackFromDeckToWorkingLibrary(cardID)
					}}></CardList>
				</div>
				<div className="go-button">
					<button onClick={this.props.startGame}>Start Playing --></button>
				</div>
			</div>
		)
	}
}

Deckbuilder.propTypes = {
	playerWorkingLibrary: PropTypes.array.isRequired,
	playerDeck: PropTypes.array.isRequired,
	addCardFromWorkingLibraryToDeck: PropTypes.func.isRequired,
	putCardBackFromDeckToWorkingLibrary: PropTypes.func.isRequired,
	maxCardsAllowed: PropTypes.number,
	startGame: PropTypes.func.isRequired
}
Deckbuilder.defaultProps = {
	maxCardsAllowed: 20
}

export default Deckbuilder;
