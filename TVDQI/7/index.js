//define your outer width and outer height, then your margins.
var outerWidth = 900
    outerHeight= 500
    margin = { top: 20, right: 20, bottom: 20, left: 50 },
//these are computed automatically
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var xScale = d3.scale.linear()
    .range([0,width])
//this defines a linear scale
var yScale = d3.scale.linear()
    //.domain([0,d3.max(data.value)])
    .range([height,0])

var chart = d3.select(".chart")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


d3.csv("data.csv", processDataType, function(error,data){
    //x scale from above
    xScale.domain([0,d3.max(data, function(d){return d.x})])
    //y scale from above
    yScale.domain([d3.min(data,function(d){return d.y}),d3.max(data, function(d){return d.y})])

    //axes
//    chart.append("g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0,"+height+")")
//        .call(xAxis);
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);


    //items
    var itemWidth = width / data.length;

    var item = chart.selectAll("bar")
        .data(data)
        .enter().append("g")
        .attr("transform", function (dataObject, index) { return "translate(" + index * itemWidth + ",0)"; });

    item.append("text")
        .attr("x", itemWidth)
        .attr("y", function(d) {return yScale(d.y);})
        .attr("dy", ".5em")
        .text(function (d) { return d.x});
})

function processDataType(d){
    d.value = +d.value; //grabbing the VALUE
    return d;
}