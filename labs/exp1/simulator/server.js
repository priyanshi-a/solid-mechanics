const svg = document.getElementById("svgPanel");

const Rod3D = $("#Rod3D");

const widthL = $("#width");
const thicknessL = $("#thickness");
const lengthL = $("#length");

const widthPath = $("#widthPath");
const widthLPath = $("#widthLPath");
const widthLine = $("#widthLine");
const thicknessLine = $("#thicknessLine");
const lengthLine = $("#lengthLine");

const scale = $("#scale");
const scaleRod = $("#scaleRod");

const scaleRodStroke = $("#ScaleRodStroke");
 
const strokes1 = $("#strokes1");
const strokes2 = $("#strokes2");

const staticPart = $("#static");
const movingPart = $("#moving");
const movingRod = $("#movingRod");
const measureLabel = $("#measureLabel");

const innerNeedle= document.getElementById("innerNeedle");
const needle= document.getElementById("needle");
const innerCircle= document.getElementById("innerCircle");
const lineHolder= document.getElementById("lineHolder");
const deflMeter= document.getElementById("meter");
const hLine= document.getElementById("hLine");
const vLine= document.getElementById("vLine");
const defSupportStand = document.getElementById("suppStand");
const dmai1 = document.getElementById("dmai1"); //deflectionmeterangleindicater1
const dmai2 = document.getElementById("dmai2");
const dmai3 = document.getElementById("dmai3");
const deflReading = document.getElementById("dlefReading");
const deflReadingBorder = document.getElementById("dlefReadingBorder");

const lodUnLodText = document.getElementById("lodUnLodText");

const support1 = document.getElementById("support1");
const support2 = document.getElementById("support2");
const beam = document.getElementById("beam");
const weight = document.getElementById("weight");
const weightHanger = document.getElementById("weightHanger");
const string = document.getElementById("string");
const weightText = document.getElementById("text");
const BaseLine = document.getElementById("BaseLine");

const obserTable = document.getElementById("obsTable");
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

const addweight = document.getElementById("addweight");
const removeweight = document.getElementById("removeweight");
const addreadings = document.getElementById("addreadings");
const next2 = document.getElementById("next2");
const next = document.getElementById("averageBtn");
const showdata = document.getElementById("showData");
const instructions = document.getElementById("instructions");

function DisableButton(button) {
  
  button.disabled = true;
  button.style.backgroundColor = "lightblue";

}

function EnableButton(button) {
  
  button.disabled = false;
  button.style.backgroundColor = "DodgerBlue";
}

addweight.onclick = addWeight;

removeweight.onclick = removeWeight

addreadings.onclick = updateObserTable;

next2.onclick = Next2;

const disableMainSceneButtons = () => {

  DisableButton(addweight);
  DisableButton(removeweight);
  DisableButton(addreadings);

}

const enableMainSceneButtons = () => {

  EnableButton(addweight);
  EnableButton(removeweight);
  EnableButton(addreadings);

}

const suppStand = {width:40,height:45};

var shift = 5;
const weightShift = 6;
const needleShift = 3; //should be an intiger

const stringLength = 5;
const weightHangerWidth = 8;
const weightHangerHeight = 20;

const beemlenght = 5;
const beamStroke = 8;
const supportLength = 3.5;
const deflMeterRadius = 55;
const dlefMeterAngles = [0,60,120];

const margin = 20;
const xStart = margin;
const yStart = 200;

const SVG = { 
              width : 2 * margin + beemlenght * 100,
              height : 100 + supportLength*100 + 10

            }

const middlePoint = (2 * margin + beemlenght * 100) / 2;
const yEnd = 100 + (supportLength * 100);

var d,points;
var state = 0;
var lodUnLod = 0;
var weightValue = 0.0;
var angle = 0;
var index = 0;
var count = 0;

var wSetl = new Set();
var wSetu = new Set();
var avgYm;
var bool = false;

const vc = {
  "x": 20,
  "y": 100,
  "width": 60,
  "length": 500
}

const mr = {
  "x": vc.x,
  "y": vc.y+200,
  "length": 250,
  "width": 15
}

const sr3 = {
  "x": 110,
  "y": 200,
  "length": 420,
}

