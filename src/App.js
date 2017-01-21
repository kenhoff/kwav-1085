import React, {Component} from 'react';
import Deckbuilder from "./Deckbuilder.jsx";
import RadioWavesEngine from "./engine.js";
import abilityTypes from "./abilityTypes.js";
import abilityCards from "./abilityCards.js";
import encounterCards from "./encounterCards.js";
import CardList from "./CardList.jsx";
import Encounter from "./Encounter.jsx";
import Store from "./Store.jsx";
import ImportGame from "./ImportGame.jsx";

let game = new RadioWavesEngine([], abilityTypes, abilityCards, encounterCards);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuState: "main-menu"
		};

	}
	componentDidMount() {
		if (localStorage["radio-waves"]) {
			try {
				game = new RadioWavesEngine(JSON.parse(atob(localStorage["radio-waves"])), abilityTypes, abilityCards, encounterCards)
				this.forceUpdate();
			} catch (e) {
				game = new RadioWavesEngine([], abilityTypes, abilityCards, encounterCards);
				this.forceUpdate();
			} finally {
				game.gameOver = () => {
					this.setState({menuState: "main-menu"});
				}
			}
		}
	}
	render() {
		if (game.gameState === "started") {
			return (
				<div>
					<div>{`current level: ${game.currentLevel}`}</div>
					<h1>Cards in your deck:</h1>
					<CardList cards={game.deck}></CardList>
					<Encounter encounterCard={game.currentEncounter}></Encounter>
					<h1>Cards in your hand:</h1>
					<CardList cards={game.hand} actionWhenClicked={(cardID) => {
						game.playCardFromHandIntoCurrentEncounter(cardID);
						this.forceUpdate();
					}}></CardList>
					<h1>Cards in your discard pile:</h1>
					<CardList cards={game.discardPile}></CardList>
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
								game.resetDeckbuilding();
								this.setState({menuState: "deckbuilding"});
							}}>New Game</button>
							<button onClick={() => {
								game.resetDeckbuilding();
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
							<Deckbuilder game={game} playerWorkingLibrary={game.workingLibrary} playerDeck={game.deck} addCardFromWorkingLibraryToDeck={(cardID) => {
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
							<Store playerWorkingLibrary={game.workingLibrary} store={game.store} addCardFromWorkingLibraryToStore={(cardID) => {
								game.addCardFromWorkingLibraryToStore(cardID);
								this.forceUpdate()
							}} putCardBackFromStoreToWorkingLibrary={(cardID) => {
								game.putCardBackFromStoreToWorkingLibrary(cardID);
								this.forceUpdate()
							}} transmuteStoreCards={() => {
								game.transmuteStoreCards();
								this.forceUpdate();
							}}></Store>
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
							<ImportGame importGame={(gameString) => {
								game = new RadioWavesEngine(JSON.parse(atob(gameString)), abilityTypes, abilityCards, encounterCards);
								game.saveGame();
								this.forceUpdate();
							}}></ImportGame>
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
							<p>
								{`To take your game to another computer, just copy and paste this code in the "import game" section:`}
							</p>
							<p>{localStorage["radio-waves"]}</p>
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
