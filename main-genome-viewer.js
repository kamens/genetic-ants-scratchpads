
// Visualize what an ant genome is and what it does
//
// Canvas size: 600 x 238

Simulation.init({
    maxGenerations: 1,
    antsPerGeneration: 1,
    showScoreboard: false,
    showGenomeViewer: true,
    stepsPerSecond: 2,
    genomeLength: 7
});

var draw = function() {
    if (!Simulation.prepareNextFrame()) {
        noLoop();
        return;
    }

    Simulation.draw();
};
