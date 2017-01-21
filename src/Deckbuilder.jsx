import React, {PropTypes} from 'react'
// import Card from "./Card.jsx";
import CardList from "./CardList.jsx";

class Deckbuilder extends React.Component {

	render() {
		return (
			<div>
				<h1>this the deckbuilding part</h1>
				<h2>cards in your library (click to move to deck)</h2>
				<CardList cards={this.props.playerWorkingLibrary} actionWhenClicked={(cardID) => {
					this.props.addCardFromWorkingLibraryToDeck(cardID);
				}}></CardList>
				<h2>cards in your deck (click to move to library)</h2>
					<CardList cards={this.props.playerDeck} actionWhenClicked={(cardID) => {
						this.props.putCardBackFromDeckToWorkingLibrary(cardID)
					}}></CardList>
				<h2>All done?</h2>
				<button onClick={this.props.startGame}>start game</button>
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
