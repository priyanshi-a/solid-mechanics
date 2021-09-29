const svg = document.getElementById("svgPanel");

const support1 = document.getElementById("support1");
const support2 = document.getElementById("support2");
const connection = document.getElementById("connection");
const CompBody = document.getElementById("CompresserBody");
const upperV = document.getElementById("upperV");
const upperH = document.getElementById("upperH");
const lowerV = document.getElementById("lowerV");
const lowerH = document.getElementById("lowerH");
const ConcretBlock = document.getElementById("ConcretBlock");
const leftPart = document.getElementById("leftPart");
const rightPart = document.getElementById("rightPart");

const controllerB1 = document.getElementById("controllerB_1");
const controllerB2 = document.getElementById("controllerB_2");
const controllerB3 = document.getElementById("controllerB_3");

const dmai1 = document.getElementById("dmai1");
const dmai2 = document.getElementById("dmai2");
const dmai3 = document.getElementById("dmai3");
const deflMeter= document.getElementById("meter");
const innerNeedleR= document.getElementById("innerNeedleR");
const innerNeedleB= document.getElementById("innerNeedleB");
const innerCircle= document.getElementById("innerCircle");
const deflReading = document.getElementById("dlefReading");
const deflReadingBorder = document.getElementById("dlefReadingBorder");
const BaseLine = document.getElementById("BaseLine");
const TrailText = document.getElementById("TrailText");

const wheel = document.getElementById("wheel");
const wheelSupport1 = document.getElementById("wheelSupport1");
const wheelSupport2 = document.getElementById("wheelSupport2");
const wheelSupport3 = document.getElementById("wheelSupport3");

const obserTable = [
		document.getElementById("obsTable1"),
		document.getElementById("obsTable2"),
		document.getElementById("obsTable3")
];
const resultTable = document.getElementById("resultTable");
const average = document.getElementById("Average");
const result = document.getElementById("result");

const Content = document.getElementById("Content");
const simulationBoard = document.getElementById("simulationBoard");
const tableDiv = document.getElementById("tableDiv");
const ObsTabDiv = document.getElementById("ObsTabDiv");
const VerifyDiv = document.getElementById("VerifyDiv");
const ResultDiv = document.getElementById("ResultDiv");
const instructionsDiv = document.getElementById("instructionsDiv");
const avgDiv = document.getElementById("avgDiv");

ObsTabDiv.style.display = "block";
VerifyDiv.style.display = "none";
ResultDiv.style.display = "none";
instructionsDiv.style.display = "none";

const next2 = document.getElementById("next2");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const next = document.getElementById("showResultsBtn");
const showdata = document.getElementById("showData");
const instructions = document.getElementById("instructions");

start.onclick = Start;
stop.onclick = Stop;
reset.onclick = Reset;
next2.onclick = () => {

	removeBrokenParts();
	drawMainScene();

	EnableButton(start);
	DisableButton(next2);

}

function DisableButton(button) {
	// body...
	button.disabled = true;
	button.style.backgroundColor = "lightblue";

}

function EnableButton(button) {
	// body...
	button.disabled = false;
	button.style.backgroundColor = "DodgerBlue";
}

DisableButton(stop);
DisableButton(reset);
DisableButton(next);
DisableButton(next2);

const margin = 10;
const gabBetwSupports = 120;
const deflMeterRadius = 50;
const dlefMeterAngles = [0, 360, 720];
const connectionStroke = 6;
const gap = 30;
const innerNeedleAngleShift = 1;

const support = {	
									width:230,
									height:40
								};

const wheelRadius = support.width / 6;

const controllerB = { 
											gap:gap,
											width: support.width - (2 * margin + gap),
											vheight: 2 * (deflMeterRadius + 10),
											hheight: support.width - support.width/3,
											
										};

const CompressorBody = {
													width:support.width - 2 * margin,
													height: support.width + 2 * margin
												};

const vRect = { 
								width:35,
								height:10
							};

const hRect = { 
								width:CompressorBody.width - 2 * (margin + 20),
								height: 35
							};

