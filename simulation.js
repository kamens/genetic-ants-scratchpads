
// Canvas size: 600 x 184

var Simulation = {

    generation: 0,
    maxGenerations: 2,

    stepsThisGeneration: 0,
    maxStepsPerGeneration: Board.path.length,

    frameRate: 50,
    stepsPerSecond: 4,

    framesPerStep: null,
    currentStepFrame: null,

    numAnts: 10,
    ants: [],

    init: function() {
        frameRate(this.frameRate);
        this.framesPerStep = floor(this.frameRate / this.stepsPerSecond);

        Board.init();
        Scoreboard.possibleFitness = Board.path.length;
        
        this.prepareNextGeneration();
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

        this.stepsThisGeneration++;
        this.currentStepFrame = 0;
    },

    draw: function() {
        this.currentStepFrame++;

        Board.draw();

        var percentStepComplete = this.currentStepFrame / this.framesPerStep;

        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            ant.draw(percentStepComplete);
        }

        Scoreboard.draw();
    },

    prepareNextGeneration: function() {
        if (this.generation >= this.maxGenerations) {
            return false;
        }

        this.generation++;
        Scoreboard.generation = this.generation;

        this.stepsThisGeneration = 0;
        this.currentStepFrame = 0;

        this.ants = [];
        for (var i = 0; i < this.numAnts; i++) {
            var genome = new Genome(Board.path.length);
            var ant = new Ant(genome);
            this.ants.push(ant);
        }

        return true;
    },

    prepareNextFrame: function() {
        if (this.stepsThisGeneration >= this.maxStepsPerGeneration) {
            if (!this.prepareNextGeneration()) {
                return false;
            }
        }

        if (this.currentStepFrame % this.framesPerStep === 0) {
            this.step();
        }

        return true;
    }

};

Simulation.init();

var draw = function() {
    if (!Simulation.prepareNextFrame()) {
        noLoop();
        return;
    }

    Simulation.draw();
};
