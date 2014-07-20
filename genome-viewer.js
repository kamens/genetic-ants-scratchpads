
var GenomeViewer = function(ant, options) {

    this.ant = ant;
    this.fontPxSize = 20;
    this.height = 50;
    this.top = 0;
    this.textRGB = [0, 0, 0];

    for (var key in options) {
        this[key] = options[key];
    }

    this.genomeAsText = function(directions) {
        var arrows = [];
        for (var i = 0; i < directions.length; i++) {
            arrows.push(Directions.getArrow(directions[i]));
        }
        return "= " + arrows.join(", ");
    };

    this.drawBackground = function() {
        noStroke();
        fill(255, 255, 255);
        rect(0,
                this.top,
                width,
                this.height);
    };

    this.draw = function() {
        this.drawBackground();

        image(this.ant.img,
                10,
                this.top - 2,
                this.ant.width,
                this.ant.height);

        // Only grab n-1 descriptions to display in the genome viewer due to a
        // bug connected to animating the frames of the last step of the
        // simulation. Just don't show user the last step for this viewer's
        // purpose. Doesn't affect simulation.
        var directions = this.ant.genome.directions.slice(0,
                this.ant.genome.directions.length - 1);

        var genomeText = this.genomeAsText(directions);
        var font = createFont("monospace", this.fontPxSize);
        fill.apply(this, this.textRGB);
        textFont(font);
        textAlign(LEFT, TOP);
        text(genomeText + "...", 60, this.top + 15);

        var highlightIndex = min(this.ant.genome.currentIndex,
                directions.length - 1);
        var highlightArrow = Directions.getArrow(directions[highlightIndex]);

        var pastDirections = directions.slice(0, highlightIndex);
        var pastGenomeText = this.genomeAsText(pastDirections);
        if (highlightIndex > 0) {
            pastGenomeText += ", ";
        }

        fill(37, 143, 27);
        textFont(font);
        textAlign(LEFT, TOP);
        text(highlightArrow, 60 + textWidth(pastGenomeText), this.top + 15);
    };
};