const draw3DRod = (x, y) => {

  sr3.x = x;
  sr3["y"] = y;

  sr3.d3x = 80;
  sr3.d3yh = 40;
  sr3.d3yv = 30;

  let d = [
    "M", x, y
    , "L", x + sr3.length - sr3.d3x, y
    , "L", x + sr3.length, y + sr3.d3yh
    , "L", x + sr3.d3x, y + sr3.d3yh
    , "z"

    , "M", x, y,
    , "L", x, y + sr3.d3yv
    , "L", x + sr3.d3x, y + sr3.d3yh + sr3.d3yv
    , "L", x + sr3.d3x, y + sr3.d3yh
    , "z"

    , "M", x + sr3.d3x, y + sr3.d3yh
    , "L", x + sr3.d3x, y + sr3.d3yh + sr3.d3yv
    , "L", x + sr3.length, y + sr3.d3yh + sr3.d3yv
    , "L", x + sr3.length, y + sr3.d3yh
    , "z"];

  Rod3D.attr("d", d.join(" "));
  Rod3D.attr("stroke-width", 2);

  showLengthMeasurement();
  showWidthMeasurement();
  showThicknessMeasurement();

}

const showLengthMeasurement = () => {
  lengthLine.attr("x1", sr3.x);
  lengthLine.attr("y1", sr3.y - 10);
  lengthLine.attr("x2", sr3.x + sr3.length - sr3.d3x);
  lengthLine.attr("y2", sr3.y - 10);
  lengthLine.attr("stroke-width", 2);

  lengthL.attr("x", (2 * sr3.x + sr3.length - sr3.d3x) / 2 - 30);
  lengthL.attr("y", sr3.y - 20);
  lengthL.text("Length");
  lengthL.attr("font-size", 25);
}

const showWidthMeasurement = () => {

  let d = ["M",
    sr3.x + 5,
    sr3.y + sr3.d3yv + 25,
    "L",

    sr3.x + sr3.d3x,
    sr3.y + sr3.d3yh + sr3.d3yv + 25,

  ];
  widthLPath.attr("d", d.join(" "));
  widthPath.attr("xlink:href", "#widthLPath");

  widthLine.attr("x1", sr3.x - 10);
  widthLine.attr("y1", sr3.y + sr3.d3yv + 30);
  widthLine.attr("x2", sr3.x + sr3.d3x - 10);
  widthLine.attr("y2", sr3.y + sr3.d3yh + sr3.d3yv + 30);

  widthLine.attr("stroke-width", 2);

  widthL.attr("font-size", 20);

}

const showThicknessMeasurement = () => {

  thicknessLine.attr("x1", sr3.x - 10);
  thicknessLine.attr("y1", sr3.y - 10);
  thicknessLine.attr("x2", sr3.x - 10);
  thicknessLine.attr("y2", sr3.y + sr3.d3yv + 5);
  thicknessLine.attr("stroke-width", 2);

  thicknessL.attr("x", sr3.x - 105);
  thicknessL.attr("y", sr3.y + 20);
  thicknessL.text("Thickness");
  thicknessL.attr("font-size", 20);
}


const drawD3RodScene = () => {

  draw3DRod(
    sr3.x, sr3.y
  );

}

const clear3DRodScene = () => {
  Rod3D.attr("d", "");

  widthL.text("");
  thicknessL.text("");
  lengthL.text("");

  widthLine.attr("x2", widthLine.attr("x1"));
  widthLine.attr("y2", widthLine.attr("y1"));

  thicknessLine.attr("x2", thicknessLine.attr("x1"));
  thicknessLine.attr("y2", thicknessLine.attr("y1"));

  lengthLine.attr("x2", lengthLine.attr("x1"));
  lengthLine.attr("y2", lengthLine.attr("y1"));
}


const clearVernierCaliperse = () => {

  staticPart.attr("d", []);
  movingPart.attr("d", []);
  strokes1.attr("d", []);
  strokes2.attr("d", []);
  movingRod.attr("x2", movingRod.attr("x1"));
  movingRod.attr("y2", movingRod.attr("y1"));
  clearMeasurement();

}

const clearMeasurement = () => {
  measureLabel.html("");
}

const displayMeasurement = (measure,value,units) => {

  measureLabel.attr("x", 250)
  measureLabel.attr("y", 350)
  measureLabel.attr("font-size", 20)
  measureLabel.html(measure + " = " + value + " " + units);

}

