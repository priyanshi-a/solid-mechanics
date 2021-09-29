const svg = $("#svgPanel");
const BaseLine = $("#BaseLine");

const scale = $("#scale");
const scaleRod = $("#scaleRod");

const scaleRodStrokes = [
  $("#rodStroke1"),
  $("#rodStroke2"),
  $("#rodStroke3"),
  $("#rodStroke4"),
  $("#rodStroke5")
]

const staticPart = $("#static");
const movingPart = $("#moving");
const movingRod = $("#movingRod");
const measureLabel = $("#measureLabel");

const rod = $("#rod");
const pointA = $("#pointA");
const pointB = $("#pointB");
const rodStrokes = $("#rodStrokes")
const rodSupport1 = $("#rodSupport1");
const rodSupport2 = $("#rodSupport2");

const loader = $("#loader");
const loadSplitter = $("#loadSplitter");

const controllerB1 = $("#controllerB_1");
const controllerB2 = $("#controllerB_2");
const controllerB3 = $("#controllerB_3");
const LoadHeading = $("#LoadHeading");
const LoadReading = $("#LoadReading");
const LoadReadingBorder = $("#LoadReadingBorder");
const controllerS = $("#controllerS");

const dmai1 = $("#dmai1");
const dmai2 = $("#dmai2");
const dmai3 = $("#dmai3");
const deflMeter= $("#meter");
const innerNeedleR= $("#innerNeedleR");
const innerNeedleB= $("#innerNeedleB");
const innerCircle= $("#innerCircle");
const deflReading = $("#dlefReading");
const deflReadingBorder = $("#dlefReadingBorder");

const UTMLine1 = $("#UTMLine1");
const UTMLine2 = $("#UTMLine2");
const UTMLine3 = $("#UTMLine3");
const UTMLine4 = $("#UTMLine4");
const strokes1 = $("#strokes1");
const strokes2 = $("#strokes2");
const UTMUpperPart = $("#UTMUpperPart");
const UTMMiddlePart = $("#UTMMiddlePart");
const UTMLowerPart = $("#UTMLowerPart");
const compressorS = $("#compressorS");

const connection1 = $("#connection1");
const connection2 = $("#connection2");
const connection3 = $("#connection3");

const options = $("#options");
const dataDiv = $("#dataDiv");
const graphDiv = $("#graphDiv");
const instructionsDiv = $("#instructionsDiv");
const avgDiv = $("#avgDiv");

dataDiv.css("display","block");
instructionsDiv.css("display","none");

const obserTable = document.getElementById("obsTable");
const result = $("#result");

const next2 = $("#next2");
const start = $("#start");
const stop = $("#stop");
const reset = $("#reset");
const next = $("#next");
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

next2.on("click",Next);
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

const margin = 10;

const SVG = {
              width : 640,
              height : 470 
}

rodSupport = {

          height : 80,
          w1 : 10,
          w2 : 16,
}
const support = { 
                  width:200,
                  height:60
                };

const gap = 30;
const deflMeterRadius = 55;
const controllerB = { 
                      gap:gap,
                      width: support.width - (2 * margin + gap),
                      vheight: 2 * (deflMeterRadius + 10),
                      hheight: support.width - support.width/3,
                      
                    };

const compressorB = {
                      supWidth :320 ,
                      supHeight :60 ,
}

const rodProps = {
                    length : 150,
                    strokeWidth : 6,
}

const mainHolderP = {
                      width : 80,
                      height : 80
}

const wheel1 = {
                  wheel : $("#wheel1"),
                  support1 : $("#wheel1Support1"),
                  support2 : $("#wheel1Support2"),
                  support3 : $("#wheel1Support3"),
                  angle : 90
}

const wheel2 = {
                  wheel : $("#wheel2"),
                  support1 : $("#wheel2Support1"),
                  support2 : $("#wheel2Support2"),
                  support3 : $("#wheel2Support3"),
                  angle : 30
}

const wheel3 = {
                  wheel : $("#wheel3"),
                  support1 : $("#wheel3Support1"),
                  support2 : $("#wheel3Support2"),
                  support3 : $("#wheel3Support3"),
                  angle : 60
}

const dailGauge1 = {
  
                      meter : $("#dg1Meter"),
                      innerCircle : $("#dg1InnerCircle"),
                      innerNeedle : $("#dg1InnerNeedleR"),
                      Needle : $("#dg1Needle"),
                      horizontalS : $("#dg1HorizontalS"),
                      verticalS : $("#dg1VerticalS"),
                      angle : 230,

}

