
var GenomeViewer = function(ant, options) {

    this.ant = ant;
    this.showAnt = true;
    this.showBackground = true;
    this.fontPxSize = 20;
    this.height = 50;
    this.left = 0;
    this.top = 0;
    this.textRGB = [0, 0, 0];
    this.highlightCurrentIndex = false;
    this.onlyShowGenomeFromParent = null;
    this.onlyShowMutations = false;

    for (var key in options) {
        this[key] = options[key];
    }

    this.genomeAsText = function(directions) {
        var arrows = [];
        for (var i = 0; i < directions.length; i++) {
            arrows.push(Directions.getArrow(directions[i]));
        }
        return arrows.join(", ");
    };

    this.drawBackground = function() {
        noStroke();
        fill(255, 255, 255);
        rect(this.left, this.top, width, this.height);
    };

    this.setTextProperties = function(rgb) {
        var font = createFont("monospace", this.fontPxSize);
        fill.apply(this, rgb);
        textFont(font);
        textAlign(LEFT, TOP);
    };

    this.directionTextWidth = function(directions) {
        var pastGenomeText = this.genomeAsText(directions);
        pastGenomeText = "= " + pastGenomeText;
        if (directions.length) {
            pastGenomeText += ", ";
        }
        this.setTextProperties([0, 0, 0]);
        return textWidth(pastGenomeText);
    };

    this.drawHighlightedCurrentIndex = function(directions) {
        var highlightIndex = min(this.ant.genome.currentIndex,
                directions.length - 1);
        var highlightArrow = Directions.getArrow(directions[highlightIndex]);

        var pastDirections = directions.slice(0, highlightIndex);
        var pastDirectionsWidth = this.directionTextWidth(pastDirections);

        this.setTextProperties([37, 143, 27]);
        text(highlightArrow,
                this.left + 60 + pastDirectionsWidth,
                this.top + 15);
    };

    this.draw = function() {
        if (this.showBackground) {
            this.drawBackground();
        }

        if (this.showAnt) {
            image(this.ant.img,
                    this.left + 10,
                    this.top - 2,
                    this.ant.width,
                    this.ant.height);
        }

        // Only grab n-1 descriptions to display in the genome viewer due to a
        // bug connected to animating the frames of the last step of the
        // simulation. Just don't show user the last step for this viewer's
        // purpose. Doesn't affect simulation.
        var directions = this.ant.genome.directions.slice(0,
                this.ant.genome.directions.length - 1);

        if (this.onlyShowGenomeFromParent !== null) {
            // STOPSHIP(kamens): there's an off-by-one crash here!
            var crossoverPoint = this.ant.genome.ancestorInfo.crossoverPoint;
            var firstParent = this.ant.genome.ancestorInfo.firstParent;

            var directionsFirstParent = directions.slice(0, crossoverPoint);
            var directionsSecondParent = directions.slice(crossoverPoint,
                        directions.length);

            var prefixWidth, textToDraw;
            if (this.onlyShowGenomeFromParent === firstParent) {
                prefixWidth = this.directionTextWidth([]);
                textToDraw = this.genomeAsText(directionsFirstParent);
                if (directionsSecondParent.length) {
                    textToDraw += ",";
                }
            } else {
                prefixWidth = this.directionTextWidth(directionsFirstParent);
                textToDraw = this.genomeAsText(directionsSecondParent);
            }

            this.setTextProperties(this.textRGB);
            text(textToDraw,
                    this.left + 60 + prefixWidth,
                    this.top + 15);

        } else if (this.onlyShowMutations) {
            var mutationPoints = this.ant.genome.ancestorInfo.mutationPoints;
            mutationPoints = mutationPoints.slice(0);
            mutationPoints = mutationPoints.sort();

            var pointsDrawn = false;
            for (var i = 0; i < mutationPoints.length; i++) {
                var mutationPoint = mutationPoints[i];
                if (mutationPoint >= directions.length) {
                    continue;
                }

                var directionsPreceding = directions.slice(0, mutationPoint);

                var prefixWidth = this.directionTextWidth(directionsPreceding);

                var directionsMutation = [directions[mutationPoint]];
                this.setTextProperties(this.textRGB);
                text(this.genomeAsText(directionsMutation),
                        this.left + 60 + prefixWidth,
                        this.top + 15);

                pointsDrawn = true;
            }
        } else {
            var genomeText = "= " + this.genomeAsText(directions) + "...";

            this.setTextProperties(this.textRGB);
            text(genomeText, this.left + 60, this.top + 15);

            if (this.highlightCurrentIndex) {
                this.drawHighlightedCurrentIndex(directions);
            }
        }
    };
};
