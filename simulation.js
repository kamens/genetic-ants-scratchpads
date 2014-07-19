var Simulation = {

    iterations: 0,
    maxIterations: 50,

    ants: [],

    init: function() {
        var ant = new Ant(RandomizedAntBrain);
        this.ants.push(ant);
    },

    step: function() {
        Board.draw();

        for (var i = 0; i < this.ants.length; i++) {
            var ant = this.ants[i];
            ant.step();
            ant.draw();
        }

        this.iterations++;
    }

};

Simulation.init();

var draw = function() {
    if (Simulation.iterations >= Simulation.maxIterations) {
        noLoop();
        return;
    }

    Simulation.step();
};