const dailGauge2 = {
  
                      meter : $("#dg2Meter"),
                      innerCircle : $("#dg2InnerCircle"),
                      innerNeedle : $("#dg2InnerNeedleR"),
                      Needle : $("#dg2Needle"),
                      horizontalS : $("#dg2HorizontalS"),
                      verticalS : $("#dg2VerticalS"),
                      angle : 180

}

const dailGauge3= {
  
                      meter : $("#dg3Meter"),
                      innerCircle : $("#dg3InnerCircle"),
                      innerNeedle : $("#dg3InnerNeedleR"),
                      Needle : $("#dg3Needle"),
                      horizontalS : $("#dg3HorizontalS"),
                      verticalS : $("#dg3VerticalS"),
                      angle : 310

}

const xStart = margin;
const yStart = SVG.height - (support.height+margin);
const xEnd = SVG.width - xStart;
const maxMeterReading = 4.36;
const dlefMeterAngles = [0,700,1400];
const dgr = 15;

var d = [],points = [];
var count = 0;
var angle1 = 90;
var meterReading = 0;
var deflProperties = {};
var material = "HYSD_Bars";
var index = 0;

const Colors = {
                  UTMUpper : "#00C853",
                  UTMLower : "#00C853",
                  UTMMiddel : "#00C853",
                  stroke : "#000000", 
}

function fillColors() {
  
  UTMUpperPart.attr("fill",Colors.UTMUpper);
  UTMMiddlePart.attr("fill",Colors.UTMMiddel);
  UTMLowerPart.attr("fill",Colors.UTMLower);

  UTMLine1.attr("stroke",Colors.stroke);
  UTMLine2.attr("stroke",Colors.stroke);
  UTMLine3.attr("stroke",Colors.stroke);
  UTMLine4.attr("stroke",Colors.stroke);

}

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

  drawGraph(tv[material]["dirMS"]);

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

  rodStrokesX = [
    sr.x + 10,
    sr.x + sr.length / 4,
    sr.x + sr.length / 2,
    sr.x + sr.length * 3 / 4,
    sr.x + sr.length - 10
  ]

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

  for (let i = 0; i < scaleRodStrokes.length; i++) {
    clearRodStroke(scaleRodStrokes[i]);
  }
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
    drawStrokesOnScaleRod(
      rodStrokesX[index],
      scaleRodStrokes[index]
    );

    return;
  }

  sr.y -= 1;
  drawScaleRod(
    sr.x,
    sr.y
  );

}

const drawStrokesOnScaleRod = (x, st) => {

  //console.log("rodStrokes");
  let y = sr.y - sr.width / 2 - 1;
  st.attr("stroke-width", 5);
  st.attr("x1", x);
  st.attr("y1", y);
  st.attr("x2", x);
  st.attr("y2", y);

  intervalId = setInterval(() => {
    if (parseInt(st.attr("y2")) >= sr.y + sr.width / 2) {

      Stop();
      DisableButton(start);
      EnableButton(next2);

      index += 1;
      if (index < 5) {

        DisableButton(next2);
        drawStrokesOnScaleRod(
          rodStrokesX[index],
          scaleRodStrokes[index]
        );

      }
    }
    st.attr("y2", parseInt(st.attr("y2")) + 1);
  }, 50);

}

function drawDlefMeter(cx,cy,radius) {

  deflProperties["cx"] = cx;
  deflProperties["cy"] = cy;
  deflProperties["radius"] = radius - 5;
  deflProperties.angle = 180;
  // body...
  deflMeter.attr("cx",cx);
  deflMeter.attr("cy",cy);
  deflMeter.attr("r",radius);

  innerCircle.attr("cx",cx);
  innerCircle.attr("cy",cy);
  innerCircle.attr("r",5);

  drawLine(innerNeedleB,
          deflProperties.angle,
          deflProperties);

  drawLine(innerNeedleR,
          deflProperties.angle,
          deflProperties);

  dmai1.html(dlefMeterAngles[0]);
  dmai1.attr("font-size","12px");
  dmai1.attr('x',cx - (radius - 2));
  dmai1.attr('y',cy + 5);

  dmai2.html(dlefMeterAngles[1]);
  dmai2.attr("font-size","12px");
  dmai2.attr('x',cx - 5);
  dmai2.attr('y',cy - (radius - 13));

  dmai3.html(dlefMeterAngles[2]);
  dmai3.attr("font-size","11px");
  dmai3.attr('x',cx + (radius - 26));
  dmai3.attr('y',cy + 5);

  deflReading.text(dlefMeterAngles[0]);
  deflReading.attr('x',cx - 5);
  deflReading.attr('y',cy + (radius - 15));

  deflReadingBorder.attr("x",cx - radius/2);
  deflReadingBorder.attr("y",parseInt(deflReading.attr("y"))-18);
  deflReadingBorder.attr("width",radius);
  deflReadingBorder.attr("height",radius/3 + 5);

  drawBaseLine();

}

