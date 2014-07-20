
// Visualize what happens when two ant genomes crossover
//
// Canvas size: 600 x 238

CrossoverViewer.init();

var draw = function() {
    if (!CrossoverViewer.prepareNextFrame()) {
        noLoop();
        return;
    }

    CrossoverViewer.draw();
};