const drawVernierCaliperse = (x, y, rodWidth) => {

  d = ["M", x, y
    , "L", x + 20, y
    , "L", x + 20, y - 80
    , "Q", x + 35, y - 60, x + 35, y - 40
    , "L", x + 35, y
    , "L", x + vc.length, y
    , "L", x + vc.length, y + vc.width
    , "L", x + 35, y + vc.width
    , "L", x + 35, y + vc.width + 100
    , "Q", x + 30, y + vc.width + 100
    , x + 20, y + vc.width + 80
    , "L", x, y + vc.width
    , "z"];

  staticPart.attr("d", d.join(" "))

  drawVCRod( x+35 , y+vc.width+30, rodWidth);

  x = x + 140;
  drawMovingPart(x, y);

}

const drawVCStrokes = (x1, x2, y, strokes) => {

  d = [];
  while (x1 <= x2) {
    d.push("M");
    d.push(x1);
    d.push(y);
    d.push("L");
    d.push(x1);
    d.push(y + 10)
    x1 += 6;
  }

  strokes.attr("stroke","black");
  strokes.attr("stroke-width",2);
  strokes.attr("d", d.join(" "));

  strokes.children().first().html("Vernier calipers");

}

const drawMovingPart = (x, y) => {

  d = ["M", x, y
    , "L", x, y - 40
    , "Q", x, y - 60, x + 15, y - 80
    , "L", x + 15, y - 20
    , "L", x + 60, y - 20
    , "L", x + 60, y - 25
    , "L", x + 55, y - 25
    , "L", x + 55, y - 40
    , "Q", x + 65, y - 45, x + 75, y - 40
    , "L", x + 75, y - 25
    , "L", x + 70, y - 25
    , "L", x + 70, y - 20
    , "L", x + 180, y - 20
    , "L", x + 180, y + 10
    , "L", x + 40, y + 10
    , "L", x + 40, y + 3
    , "L", x, y + 3, "Z"

    , "M", x + 40, y + vc.width - 10
    , "L", x + 180, y + vc.width - 10
    , "L", x + 180, y + vc.width + 25
    , "L", x + 160, y + vc.width + 25
    , "L", x + 160, y + vc.width + 10
    , "L", x + 40 + 35, y + vc.width + 10
    , "L", x + 40 + 15, y + vc.width + 80
    , "Q", x + 45, y + vc.width + 100
    , x + 40, y + vc.width + 100
    , "z"
  ]
  movingPart.attr("d", d.join(" "));

  drawVCStrokes(
    x + 50,
    x + 170,
    y - 2,
    strokes1
  );
  drawVCStrokes(
    x + 50,
    x + 170,
    y + vc.width - 8,
    strokes2
  );


}

const drawVCRod = (x, y,width) => {

  mr.x = x;
  mr.y = y;

  mr.width = width;
  movingRod.attr("stroke-width", mr.width);
  movingRod.attr("x1", x + (mr.width + 1) /2 + 1);
  movingRod.attr("y1", y);
  movingRod.attr("x2", movingRod.attr("x1"));
  movingRod.attr("y2", y + mr.length);

}

const measure = (measurement) => {

  d = movingPart.attr("d").split(" ");

  if (parseInt(d[1]) + 40 <= (vc.x + 35 + mr.width + 3)) {
    
    Stop();
    EnableButton(next2);

    displayMeasurement(measurement,tv[measurement],"mm");
    return;
  }

  drawMovingPart(
    parseInt(d[1]) - 1,
    parseInt(d[2])
  );

}

const drawFirstScene = () => {

  disableMainSceneButtons();
  drawVernierCaliperse( vc.x, vc.y, 28);

}

const clearFirstScene = () => {
  clearVernierCaliperse();
}

const drawSecondScene = () => {

  drawVernierCaliperse( vc.x, vc.y, 14);

}
const scaleProps = {
  "x": 20,
  "y": 40,
  "width": 80,
  "length": 500
}

const sr = {

  "width": 25,
  "length": scaleProps.length - 60
}