function DrawController() {

  mx = middlePoint(xStart,xStart+support.width);
  my = middlePoint(yStart - (controllerB.hheight),yStart - (controllerB.vheight + controllerB.hheight));

  points = [xStart+margin , yStart
            , xStart+margin, yStart - (controllerB.vheight + controllerB.hheight)
            , xStart+margin + controllerB.gap, yStart - controllerB.hheight
            , xStart+margin + controllerB.gap, yStart];
  controllerB1.attr("points",points.join(" "));

  points = [xStart + margin , yStart - (controllerB.vheight + controllerB.hheight)
            ,xStart + margin+controllerB.width , yStart - (controllerB.vheight + controllerB.hheight)
            ,xStart + margin+controllerB.width + controllerB.gap , yStart - (controllerB.hheight)
            ,xStart+margin + controllerB.gap , yStart - (controllerB.hheight)];
  controllerB2.attr("points",points.join(" "));

  
  controllerB3.attr("x",xStart+margin + controllerB.gap);
  controllerB3.attr("y",yStart - (controllerB.hheight));
  controllerB3.attr("width",controllerB.width);
  controllerB3.attr("height",controllerB.hheight);

  /*LoadReading.text("0.00")
  LoadReading.attr("x",mx-18);
  LoadReading.attr("y",yStart - (controllerB.hheight)-50 + 20);

  LoadReadingBorder.attr("x",mx - 30);
  LoadReadingBorder.attr("y",yStart - (controllerB.hheight)-50);
  LoadReadingBorder.attr("width",60);
  LoadReadingBorder.attr("height",25);

  LoadHeading.text("Load (KN)");
  LoadHeading.attr("x",mx - 28);
  LoadHeading.attr("y",yStart - (controllerB.hheight)-55);
  LoadHeading.attr("font-size",12);*/
  
  drawDlefMeter(mx,my,deflMeterRadius);

  let rad = 20;
  drawWheel(
    xStart+margin + controllerB.gap+controllerB.width - (rad + 20),
    yStart - (controllerB.hheight) + (rad + 20),
    rad,
    wheel1
  );

  controllerS.attr("x",xStart);
  controllerS.attr("y",yStart);
  controllerS.attr("width",support.width);
  controllerS.attr("height",support.height);

}

function drawStrokes(strokes,line) {

  let gap = 6;
  let y1 = parseInt(line.attr("y2")) + 60 + gap;
  let y2 = parseInt(compressorS.attr("y")) - 55;
  let x = parseInt(line.attr("x1"));
  let strokeW = parseInt(line.attr("stroke-width"));

  d = ["M", x - strokeW/2, y1 + 1
      ,"L", x + strokeW/2, y1 - 1]
  for(let i = y1; i < y2; i += gap) {
    d.push("M");
    d.push(x - strokeW/2);
    d.push(i + 1);
    d.push("L");
    d.push(x + strokeW/2);
    d.push(i - 1);
  }

  strokes.attr("d",d.join(" "));
  strokes.attr("stroke-width",1);
  strokes.attr("stroke","#200080");

  strokes.children().first().html("Universal Testing Machine");

}