const concretB = {
										width:hRect.width - 2 * (margin + 15),
										height:hRect.width - 2 * (margin + 30),
									};


const SVG = {
							width : 2 * (margin + support.width) + gabBetwSupports,
							height : 480,
						};

const xStart = margin;
const yStart = SVG.height - (support.height+margin);
const xEnd = SVG.width - xStart;


const audio = new Audio("./machine_sound.mp3");
audio.loop = true;
audio.addEventListener("canplaythrough",function() { 
																					initializeSVG();
																				});

function play_audio() {

	audio.play();
	
}

function pause_audio() {
	// body...
	audio.pause();

} 

const tv = [
	{
		"area" : "150 x 150 = 22500 ",
		"c_Load": 552,
		"c_strength" : 24.53
	},

	{
		"area" : "150 x 150 = 22500 ",
		"c_Load": 528,
		"c_strength" : 23.46
	},

	{
		"area" : "150 x 150 = 22500 ",
		"c_Load": 580,
		"c_strength" : 25.77
	}
]

tv.sort((a, b) => 0.5 - Math.random());


var points,d,mp;
var intervalID;
var wheelState = 0;
var wheelProperties = {};
var deflProperties = {};
var angle1 = 90;
var angle2 = angle1 + 120;
var angle3 = angle2 + 120;
var innerNeedleAngle = 180;
var readingPos = 0;
var trail = 0;

function middlePoint(x1,x2) {
	return (x1 + x2) / 2;
}

const displayTrailText = (x,y) => {

  TrailText.setAttribute("font-size", 20);
  TrailText.setAttribute("x", x );
  TrailText.setAttribute("y", y );
  TrailText.innerHTML = "Trial - "+(trail+1);

}

const drawBaseLine = () => {
	BaseLine.setAttribute("x1",0);
  BaseLine.setAttribute("y1",SVG.height - 10);
  BaseLine.setAttribute("x2",SVG.width);
  BaseLine.setAttribute("y2",SVG.height - 10);
}

function initializeSVG() {
	//alert("initialize");

	svg.setAttribute("width",SVG.width);
  svg.setAttribute("height",SVG.height);

  drawMainScene();

}

const removeBrokenParts = () => {

	leftPart.setAttribute("points",""); //removes broken concret block
	rightPart.setAttribute("points",""); //same as above

}

const drawMainScene = () => {

	meterReading = 0;

	displayTrailText(10,20);

	support1.setAttribute("x",xStart);
  support1.setAttribute("y",yStart);
  support1.setAttribute("width",support.width);
  support1.setAttribute("height",support.height);

  DrawController();
  DrawCompressor();
  drawConnection();

  drawBaseLine();
  
}


function drawDlefMeter(cx,cy,radius) {

	readingPos = 0; // position of reading text in meter

	deflProperties["cx"] = cx;
	deflProperties["cy"] = cy;
	deflProperties["radius"] = radius - 5;
  // body...
  deflMeter.setAttribute("cx",cx);
  deflMeter.setAttribute("cy",cy);
  deflMeter.setAttribute("r",radius);

  innerCircle.setAttribute("cx",cx);
  innerCircle.setAttribute("cy",cy);
  innerCircle.setAttribute("r",5);

  innerNeedleB.setAttribute('x1',cx);
  innerNeedleB.setAttribute('y1',cy);
  innerNeedleB.setAttribute('x2',cx - (radius - 5));
  innerNeedleB.setAttribute('y2',cy);

  innerNeedleR.setAttribute('x1',cx);
  innerNeedleR.setAttribute('y1',cy);
  innerNeedleR.setAttribute('x2',cx - (radius - 5));
  innerNeedleR.setAttribute('y2',cy);

  dmai1.innerHTML = dlefMeterAngles[0];
  dmai1.setAttribute("font-size","12px");
  dmai1.setAttribute('x',cx - (radius - 2));
  dmai1.setAttribute('y',cy + 5);

  dmai2.innerHTML = dlefMeterAngles[1];
  dmai2.setAttribute("font-size","12px");
  dmai2.setAttribute('x',cx - 5);
  dmai2.setAttribute('y',cy - (radius - 13));

  dmai3.innerHTML = dlefMeterAngles[2];
  dmai3.setAttribute("font-size","12px");
  dmai3.setAttribute('x',cx + (radius - 22));
  dmai3.setAttribute('y',cy + 5);

  dlefReading.innerHTML = "0";
  deflReading.setAttribute('x',cx - 5);
  deflReading.setAttribute('y',cy + (radius - 15));

  deflReadingBorder.setAttribute("x",cx - radius/2);
  deflReadingBorder.setAttribute("y",parseInt(deflReading.getAttribute("y"))-18);
  deflReadingBorder.setAttribute("width",radius);
  deflReadingBorder.setAttribute("height",radius/3 + 5);

}

