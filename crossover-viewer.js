
var CrossoverViewer = {

    genomeLength: 12,

    genomeA: null,
    genomeB: null,
    genomeC: null,

    antA: null,
    antB: null,
    antC: null,

    genomeViewerA: null,
    genomeViewerB: null,
    genomeViewerC: null,

    init: function() {
        this.genomeA = new Genome(this.genomeLength, { mutationRate: 0 });
        this.genomeB = new Genome(this.genomeLength, { mutationRate: 0 });
        this.genomeC = this.genomeA.createCrossoverWith(this.genomeB);

        this.antA = new Ant(this.genomeA);
        this.antB = new Ant(this.genomeB, { imgSrc: "avatars/leafers-seed" });
        this.antC = new Ant(this.genomeC, {
            imgSrc: "avatars/spunky-sam"
        });

        this.genomeViewerA = new GenomeViewer(this.antA, {
            textRGB: [219, 61, 60],
            top: 6
        });
        this.genomeViewerB = new GenomeViewer(this.antB, {
            top: 96,
            textRGB: [121, 169, 70]
        });
        this.genomeViewerC = new GenomeViewer(this.antC, {
            top: 180,
            textRGB: [4, 167, 220]
        });
    },

    drawBackground: function() {
        noStroke();
        fill(255, 255, 255);
        rect(0, 0, width, height);
    },

    drawBigText: function(s, y) {
        fill(0, 0, 0);
        var font = createFont("sans-serif", 36);
        textFont(font);
        textAlign(CENTER, TOP);
        text(s, width / 2, y);
    },

    drawPlus: function() {
        this.drawBigText("breeds with", 54);
    },

    drawEquals: function() {
        this.drawBigText("to create", 142);
    },

    draw: function() {
        this.drawBackground();
        this.genomeViewerA.draw();
        this.genomeViewerB.draw();
        this.genomeViewerC.draw();
        this.drawPlus();
        this.drawEquals();
    }

};
