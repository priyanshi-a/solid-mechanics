const svg = $("#svgPanel");

const scale = $("#scale");
const scaleRod = $("#scaleRod");

const scaleRodStroke = $("#ScaleRodStroke");
 
const strokes1 = $("#strokes1");
const strokes2 = $("#strokes2");

const staticPart = $("#static");
const movingPart = $("#moving");
const movingRod = $("#movingRod");
const measureLabel = $("#measureLabel");

const rod = $("#rod");
const rodL = $("#rodL");
const rodR = $("#rodR");
const rodHolderL = $("#rodHolderL");
const rodHolderR = $("#rodHolderR");
const rholderSl = $("#rholderSl");
const rholderSr = $("#rholderSr");
const axell1 = $("#axell1");
const axell2 = $("#axell2");
const axelr = $("#axelr");
const machineBodyl = $("#machineBodyl");
const machineBodyr = $("#machineBodyr");
const axellend = $("#axellend");

const lHole1 = $("#lHole1");
const lHole2 = $("#lHole2");
const lHole3 = $("#lHole3");
const rHole1 = $("#rHole1");
const rHole2 = $("#rHole2");
const rHole3 = $("#rHole3");

const rodStroke1 = $("#rodStroke1");
const rodStroke2 = $("#rodStroke2");
const rodStroke3 = $("#rodStroke3");
const rodStroke4 = $("#rodStroke4");
const rodStroke5 = $("#rodStroke5");
const rodStroke6 = $("#rodStroke6");

const dmai1 = $("#dmai1");
const dmai2 = $("#dmai2");
const dmai3 = $("#dmai3");
const deflMeter= $("#meter");
const innerNeedleR= $("#innerNeedleR");
const innerNeedleB= $("#innerNeedleB");
const innerCircle= $("#innerCircle");
const deflReading = $("#dlefReading");
const deflReadingBorder = $("#dlefReadingBorder");
const BaseLine = $("#BaseLine");

const wheel = $("#wheel");
const wheelSupport1 = $("#wheelSupport1");
const wheelSupport2 = $("#wheelSupport2");
const wheelSupport3 = $("#wheelSupport3");

const obserTable =document.getElementById("obsTable");
const resultTable = document.getElementById("resultTable");
const average = $("#Average");
const result = $("#result");

const Content = $("#Content");
const simulationBoard = $("#simulationBoard");

const options = $("#options");
const tableDiv = $("#tableDiv");
const ObsTabDiv = $("#ObsTabDiv");
const VerifyDiv = $("#VerifyDiv");
const ResultDiv = $("#ResultDiv");

const instructionsDiv = $("#instructionsDiv");
const avgDiv = $("#avgDiv");

ObsTabDiv.css("display","block");
VerifyDiv.css("display","none");
ResultDiv.css("display","none");
instructionsDiv.css("display","none");

const next2 = $("#next2");
const start = $("#start");
const stop = $("#stop");
const reset = $("#reset");
const next = $("#next");
const showdata = $("#showData");
const instructions = $("#instructions");

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

next2.on("click",Next2);
start.on("click",Start);
stop.on("click",Stop);
reset.on("click",Reset);

function DisableButton(button) {
  // body...
  button.attr("disabled",true);
  button.css("backgroundColor","lightblue");

}

function EnableButton(button) {
  // body...
  button.attr("disabled",false);
  button.css("backgroundColor","DodgerBlue");
 
}

DisableButton(start);
DisableButton(stop);
DisableButton(next);

const rodLenght = 120;
const rodStroke = 10;
const sw = 1.5;
const gap = (rodLenght - 6 * sw)/7;

const wheelRadius = 30;
const deflMeterRadius = 55;
const dlefMeterAngles = [0,30,60];
const meterNeedleShift = 0.2;

const machineBody = {

                      width : 2 * (deflMeterRadius + 25),
                      height :  2 * (deflMeterRadius + 25) + 10
}

const rodHolder = {

              width : 25,
              height : machineBody.width / 3
}

