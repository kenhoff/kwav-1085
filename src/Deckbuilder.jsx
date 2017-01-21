import React, {PropTypes} from 'react'

class Deckbuilder extends React.Component {
	// <h2>{`cards in your deck: ${totalCards} / ${this.props.maxCardsAllowed}`}</h2>
	render() {
		return (
			<div>
				<h1>this the deckbuilding part</h1>
				<h2>cards in your library</h2>
				<div>{this.props.playerWorkingLibrary.map((card) => {
						return (
							<div key={Math.random()}>
								<div>{`${card.title}`}</div>
								<button onClick={() => {
									this.props.addCardFromWorkingLibraryToDeck(card.id)
								}}>Add to deck</button>
							</div>
						)
					})}</div>
				<h2>cards in your deck</h2>
				<div>{this.props.playerDeck.map((card) => {
						return (
							<div key={Math.random()}>
								<div >{`${card.title}`}</div>
								<button onClick={() => {
									this.props.putCardBackFromDeckToWorkingLibrary(card.id)
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
	playerWorkingLibrary: PropTypes.array.isRequired,
	playerDeck: PropTypes.array.isRequired,
	getCardByID: PropTypes.func.isRequired,
	addCardFromWorkingLibraryToDeck: PropTypes.func.isRequired,
	putCardBackFromDeckToWorkingLibrary: PropTypes.func.isRequired,
	maxCardsAllowed: PropTypes.number,
	startGame: PropTypes.func.isRequired
}
Deckbuilder.defaultProps = {
	maxCardsAllowed: 20
}

export default Deckbuilder;
