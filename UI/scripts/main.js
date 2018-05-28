function setup(){
    canvas = createCanvas(720, 330)
    canvas.parent("network_hist_graph");

    angleMode(DEGREES);

    graph = new lineGraph();


    // refresh the canvas once per second as oppose to 30 times per second
    frameRate(1);

    graph.add_point("o", 1000);
    graph.add_point("i", 150);
}

function draw(){
    background("#393E53");
    graph.draw();

    graph.add_point("o", getRandomInt(0, 100));
    graph.add_point("i", getRandomInt(100, 150));
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * NOTE: NOT MY CODE!!!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