const holegap = rodHolder.width / 22;
const holeRadius = 3 * holegap;


const rholderS = {
                    width : 10,
                    height : rodHolder.height + 20
}

const axel = {

                width : 15,
                height : 30
}

const margin = 10;

const SVG = {
              width : 2 * (margin + machineBody.width + axel.width + rholderS.width + rodHolder.width ) + rodLenght + 40,
              height : 470 
}

const xStart = margin;
const yStart = SVG.height - (machineBody.height + 10);
const yEnd = SVG.height - 10;

var angle1 = 90;
var innerNeedleAngle = 180;
var meterReading = 0;
const meterReadingShift = 0.1;
var readingPos = 0;
var deflProperties = {};
var wheelProperties = {};
var midpoint,x,y;

const tooglestrokeval = 1;
var s1 = {state : 0};
var s2 = {state : 0};
var s3 = {state : 0};
var s4 = {state : 0};
var s5 = {state : 0};
var s6 = {state : 0};

const strokedist = 1;
var points1;
var points2;
var points3;
var points4;
var points5;
var points6;

var index1 = 0,index2 = 0,index3 = 0;

var points=[],d=[],t;
var count = 0,index = 0;


function middlePoint(x1,x2) {

  return (x1 + x2) / 2;

}

function drawBaseLine() {

  BaseLine.attr("x1",0);
  BaseLine.attr("y1",SVG.height - 10);
  BaseLine.attr("x2",SVG.width);
  BaseLine.attr("y2",SVG.height - 10);

}

const clearBaseLine = () => {

  BaseLine.attr("x2",BaseLine.attr("x1"));
  BaseLine.attr("y2",BaseLine.attr("y1"));

}

options.on("change", () => {

  material = options.val();
  changeRodSettings();

});

const changeRodSettings = () => {

  scaleRod.children().first().html(tv[material]["material"]);
  movingRod.children().first().html(tv[material]["material"]);
  rod.children().first().html(tv[material]["material"]);

  scaleRod.attr("stroke",tv[material]["stroke"]);
  movingRod.attr("stroke",tv[material]["stroke"]);
  rod.attr("stroke",tv[material]["stroke"]);

}

function initializeSVG() {

  svg.attr("width",SVG.width);
  svg.attr("height",SVG.height);

  drawFirstScene();
  changeRodSettings();

}

const vc = {
  "x": 50,
  "y": 130,
  "width": 60,
  "length": 500
}