function degToRad(angle) {
    // Degrees to radians
    return ((angle * Math.PI) / 180);
}

function drawLine(line,angle,properties) {

		angle = degToRad(angle);
		let x = properties.cx + properties.radius * Math.cos(angle); //radians
		let y = properties.cy + properties.radius * Math.sin(angle); //radians
		y = 2 * properties.cy - y;  //deep explination required **
		line.setAttribute("x1",properties.cx);
		line.setAttribute("y1",properties.cy);
		line.setAttribute("x2",x);
		line.setAttribute("y2",y);
		
	}

function drawWheel(cx,cy,radius) {

	wheelProperties["cx"] = cx;
	wheelProperties.cy = cy;
	wheelProperties.radius = radius;

	wheel.setAttribute("cx",cx);
	wheel.setAttribute("cy",cy);
	wheel.setAttribute("r",radius);

	
	drawLine(wheelSupport1,angle1,wheelProperties);
	drawLine(wheelSupport2,angle2,wheelProperties);
	drawLine(wheelSupport3,angle3,wheelProperties);

}

function DrawController() {

	mx = middlePoint(xStart,xStart+support.width);
	my = middlePoint(yStart - (controllerB.hheight),yStart - (controllerB.vheight + controllerB.hheight));

	points = [xStart+margin , yStart
						, xStart+margin, yStart - (controllerB.vheight + controllerB.hheight)
						, xStart+margin + controllerB.gap, yStart - controllerB.hheight
						, xStart+margin + controllerB.gap, yStart];
	controllerB1.setAttribute("points",points.join(" "));

	points = [xStart + margin , yStart - (controllerB.vheight + controllerB.hheight)
						,xStart + margin+controllerB.width , yStart - (controllerB.vheight + controllerB.hheight)
						,xStart + margin+controllerB.width + controllerB.gap , yStart - (controllerB.hheight)
						,xStart+margin + controllerB.gap , yStart - (controllerB.hheight)];
	controllerB2.setAttribute("points",points.join(" "));

	
	controllerB3.setAttribute("x",xStart+margin + controllerB.gap);
	controllerB3.setAttribute("y",yStart - (controllerB.hheight));
	controllerB3.setAttribute("width",controllerB.width);
	controllerB3.setAttribute("height",controllerB.hheight);

	drawDlefMeter(mx,my,deflMeterRadius);
	drawWheel(xStart+support.width -  (margin + wheelRadius + 10)
		,yStart - (controllerB.hheight) + (wheelRadius + 10)
		,wheelRadius);

}


