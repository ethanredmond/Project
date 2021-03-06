var  margin = {top: 30, right: 30, bottom: 70, left: 60};
var  width = 460 - margin.left - margin.right;
var  height = 400 - margin.top - margin.bottom;




var graph1 = function(data)   {

// append the svg object to the body of the page
var svg = d3.select("#graph")
  .append("svg")
    .attr("id", "theGraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  svg.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");  

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Period; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 20])
  .range([ height, 0]);
svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d)  { return x(d.Period); })  
    .attr("y", function(d) { return y(d.unemployment_rate); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(parseFloat(d.unemployment_rate)); 
    
    })
    .attr("fill", "blue")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //tool tip
    .on("mouseenter" ,function(rate)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      console.log(xPos);
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#tooltip")
        .text(rate.unemployment_rate+"%");
        

      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
    
    
    
    drawLabels(margin, width, height);
};

var drawLabels = function(margin, width, height)
{
var labels = d3.select("#theGraph")
.append("g")
.classed("labels", true)

labels.append("text")
.text("Unemployment Rate during COVID")
.classed("title", true)
.attr("text-anchor", "middle")
.attr("x", margin.left+(width/2))
.attr("y", margin.top)

labels.append("text")
.text("Months(2019-2020)")
.classed("label", true)
.attr("text-anchor", "middle")
.attr("x", margin.left+(width/2))
.attr("y", height+(margin.top+40))
        
labels.append("g")
.attr("transform","translate(10,"+ (margin.top+(height/2))+")")
.append("text")
.text("Unemployment Rate(%)")
.classed("label",true)
.attr("text-anchor","middle")
.attr("transform","rotate(90)")


};

var successFCN = function(data)
{
    console.log("data collected", data)
    graph1(data);
}

var failFCN = function(error)
{
    console.log("error", error);
}

var barPromise = d3.csv("../csv/SeriesReport3.csv")

barPromise.then(successFCN, failFCN)