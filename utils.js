
var randInt = function(min, max) {
    return floor(random() * (max - min + 1) + min);
};

var randBool = function() {
    return randInt(0, 1) === 0;
};

var createSpaces = function(spaces) {
    var s = [];
    for (var i = 0; i < spaces; i++) {
        s.push(" ");
    }
    return s.join("");
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
    },

    getDescription: function(dir) {
        if (dir === this.left) {
            return "Left";
        } else if (dir === this.right) {
            return "Right";
        } else if (dir === this.up) {
            return "Up";
        } else if (dir === this.down) {
            return "Down";
        }
    }
};


