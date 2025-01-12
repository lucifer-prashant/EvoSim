# Evolutionary Simulation Project

## Overview
This project is a dynamic evolutionary simulation where autonomous vehicles interact with food and poison in a constrained environment. Each vehicle has a set of DNA parameters that influence its behavior, and over time, natural selection shapes the population through mutation and reproduction. Explore the live simulation [here](https://lucifer-prashant.github.io/EvoSim/).

## Features
- **Vehicle Behavior**: Vehicles are programmed to seek food, avoid poison, and reproduce when conditions are favorable.
- **Mutation**: Offspring inherit their parents' DNA with a chance for mutations.
- **Dynamic Controls**: Adjustable parameters for population, simulation speed, spawn rates, and mutation rates.
- **Debug View**: Visualize vehicle DNA and perception ranges.
- **Real-time Statistics**: Monitor population size, generation count, and average lifespan.

## Technologies Used
- **p5.js**: For rendering graphics and managing simulation logic.
- **HTML/CSS**: For user interface and controls.


## How to Run
1. Clone the repository or download the project files.
   ```bash
   git clone https://github.com/lucifer-prashant/EvoSim.git
   ```
2. Open the `index.html` file in your preferred web browser.

## Controls
### Sliders
- **Initial Population**: Sets the number of vehicles at the start of the simulation.
- **Simulation Speed**: Adjusts the speed multiplier for the simulation.
- **Food Spawn Rate**: Controls how frequently food appears in the environment.
- **Poison Spawn Rate**: Controls how frequently poison appears in the environment.
- **Mutation Rate**: Determines the likelihood of DNA mutations during reproduction.

### Buttons
- **Debug View**: Toggles the display of vehicle DNA (perception range and weights).
- **Reset**: Restarts the simulation with the current parameters.

## Statistics
- **Population**: The current number of vehicles.
- **Generation**: The number of reproductive cycles that have occurred.
- **Average Lifespan**: The mean lifespan of vehicles that have died.

## Key Classes and Functions
### `Vehicle` Class
Represents an individual in the simulation. Key properties and methods include:
- **DNA**: Encodes weights and perception ranges for food and poison.
- **behaviours**: Guides the vehicle's response to food and poison.
- **reproduce**: Creates offspring with potential DNA mutations.
- **display**: Renders the vehicle on the canvas.

### `initializeSimulation`
Sets up the initial state of the simulation, including vehicles, food, and poison.

### `updateStats`
Updates real-time statistics displayed in the UI.

## Customization
Feel free to modify the DNA parameters, reproduction rules, or environmental dynamics in `sketch.js` or `vehicle.js` to explore different evolutionary scenarios.