const drawScale = () => {

  let x = scaleProps.x;
  let y = scaleProps.y;

  d = ["M", x, y
    , "L", x + scaleProps.length, y
    , "L", x + scaleProps.length, y + scaleProps.width
    , "L", x, y + scaleProps.width
    , "z"];

  scale.attr("d", d.join(" "))

  drawStrokesOnScale(
    scaleProps.x + 10,
    scaleProps.x + scaleProps.length,
    scaleProps.y,
    -1,
    strokes1

  );

  drawStrokesOnScale(
    scaleProps.x + 10,
    scaleProps.x + scaleProps.length,
    scaleProps.y + scaleProps.width,
    1,
    strokes2

  );


}

const drawScaleRod = (x, y) => {

  sr.x = x;
  sr["y"] = y;

  scaleRod.attr("stroke-width", sr.width);

  scaleRod.attr("x1", x);
  scaleRod.attr("y1", y);
  scaleRod.attr("x2", x + sr.length);
  scaleRod.attr("y2", y);


}

const drawStrokesOnScale = (x1, x2, y, direction, stroke) => {

  let gap = 5;
  let y1 = 20, y2 = 10;
  if (direction > 0) {
    y1 = -y1;
    y2 = -y2;
  }
  d = [];

  while (x1 <= x2 - 30) {

    d.push("M");
    d.push(x1);
    d.push(y);
    d.push("L");
    d.push(x1);
    d.push(y + y1)
    x1 += gap;

    for (let i = 0; i < 5; i++) {

      d.push("M");
      d.push(x1);
      d.push(y);
      d.push("L");
      d.push(x1);
      d.push(y + y2)
      x1 += gap;

    }
  }

  d.push("M");
  d.push(x1);
  d.push(y);
  d.push("L");
  d.push(x1);
  d.push(y + y1)

  stroke.attr("d", d.join(" "));

  stroke.children().first().html("Scale");

}

const clearRodStroke = (stroke) => {

  stroke.attr("x2", stroke.attr("x1"));
  stroke.attr("y2", stroke.attr("y1"));

}

const clearScaleRod = () => {

  scaleRod.attr("x2", scaleRod.attr("x1"));
  scaleRod.attr("y2", scaleRod.attr("y1"));

  clearRodStroke(scaleRodStroke);
}

const clearScale = () => {

  scale.attr("d", []);

  strokes1.attr("d", []);
  strokes2.attr("d", []);

}

const drawThirdScene = () => {

  drawScale();
  drawScaleRod(
    scaleProps.x + 10,
    scaleProps.y + scaleProps.width + 120
  );

}

const moveScaleDown = () => {

  if ((scaleProps.y + scaleProps.width) >= sr.y - sr.width / 2 - 5) {

    Stop();
    EnableButton(next2);
    displayMeasurement("Length",tv["Length"],"mm");

    return;
  }

  scaleProps.y += 1;
  drawScale();

}

const moveScaleRodUp = () => {

  if (sr.y <= 180) {

    Stop();

    index = 0;
    drawStrokesOnScaleRod(scaleRodStroke);

    return;
  }

  sr.y -= 1;
  drawScaleRod(
    sr.x,
    sr.y
  );

}

const drawStrokesOnScaleRod = (st) => {

  //console.log("rodStrokes");
  let x = sr.x + 10;
  let y = sr.y - sr.width / 2 - 1;

  st.attr("stroke-width", 5);
  st.attr("x1", x);
  st.attr("y1", y);
  st.attr("x2", x);
  st.attr("y2", y);

  intervalId = setInterval( () => {

    if (parseInt(st.attr("x2")) >= sr.x + sr.length - 10) {

      Stop();
      DisableButton(start);
      EnableButton(next2);

    }

    st.attr("x2", parseInt(st.attr("x2")) + 1);

  }, 10);

}

const drawBaseLine = () => {

  BaseLine.setAttribute("x1",0);
  BaseLine.setAttribute("y1",yEnd);
  BaseLine.setAttribute("x2",SVG.width);
  BaseLine.setAttribute("y2",yEnd);

}

const clearBaseLine = () => {

  BaseLine.setAttribute("x2",BaseLine.getAttribute("x1"));
  BaseLine.setAttribute("y2",BaseLine.getAttribute("y1"));
}

const displaylodUnLodText = () => {

  lodUnLodText.innerHTML = "Loading";
  lodUnLodText.setAttribute("x",10);
  lodUnLodText.setAttribute("y",20);

}

const changeRodSettings = () => {

  scaleRod.children().first().html(tv["material"]);
  movingRod.children().first().html(tv["material"]);
  
  scaleRod.attr("stroke",tv["stroke"]);
  movingRod.attr("stroke",tv["stroke"]);

}

