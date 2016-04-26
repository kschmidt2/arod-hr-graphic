var margin = {top: 20, right: 70, bottom: 30, left: 100},
    width = 520 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom
    radius = Math.min(width, height) / 2;

var color2 = d3.scale.ordinal()
.domain(["Mariners","Rangers","Yankees"])
.range(["#cfd7e9", "#97a6c4", "#3f4b6a"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.homeruns; });

var svg2 = d3.select("#team-chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("js/arodbyteam.json", type, function(error, data) {
  if (error) throw error;

  var g = svg2.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color2(d.data.team); });

      console.log("winning");

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age; });
});

function type(d) {
  d.homeruns = +d.homeruns;
  return d;
}
