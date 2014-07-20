
var GenomeViewer = {

    fontPxSize: 20,
    height: 50,

    genomeAsText: function(directions) {
        var arrows = [];
        for (var i = 0; i < directions.length; i++) {
            arrows.push(Directions.getArrow(directions[i]));
        }
        return "= " + arrows.join(", ");
    },

    drawBackground: function() {
        noStroke();
        fill(255, 255, 255);
        rect(0,
                0,
                width,
                this.height);
    },

    draw: function(ant) {
        this.drawBackground();

        image(ant.img,
                10,
                2,
                ant.width,
                ant.height);

        // Only grab n-1 descriptions to display in the genome viewer due to a
        // bug connected to animating the frames of the last step of the
        // simulation. Just don't show user the last step for this viewer's
        // purpose. Doesn't affect simulation.
        var directions = ant.genome.directions.slice(0,
                ant.genome.directions.length - 1);

        var genomeText = this.genomeAsText(directions);
        var font = createFont("monospace", this.fontPxSize);
        fill(0, 0, 0);
        textFont(font);
        textAlign(LEFT, TOP);
        text(genomeText + "...", 60, 15);

        var highlightIndex = min(ant.genome.currentIndex,
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
        text(highlightArrow, 60 + textWidth(pastGenomeText), 15);
    }
};
