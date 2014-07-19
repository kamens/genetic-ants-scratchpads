var Simulation = {

    steps: 0,
    maxSteps: Board.path.length,
    frameRate: 50,
    stepsPerSecond: 3,

    framesPerStep: null,
    currentStepFrame: null,

    numAnts: 3,
    ants: [],

    init: function() {
        frameRate(this.frameRate);
        this.framesPerStep = floor(
                Simulation.frameRate / Simulation.stepsPerSecond);
        this.currentStepFrame = 0;

        Board.init();
        Scoreboard.possibleFitness = Board.path.length;
        
        for (var i = 0; i < this.numAnts; i++) {
            var ant = new Ant(RandomizedAntBrain);
            this.ants.push(ant);
        }

    },

    step: function() {
        Board.draw();

        var maxFitness = 0;
        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            ant.step();

            if (ant.fitness > maxFitness) {
                maxFitness = ant.fitness;
            }
        }

        Scoreboard.maxFitness = maxFitness;

        this.steps++;
    },

    draw: function() {
        Board.draw();

        var percentStepComplete = (Simulation.currentStepFrame /
                Simulation.framesPerStep);

        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            ant.draw(percentStepComplete);
        }

        Scoreboard.draw();
    }

};

Simulation.init();

var draw = function() {
    if (Simulation.steps >= Simulation.maxSteps) {
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
