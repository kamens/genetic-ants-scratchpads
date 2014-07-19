
var randInt = function(min, max) {
    return floor(random() * (max - min + 1) + min);
};

var Directions = {
    left: 0,
    right: 1,
    up: 2,
    down: 3,

    random: function() {
        var rand = randInt(0, 3);
        if (rand === this.left) {
            return this.left;
        } else if (rand === this.right) {
            return this.right;
        } else if (rand === this.up) {
            return this.up;
        } else if (rand === this.down) {
            return this.down;
        }
    }
};

var RandomizedAntBrain = {
    nextDirection: function() {
        return Directions.random();
    }
};

var Ant = function(brain) {

    this.brain = brain;
    this.fitness = 0;
    this.position = [0,0];

    this.img = getImage("avatars/piceratops-seed");
    this.height = 50;
    this.width = 50;

    this.step = function() {
        var dir = this.brain.nextDirection();

        if (dir === Directions.left) {
            this.position[0]--;
        } else if (dir === Directions.right) {
            this.position[0]++;
        } else if (dir === Directions.up) {
            this.position[1]--;
        } else if (dir === Directions.down) {
            this.position[1]++;
        }

        if (this.position[0] < 0) {
            this.position[0] = 0;
        }
        if (this.position[0] >= Board.cols) {
            this.position[0] = Board.cols - 1;
        }
        if (this.position[1] < 0) {
            this.position[1] = 0;
        }
        if (this.position[1] >= Board.rows) {
            this.position[1] = Board.rows - 1;
        }
    };

    this.draw = function() {
        image(this.img,
                Board.cellWidth * this.position[0],
                (Board.cellHeight * this.position[1] -
                 Board.negativeCellMargin * this.position[1]),
                this.width,
                this.height);
    };

};