function DrawCompressor() {

  let xStart = SVG.width-margin-compressorB.supWidth;
  let xEnd = SVG.width-margin;
  let yEnd = 20;
  let strokeWidth = 13;
  let gap = 15 + strokeWidth;

  compressorB.xStart = xStart;
  compressorB.xEnd = xEnd;
  compressorB.gap = gap;

  compressorS.attr("x",SVG.width - margin - compressorB.supWidth);
  compressorS.attr("y",SVG.height - margin - compressorB.supHeight);
  compressorS.attr("width",compressorB.supWidth);
  compressorS.attr("height",compressorB.supHeight);

  midpoint = middlePoint(xStart,xEnd);
  y = parseInt(compressorS.attr("y"));
  let w = 30; //half width at bottom

  d = ["M", midpoint - w, y
      ,"L", midpoint + w, y
      ,"L", midpoint + w, y - 20
      ,"L", midpoint + (compressorB.supWidth/2 - 20),y - 20
      ,"L", midpoint + (compressorB.supWidth/2 - 20),y - (20+20)
      ,"L", midpoint + (compressorB.supWidth/2),y - (20+20)
      ,"L", midpoint + (compressorB.supWidth/2),y - (20+20+10)
      ,"L", midpoint - (compressorB.supWidth/2),y - (20+20+10)
      ,"L", midpoint - (compressorB.supWidth/2),y - (20+20)
      ,"L", midpoint - (compressorB.supWidth/2 - 20),y - (20+20)
      ,"L", midpoint - (compressorB.supWidth/2 - 20),y - 20
      ,"L", midpoint - w, y - 20
      ,"L", midpoint - w, y];

  UTMLowerPart.attr("d",d.join(" "));

  UTMLine1.attr("stroke-width",strokeWidth);
  UTMLine2.attr("stroke-width",strokeWidth);
  UTMLine3.attr("stroke-width",strokeWidth);
  UTMLine4.attr("stroke-width",strokeWidth);

  UTMLine1.attr("x1",xStart + margin);
  UTMLine1.attr("y1",y - 50);
  UTMLine1.attr("x2",UTMLine1.attr("x1"));
  UTMLine1.attr("y2",yEnd);

  UTMLine2.attr("x1",parseInt(UTMLine1.attr("x1"))+gap);
  UTMLine2.attr("y1",y);
  UTMLine2.attr("x2",UTMLine2.attr("x1"));
  UTMLine2.attr("y2",yEnd);

  drawStrokes(strokes1,UTMLine2);

  UTMLine3.attr("x1",xEnd - margin - gap);
  UTMLine3.attr("y1",y);
  UTMLine3.attr("x2",UTMLine3.attr("x1"));
  UTMLine3.attr("y2",yEnd);

  drawStrokes(strokes2,UTMLine3);

  UTMLine4.attr("x1",xEnd - margin);
  UTMLine4.attr("y1",y - 50);
  UTMLine4.attr("x2",UTMLine4.attr("x1"));
  UTMLine4.attr("y2",yEnd);


  placeAppratusOnUTM();

  y = y - 290
  compressorB.middlePartY = y;
  drawUTMMiddlePart(y);

  x = parseInt(UTMLine1.attr("x1"));
  y = yEnd + 10;
  d = ["M", x - 10, y 
      ,"L", x + 10, y 
      ,"L", x + 20, y + 10
      ,"L", midpoint - (w+10),y +10
      ,"Q", midpoint,y - 20, midpoint + (w+10),y + 10
      ,"L", xEnd - margin - 20, y + 10
      ,"L", xEnd - margin - 10, y 
      ,"L", xEnd - margin + 10, y  
      ,"L", xEnd - margin + 10, y + 50
      ,"L", midpoint + (w+10),y +50
      ,"Q", midpoint, y + 50 + 30, midpoint - (w+10),y + 50
      ,"L", x - 10, y + 50,"Z"]
      
  UTMUpperPart.attr("d",d.join(" "));

  drawWheel(
    midpoint,
    y + 30,
    20,
    wheel2
    );

}

function drawUTMMiddlePart(y) {

  let xStart = SVG.width-margin-compressorB.supWidth;
  let xEnd = SVG.width-margin;
  let strokeWidth = 13;
  let gap = 15 + strokeWidth;
  let w = 30; //half width at bottom

  midpoint = middlePoint(xStart,xEnd);

  x = parseInt(UTMLine2.attr("x1"));

  d = ["M", x - 10, y
      ,"L", x + 10, y
      ,"L", x + 20, y + 10
      ,"L", midpoint - (w+10),y + 10
      ,"Q", midpoint,y - 20, midpoint + (w+10),y + 10
      ,"L", xEnd - margin - gap-20, y + 10
      ,"L", xEnd - margin - gap-10, y 
      ,"L", xEnd - margin - gap+10, y 
      ,"L", xEnd - margin - gap+10, y + 50
      ,"L", x - 10, y + 50,"Z"
      ,"M", midpoint - (w+10),y + 50
      ,"L", midpoint - (w+10),y + (50 + 10)
      ,"L", midpoint + (w+10),y + (50 + 10)
      ,"L", midpoint + (w+10),y + 50,"Z"];

  UTMMiddlePart.attr("d",d.join(" "));

  drawWheel(
    midpoint,
    y + 24,
    19,
    wheel3
  );

  let height = 25;  
  let width = 14;
  y = y + 50 + 10;

  d = ["M", midpoint - (width/2 + 5), y
      ,"L", midpoint - (width/2 + 5), y + 5
      ,"L", midpoint - (width/2), y + 5
      ,"L", midpoint - (width/2), y + 5 + height
      ,"Q", midpoint, y + 5 + height + width, midpoint + (width/2), y + 5 + height
      ,"L", midpoint + (width/2), y + 5
      ,"L", midpoint + (width/2 + 5), y + 5
      ,"L", midpoint + (width/2 + 5), y, "Z"];

  loader.attr("d",d.join(" "));

  y = y + height + 1.4;

  d = ["M", midpoint - width/2 - 5, y
      ,"L", midpoint - width/2 - 5, y + 2
      ,"Q", midpoint, y + 5 + width + 8, midpoint + width/2 + 5, y + 2
      ,"L", midpoint + width/2 + 5, y


      ,"M", rodProps.s1 - 8, y + 16
      ,"L", rodProps.s2 + 8, y + 16

      ,"M", rodProps.s1, y + 16
      ,"L", rodProps.s1, y + 25

      ,"M", rodProps.s2, y + 16
      ,"L", rodProps.s2, y + 25];

  compressorB.maxMidHeight = y + 25;
    
  loadSplitter.attr("d",d.join(" "));
  loadSplitter.attr("stroke-width",5);

}