function initializeSVG() {

  svg.setAttribute("width",SVG.width);
  svg.setAttribute("height",SVG.height);

  count = 0;
  index = 0;

  disableMainSceneButtons();
  drawD3RodScene();

}

const drawMainScene = () => {

  enableMainSceneButtons();
  drawBaseLine();

  displaylodUnLodText();

  d = ["M",xStart - 5,yStart
        ,"Q",middlePoint,yStart
        ,(xStart + 5 + beemlenght*100),yStart];
  beam.setAttribute("d",d.join(" "));
  beam.setAttribute("stroke-width",beamStroke);

  x = xStart
  y = yStart

  points = [x-10,y+(beamStroke/2)+10
            ,x,y+(beamStroke/2)
            ,x+10,y+(beamStroke/2)+10
            ,x+15,100 + supportLength * 100
            ,x-15,100 + supportLength * 100];
  support1.setAttribute("points",points.join(" "));

  x = (xStart + beemlenght*100);
  points = [x-10,y+(beamStroke/2)+10
            ,x,y+(beamStroke/2)
            ,x+10,y+(beamStroke/2)+10
            ,x+15,100 + supportLength*100
            ,x-15,100 + supportLength*100];
  support2.setAttribute("points",points.join(" "));

  

  drawWeight(middlePoint,yStart)
  drawDlefMeter(middlePoint - 8,yStart -(deflMeterRadius+40),deflMeterRadius,0);

}

function drawWeight(wx,wy) {
  // body...
  weightHanger.setAttribute('x',wx-(weightHangerWidth/2));
  weightHanger.setAttribute('y',wy-10);
  weightHanger.setAttribute('width',weightHangerWidth);
  weightHanger.setAttribute('height',weightHangerHeight);

  string.setAttribute("x1",wx);
  string.setAttribute("y1",wy);
  string.setAttribute("x2",wx);
  string.setAttribute("y2",wy + (stringLength * 10));

  points = [wx-20,wy + (stringLength * 10)
            ,wx+20,wy + (stringLength * 10)
            ,wx+40,wy + (stringLength * 10 + 40)
            ,wx-40,wy + (stringLength * 10 + 40)];
  weight.setAttribute("points",points.join(" "));

  weightText.setAttribute("font-size","19px");
  weightText.setAttribute('x',wx-25);
  weightText.setAttribute('y',parseInt(string.getAttribute("y2")) + (stringLength * 10) - 20);

}

function drawDlefMeter(cx,cy,radius,standdir) {
  // body...
  deflMeter.setAttribute("cx",cx);
  deflMeter.setAttribute("cy",cy);
  deflMeter.setAttribute("r",radius);

  innerCircle.setAttribute("cx",cx);
  innerCircle.setAttribute("cy",cy);
  innerCircle.setAttribute("r",5);

  innerNeedle.setAttribute('x1',cx);
  innerNeedle.setAttribute('y1',cy);
  innerNeedle.setAttribute('x2',cx - (radius - 5));
  innerNeedle.setAttribute('y2',cy);
  
  d = ["M",cx-8,15
        ,"L",cx-8,25
        ,"L",cx-4,25
        ,"L",cx-4,200-25
        ,"L",cx,(200 - beamStroke / 2)
        ,"L",cx+4,200-25
        ,"L",cx+4,25
        ,"L",cx+8,25
        ,"L",cx+8,15,"z" ]
  needle.setAttribute("d",d.join(" "));

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
  dmai3.setAttribute('x',cx + (radius - 23));
  dmai3.setAttribute('y',cy + 5);

  deflReading.setAttribute('x',cx-5);
  deflReading.setAttribute('y',cy + (radius - 15));

  deflReadingBorder.setAttribute("x",cx - 20);
  deflReadingBorder.setAttribute("y",parseInt(deflReading.getAttribute("y"))-18);
  deflReadingBorder.setAttribute("width",radius-12);
  deflReadingBorder.setAttribute("height",radius-33);

  hLine.setAttribute('x1',cx);
  hLine.setAttribute('y1',cy);

  if(standdir == 0) {
    x2 = cx - (radius+60);
    cx = x2 + 25;
  } else {
    x2 = cx + (radius+60);
    cx = x2 - 25;
  }
  hLine.setAttribute('x2',x2);
  hLine.setAttribute('y2',cy);

  lineHolder.setAttribute("cx",cx);
  lineHolder.setAttribute("cy",cy);
  lineHolder.setAttribute("r",10);
  
  vLine.setAttribute('x1',cx);
  vLine.setAttribute('y1',cy - 30);
  vLine.setAttribute('x2',vLine.getAttribute('x1'));
  vLine.setAttribute('y2',yEnd- suppStand.height);

  defSupportStand.setAttribute('x',parseInt(vLine.getAttribute("x2")) - (suppStand.width / 2) );
  defSupportStand.setAttribute('y',vLine.getAttribute("y2"));
  defSupportStand.setAttribute('width',suppStand.width);
  defSupportStand.setAttribute('height',suppStand.height);

}

