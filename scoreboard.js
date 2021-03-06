var Scoreboard = {
    
    generation: 0,

    maxFitness: 0,
    possibleFitness: 0,

    fontPxSize: 24,
    height: 50,

    prettyPercent: function() {
        return ceil((this.maxFitness / this.possibleFitness) * 100) + "%";
    },

    drawBackground: function() {
        noStroke();
        fill(255, 255, 255);
        rect(0,
                0,
                width,
                this.height);
    },

    draw: function() {
        this.drawBackground();

        if (this.generation > 0) {
            var msg = ("Smartest ant in generation " + this.generation +
                    " ate " + this.prettyPercent() + " of the food.");
            fill(37, 143, 27);
            var font = createFont("sans-serif", this.fontPxSize);
            textFont(font);
            textAlign(CENTER, TOP);
            text(msg, width / 2, 10);
        }
    }

};
