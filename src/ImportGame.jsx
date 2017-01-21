import React, {PropTypes} from 'react'

class ImportGame extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputField: ""
		}
	}
	render() {
		return (
			<div>
				<input value={this.state.inputField} onChange={(e) => {
					this.setState({inputField: e.target.value});
				}}></input>
				<button onClick={() => {
					this.props.importGame(this.state.inputField)
				}}>import game</button>
			</div>
		)
	}
}

ImportGame.propTypes = {
	importGame: PropTypes.func.isRequired
}

export default ImportGame;