function addWeight() {
  
  if(weightValue < 2.5) {

  	weightValue += 0.5;

  	if(weightValue == 2.5 && lodUnLod === 0) {
  		lodUnLodText.innerHTML = "Unloading"
  		lodUnLod = 1;
  	}

  	d = beam.getAttribute('d').split(" ");
    
    d[5] = parseInt(d[5]) + shift;
    beam.setAttribute('d',d.join(" "));

    increaseWeightSize(); //to increase size of weight.

    setWeightHangerHeight(parseInt(d[2]),parseInt(d[5]),parseInt(d[7]));
    
    needleDown();

    angle += 34;
    drawInnerNeedle(180 - angle);

    setdlefReading(++index);
    dlefReading.setAttribute("x",parseInt(dlefReading.getAttribute("x"))-2);
    
  } else {
    alert("Cannot add more weight!");
  }
    
}

function removeWeight() {
  
 if(weightValue > 0) {

 		weightValue -= 0.5;

 		if(weightValue == 0 && lodUnLod === 1 ) {

      lodUnLodText.innerHTML = "Loading"
      bool = true;

  	}

 		d = beam.getAttribute('d').split(" ");

    d[5] = parseInt(d[5]) - shift;
    beam.setAttribute('d',d.join(" "));

    decreaseWeightSize();

    setWeightHangerHeight(parseInt(d[2]),parseInt(d[5]),parseInt(d[7]));
    
    needleUp();

    angle -= 34;
    drawInnerNeedle(180 - angle);

    setdlefReading(--index);
    dlefReading.setAttribute("x",parseInt(dlefReading.getAttribute("x"))+2);

  } else {
    alert("Cannot remove weight!");
  }

}

function setWeightHangerHeight(x1,x2,x3) {

  let t=0.5;

  y = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * x2 + t * t * x3;
  y -= 8; 
  weightHanger.setAttribute('y',y.toString());
  
  string.setAttribute("y1",y+weightHangerHeight);
  string.setAttribute("y2",parseInt(string.getAttribute("y1")) + stringLength * 10);

}

function increaseWeightSize() {

  points = weight.getAttribute('points').split(" ");

  points[0] = parseInt(points[0]) - weightShift;
  points[2] = parseInt(points[2]) + weightShift;
  points[4] = parseInt(points[4]) + weightShift; //increases width.
  points[6] = parseInt(points[6]) - weightShift;

  points[5] = parseInt(points[5]) + weightShift; //increases height.
  points[7] = parseInt(points[7]) + weightShift;

  for (var i = 1; i < points.length; i+=2) {
    points[i] = parseInt(points[i]) + 3; //moves weight UP. (only Y coordinates should changed)
  }
  
  weight.setAttribute('points',points.join(" "));

  weightText.setAttribute('y',points[7]-15);
  
  weightText.innerHTML = ""+weightValue+" KG";
  
}

function decreaseWeightSize() {

  points = weight.getAttribute('points').split(" ");

  points[0] = parseInt(points[0]) + weightShift;
  points[2] = parseInt(points[2]) - weightShift;
  points[4] = parseInt(points[4]) - weightShift;
  points[6] = parseInt(points[6]) + weightShift;

  points[5] = parseInt(points[5]) - weightShift;
  points[7] = parseInt(points[7]) - weightShift;

  for (var i = 1; i < points.length; i+=2) {
    points[i] = parseInt(points[i]) - 3; //moves weight down. (only Y coordinates should changed)
  }
  
  weight.setAttribute('points',points.join(" "));

  weightText.setAttribute('y',points[7]-15);
  
  weightText.innerHTML = ""+weightValue+" KG";

}

