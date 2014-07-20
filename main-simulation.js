
// Small group evolving: 600 x 238
//  frameRate 50
//  stepsPerSecond 25
//  antsPerGeneration 10
//
// Large group evolving: 600 x 238
//  frameRate 50
//  stepsPerSecond 200
//  antsPerGeneration 750
//
// Single random ant: 600 x 188
//  antsPerGeneration 1
//  maxGenerations 1
//  showScoreboard false
//  stepsPerSecond 5
//
// Many random ants: 600 x 188
//  antsPerGeneration 8
//  maxGenerations 1
//  showScoreboard false
//  stepsPerSecond 8

Simulation.init({
    antsPerGeneration: 750,
    stepsPerSecond: 400
});

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
