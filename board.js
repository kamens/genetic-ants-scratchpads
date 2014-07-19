
// Canvas size: 600 x 184

var Board = {
    
    cols: 12,
    rows: 5,

    cellWidth: 50,
    cellHeight: 75,

    negativeCellMargin: 14,
    negativeBoardMargin: 18,

    imgStone: getImage("cute/StoneBlock"),
    imgGrass: getImage("cute/GrassBlock"),

    // Maybe generate randomly?
    path: [
        [0,3], [1,3], [1,2], [2,2], [3,2], [3,3], [3,4], [4,4],
        [5,4], [5,5], [5,6], [6,6], [6,5], [6,4], [6,3], [6,2],
        [6,1], [6,0], [7,0], [7,1], [8,1], [8,2], [9,2], [10,2],
        [10,1], [11,1], [11,2], [11,3], [11,4], [11,5]
    ],

    grid: [],

    generateGrid: function() {

        for (var col = 0; col < this.cols; col++) {
            this.grid[col] = [];
            for (var row = 0; row < this.rows; row++) {
                this.grid[col][row] = false;
            }
        }

        for (var i = 0; i < this.path.length; i++) {
            var pathPiece = this.path[i];
            this.grid[pathPiece[0]][pathPiece[1]] = true;
        }

    },

    draw: function() {

        this.generateGrid();

        for (var col = 0; col < this.cols; col++) {
            for (var row = 0; row < this.rows; row++) {
                var img = this.grid[col][row] ? this.imgGrass : this.imgStone;
                image(img,
                        this.cellWidth * col,
                        (this.cellWidth * row -
                         (this.negativeCellMargin * row) -
                         this.negativeBoardMargin),
                        this.cellWidth,
                        this.cellHeight);
            }
        }

    }

};