function DrawConnections() {

  let x1 = xStart+support.width;
  let x2 = SVG.width - compressorB.supWidth-margin;
  let y3 = SVG.height - 10 - support.height/4;

  let connectionStrokeWidth = 4;

  connection1.attr("stroke-width",connectionStrokeWidth);
  connection2.attr("stroke-width",connectionStrokeWidth);
  connection3.attr("stroke-width",connectionStrokeWidth);

  connection1.attr("x1",x1);
  connection1.attr("y1",y3 - 2 * support.height/4);
  connection1.attr("x2",x2);
  connection1.attr("y2",connection1.attr("y1"));

  connection2.attr("x1",x1);
  connection2.attr("y1",y3 - support.height/4);
  connection2.attr("x2",x2);
  connection2.attr("y2",connection2.attr("y1"));

  connection3.attr("x1",x1);
  connection3.attr("y1",y3);
  connection3.attr("x2",x2);
  connection3.attr("y2",connection3.attr("y1"));

}

function drawRodSupport(x,y,support) {

  d = ["M", x, y
      ,"L", x + rodSupport.w1/2, y + rodSupport.w1/2
      ,"L", x + rodSupport.w2/2, y + rodSupport.height
      ,"L", x - rodSupport.w2/2, y + rodSupport.height
      ,"L", x - rodSupport.w1/2, y + rodSupport.w1/2, "Z"];

  support.attr("d",d.join(" "));
}

function drawRod(x,y) {

  rodProps.y = y;

  d = ["M",x,y
      ,"L",x + 5 + rodProps.length/3,y
      ,"L",x + 5 + rodProps.length/2,y
      ,"L",x + 5 + 2 * rodProps.length/3,y
      ,"L",x + 5 + rodProps.length + 5,y];

  rod.attr("d",d.join(" "));
  rod.attr("stroke-width",rodProps.strokeWidth);
  //rod.attr("stroke","blue");
  rod.attr("fill","none");

  d = ["M", x + 5, y - rodProps.strokeWidth/2
      ,"L", x + 5, y + rodProps.strokeWidth/2

      ,"M", x + 5 + rodProps.length/3 - 10 , y - rodProps.strokeWidth/2
      ,"L", x + 5 + rodProps.length/3 - 10, y + rodProps.strokeWidth/2

      ,"M", x + 5 + rodProps.length/2, y - rodProps.strokeWidth/2
      ,"L", x + 5 + rodProps.length/2, y + rodProps.strokeWidth/2

      ,"M", x + 5 + 2 * rodProps.length/3 + 10, y - rodProps.strokeWidth/2
      ,"L", x + 5 + 2 * rodProps.length/3 + 10, y + rodProps.strokeWidth/2

      ,"M", x + 5 + rodProps.length, y - rodProps.strokeWidth/2
      ,"L", x + 5 + rodProps.length , y + rodProps.strokeWidth/2];

    rodProps.s1 = x + 5 + rodProps.length/3 - 10;
    rodProps.mp = x + 5 + rodProps.length/2;
    rodProps.s2 = x + 5 + 2 * rodProps.length/3 + 10;

    //alert(rodProps.s2 - rodProps.s1);

  rodStrokes.attr("d",d.join(" "));

  pointA.text("A");
  pointA.attr("font-size",12)
  pointA.attr("stroke","red");
  pointA.attr("stroke-width",1);
  pointA.attr("x",rodProps.s1 - 15);
  pointA.attr("y",y + rodProps.strokeWidth/2 + 10 );

  pointB.text("B");
  pointB.attr("font-size",12)
  pointB.attr("stroke","red");
  pointB.attr("stroke-width",1);
  pointB.attr("x",rodProps.s2 + 10);
  pointB.attr("y",y + rodProps.strokeWidth/2 + 10);

}

