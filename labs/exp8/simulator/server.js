const svg = $("#svgPanel");
const BaseLine = $("#BaseLine");

const staticPart = $("#static");
const movingPart = $("#moving");
const movingRod = $("#movingRod");
const measureLabel = $("#measureLabel");
const TrailText = $("#TrailText");

const rod1 = $("#rod1");
const rod2 = $("#rod2");
const rod3 = $("#rod3");
const RH1outer = $("#RH1outer");
const RH1inner = $("#RH1inner");
const RH2outer = $("#RH2outer");
const RH2inner = $("#RH2inner");
const middlePart = $("#middlePart");
const middlePartHole = $("#middlePartHole");
const mainHolder = $("#mainHolder");
const mainHolderHole = $("#mainHolderHole");

const upperRect = $("#upperRect");
const lowerRect = $("#lowerRect");

const controllerB1 = $("#controllerB_1");
const controllerB2 = $("#controllerB_2");
const controllerB3 = $("#controllerB_3");
const LoadHeading = $("#LoadHeading");
const LoadReading = $("#LoadReading");
const LoadReadingBorder = $("#LoadReadingBorder");
const controllerS = $("#controllerS");

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

const obserTable1 =document.getElementById("obsTable1");
const obserTable2 =document.getElementById("obsTable2");
const obserTable3 =document.getElementById("obsTable3");
const resultTable = document.getElementById("resultTable");
const obserTable = [obserTable1,obserTable2,obserTable3];
const average = $("#Average");
const result = $("#result");

const Content = $("#Content");
const simulationBoard = $("#simulationBoard");
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


const next = $("#next");
const start = $("#start");
const stop = $("#stop");
const reset = $("#reset");
const next2 = $("#next2");
const showdata = $("#showData");
const instructions = $("#instructions");

const rodBrokenSound = new Audio("./rodBrokenSound.mp3");

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

next.on("click",Next);
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
DisableButton(reset);
DisableButton(next2);

const margin = 10;

const support = { 
                  width:200,
                  height:60
                };

const rod = {
              pLength : 120,
              strokeWidth : 18
}

const gap = 30;

const controllerB = { 
                      gap:gap,
                      width: support.width - (2 * margin + gap),
                      vheight: 80,
                      hheight: support.width - support.width/3,
                      
                    };

const compressorB = {
                      supWidth :300 ,
                      supHeight :60 ,
}

const mainHolderP = {
                      width : 80,
                      height : 80
}

