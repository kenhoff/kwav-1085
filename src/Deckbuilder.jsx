import React, {PropTypes} from 'react'

class Deckbuilder extends React.Component {
	render() {
		// sum cards
		let totalCards = 0;
		for (var cardID in this.props.playerDeck) {
			if (this.props.playerDeck.hasOwnProperty(cardID)) {
				totalCards += this.props.playerDeck[cardID]
			}
		}

		return (
			<div>
				<h1>this the deckbuilding part</h1>
				<h2>cards in your library</h2>
				<div>{Object.keys(this.props.playerWorkingLibrary).map((key) => {
						return (
							<div key={key}>
								<div>{`${this.props.allAbilityCards[key].title}: ${ (this.props.playerWorkingLibrary[key] === -1
										? "unlimited"
										: this.props.playerWorkingLibrary[key])}`}</div>
								<button onClick={() => {
									this.props.addCardFromLibraryToDeck(key)
								}}>Add to deck</button>
							</div>
						)
					})}</div>
				<h2>{`cards in your deck: ${totalCards} / ${this.props.maxCardsAllowed}`}</h2>
				<div>{Object.keys(this.props.playerDeck).map((key) => {
						return (
							<div key={key}>
								<div >{`${this.props.allAbilityCards[key].title}: ${this.props.playerDeck[key]}`}</div>
								<button onClick={() => {
									this.props.putCardBackFromDeckToLibrary(key)
								}}>Put back in library</button>
							</div>
						)
					})}</div>
				<h2>All done?</h2>
				<button onClick={this.props.startGame}>start game</button>
			</div>
		)
	}
}

Deckbuilder.propTypes = {
	playerWorkingLibrary: PropTypes.object.isRequired,
	playerDeck: PropTypes.object.isRequired,
	allAbilityCards: PropTypes.object.isRequired,
	addCardFromLibraryToDeck: PropTypes.func.isRequired,
	putCardBackFromDeckToLibrary: PropTypes.func.isRequired,
	maxCardsAllowed: PropTypes.number,
	startGame: PropTypes.func.isRequired
}
Deckbuilder.defaultProps = {
	maxCardsAllowed: 20
}

export default Deckbuilder;