function drawDailGaugeNeedle(x,y,props) {

  props.needleY = y;

  d = ["M", x , y
      ,"L", x + 2, y + 5
      ,"L", x + 2, y + 3 + 3 * dgr + 5
      ,"L", x + 5, y + 3 + 3 * dgr + 5
      ,"L", x + 5, y + 3 + 3 * dgr + 5 + 3
      ,"L", x - 5, y + 3 + 3 * dgr + 5 + 3
      ,"L", x - 5, y + 3 + 3 * dgr + 5
      ,"L", x - 2, y + 3 + 3 * dgr + 5
      ,"L", x - 2, y + 5,"Z"]

  props.Needle.attr("d",d.join(" "));

}

function drawDailGauge(x,y,props) {

  props.radius = dgr - 2;

  drawDailGaugeNeedle(x,y,props);

  props.meter.attr("cx",x);
  props.meter.attr("cy",y + 2.2 * dgr);
  props.meter.attr("r",dgr);
  props.meter.attr("stroke-width",2);

  props.cx = x;
  props.cy = y + 2.2 * dgr;

  props.innerCircle.attr("cx",x);
  props.innerCircle.attr("cy",props.meter.attr("cy"));
  props.innerCircle.attr("r",2);

  drawLine(
            props.innerNeedle,
            props.angle,
            props
  );

  props.verticalS.attr("x1",x - dgr + 3);
  props.verticalS.attr("y1",props.meter.attr("cy"));
  props.verticalS.attr("x2",props.verticalS.attr("x1"));
  
  props.verticalS.attr("stroke-width",3)

  y = parseInt(compressorS.attr("y")) - (50);

  props.verticalS.attr("y2",y);

  props.horizontalS.attr("width",20);
  props.horizontalS.attr("height",12);

  x = parseInt(props.verticalS.attr("x1")) - parseInt( props.horizontalS.attr("width"))/2;
  props.horizontalS.attr("x",x);
  props.horizontalS.attr("y",y - parseInt(props.horizontalS.attr("height")));
  props.horizontalS.attr("stroke-width",2);

}

function placeAppratusOnUTM() {

  let y = parseInt(compressorS.attr("y")) - (50 + rodSupport.height);

  drawRodSupport(
    parseInt(UTMLine2.attr("x1")) + 20,
    y,
    rodSupport1
  );

  drawRodSupport(
    parseInt(UTMLine3.attr("x1")) - 20,
    y,
    rodSupport2
  );

  rodProps.length = parseInt(UTMLine3.attr("x1")) - (parseInt(UTMLine2.attr("x1")) + 20 + 20);

  drawRod(
    parseInt(UTMLine2.attr("x1")) + 20 - 5,
    y - rodProps.strokeWidth/2,
    rod
  );

  drawDailGauge(
                rodProps.s1,
                y,
                dailGauge1
  );

  drawDailGauge(
                rodProps.mp,
                y,
                dailGauge2
  );

  drawDailGauge(
                rodProps.s2,
                y,
                dailGauge3
  );

}


function drawMainScene() {

  EnableButton(start);

  fillColors();
  DrawController();
  DrawCompressor();
  DrawConnections();

}

function AdjustUTMMiddlePart() {

  compressorB.middlePartY ++;

  if(compressorB.maxMidHeight > rodProps.y - rodProps.strokeWidth/2) {
    //here 60 is width of middle part;
    Stop();
    DisableButton(start);
    EnableButton(stop);

    if(areInstructionsShown) { toogleInstructions(); }
    index = -1;
    intervalId = setInterval(function() {
      compress();
    },500);

    play_audio();
    return;

  }

  drawUTMMiddlePart(compressorB.middlePartY);
  rotateWheel(wheel1);

}

function compress() {

  if(index >= loadMS.length) {
    Stop();
    DisableButton(start);
    EnableButton(next);
    return;
  }

  //console.log(meterReading);
  //LoadReading.text(meterReading.toFixed(2));
  update();

}



function degToRad(angle) {
    // Degrees to radians
    return ((angle * Math.PI) / 180);
}

function drawLine(line,angle,props) {

    angle = degToRad(angle);
    let x = props.cx + props.radius * Math.cos(angle); //radians
    let y = props.cy + props.radius * Math.sin(angle); //radians
    y = 2 * props.cy - y;  //deep explination required **

    line.attr("x1",props.cx);
    line.attr("y1",props.cy);
    line.attr("x2",x);
    line.attr("y2",y);
    
}

function drawWheel(cx,cy,radius,props) {

  props["cx"] = cx;
  props.cy = cy;
  props.radius = radius;

  props.wheel.attr("cx",cx);
  props.wheel.attr("cy",cy);
  props.wheel.attr("r",radius);

  
  drawLine(props.support1,props.angle,props);
  drawLine(props.support2,props.angle + 120,props);
  drawLine(props.support3,props.angle + 240,props);

}

