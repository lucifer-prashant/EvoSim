let vehicles = []
let food = []
let poison = []
let debug = false
let generation = 1
let totalLifespan = 0
let deathCount = 0

let simSpeed = 1
let foodRate = 0.05
let poisonRate = 0.01
let mutationRate = 0.01
let initialPopulation = 50

function setup() {
	createCanvas(windowWidth - 300, windowHeight - 40)
	initializeSimulation()
	setupControls()
}

function initializeSimulation() {
	vehicles = []
	food = []
	poison = []
	generation = 1
	totalLifespan = 0
	deathCount = 0

	for (let i = 0; i < initialPopulation; i++) {
		vehicles.push(new Vehicle(width / 2, height / 2))
	}

	for (let i = 0; i < initialPopulation * 0.8; i++) {
		food.push(createVector(random(width), random(height)))
	}

	for (let i = 0; i < initialPopulation * 0.4; i++) {
		poison.push(createVector(random(width), random(height)))
	}
}

function setupControls() {
	select("#debugToggle").mousePressed(() => (debug = !debug))
	select("#resetSim").mousePressed(initializeSimulation)

	const populationSlider = select("#populationSlider")
	populationSlider.value(initialPopulation)
	populationSlider.parent().querySelector(".value-display").textContent =
		initialPopulation
	populationSlider.input(() => {
		initialPopulation = parseInt(populationSlider.value())
		populationSlider.parent().querySelector(".value-display").textContent =
			initialPopulation
	})

	const speedSlider = select("#speedSlider")
	speedSlider.value(simSpeed)
	speedSlider.parent().querySelector(".value-display").textContent =
		simSpeed + "x"
	speedSlider.input(() => {
		simSpeed = parseFloat(speedSlider.value())
		speedSlider.parent().querySelector(".value-display").textContent =
			simSpeed.toFixed(1) + "x"
	})

	const foodRateSlider = select("#foodRateSlider")
	foodRateSlider.value(foodRate)
	foodRateSlider.parent().querySelector(".value-display").textContent = foodRate
	foodRateSlider.input(() => {
		foodRate = parseFloat(foodRateSlider.value())
		foodRateSlider.parent().querySelector(".value-display").textContent =
			foodRate.toFixed(3)
	})

	const poisonRateSlider = select("#poisonRateSlider")
	poisonRateSlider.value(poisonRate)
	poisonRateSlider.parent().querySelector(".value-display").textContent =
		poisonRate
	poisonRateSlider.input(() => {
		poisonRate = parseFloat(poisonRateSlider.value())
		poisonRateSlider.parent().querySelector(".value-display").textContent =
			poisonRate.toFixed(3)
	})

	const mutationRateSlider = select("#mutationSlider")
	mutationRateSlider.value(mutationRate)
	mutationRateSlider.parent().querySelector(".value-display").textContent =
		mutationRate
	mutationRateSlider.input(() => {
		mutationRate = parseFloat(mutationRateSlider.value())
		mutationRateSlider.parent().querySelector(".value-display").textContent =
			mutationRate.toFixed(3)
	})
}

function updateStats() {
	select("#populationCount").html(vehicles.length)
	select("#generationCount").html(generation)
	select("#avgLifespan").html((totalLifespan / (deathCount || 1)).toFixed(1))
}

function draw() {
	background(51)

	if (random(1) < foodRate * simSpeed) {
		food.push(createVector(random(width), random(height)))
	}

	if (random(1) < poisonRate * simSpeed) {
		poison.push(createVector(random(width), random(height)))
	}

	for (let i = 0; i < food.length; i++) {
		fill(0, 255, 0)
		noStroke()
		ellipse(food[i].x, food[i].y, 8, 8)
		if (debug) {
			noFill()
			stroke(0, 255, 0, 100)
			ellipse(food[i].x, food[i].y, 30, 30)
		}
	}

	for (let i = 0; i < poison.length; i++) {
		fill(255, 0, 0)
		noStroke()
		ellipse(poison[i].x, poison[i].y, 8, 8)
		if (debug) {
			noFill()
			stroke(255, 0, 0, 100)
			ellipse(poison[i].x, poison[i].y, 30, 30)
		}
	}

	for (let i = vehicles.length - 1; i >= 0; i--) {
		vehicles[i].update(simSpeed)
		vehicles[i].boundaries()
		vehicles[i].behaviours(food, poison)
		vehicles[i].display(debug)

		let child = vehicles[i].reproduce(mutationRate)
		if (child != null) {
			vehicles.push(child)
			generation++
		}

		if (vehicles[i].dead()) {
			totalLifespan += vehicles[i].age
			deathCount++
			food.push(createVector(vehicles[i].position.x, vehicles[i].position.y))
			vehicles.splice(i, 1)
		}
	}

	updateStats()
}

function windowResized() {
	resizeCanvas(windowWidth - 300, windowHeight - 40)
}
