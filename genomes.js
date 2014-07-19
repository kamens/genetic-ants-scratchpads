
var Genome = function(length) {
    this.directions = [];
    this.currentIndex = 0;
    this.mutationRate = 0.03;

    this.nextDirection = function() {
        return this.directions[this.currentIndex++];
    };

    this.randomize = function() {
        for (var i = 0; i < length; i++) {
            this.directions[i] = Directions.random();
        }
    };

    this.createCrossoverWith = function(otherGenome) {
        var crossover = new Genome(length);
        for (var i = 0; i < length; i++) {

            if (random(0, 1) < this.mutationRate) {
                // Random mutation!
                crossover.directions[i] = Directions.random();
            } else {
                crossover.directions[i] = (randBool() ?
                        this.directions[i] : otherGenome.directions[i]);
            }
        }
        return crossover;
    };

    this.randomize();
};
