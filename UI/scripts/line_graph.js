var canvas;

// TODO: add feature to make graph scrollable and not just 0 to 60 seconds

// TODO: use queue to store points (FIFO), then add a new point

// lines
var spacing = {v: 50, h: 35};
var max_l = {v: 650, h: 280};
var l_len = {v: 279, h: 649};

var points_download = [];
var points_upload = [];

// each array item has three values, in order: x, y and value
// x decreases to move point along graph
// y is mapped to a new value if the max value of the ammount axis changes
// var points = {outgoing: [], incoming: []}

function setup(){
    canvas = createCanvas(720, 330)
    canvas.parent("network_hist_graph");
    // resizeCanvas(10000, height);

    angleMode(DEGREES);

    gen_points();

    frameRate(1);
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
    rotate(-90);

    // use array to store points x,y pos, then use line to connect them all togther
    // decrese x value to move points along, and remove once points x is less than zero
    // y value will vary depending on the ammount of data coming through.


    //console.log(points[0]);

    noFill();
    strokeWeight(2);
    stroke("#EB5757");

    beginShape();

    for(var i = 0; i < points_download.length; i++){
        let tmp = points_download[i];
        let x = tmp[0];
        let y = tmp[1];

        if(x <= max_l.v) vertex(x, y);
    }

    endShape();

    stroke("#2F80ED");

    beginShape();

    for(var i = 0; i < points_upload.length; i++){
        let tmp = points_upload[i];
        let x = tmp[0];
        let y = tmp[1];

        if(x <= max_l.v) vertex(x, y);
    }

    endShape();

    // TODO: find way to to change points based on changing ammount axis
    //       e.g. find way to map values to new y values


    move_points();
    //add_point();
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

function move_points(){
    for(var i = points_download.length - 1; i >= 0; i--){
        if(points_download[i][0] - spacing.v / 5 < 0){
            points_download.splice(i, 1);
        } else{
            points_download[i][0] -= spacing.v / 5;
        }
    }

    for(var i = points_upload.length - 1; i >= 0; i--){
        if(points_upload[i][0] - spacing.v / 5 < 0){
            points_upload.splice(i, 1);
        } else{
            points_upload[i][0] -= spacing.v / 5;
        }
    }
}

function gen_points(){
    for(i = max_l.v, j = 0; j < 10; j++, i += spacing.v / 5){
        var ammount = getRandomInt(0, 1750);
        console.log(ammount)

        // ammount range: 0 to 1750
        // y-point range: 35 to 279

        var y = affine_transformation(ammount);


        points_download.push([i, y]);
        // points_upload.push([i, getRandomInt(max_l.h - 5, spacing.h)]);

    }
}

/* maps ammount value to y-point range
   https://math.stackexchange.com/questions/377169/calculating-a-value-inside-one-range-to-a-value-of-another-range
   "If you have numbers x in the range [a,b] and you want to transform them to numbers y in the range
    [c,d] you need to do this: y = (x - a) * ((d - c) / (b - a)) + c"

    where [a, b] (ammount) = [0, max_ammount]
          [c, d] (y-point) = [279, 35]

    as the axis is value is decreasing as the y-point increases the actual point
    will be: max_y - y
   */
function affine_transformation(v){
    return ((v - 0 ) * ((35 - 279) / (1750 - 0))) + 279;
}

function add_point(){
    let new_xd = points_download[points_download.length - 1][0] + spacing.v / 5;
    let new_xu = points_upload[points_upload.length - 1][0] + spacing.v / 5;

    let new_point = [new_xd, getRandomInt(max_l.h - 5, spacing.h)];
    points_download.push(new_point);
    new_point = [new_xu, getRandomInt(max_l.h - 5, spacing.h)];
    points_upload.push(new_point);
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * NOTE: NOT MY CODE!!!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
