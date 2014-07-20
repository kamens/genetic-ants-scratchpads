
var GenomeViewer = {

    fontPxSize: 20,
    height: 50,

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

        var genomeDescs = ant.genome.descriptions();

        // Only grab n-1 descriptions to display in the genome viewer due to a
        // bug connected to animating the frames of the last step of the
        // simulation. Just don't show user the last step for this viewer's
        // purpose. Doesn't affect simulation.
        genomeDescs = genomeDescs.slice(0, genomeDescs.length - 1);

        var highlightIndex = min(ant.genome.currentIndex,
                genomeDescs.length - 1);

        var msg = "= " + genomeDescs.join(", ") + "...";
        fill(0, 0, 0);
        var font = createFont("monospace", this.fontPxSize);
        textFont(font);
        textAlign(LEFT, TOP);
        text(msg, 60, 15);

        var highlightDescs = [];
        for (var i = 0; i < highlightIndex; i++) {
            highlightDescs.push(createSpaces(genomeDescs[i].length));
        }

        highlightDescs.push(genomeDescs[highlightIndex]);

        for (var i = highlightIndex + 1; i < genomeDescs.length; i++) {
            highlightDescs.push(createSpaces(genomeDescs[i].length));
        }

        fill(37, 143, 27);

        var highlightMsg = "  " + highlightDescs.join("  ") + "   ";
        textFont(font);
        textAlign(LEFT, TOP);
        text(highlightMsg, 60, 15);

        if (highlightIndex > 7) {
            noLoop();
        }
    }
};