function DrawCompressor() {
	// body...
	support2.setAttribute("x",xEnd - support.width);
  support2.setAttribute("y",yStart);
  support2.setAttribute("width",support.width);
  support2.setAttribute("height",support.height);

  d = ["M",xEnd - margin, yStart
  		,"L",xEnd - margin, yStart-CompressorBody.height

  		,"L",xEnd + margin - support.width, yStart-CompressorBody.height
  		,"L",xEnd + margin - support.width, yStart]

  CompBody.setAttribute("d",d.join(" "));

  mp = middlePoint(xEnd,xEnd - support.width);

  upperV.setAttribute("x",mp - (vRect.width + 40)/2);
  upperV.setAttribute("y",yStart-CompressorBody.height + 5);
  upperV.setAttribute("width",vRect.width + 40);
  upperV.setAttribute("height",vRect.height);

  upperH.setAttribute("x",mp - hRect.width/2);
  upperH.setAttribute("y",parseInt(upperV.getAttribute("y"))+parseInt(upperV.getAttribute("height")));
  upperH.setAttribute("width",hRect.width);
  upperH.setAttribute("height",hRect.height);

  lowerV.setAttribute("x",mp - vRect.width/2);
  lowerV.setAttribute("y",yStart - vRect.height);
  lowerV.setAttribute("width",vRect.width);
  lowerV.setAttribute("height",vRect.height);

  lowerH.setAttribute("x",upperH.getAttribute("x"));
  lowerH.setAttribute("y",parseInt(lowerV.getAttribute("y")) - hRect.height);
  lowerH.setAttribute("width",hRect.width);
  lowerH.setAttribute("height",hRect.height);

  ConcretBlock.setAttribute("x",mp - concretB.width/2);
  ConcretBlock.setAttribute("y",parseInt(lowerH.getAttribute("y")) - concretB.height);
  ConcretBlock.setAttribute("width",concretB.width);
  ConcretBlock.setAttribute("height",concretB.height);

}

function drawConnection() {

	d = ["M" , xStart + support.width - 10, yStart + support.height/2
			,"Q" , xStart + support.width + gabBetwSupports/ 4 , yStart - gabBetwSupports/15
			, xStart + support.width + gabBetwSupports/2 , yStart + support.height/2 , "T"
			, xStart + support.width + gabBetwSupports + 10 , yStart + support.height/2   
			];
	connection.setAttribute("d",d.join(" "));
	connection.setAttribute("stroke-width",connectionStroke);

}

function replaceBlock() {

	ConcretBlock.setAttribute("width",0);
	ConcretBlock.setAttribute("height",0);

	mp = middlePoint(xEnd,xEnd - support.width);

	points = [(mp - 15), (parseInt(upperH.getAttribute("y")) + hRect.height)
						,(mp + 15), (parseInt(upperH.getAttribute("y")) + hRect.height + concretB.height)
						,(mp - concretB.width/2), (parseInt(upperH.getAttribute("y")) + hRect.height + concretB.height)
						,(mp - concretB.width/2), (parseInt(upperH.getAttribute("y")) + hRect.height)];
	
	leftPart.setAttribute("points",points.join(" "));

	points = [mp - 12, parseInt(upperH.getAttribute("y")) + hRect.height,
						,mp + 15 + 3, parseInt(upperH.getAttribute("y")) + hRect.height + concretB.height
						,mp + concretB.width/2, parseInt(upperH.getAttribute("y")) + hRect.height + concretB.height
						,mp + concretB.width/2, parseInt(upperH.getAttribute("y")) + hRect.height];
	rightPart.setAttribute("points",points.join(" "));

}


function rotateWheel() {

	drawLine(wheelSupport1,angle1 += 5,wheelProperties);
	drawLine(wheelSupport2,angle2 += 5,wheelProperties);
	drawLine(wheelSupport3,angle3 += 5,wheelProperties);

}

var meterReading = 0;
var count = 50;
const shift = 4;

function rotateMeter() {

	meterReading += shift ;
	deflReading.innerHTML = meterReading;

	if(readingPos < 5 && meterReading > 9) {

		readingPos += 5;
		deflReading.setAttribute('x',parseInt(deflReading.getAttribute('x')) - 6);

	} else if(readingPos < 10 && meterReading > 99 ) {

		readingPos +=5;
		deflReading.setAttribute('x',parseInt(deflReading.getAttribute('x')) - 6);

	}

	drawLine(
		innerNeedleR,
		innerNeedleAngle -= innerNeedleAngleShift,
		deflProperties
	);

	drawLine(
		innerNeedleB,
		innerNeedleAngle,
		deflProperties
	);

}

