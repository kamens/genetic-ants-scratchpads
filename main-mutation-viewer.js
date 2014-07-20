
// Visualize what happens when mutations occur
//
// Canvas size: 600 x 205

MutationViewer.init();

var draw = function() {
    if (!MutationViewer.prepareNextFrame()) {
        noLoop();
        return;
    }

    MutationViewer.draw();
};

