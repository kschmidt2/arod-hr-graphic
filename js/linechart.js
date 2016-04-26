// margins
var margin3 = {top: 20, right: 80, bottom: 30, left: 50},
    width3 = 860 - margin3.left - margin3.right,
    height3 = 400 - margin3.top - margin3.bottom;

// var parseDate = d3.time.format("%Y").parse;

// define scales
var x3 = d3.scale.linear()
    .range([0, width3]);

var y3 = d3.scale.linear()
    .range([height3, 0]);

// define axis
var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom");

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left");

// define colors
var color3 = d3.scale.ordinal()
.domain(["Sosa","Thome","Griffey","Mays","Rodriguez","Ruth","Aaron","Bonds"])
.range(["#bbb", "#bbb", "#bbb", "#bbb", "#0c152d", "#bbb", "#bbb", "#bbb"]);

// define line
var line = d3.svg.line()
    .x(function(d) { return x3(d.age); })
    .y(function(d) { return y3(d.homeruns); })
    .defined(function(d) { return !isNaN(d.homeruns); });;

var svg4 = d3.select("#line-chart")
    .append("div")
    .classed("svg-container-line", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 500")
    //class to make it responsive
    .classed("svg-content-responsive", true)
  .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");


// load data
d3.json('js/600club.json', function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "age"; }));

  data.forEach(function(d) {
    d.age = d.age;
  });

  var players = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {name: name, age: d.age, homeruns: +d[name]};
      })
    };
  });


  x3.domain(d3.extent(data, function(d) { return d.age;}));

  y3.domain([
    d3.min(players, function(c) { return d3.min(c.values, function(v) { return v.homeruns; }); }),
    d3.max(players, function(c) { return d3.max(c.values, function(v) { return v.homeruns; }); })
  ]);

  var tipLine = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-45, 0])
      .html(function(d) {
        console.log(d);
        return "<p style='margin-bottom:5px;'><strong>" + d.name + "</strong></p><p style='margin-bottom:5px;'><strong>Age:</strong> " + d.age + "</p><p style='margin-bottom:5px;'><strong>HR:</strong> " + d.homeruns + "</p>";
      })

  svg4.call(tipLine);

  svg4.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height3 + ")")
      .call(xAxis3);

  svg4.append("g")
      .attr("class", "y axis")
      .call(yAxis3)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Home runs");


  var player = svg4.selectAll(".player")
      .data(players)
    .enter().append("g")
      .attr("class", "player");



  player.append("path")
      .attr("class", "line")
      .attr("id", function(d) { return d.name; })
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color3(d.name); })
      // .style("fill", "none")
      .on('mouseover', function(){
        d3.select(this).style({"stroke":"#d4c9af"});;
      })
      .on('mouseout', function(){
        d3.select(this).style("stroke", function(d) { return color3(d.name); });;
      });

      player.selectAll(".player")
          //.data(function (d) { return d.values; })
          .data(function(d) {
              return d.values.filter(function(j) { return !isNaN(j.homeruns) });
          })
      		.enter().append("circle")
      			.attr("class", "dot")
            .attr("class", function(d) { return d.name; })
      	    .attr("r", 4)
            .attr("cx", line.x())
            .attr("cy", line.y())
            // .defined(function(d) { return !isNaN(d.homeruns); })
            .on('mouseover', tipLine.show)
            .on('mouseout', tipLine.hide);


  // player.append("text")
  //     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
  //     .attr("transform", function(d) { return "translate(" + x(d.value.age) + "," + y(d.value.homeruns) + ")"; })
  //     .attr("x", 3)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.name; });
});


  $('#Rodriguez-button').on('click', function () {
    $().button('toggle');
    $('.Rodriguez').toggle();
    $('#Rodriguez').toggle()
  });
  $('#Sosa-button').on('click', function () {
    $().button('toggle');
    $('.Sosa').toggle();
    $('#Sosa').toggle()
  });
  $('#Thome-button').on('click', function () {
    $().button('toggle');
    $('.Thome').toggle();
    $('#Thome').toggle()
  });
  $('#Griffey-button').on('click', function () {
    $().button('toggle');
    $('.Griffey').toggle();
    $('#Griffey').toggle()
  });
  $('#Mays-button').on('click', function () {
    $().button('toggle');
    $('.Mays').toggle();
    $('#Mays').toggle()
  });
  $('#Ruth-button').on('click', function () {
    $().button('toggle');
    $('.Ruth').toggle();
    $('#Ruth').toggle()
  });
  $('#Aaron-button').on('click', function () {
    $().button('toggle');
    $('.Aaron').toggle();
    $('#Aaron').toggle()
  });
  $('#Bonds-button').on('click', function () {
    $().button('toggle');
    $('.Bonds').toggle();
    $('#Bonds').toggle()
  });
