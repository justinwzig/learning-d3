//This time, we're going to make the *exact* same chart, using SVGs instead of DIVs.
//SVG kinda sucks because it's annoying and shape-based, but also rocks in that respect because it can get really powerful when implemented beyond just a bar chart.
//Luckily, D3 hanldes a lot of the SVG implementation for us, which is a REALLY GOOD THING. 
//This is adapted from https://bost.ocks.org/mike/bar/2/, and Mike Bostock presents an awesome example of why this is true at the top of his article.
//Manually writing SVG = not the strat

var data = [4, 8, 15, 16, 23, 42];

var width = 500,
	barHeight = 20; //define some visual stuff

var x = d3.scale.linear()
	.domain([0,d3.max(data)])
	.range([0,width]); //This is the same as before, just a linear map.

var chart = d3.select(".chart") //select the chart class
	.attr("width", width) //WOAH this is new!?
	.attr("height", barHeight * data.length) //SVG uses attributes, as opposed to the styles for divs.
											 //we define the total height of the chart by doing bar Height * the number of bars.

var bar = chart.selectAll("g") //This is the same thing as the TARGET earlier. We define an SVG group (because SVG) as the target for each bar, which will contain a rect and a text.
		.data(data)
	.enter().append("g")
		.attr("transform", function(data,index){return "translate(0," + index * barHeight + ")"; });
		//So, this ^ is really complicated SVG magic that I don't quite understand, but, if you look at the HTML mike had in the blog post,
		//you can see that each group has a transform. That's because each group is a bar, and the bars have to be moved down with relation to each other, so that they're not just on top of one another.
		//This statement is returning that translate, with the index of the bar, times the bar height. So if we're on the 5th bar, it's 5*20. Makes enough sense.
		//We also need to include data in the function call because that does some behind-the-scenes magic to associate Index with Data

bar.append("rect") //now we add the actual rect shapes to the groups.
	.attr("width", x) //(remember the x from up there ^)?
	.attr("height", barHeight - 1); //What does the -1 do? it gives us a 1px space between each bar.

bar.append("text")
	//SVG text SUCKS. You have to define the x, y, and SPACING for EACH text element. That's what we're doing here:
	.attr("x", function(d){return x(d) - 3;}) //keep in mind that this isn't the text that's displayed, but the X position for the text.
	.attr("y", barHeight/2) //we can just use bar height here because text occurs within the group, which is already defined.
	.attr("dy", ".35em") //just letter spacing
	.text(function(data){return data}); //now the actual feakin text.

//phew, ok, lemme test this thing because I'm sure I messed up somewhere.
//Yup, forgot a comma, let's go again.

//This would be a good time to pratice turning that into a method chain ^.
//JK THAT DOESN'T WORK BECAUSE SVGs GAH!