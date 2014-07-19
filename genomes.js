
var Genome = function(length) {
    this.directions = [];
    this.currentIndex = 0;

    this.nextDirection = function() {
        return this.directions[this.currentIndex++];
    };

    this.randomize = function() {
        for (var i = 0; i < length; i++) {
            this.directions[i] = Directions.random();
        }
    };

    this.randomize();
};
