
const innerNeedle= document.getElementById("innerNeedle");
const needle= document.getElementById("needle");
const innerCircle= document.getElementById("innerCircle");
const lineHolder= document.getElementById("lineHolder");
const defMeter= document.getElementById("meter");
const sLine2= document.getElementById("sLine2");
const sLine1= document.getElementById("sLine1");
const defSupportStand = document.getElementById("suppStand");
const t0 = document.getElementById("0");
const t60 = document.getElementById("60");
const t120 = document.getElementById("120");
const dlefReading = document.getElementById("dlefReading");

const svg = document.getElementById("svgPanel");
const support1 = document.getElementById("support1");
const support2 = document.getElementById("support2");
const beam = document.getElementById("beam");
const weight = document.getElementById("weight");
const weightHanger = document.getElementById("weightHanger");
const string = document.getElementById("string");
const text = document.getElementById("text");

const obserTable = document.getElementById("obsTable");
const t=0.5;
const stringLength = 5;

var d,points;

var suppStand = {width:40,height:45};

var shift = 5;
var weightShift = 3;
var weightHangerWidth = 10,weightHangerHeight = 20;
var weightValue = 0.0;

var beemlenght = 6;
const middlePoint = (100 + beemlenght * 100)/2;
var supportLength = 3.5;
var angle = 0;
var index = 0;

var rowCount = 0;
var wSet = new Set();

const xstart = 50,ystart = 200;


function initializeSVG() {

  if(beemlenght < 4) beemlenght = 4;
  else if(beemlenght > 7) beemlength = 7;

  svg.setAttribute("width",(100 + beemlenght*100));
  svg.setAttribute("height",(100 + supportLength*100 + 20));
  d = ["M",xstart,ystart
        ,"Q",middlePoint,ystart
        ,(xstart + beemlenght*100),ystart];
  beam.setAttribute("d",d.join(" "));

  x = xstart
  y = ystart
  points = [x-10, y+5
            ,x+10, y+5
            ,x+15,100 + supportLength*100
            ,x-15,100 + supportLength*100];
  support1.setAttribute("points",points.join(" "));

  x = (xstart + beemlenght*100);
  points = [x-10,y+5
            ,x+10,y+5
            ,x+15,100 + supportLength*100
            ,x-15,100 + supportLength*100];
  support2.setAttribute("points",points.join(" "));

  weightHanger.setAttribute('x',middlePoint-5);
  weightHanger.setAttribute('y',y-10);
  weightHanger.setAttribute('width',weightHangerWidth);
  weightHanger.setAttribute('height',weightHangerHeight);

  d = ["M",middlePoint,y,"L",middlePoint,y + (stringLength * 10)];
  string.setAttribute("d",d.join(" "));

  points = [middlePoint-30,y + (stringLength * 10)
            ,middlePoint+30,y + (stringLength * 10)
            ,middlePoint+50,y + (stringLength * 20)
            ,middlePoint-50,y + (stringLength * 20)];
  weight.setAttribute("points",points.join(" "));

  text.setAttribute('x',middlePoint-25);
  text.setAttribute('y',y + (stringLength * 20) - 10);

  defSupportStand.setAttribute('x',middlePoint-100-suppStand.width);
  defSupportStand.setAttribute('y',100 + (supportLength*100)-suppStand.height);
  defSupportStand.setAttribute('width',suppStand.width);
  defSupportStand.setAttribute('height',suppStand.height);

  sLine1.setAttribute('x1',parseInt(defSupportStand.getAttribute('x'))+(suppStand.width/2));
  sLine1.setAttribute('y1',defSupportStand.getAttribute('y'));
  sLine1.setAttribute('x2',sLine1.getAttribute('x1'));
  sLine1.setAttribute('y2',70);

  sLine2.setAttribute('x1',defSupportStand.getAttribute('x'));
  sLine2.setAttribute('y1',parseInt(sLine1.getAttribute('y2')) + 40);
  sLine2.setAttribute('x2',middlePoint);
  sLine2.setAttribute('y2',sLine2.getAttribute('y1'));

  lineHolder.setAttribute("cx",sLine1.getAttribute('x1'));
  lineHolder.setAttribute("cy",sLine2.getAttribute('y1'));
  lineHolder.setAttribute("r",10);

  defMeter.setAttribute("cx",middlePoint-9);
  defMeter.setAttribute("cy",sLine2.getAttribute('y1'));
  defMeter.setAttribute("r",50);

  innerCircle.setAttribute("cx",defMeter.getAttribute("cx"));
  innerCircle.setAttribute("cy",defMeter.getAttribute("cy"));
  innerCircle.setAttribute("r",5);

  x = parseInt(defMeter.getAttribute("cx"));
  
  d = ["M",x-8,25
        ,"L",x-8,35
        ,"L",x-4,35
        ,"L",x-4,200-25
        ,"L",x,200-3
        ,"L",x+4,200-25
        ,"L",x+4,35
        ,"L",x+8,35
        ,"L",x+8,25,"z" ]
  needle.setAttribute("d",d.join(" "));

  innerNeedle.setAttribute('x1',innerCircle.getAttribute("cx"));
  innerNeedle.setAttribute('y1',innerCircle.getAttribute("cy"));
  innerNeedle.setAttribute('x2',parseInt(innerNeedle.getAttribute("x1")) - 43);
  innerNeedle.setAttribute('y2',innerNeedle.getAttribute('y1'));


  t0.setAttribute("font-size","12px");
  t0.setAttribute('x',parseInt(innerNeedle.getAttribute("x1"))-48);
  t0.setAttribute('y',parseInt(innerNeedle.getAttribute('y1'))+5);

  t60.setAttribute("font-size","12px");
  t60.setAttribute('x',parseInt(innerNeedle.getAttribute("x1"))-5);
  t60.setAttribute('y',parseInt(innerCircle.getAttribute("cy"))-38);

  t120.setAttribute("font-size","12px");
  t120.setAttribute('x',parseInt(innerNeedle.getAttribute("x1"))+30-2);
  t120.setAttribute('y',parseInt(innerNeedle.getAttribute('y1'))+5);

  dlefReading.setAttribute('x',parseInt(t60.getAttribute('x'))-2);
  dlefReading.setAttribute('y',parseInt(innerCircle.getAttribute("cy"))+35);
}

