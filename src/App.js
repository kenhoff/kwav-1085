import React, {Component} from 'react';
import game from "./engine.js";

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			menuState: "main-menu"
		}
	}
	render() {
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
				break;
			case "deckbuilding":
				return (
					<div>
						<button onClick={() => {
							this.setState({menuState: "main-menu"});
						}}>back to main menu</button>
						<h1>
							dis da deckbuilding part
						</h1>
					</div>
				);
				break;
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
				break;
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
				break;
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
				break;
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
				break;
		}
	}
}

export default App;