function rotateWheel(wheelProps) {

  drawLine(wheelProps.support1,wheelProps.angle += 5,wheelProps);
  drawLine(wheelProps.support2,wheelProps.angle + 120,wheelProps);
  drawLine(wheelProps.support3,wheelProps.angle + 240,wheelProps);
  
}

function updateDGReading(props) {

  props.angle -= 30;

  drawLine(
            props.innerNeedle,
            props.angle,
            props
  );

}

var readingPos = 0;

function update() {

  index ++;
  fillObsTable(index);

  updateDGReading(dailGauge1);
  updateDGReading(dailGauge2);
  updateDGReading(dailGauge3);

  meterReading = loadMS[index];

  if(readingPos < 5 && meterReading > 9) {

    readingPos += 5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) - 6);

  } else if(readingPos < 10 && meterReading > 99 ) {

    readingPos +=5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) - 6);

  }

  deflReading.text(meterReading);

  drawLine(innerNeedleR,
          deflProperties.angle -= 5,
          deflProperties);


  let shift1b3 = 0.3;
  let shift1b2 = shift1b3 + 0.1;

  compressorB.middlePartY += shift1b3 - 0.1;
  drawUTMMiddlePart(compressorB.middlePartY);

  d = rod.attr("d").split(" ");

  d[5] = parseFloat(d[5]) + shift1b3;
  d[8] = parseFloat(d[8]) + shift1b2;
  d[11] = parseFloat(d[11]) + shift1b3;

  rod.attr("d",d.join(" "));

  d = rodStrokes.attr("d").split(" ");

  d[8] = parseFloat(d[8]) + shift1b3;
  d[11] = parseFloat(d[11]) + shift1b3;

  d[14] = parseFloat(d[14]) + shift1b2;
  d[17] = parseFloat(d[17]) + shift1b2;

  d[20] = parseFloat(d[20]) + shift1b3;
  d[23] = parseFloat(d[23]) + shift1b3;

  rodStrokes.attr("d",d.join(" "));

  pointA.attr("y",parseFloat(pointA.attr("y"))+shift1b3);
  pointB.attr("y",parseFloat(pointB.attr("y"))+shift1b3)

  dailGauge1.needleY += shift1b3;
  drawDailGaugeNeedle(
                      dailGauge1.cx,
                      dailGauge1.needleY,
                      dailGauge1);

  dailGauge2.needleY += shift1b2;
  drawDailGaugeNeedle(
                      dailGauge2.cx,
                      dailGauge2.needleY,
                      dailGauge2);

  dailGauge3.needleY += shift1b3;
  drawDailGaugeNeedle(
                      dailGauge3.cx,
                      dailGauge3.needleY,
                      dailGauge3);
  
}

