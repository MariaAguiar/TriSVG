
let svg = document.getElementById("canvas"), NS = svg.getAttribute('xmlns');
let triangles = document.querySelectorAll(".triangle");
var svgString, newsvg, url0, url;
let ids = 3;


// Helper Functions
function setAttributes(el, attrs){
	for(let key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}

function compareVals(point1, point2) {
	if (parseInt(point2[0]) === parseInt(point1[0]) || 
	parseInt(point2[1]) === parseInt(point1[1]))
		return 1;
	return 0;
}


// Color Manipulation
let palette = [
	"#40A184",
	"#22E0A7",
	"#E04B22",
	"#E06C22",
];

function varyColor(hex, amount) {
	let r = parseInt(hex.substring(1, 3), 16);
	let g = parseInt(hex.substring(3, 5), 16);
	let b = parseInt(hex.substring(5, 7), 16);
	r = Math.min(255, Math.max(0, r + Math.floor(Math.random() * amount)));
	g = Math.min(255, Math.max(0, g + Math.floor(Math.random() * amount)));
	b = Math.min(255, Math.max(0, b + Math.floor(Math.random() * amount)));
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function getRandomColorFromPalette() {
	let randomIndex = Math.floor(Math.random() * palette.length);
	return varyColor(palette[randomIndex], 30);
}

function getRandomRGB() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


// Triangle Adding and Manipulation
document.getElementById("canvas").addEventListener("click", function(event) {
	if (event.target.classList.contains("triangle")) {
		let pointStr = event.target.getAttribute("points").split(' ');
		let a = pointStr[0].split(',');
		let b = pointStr[1].split(',');
		let c = pointStr[2].split(',');

		let same = [
			compareVals(a, b),
			compareVals(b, c),
			compareVals(c, a)
		];
		let sum = same[0] + same[1] + same[2];
		let different = (sum == 1) ? Math.max(...same) : Math.min(...same);
		var correct = same.indexOf(different);

		let x, y, first, second, third;
		if (correct === 0)
		{
			x = parseInt(a[0]) / 2 + parseInt(b[0]) / 2;
			y = parseInt(b[1]) / 2 + parseInt(a[1]) / 2;
			first = "" + c[0] + "," + c[1] + "";
			second = "" + b[0] + "," + b[1] + "";
			third = "" + a[0] + "," + a[1] + "";
		}
		else if (correct === 1)
		{
			x = parseInt(b[0]) / 2 + parseInt(c[0]) / 2;
			y = parseInt(c[1]) / 2 + parseInt(b[1]) / 2;
			first = "" + a[0] + "," + a[1] + "";
			second = "" + c[0] + "," + c[1] + "";
			third = "" + b[0] + "," + b[1] + "";
		}
		else
		{
			x = parseInt(a[0]) / 2 + parseInt(c[0]) / 2;
			y = parseInt(a[1]) / 2 + parseInt(c[1]) / 2;
			first = "" + b[0] + "," + b[1] + "";
			second = "" + a[0] + "," + a[1] + "";
			third = "" + c[0] + "," + c[1] + "";
		}

		newTriangle = document.createElementNS(NS, 'polygon');
		setAttributes(newTriangle, {"id": "p" + ids++ + "", "class": "triangle",
		"fill": getRandomColorFromPalette(), "points": "" + first + " " + x + "," + y + " " + second + ""});
		svg.appendChild(newTriangle);
		event.target.setAttribute("points", "" + first + " " + x + "," + y + " " + third + "");
	};
});


// Choose of size and initial colors
function sizeup()
{
	let ww = screen.width - 20;
	let hh = screen.height - 20;

	document.getElementById("canvas").setAttribute("viewBox", "0 0 "+ ww + " " + hh + "");
	document.getElementById("canvas").setAttribute("width", ww);
	document.getElementById("canvas").setAttribute("height", hh);
	document.getElementById("p1").setAttribute("points", "0,0 " + ww + ",0 " + "0," + hh + "");
	document.getElementById("p2").setAttribute("points", "" + ww + "," + hh
	+ " " + ww + ",0 " + "0," + hh + "");
	document.getElementById("p1").setAttribute("fill", getRandomColorFromPalette());
	document.getElementById("p2").setAttribute("fill", getRandomColorFromPalette());
}


//svg export function
document.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));      
		newsvg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
		url0 = self.URL || self.webkitURL || self;
		url = url0.createObjectURL(newsvg);
		let a = document.createElement('a');
		a.download = "image.svg";
		a.href = url;
		url0.revokeObjectURL(newsvg);
		document.body.appendChild(a);
		a.click();
		a.remove();
	}
});