const SVG = {
              width : 580,
              height : 470 
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

const xStart = margin;
const yStart = SVG.height - (support.height+margin);
const xEnd = SVG.width - xStart;
const readingShift = 0.01;

var tv = [
          {"diameter" : 6,
            "area" : 28.26,
            "shear_load" : 15.35,
            "shear_stress" : 0.543
          },

          {"diameter" : 8,
            "area" : 50.24,
            "shear_load" : 32.40,
            "shear_stress" : 0.644
          },

          {"diameter" : 12,
            "area" : 113.04,
            "shear_load" : 70.32,
            "shear_stress" : 0.622
          }
        ];

tv.sort((a, b) => 0.5 - Math.random());

var d,points;
var count = 0;
var angle1 = 90;
var meterReading = 0;
var maxMeterReading = 0;
var trail = 0;

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

const displayTrailText = (x,y) => {

  TrailText.attr("font-size", 20);
  TrailText.attr("x", x );
  TrailText.attr("y", y );
  TrailText.html("Trial - "+(trail+1));

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

function initializeSVG() {

  svg.attr("width",SVG.width);
  svg.attr("height",SVG.height);

  drawFirstScene();
  //drawMainScene();

}

function drawRod(x,y) {

  rod["xStart"] = x;
  rod["yStart"] = y;

  rod1.attr("stroke-width",rod.strokeWidth);
  rod2.attr("stroke-width",rod.strokeWidth);
  rod3.attr("stroke-width",rod.strokeWidth);

  rod1.attr("x1",x);
  rod1.attr("y1",y);
  rod1.attr("x2",x+rod.pLength);
  rod1.attr("y2",y);
  

  rod2.attr("x1",rod1.attr("x2"));
  rod2.attr("y1",y);
  rod2.attr("x2",parseInt(rod1.attr("x2"))+rod.pLength);
  rod2.attr("y2",y);
  

  rod3.attr("x1",rod2.attr("x2"));
  rod3.attr("y1",y);
  rod3.attr("x2",parseInt(rod2.attr("x2")) + rod.pLength);
  rod3.attr("y2",y);

}

function RemoveRod() {

  rod1.attr("x2",rod1.attr("x1"));
  rod2.attr("x2",rod2.attr("x1"));
  rod3.attr("x2",rod3.attr("x1"));

}

function drawMainHolder(x,y) {

  d = ["M", x, y
      ,"L", x + mainHolderP.width, y
      ,"L", x - 200, y+mainHolderP.height+10
      ,"L", x - 200 - mainHolderP.width, y + mainHolderP.height
      ,"L", x, y


      ,"M", x-1, y + 10
      ,"L", x+30, y+10
      ,"L", x - 200 + 30, y + mainHolderP.height-10
      ,"L", x - 200 - 10, y + mainHolderP.height-10,
      ,"L", x-1, y+10


      ,"M", x - 200 - mainHolderP.width, y+mainHolderP.height
      ,"L", x - 200 - mainHolderP.width, y+mainHolderP.height + 160
      ,"L", x - 200, y+mainHolderP.height+160+20
      ,"L", x + mainHolderP.width, y+160
      ,"L", x + mainHolderP.width, y
      ,"L", x - 200, y+mainHolderP.height+10
      ,"M", x - 200, y+mainHolderP.height+160+20
      ,"L", x - 200, y+mainHolderP.height+10];

  mainHolder.attr("d",d.join(" "))

}

function drawRH(x,y,outer,inner) {

  outer.attr("cx",x);
  outer.attr("cy",y);
  outer.attr("r",50);

  inner.attr("cx",outer.attr("cx"));
  inner.attr("cy",outer.attr("cy"));
  inner.attr("r",10);

}

function drawFirstScene() {

  displayTrailText(10,20);

  rod.pLength = 120;
  rod.strokeWidth = 2 * tv[trail]["diameter"];
  drawRod(200,20);

  drawRH(60,300,RH1outer,RH1inner);
  drawRH(60,410,RH2outer,RH2inner);

  middlePart.attr("x",80);
  middlePart.attr("y",45);
  middlePart.attr("width",170);
  middlePart.attr("height",parseInt(middlePart.attr("width"))+30);

  middlePartHole.attr("r",parseInt(middlePart.attr("width"))/3);
  middlePartHole.attr("cx",parseInt(middlePart.attr("x"))+parseInt(middlePart.attr("width"))/2);
  middlePartHole.attr("cy",parseInt(middlePart.attr("y"))+parseInt(middlePartHole.attr("r"))+40);
  
  drawMainHolder(460,205);

  mainHolderHole.attr("cx",400);
  mainHolderHole.attr("cy",330 );
  mainHolderHole.attr("r",50);

}

function clearFirstScene() {

  RemoveRod();
  
  RH1outer.attr("r",0);
  RH1inner.attr("r",0);

  RH2outer.attr("r",0);
  RH2inner.attr("r",0);
  
  middlePart.attr("width",0);
  middlePart.attr("height",0);

  middlePartHole.attr("r",0);
  mainHolderHole.attr("r",0);

  mainHolder.attr("d",[]);

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
  measureLabel.html("");

}

const displayMeasurement = () => {

  measureLabel.attr("x", 250)
  measureLabel.attr("y", 350)
  measureLabel.attr("font-size", 20)
  measureLabel.html("Diameter : " + tv[trail]["diameter"]);

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

  mr.width = 2 * tv[trail]["diameter"];
  movingRod.attr("stroke-width", mr.width);

  movingRod.attr("x1", x + (mr.width + 1) /2 + 1);
  movingRod.attr("y1", y);
  movingRod.attr("x2", movingRod.attr("x1"));
  movingRod.attr("y2", y + 180);

}

const measure = () => {

  d = movingPart.attr("d").split(" ");

  if (parseInt(d[1]) + 40 <= (vc.x + 35 + mr.width + 3)) {
    
    displayMeasurement();
    Stop();
    DisableButton(start);
    EnableButton(next);
    return;
  }

  drawMovingPart(
    parseInt(d[1]) - 1,
    parseInt(d[2])
  );

}

const drawSecondScene = () => {

  drawVernierCaliperse( vc.x, vc.y);

}

const clearSecondScene = () => {
  clearVernierCaliperse();
}

function drawThirdScene(x,y,height) {

  lowerRect.attr("x",x);
  lowerRect.attr("y",y);
  lowerRect.attr("width",rod.pLength);
  lowerRect.attr("height",height);

  upperRect.attr("x",parseInt(lowerRect.attr("x")) + rod.pLength / 4);
  upperRect.attr("y",parseInt(lowerRect.attr("y")) - rod.pLength / 2);
  upperRect.attr("width",rod.pLength / 2);
  upperRect.attr("height",rod.pLength / 2);

  y = parseInt(lowerRect.attr("y"))+parseInt(lowerRect.attr("height"))/2;
  x = parseInt(upperRect.attr("x")) - (3 * rod.pLength + 60);
  drawRod(x,y);

}

function clearThirdScene() {

  RemoveRod();

  lowerRect.attr("width" , 0);
  lowerRect.attr("height" , 0);

  upperRect.attr("width" , 0);
  upperRect.attr("height" , 0);

}

function insertRod() {

  drawRod(rod.xStart,rod.yStart);

  rod.xStart += 10;

  if(parseInt(rod2.attr("x1")) >= parseInt(lowerRect.attr("x"))) {

    Stop();
    DisableButton(start);
    EnableButton(next);
    return;

  }
  
}

const clearController = () => {

  controllerB1.attr("points",[]);
  controllerB2.attr("points",[]);

  controllerB3.attr("width",0);
  controllerB3.attr("height",0);

  LoadReadingBorder.attr("width",0);
  LoadReadingBorder.attr("height",0);

  LoadReading.text("");
  LoadHeading.text("");

  controllerS.attr("width",0);
  controllerS.attr("height",0);
}

function DrawController() {

  mx = middlePoint(xStart,xStart+support.width);
  my = middlePoint(yStart - (controllerB.hheight),yStart - (controllerB.vheight + controllerB.hheight));

  points = [xStart+margin , yStart
            , xStart+margin, yStart - (controllerB.vheight + controllerB.hheight)
            , xStart+margin + controllerB.gap, yStart - controllerB.hheight
            , xStart+margin + controllerB.gap, yStart];
  controllerB1.attr("points",points.join(" "));

  points = [xStart+margin , yStart - (controllerB.vheight + controllerB.hheight)
            ,xStart+margin+controllerB.width , yStart - (controllerB.vheight + controllerB.hheight)
            ,xStart+margin+controllerB.width + controllerB.gap , yStart - (controllerB.hheight)
            ,xStart+margin + controllerB.gap , yStart - (controllerB.hheight)];
  controllerB2.attr("points",points.join(" "));

  
  controllerB3.attr("x",xStart+margin + controllerB.gap);
  controllerB3.attr("y",yStart - (controllerB.hheight));
  controllerB3.attr("width",controllerB.width);
  controllerB3.attr("height",controllerB.hheight);

  LoadReading.text("0.00")
  LoadReading.attr("x",mx-18);
  LoadReading.attr("y",yStart - (controllerB.hheight)-50 + 20);

  LoadReadingBorder.attr("x",mx - 35);
  LoadReadingBorder.attr("y",yStart - (controllerB.hheight)-50);
  LoadReadingBorder.attr("width",70);
  LoadReadingBorder.attr("height",25);

  LoadHeading.text("Load (KN)");
  LoadHeading.attr("x",mx - 35);
  LoadHeading.attr("y",yStart - (controllerB.hheight)-55);
  LoadHeading.attr("font-size",15);

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

  let gap = 7;
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
  strokes.attr("stroke","#002699");

   strokes.children().first().html("Universal Testing Machine");
}

const clearCompressor = () => {

  compressorS.attr("width",0);
  compressorS.attr("height",0);

  UTMLine1.attr("x2",UTMLine1.attr("x1"));
  UTMLine1.attr("y2",UTMLine1.attr("y1"));

  UTMLine2.attr("x2",UTMLine2.attr("x1"));
  UTMLine2.attr("y2",UTMLine2.attr("y1"));

  UTMLine3.attr("x2",UTMLine3.attr("x1"));
  UTMLine3.attr("y2",UTMLine3.attr("y1"));

  UTMLine4.attr("x2",UTMLine4.attr("x1"));
  UTMLine4.attr("y2",UTMLine4.attr("y1"));

  strokes1.attr("d",[]);
  strokes2.attr("d",[]);

  UTMLowerPart.attr("d",[].join(" "));
  UTMMiddlePart.attr("d",[].join(" "));
  UTMUpperPart.attr("d",[].join(" "));


}

function DrawCompressor() {

  let xStart = SVG.width-margin-compressorB.supWidth;
  let xEnd = SVG.width-margin;
  let yEnd = 40;
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

  y = y - 200
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

function clearConnections() {

  connection1.attr("x2",connection1.attr("x1"));
  connection1.attr("y2",connection1.attr("y1"));

  connection2.attr("x2",connection2.attr("x1"));
  connection2.attr("y2",connection2.attr("y1"));

  connection3.attr("x2",connection3.attr("x1"));
  connection3.attr("y2",connection3.attr("y1"));
}

function placeAppratusOnUTM() {

  midpoint = middlePoint(compressorB.xStart,compressorB.xEnd);

  rod.pLength = 20;
  rod.strokeWidth = tv[trail]["diameter"] * (3 / 4);

  let lw = rod.pLength;
  let uw = 10;
  let lh = 35;

  lowerRect.attr("x",midpoint - rod.pLength/2);
  lowerRect.attr("y",yStart - 50 - lh);
  lowerRect.attr("width",rod.pLength);
  lowerRect.attr("height",lh);

  upperRect.attr("x",parseInt(lowerRect.attr("x")) + rod.pLength / 4);
  upperRect.attr("y",parseInt(lowerRect.attr("y")) - rod.pLength / 2 - 1);
  upperRect.attr("width",rod.pLength / 2);
  upperRect.attr("height",rod.pLength / 2);

  compressorB.maxMidHeight = parseInt(upperRect.attr("y"));
  y = parseInt(lowerRect.attr("y"))+parseInt(lowerRect.attr("height"))/2;
  drawRod(midpoint-rod.pLength*3/2,y);
}


function drawMainScene() {

  EnableButton(start);
  readingPos = 0;

  drawBaseLine();
  fillColors();
  DrawController();
  DrawCompressor();
  DrawConnections();
  placeAppratusOnUTM();


}

const clearWheels = () => {
  drawWheel( 0, 0, 0, wheel1 );
  drawWheel( 0, 0, 0, wheel2 );
  drawWheel( 0, 0, 0, wheel3 );
}

function clearMainScene() {

  clearBaseLine();
  clearWheels();
  clearController();
  clearCompressor();
  clearConnections();
  clearThirdScene(); //placeAppratusOnUTM();
}

function AdjustUTMMiddlePart() {

  compressorB.middlePartY ++;

  if(compressorB.middlePartY + 60 > compressorB.maxMidHeight - 1) {
    //here 60 is width of middle part;
    Stop();
    DisableButton(start);
    DisableButton(reset);
    EnableButton(stop);
    intervalId = setInterval(function() {
      compress();
    },10);
    play_audio();
    return;

  }

  drawUTMMiddlePart(compressorB.middlePartY);
  rotateWheel(wheel1);

}

var readingPos = 0;

function compress() {

  meterReading += readingShift;

  if(meterReading > maxMeterReading) {

    rodBrokenSound.play();
    Stop();
    DisableButton(start);
    DisableButton(reset);
    DisableButton(stop);

    rod1.attr("y1",parseInt(rod1.attr("y1")) - 2);
    rod3.attr("y2",parseInt(rod3.attr("y2")) - 2);
    upperRect.attr("y",parseInt(lowerRect.attr("y")) - rod.pLength / 3);
    compressorB.middlePartY += 2;
    drawUTMMiddlePart(compressorB.middlePartY);
    
    setTimeout(() =>{

      rod1.attr("x1",parseInt(rod1.attr("x1")) - 3);
      rod1.attr("x2",parseInt(rod1.attr("x2")) - 3);
      rod3.attr("x1",parseInt(rod3.attr("x1")) + 3);
      rod3.attr("x2",parseInt(rod3.attr("x2")) + 3);
      
      fillObsTable();

      intervalId = setInterval(function() {
        DropBrokenRodparts();
      },50);

    },300);
    return;
  }

  //console.log(meterReading);
  LoadReading.text(meterReading.toFixed(2));

  if(readingPos < 5 && meterReading > 10) {

    readingPos += 5;
    LoadReading.attr('x',parseInt(LoadReading.attr('x')) - 6);
  }

}



function DropBrokenRodparts() {
  
  rod1.attr("y1",parseInt(rod1.attr("y1")) + 1);
  rod1.attr("y2",rod1.attr("y1"));
  
  rod3.attr("y2",parseInt(rod3.attr("y2")) + 1);
  rod3.attr("y1",rod3.attr("y2"));

  //console.log(parseInt(rod1.attr("y1"))+"-----"+(parseInt(compressorS.attr("y"))-50));

  if(parseInt(rod1.attr("y1")) >= parseInt(compressorS.attr("y")) - 50 - 4) {

    Stop();
    EnableButton(reset);
    DisableButton(start);
    EnableButton(next2);

    trail ++;

    if(trail<3) {

      EnableButton(next);
      DisableButton(reset);
      DisableButton(next2);

    }

    return;
  }
  // we have to change here.
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


function Next() {
  
  count ++;

  if(count == 1) {

    clearFirstScene();
    drawSecondScene();
     
  } else if(count == 2) {

    DisableButton(next);

    intervalId = setInterval(function() {
        measure();          
    },20);  

  } else if(count == 3) {

    clearSecondScene();
    drawThirdScene(300,200,200);

  } else if(count == 4) {

    DisableButton(next);

    intervalId = setInterval(function() {
        insertRod();          
    },50);

  } else if(count == 5) {

    clearThirdScene();

    meterReading = 0; // important reading;
    maxMeterReading = tv[trail]["shear_load"];
    drawMainScene();
    DisableButton(next);

  } else if(count == 6) {

      count = 0;
      clearMainScene();
      drawFirstScene();
  }

}

function Start() {

  EnableButton(stop);
  DisableButton(start);
  //DisableButton(reset);

  intervalId = setInterval(function() {
    AdjustUTMMiddlePart();                
  },150);

  play_audio();


}

function Stop() {

  DisableButton(stop);
  EnableButton(start);
  //EnableButton(reset);

  clearInterval(intervalId);

  pause_audio();
  
}

/* function Reset() {

  meterReading = 0;

  DisableButton(reset);
  EnableButton(start);
  DisableButton(next2);

  clearObsTable();

} */

function Reset() {

  window.location.reload();

}


function fillObsTable() {

  if(areInstructionsShown) { toogleInstructions(); }

  meterReading -= readingShift;
  meterReading = meterReading.toFixed(2);

  obserTable[trail].rows[1].cells[1].innerHTML = tv[trail]["diameter"];
  obserTable[trail].rows[1].cells[2].innerHTML = tv[trail]["area"];
  obserTable[trail].rows[1].cells[3].innerHTML = meterReading;
  //obserTable.rows[1].cells[4].innerHTML = tv[3];

}

function clearObsTable() {

  obserTable[trail].rows[1].cells[1].innerHTML = "";
  obserTable[trail].rows[1].cells[2].innerHTML = "";
  obserTable[trail].rows[1].cells[3].innerHTML = "";
  //obserTable.rows[1].cells[4].innerHTML = "";

  DisableButton(next2);

  clearResults();
}

function showResults() {

  let readings = [tv[0]["shear_stress"],tv[1]["shear_stress"],tv[2]["shear_stress"]]
  let results = ( readings[0] + readings[1] + readings[2] ) / 3 ;
  let space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  result.html(
              space + "<h3><u>Result :- </u></h3>"+
              space + "The Ultimate shear stress on the HYDS bar is<br>" +
              space + space + " = ( "+ readings[0] +" + " + readings[1] +" + " + readings[2] +" ) / 3 <br>" +
              space + space + " = <u>"+ results.toFixed(3) + "</u>  <i>(N / mm<sup>2</sup>)</i>. <br>"
            );

  DisableButton(next2);
  areResultsShown = true;
}

function clearResults() {
  result.html("");
}

next2.attr("onclick","showVerifyTable()");
showdata.click(showData);
instructions.attr("onclick","toogleInstructions()");

var isVerified = false;
var areResultsShown = false;

function Next2(text,fun) {

  next2.text(text);
  next2.attr("onclick",fun);

}

function showData() {

  clearResults();
  EnableButton(next2);

  if(isVerified) {
    Next2("Next", "showResultTable()");
  } else {
    Next2("Next", "showVerifyTable()");
  }
  
  showdata.css("display", "none");
  ObsTabDiv.css("display", "block");
  ResultDiv.css("display", "none");
  VerifyDiv.css("display", "none");
  clearFormula();
}

function showVerifyTable() {

  ObsTabDiv.css("display","none");
  VerifyDiv.css("display","block");
  ResultDiv.css("display","none"); 
  showdata.css("display","block");

  Next2("Verify","showResultTable()");

  showFormula();
}

var measured;

function showResultTable() {

  if(areResultsShown) {
    showResults();
  }

  measured = [0,0,0];
  measured[0] = (verify.ss1.value == "") ? 0 : parseFloat(verify.ss1.value);
  measured[1] = (verify.ss2.value == "") ? 0 : parseFloat(verify.ss2.value);
  measured[2] = (verify.ss3.value == "") ? 0 : parseFloat(verify.ss3.value);

  for(let i=0; i < tv.length;i ++) {

    resultTable.rows[2+i].cells[1].innerHTML = tv[i]["shear_stress"];
    resultTable.rows[2+i].cells[2].innerHTML = measured[i];
    resultTable.rows[2+i].cells[3].innerHTML = percentageError(measured[i],tv[i]["shear_stress"]);

  }

  ObsTabDiv.css("display","none");
  VerifyDiv.css("display","none");
  ResultDiv.css("display","block");
  showdata.css("display","block");

  Next2("Show Results","showResults()");
  isVerified = true;

  verify.mr.value = 0;
}

function percentageError(measured,actual) {

  let m1 = (Math.abs(measured - actual) / actual).toFixed(3);

  return (parseFloat(m1) * 100).toFixed(2);
}

function showFormula() {

  let image = new Image();
  image.src = "../images/formula.png";
  image.alt = "Modulus of Rigidity Formula";

  image.style.margin = "10px 0px 0px 50px";

  result.html("");
  result.append(image);
}

const clearFormula = () => {
  result.html("");
}

var case1 = 1;
var areInstructionsShown = false;

function toogleInstructions() {

  if(instructionsDiv.css("display") != "block") {

    areInstructionsShown = true;

    instructions.html("&lsaquo; Back");
    instructionsDiv.css("display","block");
    next2.css("display","none");
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
    next2.css("display","block");
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