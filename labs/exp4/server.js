const svg = document.getElementById("svgPanel");
const support1 = document.getElementById("support1");
const support2 = document.getElementById("support2");
const beam = document.getElementById("beam");
const weight = document.getElementById("weight");
const weightHanger = document.getElementById("weightHanger");
const string = document.getElementById("string");
const weightText = document.getElementById("text");

const innerNeedle= document.getElementById("innerNeedle");
const needle= document.getElementById("needle");
const innerCircle= document.getElementById("innerCircle");
const lineHolder= document.getElementById("lineHolder");
const deflMeter= document.getElementById("meter");
const hLine= document.getElementById("hLine");
const vLine= document.getElementById("vLine");
const defSupportStand = document.getElementById("suppStand");
const t0 = document.getElementById("0");
const t60 = document.getElementById("60");
const t120 = document.getElementById("120");
const deflReading = document.getElementById("dlefReading");
const deflReadingBorder = document.getElementById("dlefReadingBorder");

const obserTable = document.getElementById("obsTable");
const average = document.getElementById("Average");
const result = document.getElementById("result");

var d,points;

const suppStand = {width:40,height:45};

var shift = 5;
const weightShift = 8;
const needleShift = 3; //should be an intiger

const stringLength = 5;
const weightHangerWidth = 10;
const weightHangerHeight = 20;

const beemlenght = 6;
const supportLength = 3.5;
const deflMeterRadius = 55;

const middlePoint = (100 + beemlenght * 100)/2;
const xstart = 50,ystart = 200;
const yend = ystart + (supportLength * 100)

const xPositions = [middlePoint,xstart+beemlenght*25]
var state = 0;

var weightValue = 0.0;
var angle = 0;
var index = 0;

var rowCount0 = 0;
var rowCount1 = 0;
var wSet0 = new Set();
var wSet1 = new Set();
var average1 = 0;
var average2 = 0;

function initializeSVG() {

  if(beemlenght < 4) beemlenght = 4;
  else if(beemlenght > 7) beemlength = 7;

  svg.setAttribute("width",(100 + beemlenght*100));
  svg.setAttribute("height",(100 + supportLength*100 + 20));
  d = ["M",xstart - 5,ystart
        ,"Q",middlePoint,ystart
        ,(xstart + 5 + beemlenght*100),ystart];
  beam.setAttribute("d",d.join(" "));

  let beamStroke = parseInt(beam.getAttribute("stroke-width"))/2;
  x = xstart
  y = ystart

  points = [x-10,y+beamStroke+10
            ,x,y+beamStroke
            ,x+10,y+beamStroke+10
            ,x+15,100 + supportLength*100
            ,x-15,100 + supportLength*100];
  support1.setAttribute("points",points.join(" "));

  x = (xstart + beemlenght*100);
  points = [x-10,y+beamStroke+10
            ,x,y+beamStroke
            ,x+10,y+beamStroke+10
            ,x+15,100 + supportLength*100
            ,x-15,100 + supportLength*100];
  support2.setAttribute("points",points.join(" "));

  drawWeight(xPositions[0],ystart)
  drawDlefMeter(xPositions[1],ystart -(deflMeterRadius+40),0);

}

function drawWeight(wx,wy) {
  // body...
  weightHanger.setAttribute('x',wx-(weightHangerWidth/2));
  weightHanger.setAttribute('y',wy-10);
  weightHanger.setAttribute('width',weightHangerWidth);
  weightHanger.setAttribute('height',weightHangerHeight);

  //d = ["M",middlePoint,y,"L",middlePoint,y + (stringLength * 10)];
  string.setAttribute("x1",wx);
  string.setAttribute("y1",wy);
  string.setAttribute("x2",wx);
  string.setAttribute("y2",wy + (stringLength * 10));

  points = [wx-20,wy + (stringLength * 10)
            ,wx+20,wy + (stringLength * 10)
            ,wx+40,wy + (stringLength * 10 + 40)
            ,wx-40,wy + (stringLength * 10 + 40)];
  weight.setAttribute("points",points.join(" "));

  weightText.setAttribute('x',wx-25);
  weightText.setAttribute('y',parseInt(string.getAttribute("y2")) + (stringLength * 10) - 20);

}