function needleDown() {

  d = needle.getAttribute('d').split(" ");
  for (var i = 2; i < d.length; i+=3) {
    d[i] = parseInt(d[i]) + needleShift;
  }
  needle.setAttribute('d',d.join(" "));
}

function needleUp() {

  d = needle.getAttribute('d').split(" ");
  for (var i = 2; i < d.length; i+=3) {
    d[i] = parseInt(d[i]) - needleShift;
  }
  needle.setAttribute('d',d.join(" "));
}


function degToRad(angle) {
    // Degrees to radians
    return ((angle * Math.PI) / 180);
}

function drawInnerNeedle(angle) {

  let Cx = parseInt(innerCircle.getAttribute("cx"));
  let Cy = parseInt(innerCircle.getAttribute("cy"));
  let radius = parseInt(deflMeter.getAttribute("r")) - 6;

  angle = degToRad(angle);
  let x = Cx + radius * Math.cos(angle); //radians
  let y = Cy + radius * Math.sin(angle); //radians
  y = 2 * Cy - y;  //deep explination required **
  innerNeedle.setAttribute('x2',x);
  innerNeedle.setAttribute('y2',y);

}

const defl = [0.0,23,48,69,93,117];
const wv = [4.903,9.806,14.709,19.613,24.517];
const lodini = [0.0,23,48,69,93];
const lodfin = [23,48,69,93,117];
const unlodini = [23,47,70,93,117];
const unlodfin = [0,23,47,69,93];
const lodmm = [0.23,0.25,0.21,0.24,0.24];
const unlodmm = [0.23,0.24,0.23,0.23,0.24];
const ym = [1.63,1.57,1.63,1.63,1.61];
var minput = [verifyYM.ym1,verifyYM.ym2,verifyYM.ym3,verifyYM.ym4,verifyYM.ym5];
const pow10 = 5;

function setdlefReading(index) { 

  deflReading.innerHTML = defl[index];

}

function AddReadingsToObsTable(weight) {

  if(lodUnLod == 0) {

    if(!wSetl.has(weight)) {

      wSetl.add(weight);

      obserTable.rows[2 + weight * 2].cells[1].innerHTML= wv[weight*2 - 1];

      obserTable.rows[2 + weight * 2].cells[2].innerHTML= lodini[weight*2 - 1];
      obserTable.rows[2 + weight * 2].cells[3].innerHTML= lodfin[weight*2 - 1];

      obserTable.rows[2 + weight * 2].cells[6].innerHTML= lodmm[weight*2 - 1];
    
    } else {
      alert("Current Readings are Already Added to Observations Table.");
    }

  } else {

    if(!wSetu.has(weight)) {

      if(weight != 0) wSetu.add(weight);

      if(weight == 2.5) {

        wSetl.add(weight);

        obserTable.rows[2 + weight * 2].cells[1].innerHTML= wv[weight*2 - 1];

        obserTable.rows[2 + weight * 2].cells[2].innerHTML= lodini[weight*2 - 1];
        obserTable.rows[2 + weight * 2].cells[3].innerHTML= lodfin[weight*2 - 1];

        obserTable.rows[2 + weight * 2].cells[6].innerHTML= lodmm[weight*2 - 1];

      } else {

        weight += 0.5;

        obserTable.rows[2 + weight * 2].cells[1].innerHTML= wv[weight*2 - 1];
      
        obserTable.rows[2 + weight * 2].cells[4].innerHTML= unlodini[weight*2 - 1];
        obserTable.rows[2 + weight * 2].cells[5].innerHTML= unlodfin[weight*2 - 1];
        
        obserTable.rows[2 + weight * 2].cells[7].innerHTML= unlodmm[weight*2 - 1];
      }
    
    } else {

      alert("Current Readings are Already Added to Observations Table.");
    }

  }
}

function updateObserTable() {

  if(bool) {
    //alert(bool);
    bool = false;
    AddReadingsToObsTable(weightValue);
    lodUnLod = 0;
    return;

  }

  if(weightValue == 0) {

    alert("Please Add some weight to Take Readings");
    return;

  }

  if(wSetl.size == 5 && wSetu.size == 5) {
    alert("Observations Table is Already Filled!.\nClick on Reset Button to Start Experiment From Begining.");
    return;
  }

  if(areInstructionsShown) { toogleInstructions(); }

  AddReadingsToObsTable(weightValue);

}

