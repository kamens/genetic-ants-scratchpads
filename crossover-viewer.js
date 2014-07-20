
var CrossoverViewer = {

    frameRate: 50,
    currentFrame: 0,

    animationSeconds: 6,
    percentAnimationComplete: 0,

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
        frameRate(this.frameRate);
        this.animationFrames = this.frameRate * this.animationSeconds;
        this.percentAnimationComplete = 0;

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
            textRGB: [219, 61, 60]
        });
        this.genomeViewerB = new GenomeViewer(this.antB, {
            textRGB: [121, 169, 70]
        });
        this.genomeViewerC = new GenomeViewer(this.antC, {
            showBackground: false,
            textRGB: [4, 167, 220]
        });

        this.genomeViewerCParentA = new GenomeViewer(this.antC, {
            showBackground: false,
            showAnt: false,
            onlyShowGenomeFromParent: GenomeParent.ParentA
        });

        this.genomeViewerCParentB = new GenomeViewer(this.antC, {
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

    drawBigText: function(s, y, alpha) {
        fill(0, 0, 0, alpha);
        var font = createFont("sans-serif", 26);
        textFont(font);
        textAlign(CENTER, TOP);
        text(s, width / 2, y);
    },

    fadeInBreedsWith: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0.15, 0.25);
        this.drawBigText("breeds with", 60, alpha);
    },

    fadeInToCreate: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0.42, 0.52);
        this.drawBigText("to create", 146, alpha);
    },

    slideInGenomeViewerA: function() {
        var endTop = 6;
        var top = endTop + ((height - endTop) *
                (1 - this.percentForCurrentAnimation(0.0, 0.05)));
        this.genomeViewerA.top = top;
        this.genomeViewerA.draw();
    },

    slideInGenomeViewerB: function() {
        var endTop = 96;
        var top = endTop + ((height - endTop) *
                (1 - this.percentForCurrentAnimation(0.3, 0.35)));
        this.genomeViewerB.top = top;
        this.genomeViewerB.draw();
    },

    slideInGenomeViewerC: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0.95, 0.99);
        this.genomeViewerC.textRGB[3] = alpha;

        var endTop = 180;
        var top = endTop + ((height - endTop) *
                (1 - this.percentForCurrentAnimation(0.7, 0.88)));
        this.genomeViewerC.top = top;
        this.genomeViewerC.draw();
    },

    fadeAndSlideGenomeViewerCParentA: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0.67, 0.68);
        var rgb = this.genomeViewerA.textRGB.slice(0);
        rgb[3] = alpha;
        this.genomeViewerCParentA.textRGB = rgb;

        var startTop = this.genomeViewerA.top;
        var endTop = this.genomeViewerC.top;
        this.genomeViewerCParentA.top = startTop + (
                ((endTop - startTop) *
                 this.percentForCurrentAnimation(0.7, 0.88)));

        this.genomeViewerCParentA.left = this.genomeViewerA.left;

        this.genomeViewerCParentA.draw();
    },

    fadeAndSlideGenomeViewerCParentB: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0.67, 0.68);
        var rgb = this.genomeViewerB.textRGB.slice(0);
        rgb[3] = alpha;
        this.genomeViewerCParentB.textRGB = rgb;

        var startTop = this.genomeViewerB.top;
        var endTop = this.genomeViewerC.top;
        this.genomeViewerCParentB.top = startTop + (
                ((endTop - startTop) *
                 this.percentForCurrentAnimation(0.7, 0.88)));

        this.genomeViewerCParentB.left = this.genomeViewerB.left;
        this.genomeViewerCParentB.draw();
    },

    percentForCurrentAnimation: function(startFadeIn, endFadeIn) {
        var percent = min(1,
                (max(0, this.percentAnimationComplete - startFadeIn) /
                 (endFadeIn - startFadeIn)));
        return percent;
    },

    prepareNextFrame: function() {
        // Approximation of end of animation. Oh well.
        if (this.currentFrame > this.animationFrames) {
            return false;
        }

        this.currentFrame++;
        this.percentAnimationComplete = (this.currentFrame /
                this.animationFrames);
        return true;
    },

    draw: function() {
        this.drawBackground();

        this.slideInGenomeViewerA();
        this.slideInGenomeViewerB();

        this.fadeAndSlideGenomeViewerCParentA();
        this.fadeAndSlideGenomeViewerCParentB();

        this.slideInGenomeViewerC();

        this.fadeInBreedsWith();
        this.fadeInToCreate();
    }

};
