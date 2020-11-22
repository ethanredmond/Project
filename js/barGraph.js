var  margin = {top: 30, right: 30, bottom: 120, left: 50};
var  width = 460 - margin.left - margin.right;
var  height = 400 - margin.top - margin.bottom;




var graph2 = function(data1)   {

// append the svg object to the body of the page
var svg = d3.select("#barGraph")
  .append("svg")
    .attr("id", "Graph1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  svg.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");  

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data1.map(function(d) { return d.education; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0]);
svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("rect")
  .data(data1)
  .enter()
  .append("rect")
    .attr("x", function(d)  { return x(d.education); })  
    .attr("y", function(d) { return y(d.rate); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(parseFloat(d.rate)); 
    
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
        .text(rate.rate+"%");
        

      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
    
    drawLabels1(margin, width, height);
};

var drawLabels1 = function(margin, width, height)
{
var labels = d3.select("#Graph1")
.append("g")
.classed("labels", true)

labels.append("text")
.text("Unemployment Rates by Educational Attainment")
.classed("title", true)
.attr("text-anchor", "middle")
.attr("x", margin.left+(width/2))
.attr("y", margin.top)

labels.append("text")
.text("Education Attained")
.classed("label", true)
.attr("text-anchor", "middle")
.attr("x", margin.left+(width/2-20))
.attr("y", height+(margin.top+110))
        
labels.append("g")
.attr("transform","translate(10,"+ (margin.top+(height/2))+")")
.append("text")
.text("Unemployment Rate")
.classed("label",true)
.attr("text-anchor","middle")
.attr("transform","rotate(90)")


}




var succesFCN = function(data1)
{
    console.log("education data", data1)
    graph2(data1);
    
}

var failFCN = function(error)
{
    console.log("error", error);
}

var barPromise1 = d3.csv("../csv/bar2.csv")

barPromise1.then(succesFCN, failFCN)