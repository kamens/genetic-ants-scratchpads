var Scoreboard = {
    
    generation: 0,

    maxFitness: 0,
    possibleFitness: 0,

    height: 60,
    negativeMargin: 10,

    draw: function() {
        noStroke();
        fill(255, 255, 255);
        rect(0,
                height - this.height - this.negativeMargin,
                width,
                this.height);

        fill(37, 143, 27);
        var font = createFont("sans-serif", 60);
        textFont(font);
        textAlign(CENTER, CENTER);
        text((this.maxFitness + " out of " + this.possibleFitness +
                    " (gen " + this.generation + ")"),
                width / 2,
                height - this.height / 2 - this.negativeMargin);
    }

};
