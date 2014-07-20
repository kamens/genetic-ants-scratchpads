
var MutationViewer = {

    frameRate: 50,
    currentFrame: 0,

    animationSeconds: 5,
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

    genomeViewerMutations: null,

    genomeViewerCParentA: null,
    genomeViewerCParentB: null,

    init: function() {
        frameRate(this.frameRate);
        this.animationFrames = this.frameRate * this.animationSeconds;
        this.percentAnimationComplete = 0;

        this.genomeA = new Genome(this.genomeLength, { mutationRate: 0 });
        this.genomeB = new Genome(this.genomeLength, { mutationRate: 0 });
        this.genomeC = this.genomeA.createCrossoverWith(this.genomeB);

        var ancestorInfo = this.genomeC.ancestorInfo;
        var crossoverOverrides = {
            crossoverPoint: ancestorInfo.crossoverPoint,
            parentAFirst: ancestorInfo.firstParent === GenomeParent.ParentA
        };
        this.genomeAMut = new Genome(this.genomeLength, { mutationRate: 1 });
        this.genomeAMut.directions = this.genomeA.directions.slice(0);
        this.genomeBMut = new Genome(this.genomeLength, { mutationRate: 1 });
        this.genomeBMut.directions = this.genomeB.directions.slice(0);
        this.genomeCMut = this.genomeAMut.createCrossoverWith(this.genomeBMut,
                crossoverOverrides);

        this.antA = new Ant(this.genomeA);
        this.antB = new Ant(this.genomeB, {
            imgSrc: "avatars/leafers-seed"
        });
        this.antC = new Ant(this.genomeC, {
            imgSrc: "avatars/spunky-sam"
        });

        this.antCMut = new Ant(this.genomeCMut, {
            imgSrc: "avatars/spunky-sam"
        });

        this.genomeViewerA = new GenomeViewer(this.antA, {
            top: 6,
            textRGB: [219, 61, 60]
        });

        this.genomeViewerB = new GenomeViewer(this.antB, {
            top: 46,
            textRGB: [121, 169, 70]
        });

        this.genomeViewerC = new GenomeViewer(this.antC, {
            showBackground: false,
            textRGB: [4, 167, 220, 0]
        });

        this.genomeViewerCMutations = new GenomeViewer(this.antCMut, {
            showBackground: false,
            showAnt: false,
            onlyShowMutations: true,
            top: 150,
            textRGB: [0, 0, 0]
        });

        this.genomeViewerFinalC = new GenomeViewer(this.antCMut, {
            showBackground: false,
            showAnt: false,
            top: 150,
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

    fadeInToCreate: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0.18, 0.23);
        this.drawBigText("but sometimes mutations occur", 106, alpha);
    },

    slideInGenomeViewerC: function() {
        var endTop = 150;
        var top = endTop + ((height - endTop) *
                (1 - this.percentForCurrentAnimation(0.01, 0.06)));
        this.genomeViewerC.top = top;
        this.genomeViewerC.draw();
    },

    fadeInMutationGenomeViewers: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0.4, 0.48);
        this.genomeViewerFinalC.textRGB[3] = alpha;
        this.genomeViewerCMutations.textRGB[3] = alpha;

        this.genomeViewerFinalC.draw();
        this.genomeViewerCMutations.draw();
    },

    fadeAndSlideGenomeViewerCParentA: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0, 0.01);

        var percentOut = this.percentForCurrentAnimation(0.4, 0.48);
        if (percentOut > 0) {
            alpha = 255 - (255 * percentOut);
        }

        var rgb = this.genomeViewerA.textRGB.slice(0);
        rgb[3] = alpha;
        this.genomeViewerCParentA.textRGB = rgb;

        var startTop = this.genomeViewerA.top;
        var endTop = this.genomeViewerC.top;
        this.genomeViewerCParentA.top = startTop + (
                ((endTop - startTop) *
                 this.percentForCurrentAnimation(0.01, 0.06)));

        this.genomeViewerCParentA.left = this.genomeViewerA.left;

        this.genomeViewerCParentA.draw();
    },

    fadeAndSlideGenomeViewerCParentB: function() {
        var alpha = 255 * this.percentForCurrentAnimation(0, 0.01);

        var percentOut = this.percentForCurrentAnimation(0.4, 0.48);
        if (percentOut > 0) {
            alpha = 255 - (255 * percentOut);
        }

        var rgb = this.genomeViewerB.textRGB.slice(0);
        rgb[3] = alpha;
        this.genomeViewerCParentB.textRGB = rgb;

        var startTop = this.genomeViewerB.top;
        var endTop = this.genomeViewerC.top;
        this.genomeViewerCParentB.top = startTop + (
                ((endTop - startTop) *
                 this.percentForCurrentAnimation(0.01, 0.06)));

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

        this.genomeViewerA.draw();
        this.genomeViewerB.draw();

        this.fadeAndSlideGenomeViewerCParentA();
        this.fadeAndSlideGenomeViewerCParentB();

        this.slideInGenomeViewerC();
        this.fadeInMutationGenomeViewers();

        this.fadeInToCreate();
    }

};
