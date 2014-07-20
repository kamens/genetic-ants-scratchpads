var GenomeParent = {
    ParentA: 0,
    ParentB: 1
};

var Genome = function(length, options) {
    this.directions = [];
    this.currentIndex = -1;
    this.mutationRate = 0.4;

    // Populated to keep track of some info about how this genome was created
    this.ancestorInfo = {};

    for (var key in options) {
        this[key] = options[key];
    }

    this.nextDirection = function() {
        return this.directions[++this.currentIndex];
    };

    this.createCrossoverWith = function(genomeB) {
        // Pick a crossover point somewhere in the middle of the genome
        var crossoverPoint = randInt(1, length - 2);

        var a1 = this.directions.slice(0, crossoverPoint);
        var a2 = this.directions.slice(crossoverPoint, length);

        var b1 = genomeB.directions.slice(0, crossoverPoint);
        var b2 = genomeB.directions.slice(crossoverPoint, length);

        var part1, part2, firstParent, secondParent;
        if (randBool()) {
            part1 = a1;
            part2 = b2;
            firstParent = GenomeParent.ParentA;
            secondParent = GenomeParent.ParentB;
        } else {
            part1 = b1;
            part2 = a2;
            firstParent = GenomeParent.ParentB;
            secondParent = GenomeParent.ParentA;
        }

        var crossover = new Genome(length);
        crossover.directions = part1.concat(part2);
        crossover.ancestorInfo = {
            crossoverPoint: crossoverPoint,
            firstParent: firstParent,
            secondParent: secondParent
        };

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

    this.randomize = function() {
        for (var i = 0; i < length; i++) {
            this.directions[i] = Directions.random();
        }
    };

    this.randomize();
};
