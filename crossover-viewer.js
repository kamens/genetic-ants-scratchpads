
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

    genomeViewerCParentA: null,
    genomeViewerCParentB: null,

    init: function() {
        this.genomeA = new Genome(this.genomeLength, { mutationRate: 0 });
        this.genomeB = new Genome(this.genomeLength, { mutationRate: 0 });
        this.genomeC = this.genomeA.createCrossoverWith(this.genomeB);

        this.antA = new Ant(this.genomeA);
        this.antB = new Ant(this.genomeB, {
            imgSrc: "avatars/leafers-seed"
        });
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

        this.genomeViewerCParentA = new GenomeViewer(this.antC, {
            top: 160,
            textRGB: [0, 0, 0, 180],
            showBackground: false,
            showAnt: false,
            onlyShowGenomeFromParent: GenomeParent.ParentA
        });

        this.genomeViewerCParentB = new GenomeViewer(this.antC, {
            top: 140,
            textRGB: [0, 0, 0, 180],
            showBackground: false,
            showAnt: false,
            onlyShowGenomeFromParent: GenomeParent.ParentB
        });
    },

    drawBackground: function() {
        noStroke();
        fill(255, 255, 255);
        rect(0, 0, width, height);
    },

    drawBigText: function(s, y) {
        fill(0, 0, 0);
        var font = createFont("sans-serif", 26);
        textFont(font);
        textAlign(CENTER, TOP);
        text(s, width / 2, y);
    },

    draw: function() {
        this.drawBackground();
        this.genomeViewerA.draw();
        this.genomeViewerB.draw();
        this.genomeViewerC.draw();

        // STOPSHIP(kamens)
        // this.genomeViewerCParentA.draw();
        // this.genomeViewerCParentB.draw();

        this.drawBigText("breeds with", 60);
        this.drawBigText("to create", 146);
    }

};
