//For reference, here's the bar chart implementation from the last version:
/*
var data = [4, 8, 15, 16, 23, 42]; 

var chart = d3.select(".chart"); 
var bar = chart.selectAll("div"); 

var barUpdate = bar.data(data); 
var barEnter = barUpdate.enter().append("div"); 

barEnter.style("width", function(d){return data * 10 + "px"});
barEnter.text(function(data){return data}); 
*/

//------//
//In this version, we want to accomplish two things:
//1. Use method chaining. The above implementation works, but it is exceedingly clunky --- might as well just use normal html.
//2. Add dynamic scaling, so that we don't have to rely on the *10 to do the scaling.

var data = [4, 8, 15, 16, 23, 42]; //We keep data separate, because it's the data.

var x = d3.scale.linear() //here's the dynamic mapping key -- d3 supports linear mapping.
    .domain([0, d3.max(data)]) //this is the data range
    .range([0,500]) //this is the display range
//This is key: X IS NOT JUST AN OBJECT! It is also a function that returns the scaled display value in the range.
//Note that it takes (data) as an input, like x(data).

d3.select(".chart")
    .selectAll("div")
        .data(data)
    .enter().append("div") //this line is unindented because it exists alongside the "bar" target in the spaced implementation -- it's not a subsidiary. Just for readability.
        .style("width", function(data){return x(data) + "px"})
        .text(function (data){return data});

//That's all there is to it. While you will usually see d3 written in method-chains,
//a good exercise is to write something non-chained, and then convert it into a chained method.
//This helps you practice thinking in chained methods.