class Point{
    constructor(ammount, max_ammount, start_x){
        this.ammount = ammount;
        this.pos = createVector(start_x, 0);
        this.max_ammount = max_ammount;
        this.delete = false;

        this.y_value();
    }

    update(spacing, incr){
        this.y_value();
        this.move(spacing, incr);

        if(this.pos.x < 0){
            this.delete = true;
        }
    }

    /* draws point */
    draw(){
        noFill();
        strokeWeight(5);
        stroke("#fff");

        point(this.pos.x, this.pos.y);
    }

    /* moves point along graph towards 60 secs */
    move(spacing, incr){
        this.pos.x -= spacing.v / incr.h;
    }

    /* uses affine tranformation to set y-pos based on y-axis range */
    /* maps ammount value to y-point range
       https://math.stackexchange.com/questions/377169/calculating-a-value-inside-one-range-to-a-value-of-another-range
       "If you have numbers x in the range [a,b] and you want to transform them to numbers y in the range
        [c,d] you need to do this: y = (x - a) * ((d - c) / (b - a)) + c"

        where [a, b] (ammount) = [0, max_ammount]
              [c, d] (y-point) = [279, 35]
       */
    y_value(){
        let a = 0;
        let b = this.max_ammount;
        let c = 279;
        let d = 35;

        this.pos.y = (this.ammount - a) * ((d - c) / (b - a)) + c;
    }
}