function Next() {
  
  count ++;
  //DisableButton(next2);

  if(count == 1) {

    options.attr("disabled",true);
    DisableButton(next2);

    intervalId = setInterval(function() {
        measure();          
    },20);  
    
     
  }else if(count == 2) {

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

  EnableButton(stop);
  DisableButton(start);

  intervalId = setInterval(function() {
    AdjustUTMMiddlePart();         
  },200);

  play_audio();


}

function Stop() {

  DisableButton(stop);
  EnableButton(start);

  clearInterval(intervalId);

  pause_audio();
  
}

/*function Reset() {

  meterReading = 0;

  DisableButton(reset);
  EnableButton(start);
  DisableButton(next);

  clearObsTable();

}*/

function Reset() {

  window.location.reload();
}

const loadMS = [
          0,50,100,150,200,250,300,350,400,450,500,550,600,650,660,670,680,690
        ];

const tv = {
  "Mild_Steel":{
    "material" : "Mild Steel",
    "length" : "690 <i>(mm)</i>",
    "diameter" : "24.65 <i>(mm)</i>",
    "stroke" : "blue",

    "dirMS" : [0,85,161,238,315,392,469,546,623,700,777,854,931,1008,1085,1162,1239,1316],
    "pAvals" : [0,80,145,235,305,410,490,590,660,760,830,900,960,990,1000,1066,1097,1114],
    "pBvals" : [0,78,170,245,350,410,480,544,640,700,790,885,985,1000,1035,1101,1112,1124]
  },
  "HYSD_Bars":{
    "material" : "HYSD Bars",
    "length" : "690 <i>(mm)</i>",
    "diameter" : "24.66 <i>(mm)</i>",
    "stroke" : "brown",
    
    "dirMS" : [0,87,163,240,317,394,417,548,625,702,779,854,933,1010,1087,1164,1241,1318],
    "pAvals" : [0,82,147,237,307,410,492,592,660,760,832,902,962,990,1002,1068,1097,1114],
    "pBvals" : [0,80,172,247,352,410,482,546,640,700,792,887,987,1015,1067,1103,1112,1124]
  },
  "Stainless_Steel":{
    "material" : "Stainless Steel",
    "length" : "690 <i>(mm)</i>",
    "diameter" : "24.64 <i>(mm)</i>",
    "stroke" : "darkblue",
    
    "dirMS" : [0,90,166,243,320,397,474,551,628,705,782,857,936,1013,1090,1167,1244,1321],
    "pAvals" : [0,82,147,237,307,410,492,592,660,760,832,902,962,990,1002,1068,1097,1114],
    "pBvals" : [0,80,172,247,352,410,482,546,640,700,792,887,987,1020,1037,1103,1112,1124]
  }
};

var index = -1;

function fillObsTable(index) {

  if(index >= loadMS.length) {
    return;
  }

  let row = obserTable.insertRow(-1);
  row.insertCell(0).innerHTML = loadMS[index];
  row.insertCell(1).innerHTML = tv[material]["dirMS"][index];
  row.insertCell(2).innerHTML = tv[material]["pAvals"][index];
  row.insertCell(3).innerHTML = tv[material]["pBvals"][index];
  row.insertCell(4).innerHTML = ((tv[material]["pAvals"][index] + tv[material]["pBvals"][index]) / 2).toFixed(2);
}

var resCount = 0;

function showResults() {

  if(resCount % 2 == 0) {

    dataDiv.css("display","none");
    graphDiv.css("display","block");

    next.html("Show Data");

  } else {

    dataDiv.css("display","block");
    graphDiv.css("display","none");

    next.html("Show Graph");

  }

  resCount ++;

}

var case1 = 1;
var areInstructionsShown = false;
instructions.attr("onclick","toogleInstructions()");

function toogleInstructions() {

  if(instructionsDiv.css("display") != "block") {

    areInstructionsShown = true;

    instructions.html("&lsaquo; Back");
    instructionsDiv.css("display","block");
    next.css("display","none");
    avgDiv.css("display","none");

    if(dataDiv.css("display") == "block") {

      dataDiv.css("display","none");
      case1 = 1;

    } else {

      graphDiv.css("display","none");
      case1 = 2;
    }

  } else {

    areInstructionsShown = false;

    instructions.text("Show Instructions");
    instructionsDiv.css("display","none");
    next.css("display","block");
    avgDiv.css("display","block");

    switch(case1) {
      case 1 : 
              dataDiv.css("display","block");
              break;
      case 2 : 
              graphDiv.css("display","block");
              break;
    }

  }
}



/////////////////////////////////////////////////////////////////////////////////


const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = 500;
ctx.canvas.height = 450;

var myGraph = new Chart(ctx);

const drawGraph = (dirMS) => {

  graphDiv.css("display","block");

  points = [];

  for (var i = 0; i < loadMS.length; i++) {
  points.push(
              {
                x : loadMS[i],
                y : dirMS[i].toFixed(0)
              }
        );  
  }

  myGraph.destroy();

  myGraph = new Chart(ctx , { 

      type : "scatter",
      data : {
        
        datasets : [{
          data : points,
          pointBackgroundColor : "blue",
          pointBorderColor: 'blue',
          borderWidth: 2,
          borderColor: 'blue',
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false,
          tension : 0.1,
          showLine : true
        }],
      },
      options: {

        plugins: {

          title: {
            display: true,
            text: 'Load vs Deformation at Mid span',
            color : "black",

            font: {

              size: 15,
              weight: 'bold',
              lineHeight: 1.2

            },
          },

          legend: {
            display: false,
          },

          tooltip: {
            displayColors: false,
          },
        },

        scales: {

          x: {

            display: true,
            title: {

                display: true,
                text: 'Dial Indicator Reading at Mid-span(div)',
                color: 'black',

                font: {

                  size: 15,
                  weight: 'bold',
                  lineHeight: 1.2,
              },

              padding: {top: 20, left: 0, right: 0, bottom: 0}
            },

            grid: {
              borderColor: 'black',
            }
          },

          y : {

            display: true,

            title: {

              display: true,
              text: 'Load (Kg)',
              color: 'black',

              font: {

                size: 15,
                weight: 'bold',
                lineHeight: 1.2

              },

              padding: {top: 30, left: 0, right: 0, bottom: 0}
            },

            grid: {
              borderColor: 'black',
            }
          }
        }
     }

    }
  );

  graphDiv.css("display","none");

}