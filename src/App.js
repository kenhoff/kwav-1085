import React, {Component} from 'react';
import Deckbuilder from "./Deckbuilder.jsx";
import RadioWavesEngine from "./engine.js";
import abilityTypes from "./abilityTypes.js";
import abilityCards from "./abilityCards.js";
import encounterCards from "./encounterCards.js";
import CardList from "./CardList.jsx";
import Encounter from "./Encounter.jsx";

let game = new RadioWavesEngine([], abilityTypes, abilityCards, encounterCards);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuState: "main-menu"
		};
	}
	render() {
		if (game.gameState == "started") {
			return (
				<div>
					<h1>Cards in your deck:</h1>
					<CardList cards={game.deck} allAbilityCards={game.allAbilityCards}></CardList>
					<Encounter encounterCard={game.currentEncounter}></Encounter>
					<h1>Cards in your hand:</h1>
					<CardList cards={game.hand} allAbilityCards={game.allAbilityCards}></CardList>
					<h1>Cards in your discard pile:</h1>
					<CardList cards={game.discardPile} allAbilityCards={game.allAbilityCards}></CardList>
				</div>
			);
		} else {

			const backButton = <button onClick={() => {
				this.setState({menuState: "main-menu"});
			}}>back to main menu</button>

			switch (this.state.menuState) {
				case "main-menu":
					return (
						<div>
							<h1>R a d i o W a v e s</h1>
							<button onClick={() => {
								this.setState({menuState: "deckbuilding"});
							}}>New Game</button>
							<button onClick={() => {
								this.setState({menuState: "record-store"});
							}}>Record Store</button>
							<button onClick={() => {
								this.setState({menuState: "import-game"});
							}}>Import Game</button>
							<button onClick={() => {
								this.setState({menuState: "export-game"});
							}}>Export Game</button>
							<button onClick={() => {
								this.setState({menuState: "credits"});
							}}>Credits</button>
						</div>
					);
				case "deckbuilding":
					return (
						<div>
							{backButton}
							<Deckbuilder game={game} playerWorkingLibrary={game.workingLibrary} playerDeck={game.deck} getCardByID={game.getCardByID} addCardFromWorkingLibraryToDeck={(cardID) => {
								game.addCardFromWorkingLibraryToDeck(cardID);
								this.forceUpdate();
							}} putCardBackFromDeckToWorkingLibrary={(cardID) => {
								game.putCardBackFromDeckToWorkingLibrary(cardID);
								this.forceUpdate();
							}} startGame={() => {
								game.startGame();
								this.forceUpdate();
							}}></Deckbuilder>
						</div>
					);
				case "game-loop":
					return (
						<div>this is the game!</div>
					);
				case "record-store":
					return (
						<div>
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<h1>
								record store
							</h1>
						</div>
					);
				case "import-game":
					return (
						<div>
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<h1>
								import game
							</h1>
						</div>
					);
				case "export-game":
					return (
						<div>
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<h1>
								export game
							</h1>
						</div>
					);
				case "credits":
					return (
						<div>
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<h1>
								Bananacat + Kasey + Josh + Ken!
							</h1>
						</div>
					);
				default:
					return (
						<div>{`¯\\_(ツ)_/¯`}</div>
					)
			}

		}
	}
}

export default App;
