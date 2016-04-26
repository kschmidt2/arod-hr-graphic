// margins
var margin = {top: 20, right: 70, bottom: 30, left: 90},
    width = 700 - margin.left - margin.right,
    height = 510 - margin.top - margin.bottom,

    width2 = 150,
    height2 = 150,
    radius = Math.min(width2, height2) / 2;

// set up scales
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

// chart colors
var color = d3.scale.ordinal()
  .domain(["Mariners","Rangers","Yankees"])
  .range(["#3f4b6a", "#97a6c4", "#cfd7e9"]);

// set up axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxisLeft = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));


// set up svg
var svg = d3.select("#season-chart")
    .append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 500")
    //class to make it responsive
    .classed("svg-content-responsive", true)
  .append("g")
    .attr("transform", "translate(" + (margin.left-60) + "," + margin.top + ")");



// load data
d3.json('js/arodbyseason.json', function(err, data) {
  dataset = data;


    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year";}));

    data.forEach(function(d) {
      var y0 = 0;
      d.types = color.domain().map(function(type) { return {season: d.year, homeruns: d.homeruns, type: type, y0: y0, y1: y0 += +d[type]}; });
    });


      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-20, 0])
          .html(function(d) {
            // console.log(d);
            return "<p style='font-size:1.5em;margin-bottom:5px;'>'" + d.season + "</p><strong>HR:</strong> " + d.homeruns;
          })

      svg.call(tip);

      x.domain(data.map(function(d) { return d.year; }));
      y.domain([0, d3.max(data, function(d) { return d.homeruns; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .style("font-size", 9);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxisLeft)
          .style("fill", "#3f4b6a")
          .style("font-weight", 700)
          .style("font-size", 9)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 4)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style("font-size", 9)
          .style("font-weight", 700)
          .style("text-transform", "uppercase")
          .style("fill", "#3f4b6a")
          .text("Home runs");

      var year = svg.selectAll(".year")
          .data(data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x(d.year) + ",0)"; })
          .style("fill", "#3f4b6a");

      year.selectAll("rect")
          .data(function(d) { return d.types; })
        .enter().append("rect")
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); })
          .attr("class", "bar")
          // .attr("class", "bar-hover")
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)

});

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 80)
    .innerRadius(radius - 80);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.homeruns; });

var svg2 = d3.select("#team-chart").append("svg")
    .attr("width", width2)
    .attr("height", height2)
  .append("g")
    .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");

d3.json("js/arodbyteam.json", function(error, data) {
  if (error) throw error;

  var tip2 = d3.tip()
      .attr('class', 'd3-tip')
      .offset([20, 0])
      .html(function(d) {
        console.log("tip working");
        // console.log(d);
        return "<p style='font-size:1.5em;margin-bottom:10px;'>" + d.data.team + "</p><strong>HR:</strong> " + d.data.homeruns;
      })

  svg2.call(tip2);

  var g = svg2.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.team); })
      .style("stroke", "#fff")
      .style("stroke-width", "5px")
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide);

});

function type(d) {
  d.homeruns = +d.homeruns;
  return d;
}

var svg3 = d3.select("#position-chart").append("svg")
    .attr("width", width2)
    .attr("height", height2)
  .append("g")
    .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");

d3.json("js/arodbyposition.json", function(error, data) {
  if (error) throw error;

  var tip3 = d3.tip()
      .attr('class', 'd3-tip')
      .offset([20, 0])
      .html(function(d) {
        console.log("tip working");
        // console.log(d);
        return "<p style='font-size:1.5em;margin-bottom:10px;'>" + d.data.position + "</p><strong>HR:</strong> " + d.data.homeruns;
      })

  svg3.call(tip3);

  var g = svg3.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.position); })
      .style("stroke", "#fff")
      .style("stroke-width", "5px")
      .on('mouseover', tip3.show)
      .on('mouseout', tip3.hide);

});

function type(d) {
  d.homeruns = +d.homeruns;
  return d;
}