function addWeight() {

  d = beam.getAttribute('d').split(" ");
  
  if(weightValue < 2.5) {
    
    d[5] = parseInt(d[5]) + shift;
    beam.setAttribute('d',d.join(" "));

    increaseWeightSize(); //to increase size of weight.

    y = setWeightHangerHeight(parseInt(d[2]),parseInt(d[5]),parseInt(d[7]));
    
    setString(y,1);
    needleDown();

    angle += 34;
    drawInnerNeedle(180 - angle);

    setdlefReading(++index);
    
  } else {
    alert("Cannot add more weight!");
  }
    
}

function removeWeight() {

  d = beam.getAttribute('d').split(" ");
  
 if(weightValue > 0) {

    d[5] = parseInt(d[5]) - shift;
    beam.setAttribute('d',d.join(" "));

    decreaseWeightSize();

    y = setWeightHangerHeight(parseInt(d[2]),parseInt(d[5]),parseInt(d[7]));
    
    setString(y,0);
    needleUp();

    angle -= 34;
    drawInnerNeedle(180 - angle);

    setdlefReading(--index);

  } else {
    alert("Cannot remove weight!");
  }

}

function setWeightHangerHeight(x1,x2,x3) {

  y = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * x2 + t * t * x3;
  y -= 10; 
  weightHanger.setAttribute('y',y.toString());
  return y;

}

function setString(y,flag) {

  ds = string.getAttribute('d').split(" ");
  ds[2] = y+10;
  if(flag == 1) {
    ds[5] = parseInt(ds[5]) + shift;
  } else {
    ds[5] = parseInt(ds[5]) - shift;
  }
  
  string.setAttribute('d',ds.join(" "));
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

  text.setAttribute('y',points[7]-10);
  weightValue += 0.5;
  text.innerHTML = ""+weightValue+" KG";
  
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

  text.setAttribute('y',points[7]-10);
  weightValue -= 0.5;
  text.innerHTML = ""+weightValue+" KG";

}

function needleDown() {

  d = needle.getAttribute('d').split(" ");
  for (var i = 2; i < d.length; i+=3) {
    d[i] = parseInt(d[i]) + 3;
  }
  needle.setAttribute('d',d.join(" "));
}

function needleUp() {

  d = needle.getAttribute('d').split(" ");
  for (var i = 2; i < d.length; i+=3) {
    d[i] = parseInt(d[i]) - 3;
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
  let radius = parseInt(defMeter.getAttribute("r")) - 10;

  angle = degToRad(angle);
  let x = Cx + radius * Math.cos(angle); //radians
  let y = Cy + radius * Math.sin(angle); //radians
  y = 2 * Cy - y;  //deep explination required **
  innerNeedle.setAttribute('x2',x);
  innerNeedle.setAttribute('y2',y);

}

const dlef = [0,23,48,69,93,117];
const wv = [4.905,9.810,14.715,19.620,24.525];
const lodini = [0,23,48,69,93];
const lodfin = [23,48,69,93,117];
const unlodini = [23,48,69,93,117];
const unlodfin = [0,23,48,69,93];
const lodmm = [0.23,0.24,0.23,0.23,0.24];
const unlodmm = [0.23,0.24,0.23,0.23,0.24];
const avgmm = [0.23,0.24,0.23,0.23,0.24];
const ym = [1.63,1.61,1.63,1.63,1.61];

function setdlefReading(index) {
  dlefReading.innerHTML = dlef[index];
}

function updateObserTable() {

  let weight = weightValue;

  if(weight == 0) {
    alert("Please Add some weight to Take Readings");
    return;
  }

  if(!wSet.has(weight)) {
    rowCount += 1;
    wSet.add(weight);
    weight -= 0.5;
    obserTable.rows[rowCount].cells[0].innerHTML= "<br>"+rowCount;
    obserTable.rows[rowCount].cells[1].innerHTML= wv[weight*2];
    obserTable.rows[rowCount].cells[2].innerHTML= lodini[weight*2];
    obserTable.rows[rowCount].cells[3].innerHTML= lodfin[weight*2];
    obserTable.rows[rowCount].cells[4].innerHTML= unlodini[weight*2];
    obserTable.rows[rowCount].cells[5].innerHTML= unlodfin[weight*2];
    obserTable.rows[rowCount].cells[6].innerHTML= lodmm[weight*2];
    obserTable.rows[rowCount].cells[7].innerHTML= unlodmm[weight*2];
    obserTable.rows[rowCount].cells[8].innerHTML= avgmm[weight*2];
    obserTable.rows[rowCount].cells[9].innerHTML= ym[weight*2]+" x 10<sup>5</sup>";
  }
}

