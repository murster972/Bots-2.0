class lineGraph{
    constructor(){
        this.points = {o: [], i: []};
        this.queue = {o: [], i: []};

        // bg line values
        this.spacing = {v: 50, h: 35};
        this.max_l = {v: 650, h: 280};
        this.l_len = {v: 279, h: 649};
        this.incr = {v: 0, h: 5};

        this.max_ammount = 100;
        this.ammount_incr = this.max_ammount / 7;
    }

    draw(){
        noStroke();
        fill("#4F4F4F");
        rect(0, 0, 650, 280);

        this.draw_axes();
        this.draw_bg_lines(this.max_l.h, this.spacing.h, this.l_len.h, "h");
        this.draw_bg_lines(this.max_l.v, this.spacing.v, this.l_len.v, "v");

        this.update_points();
        this.draw_line("o");
        this.draw_line("i");
        this.draw_points();
    }

    draw_axes(){
        textSize(15);
        strokeWeight(0.5);
        noStroke();
        stroke("#000");
        fill("#000")

        // time values
        for(var i = this.spacing.v - 6, j = 60; i <= this.max_l.v; i += this.spacing.v, j -= 5){
            text(j.toString(), i, this.max_l.h + 20);
        }

        // ammount values
        for(i = this.max_l.h + 5, j = 0; i > this.spacing.h; i -= this.spacing.h, j += this.ammount_incr){
            text(Math.round(j).toString(), this.max_l.v + 5, i);
        }

        textSize(13);
        stroke("#fff");
        fill("#fff");

        // time label
        text("Time (Seconds)", 272.35, this.max_l.h + 40);

        // ammount label
        rotate(90);
        text("Ammount (GB)", 96.658203125, -this.max_l.v - 50);
        rotate(-90);
    }

    draw_bg_lines(max_l, spacing, l_len, or){
        noFill();
        stroke("#333333");
        strokeWeight(2);

        for(let i = 0; i < max_l; i += spacing){
            if(or == "v") line(i, 0, i, l_len);
            else line(0, i, l_len, i);
        }
    }

    /* draws line for outgoing and incoming graph */
    draw_line(in_out){
        strokeWeight(2);
        stroke(in_out == "o" ? "#EB5757" : "#2F80ED");

        beginShape();

        for(let i = 0; i < this.points.o.length; i++){
            let tmp = (in_out == "o" ? this.points.o[i].pos : this.points.i[i].pos);
            vertex(tmp.x, tmp.y);
        }

        endShape();
    }

    draw_points(){
        for(let i = 0; i < this.points.o.length; i++){
            this.points.o[i].draw();
            this.points.i[i].draw();
        }
    }

    /* adds point to outgoing or incoming points */
    add_point(in_out, ammount){
        if(ammount > this.max_ammount) this.update_max(ammount);

        if(in_out == "o") this.points.o.push(new Point(ammount, this.max_ammount, this.max_l.v + 1));
        else this.points.i.push(new Point(ammount, this.max_ammount, this.max_l.v + 1));
    }

    /* moves points and removes if not on graph any more */
    update_points(){
        let max_p = 0;

        for(var i = this.points.o.length - 1; i >= 0; i--){
            let incoming = this.points.i[i];
            let outgoing = this.points.o[i];

            outgoing.update(this.spacing, this.incr);
            incoming.update(this.spacing, this.incr);

            max_p = (outgoing.ammount > max_p) ? outgoing.ammount : max_p;
            max_p = (incoming.ammount > max_p) ? incoming.ammount : max_p;

            outgoing.max_ammount = this.max_ammount;
            incoming.max_ammount = this.max_ammount;

            if(outgoing.delete == true) this.remove_point(i, "o");
            if(incoming.delete == true) this.remove_point(i, "i");
        }

        if(max_p != this.max_ammount) this.update_max(max_p);

    }

     /* removes point at index ind from incoming or outgin points */
    remove_point(ind, in_out){
        if(in_out == "o") this.points.o.splice(ind, 1);
        else this.points.i.splice(ind, 1);
    }

    update_max(ammount){
        this.max_ammount = ammount;
        this.ammount_incr = ammount / 7;
    }
}
