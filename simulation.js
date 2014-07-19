var Simulation = {

    iterations: 0,
    maxIterations: 50,
    frameRate: 50,
    stepsPerSecond: 3,

    framesPerStep: null,
    currentStepFrame: null,

    ants: [],

    init: function() {
        frameRate(this.frameRate);
        this.framesPerStep = floor(
                Simulation.frameRate / Simulation.stepsPerSecond);
        this.currentStepFrame = 0;
        
        var ant = new Ant(RandomizedAntBrain);
        this.ants.push(ant);
    },

    step: function() {
        Board.draw();

        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            ant.step();
        }

        this.iterations++;
    },

    draw: function() {
        Board.draw();

        var percentStepComplete = (Simulation.currentStepFrame /
                Simulation.framesPerStep);

        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            ant.draw(percentStepComplete);
        }
    }

};

Simulation.init();

var draw = function() {
    if (Simulation.iterations >= Simulation.maxIterations) {
        noLoop();
        return;
    }

    if (Simulation.currentStepFrame % Simulation.framesPerStep === 0) {
        Simulation.step();
        Simulation.currentStepFrame = 0;
    }

    Simulation.currentStepFrame++;
    Simulation.draw();
};