function drawDlefMeter(cx,cy,standdir) {
  // body...
  deflMeter.setAttribute("cx",cx);
  deflMeter.setAttribute("cy",cy);
  deflMeter.setAttribute("r",deflMeterRadius);

  hLine.setAttribute('x1',deflMeter.getAttribute("cx"));
  hLine.setAttribute('y1',deflMeter.getAttribute("cy"));

  if(standdir == 0) {
    x2 = parseInt(hLine.getAttribute("x1")) - (deflMeterRadius+60);
    cx = x2 + 25;
  } else {
    x2 = parseInt(hLine.getAttribute("x1")) + (deflMeterRadius+60);
    cx = x2 - 25;
  }
  hLine.setAttribute('x2',x2);
  hLine.setAttribute('y2',hLine.getAttribute('y1'));

  lineHolder.setAttribute("cx",cx);
  lineHolder.setAttribute("cy",hLine.getAttribute('y2'));
  lineHolder.setAttribute("r",10);

  points = support1.getAttribute("points").split(" ");
  
  vLine.setAttribute('x1',lineHolder.getAttribute("cx"));
  vLine.setAttribute('y1',70);
  vLine.setAttribute('x2',vLine.getAttribute('x1'));
  vLine.setAttribute('y2',parseInt(points[points.length - 1]) - suppStand.height);

  defSupportStand.setAttribute('x',parseInt(vLine.getAttribute("x2")) - (suppStand.width / 2) );
  defSupportStand.setAttribute('y',vLine.getAttribute("y2"));
  defSupportStand.setAttribute('width',suppStand.width);
  defSupportStand.setAttribute('height',suppStand.height);

  innerCircle.setAttribute("cx",deflMeter.getAttribute("cx"));
  innerCircle.setAttribute("cy",deflMeter.getAttribute("cy"));
  innerCircle.setAttribute("r",5);

  x = parseInt(deflMeter.getAttribute("cx"));
  
  d = ["M",x-8,15
        ,"L",x-8,25
        ,"L",x-4,25
        ,"L",x-4,200-25
        ,"L",x,(200 - 4)
        ,"L",x+4,200-25
        ,"L",x+4,25
        ,"L",x+8,25
        ,"L",x+8,15,"z" ]
  needle.setAttribute("d",d.join(" "));

  innerNeedle.setAttribute('x1',innerCircle.getAttribute("cx"));
  innerNeedle.setAttribute('y1',innerCircle.getAttribute("cy"));
  innerNeedle.setAttribute('x2',parseInt(innerNeedle.getAttribute("x1")) - (deflMeterRadius - 7));
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

  deflReading.setAttribute('x',parseInt(innerCircle.getAttribute("cx"))-5);
  deflReading.setAttribute('y',parseInt(innerCircle.getAttribute("cy"))+40);

  deflReadingBorder.setAttribute("x",parseInt(deflMeter.getAttribute("cx"))-20);
  deflReadingBorder.setAttribute("y",parseInt(deflReading.getAttribute("y"))-18);
  deflReadingBorder.setAttribute("width",42);
  deflReadingBorder.setAttribute("height",22);

}

function changePositions() {

  if(weightValue != 0) {
    alert("Remove all the Weight to Change Positions");
    return;
  }

  index = 0;
  
  if(state == 0) {

    shift = 8;

    d = ["M",xstart - 5,ystart
        ,"Q",xPositions[1],ystart
        ,(xstart + 5 + beemlenght*100),ystart];
    beam.setAttribute("d",d.join(" "));
    
    drawWeight(xPositions[1],ystart)
    drawDlefMeter(xPositions[0],ystart -(deflMeterRadius+40),1);
    state = 1;

  } else {

    shift = 5;

    d = ["M",xstart - 5,ystart
        ,"Q",xPositions[0],ystart
        ,(xstart + 5 + beemlenght*100),ystart];
    beam.setAttribute("d",d.join(" "));


    drawWeight(xPositions[0],ystart)
    drawDlefMeter(xPositions[1],ystart -(deflMeterRadius+40),0);
    state = 0;

  }

}

