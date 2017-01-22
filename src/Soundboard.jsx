import React from 'react'

class Soundboard extends React.Component {
	render() {
		return (
			<div>
				<h1>Soundboard</h1>
				<button onClick={() => {
					document.getElementById("soundboard-caller-entrance").play();
				}}>Caller Entrance</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-success").play();
				}}>Caller Success</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-failure").play();
				}}>Caller Failure</button>
				<button onClick={() => {
					document.getElementById("soundboard-evening-entrance").play();
				}}>Evening Entrance</button>
				<button onClick={() => {
					document.getElementById("soundboard-evening-success").play();
				}}>Evening Success</button>
				<button onClick={() => {
					document.getElementById("soundboard-evening-failure").play();
				}}>Evening Failure</button>
				<button onClick={() => {
					document.getElementById("soundboard-producer-entrance").play();
				}}>Producer Entrance</button>
				<button onClick={() => {
					document.getElementById("soundboard-producer-success").play();
				}}>Producer Success</button>
				<button onClick={() => {
					document.getElementById("soundboard-producer-failure").play();
				}}>Producer Failure</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-1").play();
				}}>Caller 1</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-2").play();
				}}>Caller 2</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-3").play();
				}}>Caller 3</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-4").play();
				}}>Caller 4</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-5").play();
				}}>Caller 5</button>
				<button onClick={() => {
					document.getElementById("soundboard-caller-6").play();
				}}>Caller 6</button>
				<button onClick={() => {
					document.getElementById("soundboard-play-song-1").play();
				}}>Play Song 1</button>
				<button onClick={() => {
					document.getElementById("soundboard-play-song-2").play();
				}}>Play Song 2</button>
				<button onClick={() => {
					document.getElementById("soundboard-store-exchange").play();
				}}>Record Store</button>

			</div>
		)
	}
}

export default Soundboard;
