
// Canvas size: 600 x 238
//
// Perhaps nice visualization:
//  frameRate 50
//  stepsPerSecond 25
//  antsPerGeneration 10

Simulation.init();

var draw = function() {
    if (!Simulation.prepareNextFrame()) {
        noLoop();
        return;
    }

    Simulation.draw();

    if (Scoreboard.maxFitness === Scoreboard.possibleFitness) {
        noLoop();
    }
};
