var queue = {i: [], o: []};

var graph;

// states if the tab has focus or not and if no the time the tab lost focus
var unfocused = false;
var unfocused_time;

// bg lines
var spacing = {v: 50, h: 35};
var max_l = {v: 650, h: 280};
var l_len = {v: 279, h: 649};
var incr = {v: 0, h: 5};
