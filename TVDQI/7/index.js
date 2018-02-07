var width = 500,
    height = 400;

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("height", height)
    .attr("width", width);

d3.csv("data.csv", processDataType, function (error, data) {

    y.domain([0, d3.max(data, function (d) { return d.value })])

    var itemWidth = width / data.length;
    var translateX = index*itemWidth+itemWidth/2;

    var item = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (data, index) { return "translate(" + translateX + ",0)"; });

    /*bar.append("rect")
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })
        .attr("width", barWidth - 1);
    */

    item.append("text")
        .attr("x", itemWidth/2)
        .attr("y", function (d) { return y(d.value); })
        .attr("dy", ".35em")
        .text(function (d) { return d.value });
})

function processDataType(d) {
    d.value = +d.value; //grabbing the VALUE
    return d;
}
