

    //screen
    var screen = {width:800,height:600}
    //margins
    var margins = {left:60,right:40,top:40,bottom:50}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    
    
    var xScale = d3.scaleTime()
        .domain([d3.min(data, function(d) {return d.date; }),
                d3.max(data, function(d) {return d.date;})
                ])
        .range([0,graph.width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {d.employed_percent;})
                ])
        .range([graph.height,0]);

    var line = d3.line()
                 .x(function(d) {return xScale(d.year); })
                 .y(function(d) {return yScale(d.employed_percent); });



    var svg = d3.select("body")
                .append("svg")
                .attr("width", graph.width)
                .attr("height", graph.height);

        svg.append("path")
           .datum(data)
           .attr("class", "line")
           .attr("d", line);

//promise
var barPromise = d3.json("../json/bar.json");

var successFCN = function(data)
{console.log("Data collected", data)

xScale;
 yScale;

};

var failFCN = function(errorMsg)
{console.log("somethings wrong", errorMsg)};

barPromise.then(successFCN, failFCN);