function getBackRedNeedle() {

	if(innerNeedleAngle >= 180) {

			clearInterval(intervalID);
			return;

	}

	drawLine(
			innerNeedleR,
			innerNeedleAngle += innerNeedleAngleShift,
			deflProperties
	);

}

function Compress() {

	if(meterReading >= tv[trail]["c_Load"]) {

		Stop();
		DisableButton(start);

		replaceBlock();
    fillObsTable();
    EnableButton(next);
    EnableButton(reset);

    intervalID = setInterval(getBackRedNeedle,15);

		trail ++;

    if(trail < 3) {

    	EnableButton(next2);

    	DisableButton(next);
    	DisableButton(reset);
    }

		return ;
	}

	rotateMeter();

}

function adjustAppratus() {

	let temp = parseInt(upperH.getAttribute("y")) + hRect.height;

	if(parseInt(ConcretBlock.getAttribute("y")) <= temp) {

		clearInterval(intervalID)

		intervalID = setInterval(Compress,200);

		return;
	}

	rotateWheel();
	ConcretBlock.setAttribute("y",parseInt(ConcretBlock.getAttribute("y"))-1);
	lowerH.setAttribute("y",parseInt(lowerH.getAttribute("y"))-1);
	lowerV.setAttribute("y",parseInt(lowerV.getAttribute("y"))-1);
	lowerV.setAttribute("height",parseInt(lowerV.getAttribute("height"))+1);

	
	
}

function Start() {

	intervalID = setInterval(adjustAppratus,60);

	DisableButton(start);
	EnableButton(stop);

	play_audio();
	
}

function Stop() {

	clearInterval(intervalID);

	DisableButton(stop);
	EnableButton(start);

	pause_audio();
}

/*
function Reset() {

	//Stop();
	EnableButton(start);

	leftPart.setAttribute("points",""); //removes broken concret block
	rightPart.setAttribute("points",""); //same as above

	lowerH.setAttribute("y",yStart - (vRect.height+hRect.height));
	lowerV.setAttribute("y",yStart - vRect.height);
	lowerV.setAttribute("height",vRect.height);
	ConcretBlock.setAttribute("y",parseInt(lowerH.getAttribute("y")) - concretB.height);
	ConcretBlock.setAttribute("width",concretB.width);
  ConcretBlock.setAttribute("height",concretB.height);

  angle1 = 90;
  angle2 = angle1 + 120;
  angle3 = angle2 + 120;

  drawLine(wheelSupport1,angle1,wheelProperties);
	drawLine(wheelSupport2,angle2,wheelProperties);
	drawLine(wheelSupport3,angle3,wheelProperties);

	innerNeedleAngle = 180;
	drawLine(innerNeedleR,innerNeedleAngle,deflProperties);
	drawLine(innerNeedleB,innerNeedleAngle,deflProperties);

	readingPos = 0;
	meterReading = 0;
	deflReading.innerHTML = meterReading;
	deflReading.setAttribute('x',deflProperties.cx - 5);

	clearObsTable();
	DisableButton(reset);
}
*/

function Reset() {
	window.location.reload();
}
//initializeSVG();


function fillObsTable() {

	if(areInstructionsShown) { toogleInstructions(); }

	obserTable[trail].rows[1].cells[1].innerHTML = tv[trail]["area"];
	obserTable[trail].rows[1].cells[2].innerHTML = tv[trail]["c_Load"] + " x 10<sup>3</sup>";
	//obserTable.rows[1].cells[3].innerHTML = tv[2];

}

function clearObsTable() {

	obserTable[trail].rows[1].cells[1].innerHTML = "";
	obserTable[trail].rows[1].cells[2].innerHTML = "";
	//obserTable.rows[1].cells[3].innerHTML = "";

	clearResults();
}

