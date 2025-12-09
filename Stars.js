
window.addEventListener("load", function () {
  paper.install(window); // makes Paper.js classes global
  paper.setup(document.getElementById("myCanvas"));

  var stars = [];
  var canvas = document.getElementById("myCanvas")
  var number_stars = Number(canvas.getAttribute("Stars"))  // Retrieves attribute and converts it to a number

  for (var i = 0; i <= number_stars; i++) { // This is where the number of stars inputted will be (number_stars)
    var point = new Point(view.size.width * Math.random(), view.size.height * Math.random());
    var circle = new Path.Circle(point, 1); // draw a star
    circle.fillColor = "white"; // color it white
    stars.push(circle); // store it if needed later
  }
});


