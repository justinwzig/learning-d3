//Let's build a bar chart:

var data = [4, 8, 15, 16, 23, 42]; //our data array -- could be 

var chart = d3.select(".chart"); //select the chart div (class selector)
var bar = chart.selectAll("div"); //Initiate the data join (define selection)
								  //This is the selection to which we will join data
								  //Going to call this the target
var barUpdate = bar.data(data); //Join the data (above) to the target using [target].data
var barEnter = barUpdate.enter().append("div"); //Fills the enter (new data) attribute for the element
												//Basically appending the elements we want to the target, which contains the data.
												//We now have an element, made up of a data join (the target), which contains the data.
barEnter.style("width", function(data){return data * 10 + "px"}); //trivial styling
															//Note the *10 (constant)
															//Also note that we only define DATA-BASED styles here -- rest of static styling (color, align, etc), goes in css.
barEnter.text(function(data){return data}); //trivial text addition
//Both of the above operations add attributes (.style and .text) to the barEnter element. These can be chained later.

//adapted from: https://bost.ocks.org/mike/bar/
