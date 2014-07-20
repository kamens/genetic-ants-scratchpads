
var Genome = function(length) {
    this.directions = [];
    this.currentIndex = -1;
    this.mutationRate = 0.4;

    this.nextDirection = function() {
        return this.directions[++this.currentIndex];
    };

    this.createCrossoverWith = function(genomeB) {
        var crossoverPoint = randInt(0, length - 1);

        var a1 = this.directions.slice(0, crossoverPoint);
        var a2 = this.directions.slice(crossoverPoint, length);

        var b1 = genomeB.directions.slice(0, crossoverPoint);
        var b2 = genomeB.directions.slice(crossoverPoint, length);

        var part1, part2;
        if (randBool()) {
            part1 = a1;
            part2 = b2;
        } else {
            part1 = b1;
            part2 = a2;
        }

        var crossover = new Genome(length);
        crossover.directions = part1.concat(part2);

        if (random(0, 1) < this.mutationRate) {
            // Random mutation!
            var numMutations = randInt(0, 5);
            for (var i = 0; i < numMutations; i++) {
                var mutationPoint = randInt(0, length - 1);
                crossover.directions[mutationPoint] = Directions.random();
            }
        }
            
        return crossover;
    };

    this.descriptions = function() {
        var descriptions = [];
        for (var i = 0; i < this.directions.length; i++) {
            descriptions.push(Directions.getDescription(this.directions[i]));
        }
        return descriptions;
    };

    this.randomize = function() {
        for (var i = 0; i < length; i++) {
            this.directions[i] = Directions.random();
        }
    };

    this.randomize();
};