const mr = {
  "x": vc.x,
  "y": vc.y+200,
  "length": 120,
  "width": 15
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

const drawVernierCaliperse = (x, y) => {

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

  drawVCRod( x+35 , y+vc.width+30)

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

const drawVCRod = (x, y) => {

  mr.x = x;
  mr.y = y;

  mr.width = 18;
  movingRod.attr("stroke-width", mr.width);
  movingRod.attr("x1", x + (mr.width + 1) /2 + 1);
  movingRod.attr("y1", y);
  movingRod.attr("x2", movingRod.attr("x1"));
  movingRod.attr("y2", y + 220);

}

const measure = () => {

  d = movingPart.attr("d").split(" ");

  if (parseInt(d[1]) + 40 <= (vc.x + 35 + mr.width + 3)) {
    
    Stop();
    DisableButton(start);
    EnableButton(next2);

    displayMeasurement("Diameter",tv[material]["diameter"],"mm");
    return;
  }

  drawMovingPart(
    parseInt(d[1]) - 1,
    parseInt(d[2])
  );

}

const drawFirstScene = () => {

  drawVernierCaliperse( vc.x, vc.y);

}

const clearFirstScene = () => {
  clearVernierCaliperse();
}

const scaleProps = {
  "x": 40,
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

const drawSecondScene = () => {

  drawScale();
  drawScaleRod(
    scaleProps.x + 10,
    scaleProps.y + scaleProps.width + 120
  );

}

const moveScaleDown = () => {

  if ((scaleProps.y + scaleProps.width) >= sr.y - sr.width / 2 - 5) {

    Stop();
    DisableButton(start);
    EnableButton(next2);
    displayMeasurement("Length",tv[material]["length"],"mm");

    return;
  }

  scaleProps.y += 1;
  drawScale();

}

const moveScaleRodUp = () => {

  if (sr.y <= 180) {

    Stop();
    DisableButton(start);

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

const colors = {

                  axelend : "black",
                  machineBody : "#00C853",
                  axel : "#212121",
                  rholderS : "#212121",
                  rodHolder : "#212121",
                  hole : "#BF360C",
                  rodColor : "blue",

};

function fillColors() {

  axellend.attr("fill",colors.axelend);
  axell1.attr("fill",colors.axel);
  machineBodyl.attr("fill",colors.machineBody);
  axell2.attr("fill",colors.axel);
  rholderSl.attr("fill",colors.rholderS);
  rodHolderL.attr("fill",colors.rodHolder);

  rod.attr("stroke",colors.rodColor);
  rodL.attr("stroke",colors.rodColor);
  rodR.attr("stroke",colors.rodColor);
  
  rodHolderR.attr("fill",colors.rodHolder);
  rholderSr.attr("fill",colors.rholderS);
  axelr.attr("fill",colors.axel);
  machineBodyr.attr("fill",colors.machineBody);

  lHole1.attr("stroke",colors.hole);
  lHole2.attr("stroke",colors.hole);
  lHole3.attr("stroke",colors.hole);

  rHole1.attr("stroke",colors.hole);
  rHole2.attr("stroke",colors.hole);
  rHole3.attr("stroke",colors.hole);

}

function degToRad(angle) {
    // Degrees to radians
    return ((angle * Math.PI) / 180);
}

const drawMainScene = () => {

  EnableButton(start);
  drawMachineBody();

}

function drawLine(line,angle,properties) {

    angle = degToRad(angle);
    let x = properties.cx + properties.radius * Math.cos(angle); //radians
    let y = properties.cy + properties.radius * Math.sin(angle); //radians
    y = 2 * properties.cy - y;  //deep explination required **
    line.attr("x1",properties.cx);
    line.attr("y1",properties.cy);
    line.attr("x2",x);
    line.attr("y2",y);
    
  }

function drawDlefMeter(cx,cy,radius) {

  deflProperties["cx"] = cx;
  deflProperties["cy"] = cy;
  deflProperties["radius"] = radius - 5;

  deflMeter.attr("cx",cx);
  deflMeter.attr("cy",cy);
  deflMeter.attr("r",radius);

  innerCircle.attr("cx",cx);
  innerCircle.attr("cy",cy);
  innerCircle.attr("r",5);

  drawLine(innerNeedleB,innerNeedleAngle,deflProperties);
  drawLine(innerNeedleR,innerNeedleAngle,deflProperties);

  dmai1.text(dlefMeterAngles[0]);
  dmai1.attr("font-size","12px");
  dmai1.attr('x',cx - (radius - 2));
  dmai1.attr('y',cy + 5);

  dmai2.text(dlefMeterAngles[1]);
  dmai2.attr("font-size","12px");
  dmai2.attr('x',cx - 5);
  dmai2.attr('y',cy - (radius - 13));

  dmai3.text(dlefMeterAngles[2]);
  dmai3.attr("font-size","12px");
  dmai3.attr('x',cx + (radius - 23));
  dmai3.attr('y',cy + 5);

  deflReading.attr('x',cx-10);
  deflReading.attr('y',cy + (radius - 15));

  deflReadingBorder.attr("x",cx - radius/2);
  deflReadingBorder.attr("y",parseInt(deflReading.attr("y")) - 18);
  deflReadingBorder.attr("width",radius);
  deflReadingBorder.attr("height",radius/3 + 5);

}

function drawWheel(cx,cy,radius) {

  wheelProperties["cx"] = cx;
  wheelProperties.cy = cy;
  wheelProperties.radius = radius;

  wheel.attr("cx",cx);
  wheel.attr("cy",cy);
  wheel.attr("r",radius);

  
  drawLine(wheelSupport1,angle1,wheelProperties);
  drawLine(wheelSupport2,angle1 + 120,wheelProperties);
  drawLine(wheelSupport3,angle1 + 240,wheelProperties);

}

function getBackRedNeedle() {

  if(innerNeedleAngle >= 180) {
      clearInterval(intervalId);
  }

  drawLine(innerNeedleR,innerNeedleAngle += meterNeedleShift,deflProperties);
}

function drawLeftHolderHoles(x,y,r) {

  lHole1.attr("cx",x);
  lHole1.attr("cy",y - (4 * r + holegap ));
  lHole1.attr("r",r);

  lHole2.attr("cx",x);
  lHole2.attr("cy",y);
  lHole2.attr("r",r);

  lHole3.attr("cx",x);
  lHole3.attr("cy", y + (4 * r + holegap ));
  lHole3.attr("r",r);

}

function drawRightHolderHoles(x,y,r) {

  rHole1.attr("cx",x);
  rHole1.attr("cy",y - (4 * r + holegap ));
  rHole1.attr("r",r);

  rHole2.attr("cx",x);
  rHole2.attr("cy",y);
  rHole2.attr("r",r);

  rHole3.attr("cx",x);
  rHole3.attr("cy", y + (4 * r + holegap ));
  rHole3.attr("r",r);

}

function drawMachineBody() {

  midpoint = middlePoint(yStart,yEnd);

  x = xStart;

  axellend.attr("x",x)
  axellend.attr("y",midpoint - (rholderS.height + 10)/2)
  axellend.attr("width",rholderS.width + 5)
  axellend.attr("height",rholderS.height + 10)

  x = xStart+rholderS.width;
  axell1.attr("x",x);
  axell1.attr("y",midpoint - axel.height/2)
  axell1.attr("width",axel.width + 15)
  axell1.attr("height",axel.height)

  x = parseInt(axell1.attr("x"))+parseInt(axell1.attr("width"));
  machineBodyl.attr("x",x);
  machineBodyl.attr("y",yStart);
  machineBodyl.attr("width",machineBody.width);
  machineBodyl.attr("height",machineBody.height);

  drawWheel(middlePoint(x,x+machineBody.width) + wheelRadius,
            yStart + wheelRadius + 10,
            wheelRadius);

  x = parseInt(machineBodyl.attr("x")) + parseInt(machineBodyl.attr("width"));
  axell2.attr("x",x);
  axell2.attr("y",midpoint - axel.height/2)
  axell2.attr("width",axel.width)
  axell2.attr("height",axel.height)

  x = parseInt(axell2.attr("x")) + parseInt(axell2.attr("width"));
  rholderSl.attr("x",x)
  rholderSl.attr("y",midpoint - rholderS.height/2)
  rholderSl.attr("width",rholderS.width)
  rholderSl.attr("height",rholderS.height)

  x = parseInt(rholderSl.attr("x")) + parseInt(rholderSl.attr("width"));
  rodHolderL.attr("x",x);
  rodHolderL.attr("y",midpoint - rodHolder.height/2);
  rodHolderL.attr("width",rodHolder.width);
  rodHolderL.attr("height",rodHolder.height);

  drawLeftHolderHoles(middlePoint(x,x+parseInt(rodHolderL.attr("width")))
                      ,midpoint
                      ,holeRadius
                    );

  x = parseInt(rodHolderL.attr("x")) + parseInt(rodHolderL.attr("width"));
  rod.attr("x1",x);
  rod.attr("y1",midpoint);
  rod.attr("x2",x+rodLenght);
  rod.attr("y2",midpoint);
  rod.attr("stroke-width",rodStroke);

  
  x = parseInt(rod.attr("x2"));
  rodHolderR.attr("x",x);
  rodHolderR.attr("y",midpoint - rodHolder.height/2);
  rodHolderR.attr("width",rodHolder.width);
  rodHolderR.attr("height",rodHolder.height);

  drawRightHolderHoles(middlePoint(x,x+parseInt(rodHolderR.attr("width")))
                      ,midpoint
                      ,holeRadius
                    );

  x = parseInt(rodHolderR.attr("x")) + parseInt(rodHolderR.attr("width"));
  rholderSr.attr("x",x)
  rholderSr.attr("y",midpoint - rholderS.height/2)
  rholderSr.attr("width",rholderS.width)
  rholderSr.attr("height",rholderS.height)

  x = parseInt(rholderSr.attr("x")) + parseInt(rholderSr.attr("width"));
  axelr.attr("x",x);
  axelr.attr("y",midpoint - axel.height/2)
  axelr.attr("width",axel.width)
  axelr.attr("height",axel.height)

  x = parseInt(axelr.attr("x")) + parseInt(axelr.attr("width"));
  machineBodyr.attr("x",x);
  machineBodyr.attr("y",yStart);
  machineBodyr.attr("width",machineBody.width);
  machineBodyr.attr("height",machineBody.height);

  drawDlefMeter(  middlePoint(x,x+machineBody.width),
                  middlePoint(yStart,yEnd),
                  deflMeterRadius);

  fillColors();

  x = middlePoint(parseInt(rod.attr("x1")),parseInt(rod.attr("x2")))

  points1 = drawStroke(x - gap/2, midpoint, 0, rodStroke1);
  points2 = drawStroke(x + gap/2, midpoint, 1, rodStroke2);
  points3 = drawStroke(x - (gap/2 + sw + gap), midpoint,0,rodStroke3);
  points4 = drawStroke(x + (gap/2 + sw + gap), midpoint,1,rodStroke4);
  points5 = drawStroke(x - (gap/2 + 2 * (sw + gap)), midpoint,0,rodStroke5);
  points6 = drawStroke(x + (gap/2 + 2 * (sw + gap)), midpoint,1,rodStroke6);
  
}

function drawStroke(x,y,dir,stroke) {

  //console.log(x,y,dir);

  if(dir == 1) {
    x1 = x + 3;
    x2 = x - 3;
    y1 = y - rodStroke/2;
    y2 = y + rodStroke/2;
  } else {
    x1 = x - 3;
    x2 = x + 3;
    y1 = y + rodStroke/2;
    y2 = y - rodStroke/2;
  }

  startStroke(stroke,x1,y1);

  return calculatePoints(x1,y1,x2,y2);

}

function ResetRod() {

  x = parseInt(rodHolderL.attr("x")) + parseInt(rodHolderL.attr("width"));

  rod.attr("x1",x);
  rod.attr("y1",midpoint);
  rod.attr("x2",x+rodLenght);
  rod.attr("y2",midpoint);

  rodL.attr("x1",0);
  rodL.attr("y1",0);
  rodL.attr("x2",0);
  rodL.attr("y2",0);

  rodR.attr("x1",0);
  rodR.attr("y1",0);
  rodR.attr("x2",0);
  rodR.attr("y2",0);
  
}

function ReplaceRod() {

  x = middlePoint(parseInt(rod.attr("x1")),parseInt(rod.attr("x2")))

  rodL.attr("x1",rod.attr("x1"));
  rodL.attr("y1",rod.attr("y1"));
  rodL.attr("x2",x - 1);
  rodL.attr("y2",rod.attr("y1"));
  rodL.attr("stroke-width",rodStroke);

  rodR.attr("x1",x + 1);
  rodR.attr("y1",rod.attr("y1"));
  rodR.attr("x2",rod.attr("x2"));
  rodR.attr("y2",rod.attr("y2"));
  rodR.attr("stroke-width",rodStroke);

  rod.attr("x1",0);
  rod.attr("y1",0);
  rod.attr("x2",0);
  rod.attr("y2",0);
  
}

function distance(x1,y1,x2,y2) {

  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

}
 
function calculatePoints(x1,y1,x2,y2) {

  points = [];

  d = distance(x1,y1,x2,y2);
  t = strokedist / d;
  //console.log("distance = " + d);

  while(t > 0 && t < 1) {

    x3 = x1 + t * (x2 - x1).toFixed(2);
    y3 = y1 + t * (y2 - y1).toFixed(2);

    points.push({x3,y3})
    x1 = x3;
    y1 = y3;

    d = distance(x1,y1,x2,y2);
    t = strokedist / d;
  }
  //console.log(points);
  return points;
}

function startStroke(stroke,x,y) {

  stroke.attr("x1",x);
  stroke.attr("y1",y);
  stroke.attr("x2",x);
  stroke.attr("y2",y);
  stroke.attr("stroke-width",2)

}

function removeStroke(stroke) {

  stroke.attr("x2",stroke.attr("x1"));
  stroke.attr("y2",stroke.attr("y1"));

}

function toogleStroke(stroke,s) {

      if(s.state == 0) {
        s.state = 1;
        stroke.attr("x1",parseInt(stroke.attr("x1")) + tooglestrokeval);
        stroke.attr("x2",parseInt(stroke.attr("x2")) - tooglestrokeval);
      } else {
        s.state = 0;
        stroke.attr("x1",parseInt(stroke.attr("x1")) - tooglestrokeval);
        stroke.attr("x2",parseInt(stroke.attr("x2")) + tooglestrokeval);
      }
}

var temp = 1;

function rotateRod() {

  if(meterReading >= tv[material]["torque"]) {

    ReplaceRod();
    Stop();
    DisableButton(start);
    intervalId = setInterval(getBackRedNeedle,15);
    fillObsTable();

    return;
    
  }

  if(temp % tv[material]["delay"] == 0) {

    if(temp > 30 && index1 < points1.length) {

      rodStroke1.attr("x2",points1[index1].x3);
      rodStroke1.attr("y2",points1[index1].y3);

      rodStroke2.attr("x2",points2[index1].x3);
      rodStroke2.attr("y2",points2[index1].y3);

      index1 ++;

    } else if(temp > 60 && index2 < points3.length) {

      rodStroke3.attr("x2",points3[index2].x3);
      rodStroke3.attr("y2",points3[index2].y3);

      rodStroke4.attr("x2",points4[index2].x3);
      rodStroke4.attr("y2",points4[index2].y3);

      index2 ++;

      //toogleStroke(rodStroke1,s1);
      //toogleStroke(rodStroke2,s2);

    } else if(temp > 90 && index3 < points5.length) {

      rodStroke5.attr("x2",points5[index3].x3);
      rodStroke5.attr("y2",points5[index3].y3);

      rodStroke6.attr("x2",points6[index3].x3);
      rodStroke6.attr("y2",points6[index3].y3);

      index3 ++;

    } 
  }
  
  rotateMeter();
  temp ++;

  //toogleStroke(rodStroke5,s5);
  //toogleStroke(rodStroke3,s3);
  //toogleStroke(rodStroke1,s1);
  //toogleStroke(rodStroke2,s2);
  //toogleStroke(rodStroke4,s4);
  //toogleStroke(rodStroke6,s6);

}

function rotateMeter() {

  meterReading += meterReadingShift;
  deflReading.text(meterReading.toFixed(1));

  if(readingPos < 5 && meterReading >= 10) {

    readingPos += 5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) - 8);

  } else if(readingPos < 10 && meterReading >= 100 ) {

    readingPos +=5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) - 6);

  }

  drawLine(innerNeedleR,innerNeedleAngle -= meterNeedleShift,deflProperties);
  drawLine(innerNeedleB,innerNeedleAngle,deflProperties);

}

function rotateWheel() {

  drawLine(wheelSupport1,angle1 += 5,wheelProperties);
  drawLine(wheelSupport2,angle1 + 120,wheelProperties);
  drawLine(wheelSupport3,angle1 + 240,wheelProperties);

}

function Next2() {
  
  count ++;
  
  if(count == 1) {
    
    options.attr("disabled",true);
    DisableButton(next2);

    intervalId = setInterval(function() {
        measure();          
    },20);  
    
     
  } else if(count == 2) {

    clearFirstScene();
    drawSecondScene();

  } else if(count == 3) {

    DisableButton(next2);

    intervalId = setInterval(function () {
      moveScaleDown();
    }, 20);
    
  } else if(count == 4) {

    DisableButton(next2);

    clearMeasurement();
    clearScale();

    intervalId = setInterval(function () {
      moveScaleRodUp();
    }, 20);
    
  } else if(count == 5) {

    DisableButton(next2);
    //clearScale();
    clearScaleRod();
    drawMainScene();

  }

}

function Start() {

  //EnableButton(reset);
  EnableButton(stop);
  DisableButton(start);
  //ReplaceRod();

  intervalId = setInterval(function() {
                  rotateRod();
                  rotateWheel();
  },200);

  play_audio();


}

function Stop() {

  DisableButton(stop);
  EnableButton(start);
  EnableButton(reset);

  clearInterval(intervalId);

  pause_audio();
  
}

/*
function Reset() {

  //Stop();

  DisableButton(reset);
  EnableButton(start);
  DisableButton(showResultsBtn);

  ResetRod();

  removeStroke(rodStroke1);
  removeStroke(rodStroke2);
  removeStroke(rodStroke3);
  removeStroke(rodStroke4);
  removeStroke(rodStroke5);
  removeStroke(rodStroke6);

  index1 = 0;
  index2 = 0;
  index3 = 0;

  angle1 = 90;
  drawLine(wheelSupport1,angle1,wheelProperties);
  drawLine(wheelSupport2,angle1 + 120,wheelProperties);
  drawLine(wheelSupport3,angle1 + 240,wheelProperties);

  innerNeedleAngle = 180;
  drawLine(innerNeedleR,innerNeedleAngle,deflProperties);
  drawLine(innerNeedleB,innerNeedleAngle,deflProperties);

  readingPos = 0;
  meterReading = 0;
  deflReading.text(meterReading);
  deflReading.attr('x',deflProperties.cx - 10);

  clearObsTable();
}
*/

function Reset() {
  window.location.reload();
}

var material = "RCC";

const tv = {

  "RCC":{

    "material" : "Reinforced Cement Concrete (RCC)",
    "length" : 263,
    "diameter" : 6.21,
    "torque" : 22.4,
    "twist" : 110.25,
    "shear_stress" : 494.32,
    "rigidity_modulus": 36.18,

    "stroke" : "darkblue",
    "delay" : 5

    },

  "HYSD_Bars": {

    "material" : "HYSD Bars",
    "length" : 270,
    "diameter" : 6.30,
    "torque" : 21.8,
    "twist" : 113.50,
    "shear_stress" : 444.25,
    "rigidity_modulus": 33.97,

    "stroke" : "brown",
    "delay" : 5

    },

  "Mild_Steel":{

    "material" : "Mild Steel",
    "length" : 258,
    "diameter" : 6.07,
    "torque" : 24.3,
    "twist" : 106.63,
    "shear_stress" : 551.11,
    "rigidity_modulus": 41.41,

    "stroke" : "blue",
    "delay" : 5

    }
}

/*var tv = [

          "RCC",
          "258",
          "6.07",
          "",
          "6110 x &pi;/180 <br> = 106.63",
          "551.11",
          7.66

        ]*/

function fillObsTable() {

  if(areInstructionsShown) { toogleInstructions(); }

  obserTable.rows[1].cells[1].innerHTML = tv[material]["material"];
  obserTable.rows[1].cells[2].innerHTML = tv[material]["length"];
  obserTable.rows[1].cells[3].innerHTML = tv[material]["diameter"];
  obserTable.rows[1].cells[4].innerHTML = tv[material]["torque"];
  obserTable.rows[1].cells[5].innerHTML = tv[material]["twist"];
  obserTable.rows[1].cells[6].innerHTML = tv[material]["shear_stress"];

  EnableButton(next);

}

function clearObsTable() {

  obserTable.rows[1].cells[1].innerHTML = "";
  obserTable.rows[1].cells[2].innerHTML = "";
  obserTable.rows[1].cells[3].innerHTML = "";
  obserTable.rows[1].cells[4].innerHTML = "";
  obserTable.rows[1].cells[5].innerHTML = "";
  obserTable.rows[1].cells[6].innerHTML = "";

  clearResults();
}

function showResults() {

  result.html(
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3><u>Result :- </u></h3>"+
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The maximum shear stress on the given material is <u>"+
              tv[material]["shear_stress"] + 
              "</u>  <i>(N / mm<sup>2</sup>)</i>. <br>" +
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Rigidity modulus of the given material is <u>"+
              tv[material]["rigidity_modulus"] + 
              "</u>  <i>(N / mm<sup>2</sup>)</i>. <br>"
            );

}

function clearResults() {
  result.html("");
}

next.attr("onclick","showVerifyTable()");
showdata.click(showData);
instructions.attr("onclick","toogleInstructions()");

var isVerified = false;

function Next(text,fun) {

  next.text(text);
  next.attr("onclick",fun);

}

function showData() {

  if(isVerified) {
    Next("Next", "showResultTable()");
  } else {
    Next("Next", "showVerifyTable()");
  }
  
  showdata.css("display", "none");
  ObsTabDiv.css("display", "block");
  ResultDiv.css("display", "none");
  VerifyDiv.css("display", "none");

}

function showVerifyTable() {

  ObsTabDiv.css("display","none");
  VerifyDiv.css("display","block");
  ResultDiv.css("display","none");
  showdata.css("display","block");

  Next("Verify","showResultTable()");

  showFormula();
}

var measured;

function showResultTable() {

  measured = (verify.mr.value == "") ? 0 : parseFloat(verify.mr.value);

  resultTable.rows[2].cells[1].innerHTML = tv[material]["rigidity_modulus"];
  resultTable.rows[2].cells[2].innerHTML = verify.mr.value;
  resultTable.rows[2].cells[3].innerHTML = percentageError(measured,tv[material]["rigidity_modulus"]);

  ObsTabDiv.css("display","none");
  VerifyDiv.css("display","none");
  ResultDiv.css("display","block");
  showdata.css("display","block");

  Next("Show Results","showResults()");
  isVerified = true;

  verify.mr.value = 0;
}

function percentageError(measured,actual) {

  let m1 = (Math.abs(measured - actual) / actual).toFixed(3);

  return (parseFloat(m1) * 100).toFixed(2);
}

function showFormula() {

  let image = new Image(height=200);
  image.src = "../images/formula.png";
  image.alt = "Modulus of Rigidity Formula";

  image.style.margin = "10px 0px 0px 50px";

  result.html("");
  result.append(image);
}

var case1 = 1;
var areInstructionsShown = false;

function toogleInstructions() {

  if(instructionsDiv.css("display") != "block") {

    areInstructionsShown = true;

    instructions.html("&lsaquo; Back");
    instructionsDiv.css("display","block");
    next.css("display","none");
    avgDiv.css("display","none");

    if(ObsTabDiv.css("display") == "block") {

      ObsTabDiv.css("display","none");
      case1 = 1;

    } else if(VerifyDiv.css("display") == "block") {

      VerifyDiv.css("display","none");
      showdata.css("display","none");
      case1 = 2

    } else {

      ResultDiv.css("display","none");
      showdata.css("display","none");
      case1 = 3;
    }

  } else {

    areInstructionsShown = false;

    instructions.text("Show Instructions");
    instructionsDiv.css("display","none");
    next.css("display","block");
    avgDiv.css("display","block");

    switch(case1) {
      case 1 : 
              ObsTabDiv.css("display","block");
              break;
      case 2 : 
              VerifyDiv.css("display","block");
              showdata.css("display","block");
              break;
      case 3 : 
              ResultDiv.css("display","block");
              showdata.css("display","block");
              break;
    }

  }
}