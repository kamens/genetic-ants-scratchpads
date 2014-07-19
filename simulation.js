
// Canvas size: 600 x 184
//
// Perhaps nice visualization:
//  frameRate 50
//  stepsPerSecond 25
//  antsPerGeneration 10

var Simulation = {

    generation: 0,
    maxGenerations: 250,

    stepsThisGeneration: 0,
    // 20 extra steps allowed around the board
    maxStepsPerGeneration: Board.path.length + 20,

    frameRate: 50,
    stepsPerSecond: 25,

    framesPerStep: null,
    currentStepFrame: null,

    antsPerGeneration: 10,
    ants: null,

    init: function() {
        frameRate(this.frameRate);
        this.framesPerStep = ceil(this.frameRate / this.stepsPerSecond);

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

        if (!this.ants) {
            this.createNewAnts();
        } else {
            this.breedBestAnts();
        }

        return true;
    },

    createNewAnts: function() {
        this.ants = [];
        for (var i = 0; i < this.antsPerGeneration; i++) {
            var genome = new Genome(this.maxStepsPerGeneration);
            var ant = new Ant(genome);
            this.ants.push(ant);
        }
    },

    breedBestAnts: function() {
        var totalFitness = 0;
        var topFitness = -1;
        var topAnt;
        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            if (ant.fitness > topFitness) {
                topFitness = ant.fitness;
                topAnt = ant;
            }

            totalFitness += ant.fitness;
        }

        // Always include the top ant
        var topGenome = new Genome(this.maxStepsPerGeneration);
        topGenome.directions = topAnt.genome.directions.slice(0);
        this.nextGenAnts = [new Ant(topGenome)];

        // And then breed the rest based on percentages weighted by fitness
        while (this.nextGenAnts.length < this.antsPerGeneration) {
            var parentA = this.chooseFitParent(totalFitness);
            var parentB = this.chooseFitParent(totalFitness);
            var genome = parentA.genome.createCrossoverWith(parentB.genome);
            var child = new Ant(genome);
            this.nextGenAnts.push(child);
        }

        this.ants = this.nextGenAnts;
    },

    chooseFitParent: function(totalFitness) {
        var randFitness = randInt(0, totalFitness);

        var accumulatedFitness = 0;
        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            accumulatedFitness += ant.fitness;
            if (accumulatedFitness > randFitness) {
                return ant;
            }
        }

        return this.ants[this.ants.length - 1];
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

        // STOPSHIP(kamens);
        if (Scoreboard.maxFitness === Scoreboard.possibleFitness) {
            noLoop();
            println("WOOHOO");
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