function calculateAverage() {

  if(wSetl.size == 5 && wSetu.size == 5) {

  	for(let i=0; i < ym.length; i++) {

  		obserTable.rows[2 + i + 1].cells[8].innerHTML = ((lodmm[i] + unlodmm[i])/2).toFixed(3);

  	}

    showFormula();

    Next("Next",showVerifyTable);

  } else {
    alert("Please Record All the Observations in Table.");
  }
  
}

function showResults() {

  avgYm = 0;
  average.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Average Young's Modulus <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= ( ";
  average.innerHTML += ym[0];
  avgYm += ym[0];
  for (let i = 1; i < ym.length; i++) {
    average.innerHTML += " + "+ ym[i];
    avgYm += ym[i];
  }
  average.innerHTML += ") x 10<sup>"+pow10+"</sup> / 5";
  avgYm /= 5;
  average.innerHTML += "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= " + avgYm.toFixed(2) + " x 10<sup>"+pow10+"</sup> &nbsp;";

  result.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3><u>Result :- </u></h3>"+
                     "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Young’s modulus of Beam material is &nbsp;<u>"+
                     avgYm.toFixed(2) + " x 10 </u> <sup>"+pow10+"</sup>&nbsp;<i>(N/mm<sup>2</sup>)</i>";

}

function Reset() {
  window.location.reload();
}

next.onclick = calculateAverage;
showdata.onclick = showData;
instructions.onclick = toogleInstructions;
var isVerified = false;

function Next(text,fun) {

  //alert("next");
  //console.log(text);
  next.innerHTML = text;
  next.onclick = fun;
}

function showData() {

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

var measuredVal = [];

function showResultTable() {

  for (var i = 0; i < minput.length; i++) {

    if(minput[i].value == "") {
      measuredVal.push(0);
    } else {
      measuredVal.push(parseFloat(minput[i].value))
    }

  }
 
  for (var i = 0; i < ym.length; i++) {
    
      resultTable.rows[ 2 + i].cells[1].innerHTML = ym[i] + " x 10<sup>"+pow10+"</sup>";
      resultTable.rows[ 2 + i].cells[2].innerHTML = minput[i].value + " x 10<sup>"+pow10+"</sup>";
      resultTable.rows[ 2 + i].cells[3].innerHTML = percentageError(measuredVal[i],ym[i]);
    
  }

  ResultDiv.style.display = "block";
  VerifyDiv.style.display = "none";
  ObsTabDiv.style.display = "none";
  showdata.style.display = "block";

  Next("Show Result",showResults);
  isVerified = true;

}

function percentageError(measured,actual) {

  let m1 = (Math.abs(measured - actual) / actual).toFixed(3);

  return (parseFloat(m1) * 100).toFixed(2);
}



function clearResults() {

  average.innerHTML = "";
  result.innerHTML = "";
}

function showFormula() {

  let image = new Image(height=320);
  image.src = "../images/description-formula1.png";
  image.alt = "Young’s Modulus Formula";

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

const Stop = () => {

  clearInterval(intervalId);

}

const tv = {

  "material" : "Mild Steel",
  "Width" : 47.72,
  "Thickness" : 10.62,
  "Length" : 1200,
  "stroke" : "blue"

}

function Next2() {
  
  count ++;
  console.log("next----"+count);
  if(count == 1) {
    
    clear3DRodScene();
    drawFirstScene();
    changeRodSettings();

  } else if(count == 2) {
    
    DisableButton(next2);

    intervalId = setInterval(function() {
        measure("Width");          
    },20);  
    
     
  } else if(count == 3) {

    clearFirstScene();
    drawSecondScene();

  } else if(count == 4) {

    DisableButton(next2);

    intervalId = setInterval(function() {
        measure("Thickness");          
    },20); 
    
    
  } else if(count == 5) {

    clearFirstScene();
    drawThirdScene();
    
  } else if(count == 6) {

    DisableButton(next2);

    intervalId = setInterval(function () {
      moveScaleDown();
    }, 20);

  } else if(count == 7) {

    DisableButton(next2);

    clearMeasurement();
    clearScale();
    clearScaleRod();

    drawMainScene();
  }

}