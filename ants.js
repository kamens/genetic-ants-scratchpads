
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

var Ant = {

    brain: null,
    fitness: 0,
    position: [0,0],

    img: getImage("avatars/piceratops-seed"),
    height: 50,
    width: 50,

    step: function() {

    },

    draw: function() {
        image(img,
                board.cellWidth * position[0],
                board.cellHeight * position[1],
                width,
                height);
    }

};

function randInt(min, max) {
    return floor(random() * (max - min + 1) + min);
}
