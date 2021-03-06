
var Ant = function(genome, options) {

    this.genome = genome;
    this.fitness = 0;
    this.foodFound = {};

    // Always start on the first part of path
    this.position = [Board.path[0][0], Board.path[0][1]];
    this.lastPosition = [Board.path[0][0], Board.path[0][1]];

    this.imgSrc = "avatars/piceratops-seed";
    this.height = 50;
    this.width = 50;
    this.negativeMargin = 3;

    for (var key in options) {
        this[key] = options[key];
    }

    // There's a rare bug involving passing variables into getImage that stops
    // us from being able to directly pass in the image source.
    // TODO(kamens): understand/fix this
    if (this.imgSrc === "avatars/piceratops-seed") {
        this.img = getImage("avatars/piceratops-seed");
    } else if (this.imgSrc === "avatars/leafers-seed") {
        this.img = getImage("avatars/leafers-seed");
    } else if (this.imgSrc === "avatars/spunky-sam") {
        this.img = getImage("avatars/spunky-sam");
    }

    this.step = function() {
        this.lastPosition[0] = this.position[0];
        this.lastPosition[1] = this.position[1];

        var dir = this.genome.nextDirection();
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

        if (Board.grid[this.position[0]][this.position[1]]) {
            if (!this.foodFound[this.position[0]]) {
                this.foodFound[this.position[0]] = {};
            }

            if (!this.foodFound[this.position[0]][this.position[1]]) {
                this.foodFound[this.position[0]][this.position[1]] = true;
                this.fitness++;
            }
        }
    };

    this.draw = function(percentStepComplete) {

        var xPos = Board.cellWidth * this.position[0];
        var yPos = (Board.cellHeight * this.position[1] -
                Board.negativeCellMargin * this.position[1]);

        var xLastPos = Board.cellWidth * this.lastPosition[0];
        var yLastPos = (Board.cellHeight * this.lastPosition[1] -
                Board.negativeCellMargin * this.lastPosition[1]);

        var dX = xPos - xLastPos;
        var dY = yPos - yLastPos;

        image(this.img,
                xLastPos + dX * percentStepComplete,
                (yLastPos + dY * percentStepComplete -
                 this.negativeMargin + Scoreboard.height),
                this.width,
                this.height);
    };

};
