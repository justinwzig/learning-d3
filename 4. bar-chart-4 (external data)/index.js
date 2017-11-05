//Ok, enough with these awful JS arrays of data. Time to get real, time to get a CSV. 
//D3 includes libraries for CSVs, TSVs, and more. I like csvs (don't quite know why), so that's what I'm using.

//before we start, I'm going to quote Mike from https://bost.ocks.org/mike/bar/2/ here directly with regard to downloads:

/*
Loading data introduces a new complexity: downloads are asynchronous. When you call d3.tsv, it returns immediately 
while the file downloads in the background. At some point in the future when the download finishes, your callback 
function is invoked with the new data, or an error if the download failed. In effect your code is evaluated out of 
order:

	// 1. Code here runs first, before the download starts.

	d3.csv("data.csv", function(error, data) {
	  // 3. Code here runs last, after the download finishes.
	});

	// 2. Code here runs second, while the file is downloading.

*/
//Got that? Good.
//All this means is that we need to restructure the SVG generator from last time, into something that accomodates the async download.

//RUNS BEFORE DOWNLOADING
var width = 500,
	barHeight = 20; 

var x = d3.scale.linear()
	//Moved into .csv
	.range([0,width]); 

var chart = d3.select(".chart")
	.attr("width", width)
	//Moved into .csv

d3.csv("data.csv", processDataType, function(error,data) {
	//RUNS AFTER DOWNLOADING & PROCESSING
	//Notice that references to d have been changed to d.value -- that's because there's now two values for each datapoint, name and value.
	//have a look at the CSV file if that doesn't make sense.
	x.domain([0,d3.max(data, function(d){return d.value})])

	chart.attr("height", barHeight * data.length)

	var bar = chart.selectAll("g")
			.data(data)
		.enter().append("g")
			.attr("transform", function(data,index){return "translate(0," + index * barHeight + ")"; });
			
	bar.append("rect")
		.attr("width", function(d){return x(d.value);})
		.attr("height", barHeight - 1);

	bar.append("text")
		.attr("x", function(d){return x(d.value) - 3;}) 
		.attr("y", barHeight/2)
		.attr("dy", ".35em")
		.text(function(d){return d.value}); 
})

//RUNS WHILE DOWNLOADING
//This method tells d3.csv what type of data it is importing. We want to grab the data from the Value column and cast it to a number.
function processDataType(d){
	d.value = +d.value; //grabbing the VALUE
	return d;
}
//This also prevents strings from being sucked up as numbers, which causes....problems.

//Aaaand there we go, another identical graph. WOO!