function showResults() {

	let space = "&nbsp;&nbsp;&nbsp;&nbsp;";
	let v = [tv[0]["c_strength"], tv[1]["c_strength"], tv[2]["c_strength"]]
	let results = (v[0] + v[1] + v[2]) / 3;
	result.innerHTML = space + "&nbsp;&nbsp;<h3><u>Result :- </u></h3>" +
                     space + "Ultimate Compression strength of given concrete specimen is <br>" +
                     space + space + " = ( " + v[0] + " + " + v[1] + " + " + v[2] + " ) / 3 <br>" + 
                     space + space + " = <u>"+results.toFixed(3)+"</u>  <i>(N / mm<sup>2</sup>)</i>.";

  DisableButton(next);
  areResultsShown = true;
}

function clearResults() {
	result.innerHTML = "";
}

next.onclick = showVerifyTable;
showdata.onclick = showData;
instructions.onclick = toogleInstructions;

var isVerified = false;
var areResultsShown = false;

function Next(text,fun) {

  //alert("next");
  //console.log(text);
  next.innerHTML = text;
  next.onclick = fun;
}

function showData() {

	clearResults();
	EnableButton(next);

  if(isVerified) {
    Next("Next",showResultTable);
  } else {
    Next("Next",showVerifyTable);
  }
  

  showdata.style.display = "none";

  ObsTabDiv.style.display = "block";
  ResultDiv.style.display = "none";
  VerifyDiv.style.display = "none";

}

function showVerifyTable() {

  ObsTabDiv.style.display = "none";
  VerifyDiv.style.display = "block";
  ResultDiv.style.display = "none";
  showdata.style.display = "block";

  Next("Verify",showResultTable);

}


function showResultTable() {

	if(areResultsShown) {
		showResults();
	}

	let measured = [];
	measured[0] = (form.cs1.value == "") ? 0 : parseFloat(form.cs1.value);
	measured[1] = (form.cs2.value == "") ? 0 : parseFloat(form.cs2.value);
	measured[2] = (form.cs3.value == "") ? 0 : parseFloat(form.cs3.value);
  
  for(let i = 0; i < measured.length; i ++) {

  	resultTable.rows[2 + i].cells[1].innerHTML = tv[i]["c_strength"];
  	resultTable.rows[2 + i].cells[2].innerHTML = measured[i];
  	resultTable.rows[2 + i].cells[3].innerHTML = percentageError(measured[i],tv[i]["c_strength"]);

  }
  
    

  ResultDiv.style.display = "block";
  VerifyDiv.style.display = "none";
  ObsTabDiv.style.display = "none";
  showdata.style.display = "block";

  Next("Show Results",showResults);
  isVerified = true;
}

function percentageError(measured,actual) {

  let m1 = (Math.abs(measured - actual) / actual).toFixed(3);

  return (parseFloat(m1) * 100).toFixed(2);
}

function showFormula() {

  let image = new Image(height=320);
  image.src = "";
  image.alt = "Ultimate Compression Strength";

  image.style.margin = "10px 0px 0px 50px";

  result.appendChild(image);
}

var case1 = 1;
var areInstructionsShown = false;

function toogleInstructions() {

  if(instructionsDiv.style.display != "block") {

    areInstructionsShown = true;

    instructions.innerHTML = "&lsaquo; Back";
    instructionsDiv.style.display = "block";
    next.style.display = "none";
    avgDiv.style.display = "none";

    if(ObsTabDiv.style.display == "block") {

      ObsTabDiv.style.display = "none";
      case1 = 1;

    } else if(VerifyDiv.style.display == "block") {

      VerifyDiv.style.display = "none";
      showdata.style.display = "none";
      case1 = 2

    } else {

      ResultDiv.style.display = "none";
      showdata.style.display = "none";
      case1 = 3;
    }

  } else {

    areInstructionsShown = false;

    instructions.innerHTML = "Show Instructions";
    instructionsDiv.style.display = "none";
    next.style.display = "block";
    avgDiv.style.display = "block";

    switch(case1) {
      case 1 : 
              ObsTabDiv.style.display = "block";
              break;
      case 2 : 
              VerifyDiv.style.display = "block";
              showdata.style.display = "block";
              break;
      case 3 : 
              ResultDiv.style.display = "block";
              showdata.style.display = "block";
              break;
    }

  }
}
