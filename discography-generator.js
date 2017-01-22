let eightiesWords = [
	"Fiero",
	"Stellar",
	"Cruise",
	"Hawk",
	"Delorean",
	"Coast",
	"Drive",
	"Jupiter",
	"Street",
	"Arcade",
	"Waves",
	"Mainframe",
	"Computer",
	"Laptop",
	"Neon",
	"Daytona",
	"Sedona",
	"Star",
	"Cyber",
	"Neutral",
	"Chaotic",
	"Ozone",
	"Atmosphere",
	"Scheme",
	"LA"
]

let generateRandomName = function() {
	return eightiesWords[Math.floor(Math.random() * eightiesWords.length)] + " " + eightiesWords[Math.floor(Math.random() * eightiesWords.length)]
}

for (var i = 0; i < 10; i++) {
	console.log(generateRandomName());
}