function addWeight() {

  if(weightValue < 2.0) {
    
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
  weightValue += 0.5;
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
  weightValue -= 0.5;
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
  let radius = parseInt(deflMeter.getAttribute("r")) - 10;

  angle = degToRad(angle);
  let x = Cx + radius * Math.cos(angle); //radians
  let y = Cy + radius * Math.sin(angle); //radians
  y = 2 * Cy - y;  //deep explination required **
  innerNeedle.setAttribute('x2',x);
  innerNeedle.setAttribute('y2',y);

}


const lac = [4.905,9.810,14.715,19.620];
const da4 = [0,15,32,49,65];
const la4 = [4.905,9.810,14.715,19.620];
const dac = [0,15,31,50,67];
const p1 = [0.7357,3.1392,7.2103,12.753];
const p2 = [0.7357,3.1392,7.2103,12.753];

function setdlefReading(index) { 

  if(state ==0) 
    deflReading.innerHTML = da4[index];
  else
    deflReading.innerHTML = dac[index];

}

function updateObserTable() {

  let weight = weightValue;

  if(weight == 0) {
    alert("Please Add some weight to Take Readings");
    return;
  }

  if(state == 0) {

    if(!wSet0.has(weight)) {
      rowCount0 += 1;
      wSet0.add(weight);
      weight -= 0.5;
      obserTable.rows[rowCount0].cells[1].innerHTML= lac[weight*2];
      obserTable.rows[rowCount0].cells[2].innerHTML= ""+da4[weight*2]+"&nbsp;x&nbsp;0.01 =&nbsp;"+da4[weight*2] * 0.01;
      obserTable.rows[rowCount0].cells[5].innerHTML= p1[weight*2];

    }

  } else {

    if(!wSet1.has(weight)) {
      rowCount1 += 1;
      wSet1.add(weight);
      weight -= 0.5;
      obserTable.rows[rowCount1].cells[3].innerHTML= la4[weight*2];
      obserTable.rows[rowCount1].cells[4].innerHTML= ""+dac[weight*2]+"&nbsp;x&nbsp;0.01 =&nbsp;"+dac[weight*2] * 0.01;
      obserTable.rows[rowCount1].cells[6].innerHTML= p2[weight*2];
      
    }
  }

}


function calculateAverage() {
  //alert(obserTable.rows.length);

  if(wSet0.size == 4 && wSet0.size == 4) {

    average1 = 0;
    average2 = 0;

    average.innerHTML = "Average of P<sub>1</sub>&delta;<sub>12</sub> = ( ";
    average.innerHTML += obserTable.rows[1].cells[5].innerHTML;
    average1 += parseInt(obserTable.rows[1].cells[5].innerHTML);
    for (var i = 2; i < obserTable.rows.length; i++) {
      average.innerHTML += " + "+obserTable.rows[i].cells[5].innerHTML;
      average1 += parseInt(obserTable.rows[i].cells[5].innerHTML);
    }
    average.innerHTML += ") / " + (obserTable.rows.length-1) +" = "+average1+"<br>";

    average.innerHTML += "Average of P<sub>2</sub>&delta;<sub>21</sub> = ( ";
    average.innerHTML += obserTable.rows[1].cells[6].innerHTML;
    average2 += parseInt(obserTable.rows[1].cells[6].innerHTML);
    for (var i = 2; i < obserTable.rows.length; i++) {
      average.innerHTML += " + "+obserTable.rows[i].cells[6].innerHTML;
      average2 += parseInt(obserTable.rows[i].cells[6].innerHTML);
    }
    average.innerHTML += ") / " + (obserTable.rows.length-1) + " = " + average2;
  
  } else {
    alert("Please Record All the Observations in Table.");
  }
  
}

