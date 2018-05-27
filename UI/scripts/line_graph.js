var canvas;

// TODO: add feature to make graph scrollable and not just 0 to 60 seconds

// lines
var spacing = {v: 50, h: 35};
var max_l = {v: 650, h: 280};
var l_len = {v: 279, h: 649};

function setup(){
    canvas = createCanvas(720, 330)
    canvas.parent("network_hist_graph");
    // resizeCanvas(10000, height);

     angleMode(DEGREES);
}

function draw(){
    background("#393E53");

    // draw graph bg
    noStroke();
    fill("#4F4F4F");
    rect(0, 0, 650, 280);

    // make it static - bg will stay still the lines will move
    // time axis will stay constant at 0 to 60 secs, total axis will change depending on size used
    lines(max_l.h, spacing.h, l_len.h, "h");
    lines(max_l.v, spacing.v, l_len.v, "v");

    textSize(15);
    strokeWeight(0.5);
    noStroke();
    stroke("#000");
    fill("#000")

    // time
    for(i = spacing.v - 6, j = 60; i <= max_l.v; i += spacing.v, j -= 5){
        text(j.toString(), i, max_l.h + 20);
    }

    // ammount
    for(i = max_l.h + 5, j = 0; i > spacing.h; i -= spacing.h, j += 250){
        text(j.toString(), max_l.v + 5, i);
    }

    // axis labels
    textSize(13);
    stroke("#fff");
    fill("#fff");
    text("Time (Seconds)", 272.35, max_l.h + 40);

    rotate(90);
    text("Ammount (GB)", 96.658203125, -max_l.v - 50);
    // 96.658203125
}
 /* draws lines for graph */
function lines(max_l, spacing, l_len, or){
    noFill();
    stroke("#333333");
    strokeWeight(2);

    for(i = 0; i < max_l; i += spacing){
        // console.log(i);
        if(or == "v") line(i, 0, i, l_len);
        else line(0, i, l_len, i);
    }
}

/* draws text for axis */
function axis(){

}
