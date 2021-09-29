const svg = $("#svgPanel");

const spring = $("#spring");
const springUp = $("#springUp");
const springDown = $("#springDown");
const sHolderUp = $("#springHolderUp");
const sHolderDown = $("#springHolderDown");
const axel = $("#axel");

const mbL = $("#mbL");
const mbR = $("#mbR");
const mbRl = $("#mbRl");
const mbRr = $("#mbRr");
const mSupport = $("#support");

const lodUnLodText = $("#lodUnLodText");
const TrailText = $("#TrailText");

const deflectionMeter = $("#DeflectionMeter")
const deflPoiniter = $("#DeflPointer")

const whiteMat = $("#whiteMat");
const ls1 = $("#ls1");
const ls2 = $("#ls2");

const ss1 = $("#ss1");
const ss2 = $("#ss2");
const ss3 = $("#ss3");
const ss4 = $("#ss4");
const ss5 = $("#ss5");
const ss6 = $("#ss6");
const ss7 = $("#ss7");
const ss8 = $("#ss8");
const ss9 = $("#ss9");
const ss10 = $("#ss10");


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

const obserTable =document.getElementById("obsTable");
const resultTable = document.getElementById("resultTable");
const finalResultsTable = document.getElementById("finalResultsTable");
const finalResult = $("#finalResult");
const average = $("#Average");
const result = $("#result");

const Content = $("#Content");
const simulationBoard = $("#simulationBoard");
const tableDiv = $("#tableDiv");
const ObsTabDiv = $("#ObsTabDiv");
const VerifyDiv = $("#VerifyDiv");
const ResultDiv = $("#ResultDiv");
const FinalResultsDiv = $("#FinalResultsDiv");
const instructionsDiv = $("#instructionsDiv");
const avgDiv = $("#avgDiv");

ObsTabDiv.css("display","block");
VerifyDiv.css("display","none");
ResultDiv.css("display","none");
FinalResultsDiv.css("display","none");
instructionsDiv.css("display","none");


const load = $("#load");
const unload = $("#unload");
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

load.click(Load);
unload.click(UnLoad);
reset.click(Reset);

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

DisableButton(unload);
DisableButton(next);

const deflMeterRadius = 60;
const dlefMeterAngles = [0,180,360];
const meterNeedleShift = 0.5;

const margin = 10;

const mbl = {
              width : 210,
              height : 220
}

const mbr = {
              width : 210,
              height : 400
}

const support = { 
                  width:mbr.width + 40,
                  height:50
                };

const mbrs = {
              width : 40,
              height : mbr.height
}

const deflProperties1 = {
                          width : 30,
                          height : 50,
}

const SVG = {
              width : mbl.width + mbr.width + mbrs.width,
              height : 470 
}

const xStart = margin;
const yStart = SVG.height - (mbr.height + support.height + 10);
const yEnd = SVG.height - 10;

var innerNeedleAngle = 180;
var angle1 = 90;
var meterReading = dlefMeterAngles[0];
var readingPos = 0;
var deflProperties = {};
var midpoint,x,y,d;
var intervalID;
var lodUnLod = 0;
var spos = [];
var trail = 0;


function middlePoint(x1,x2) {

  return (x1 + x2) / 2;

}

const displayTrailText = () => {

  TrailText.attr("font-size",25);
  TrailText.html("Trial - " + (trail+1));
  TrailText.attr("x",20);
  TrailText.attr("y", mbl.height + 50);

}

const displaylodUnLodText = () => {

  lodUnLodText.text("Loading");
  lodUnLodText.attr("x",20);
  lodUnLodText.attr("y",SVG.height - 20);

}

const drawBaseLine = () => {

  BaseLine.attr("x1",0);
  BaseLine.attr("y1",SVG.height - 10);
  BaseLine.attr("x2",SVG.width);
  BaseLine.attr("y2",SVG.height - 10);

}

function initializeSVG() {

  svg.attr("width",SVG.width);
  svg.attr("height",SVG.height);

  drawMainScene();
  
}

const drawMainScene = () => {

  meterReading = 0;
  readingPos = 0;

  innerNeedleAngle = 180;


  EnableButton(load);

  drawMachineBody();
  displaylodUnLodText();
  displayTrailText();
  drawBaseLine();

  showSpringDetails();

  next.attr("onclick","showVerifyTable()");

}

const springProp = {
                      length : 14 //should be an Even number
                    , xshift : 30
                    , yshift : 3
                    , defaultyShift : 3
}
const springShift = 0.035;
const maxSpringShift =  9;
const axilWidth = springProp.xshift / 3;

function drawSpring(x,y) {

  //alert("draw");
  springProp.x = x;
  springProp.y = y;
  springProp.xshift = tv[trail]["Spring_xShift"];

  y += 20;
  d = ["M",  x, y,
       "L",  x, y + 10];
  y += 10;

  for (var i = 0; i < springProp.length; i++) {

      d.push("Q");
      if(i % 2 == 0) d.push(x + springProp.xshift);
      else d.push(x - springProp.xshift);
      y += springProp.yshift;
      d.push(y);
      d.push(x);
      y += springProp.yshift;
      d.push(y);

  }

  d.push("L");
  d.push(x);
  d.push(y+10);
  springProp.yEnd = y+10;

  spring.attr("d",d.join(" "));
  spring.attr("stroke-width",tv[trail]["stroke-width"]);
  spring.attr("stroke","#0619A1");

  y += 30;

  d = ["M", x - springProp.xshift, y
      ,"L", x - springProp.xshift, y - 10
      ,"L", x - (springProp.xshift - 10), y - 10
      ,"L", x , y - 20
      ,"L", x + (springProp.xshift - 10), y - 10
      ,"L", x + springProp.xshift, y - 10
      ,"L", x + springProp.xshift, y,"Z"];

  sHolderDown.attr("d",d.join(" "));

  axel.attr("x",x - axilWidth/2 );
  axel.attr("y",y );
  axel.attr("width",axilWidth );
  axel.attr("height",yEnd - (y+support.height));

}

function drawStrokesOnMeter() {

  let x = deflProperties1.x + 21;

  ss1.attr("x1",x);
  ss1.attr("y1",spos[0]);
  ss1.attr("x2",x+5);
  ss1.attr("y2",spos[0]);

  ss2.attr("x1",x);
  ss2.attr("y1",spos[1]);
  ss2.attr("x2",x+5);
  ss2.attr("y2",spos[1]);

  ss3.attr("x1",x);
  ss3.attr("y1",spos[2]);
  ss3.attr("x2",x+5);
  ss3.attr("y2",spos[2]);

  ls1.attr("x1",x);
  ls1.attr("y1",spos[3]);
  ls1.attr("x2",x+10);
  ls1.attr("y2",spos[3]);

  ss4.attr("x1",x);
  ss4.attr("y1",spos[4]);
  ss4.attr("x2",x+5);
  ss4.attr("y2",spos[4]);

  ss5.attr("x1",x);
  ss5.attr("y1",spos[5]);
  ss5.attr("x2",x+5);
  ss5.attr("y2",spos[5]);

  ss6.attr("x1",x);
  ss6.attr("y1",spos[6]);
  ss6.attr("x2",x+5);
  ss6.attr("y2",spos[6]);

  ss7.attr("x1",x);
  ss7.attr("y1",spos[7]);
  ss7.attr("x2",x+5);
  ss7.attr("y2",spos[7]);

  ss8.attr("x1",x);
  ss8.attr("y1",spos[8]);
  ss8.attr("x2",x+5);
  ss8.attr("y2",spos[8]);


  ls2.attr("x1",x);
  ls2.attr("y1",spos[9]);
  ls2.attr("x2",x+10);
  ls2.attr("y2",spos[9]);

  ss9.attr("x1",x);
  ss9.attr("y1",spos[10]);
  ss9.attr("x2",x+5);
  ss9.attr("y2",spos[10]);

  ss10.attr("x1",x);
  ss10.attr("y1",spos[11]);
  ss10.attr("x2",x+5);
  ss10.attr("y2",spos[11]);

}

function scaleDown() {

  let temp = spos[0];
  for(let i=0; i < spos.length-1;i ++) {
    spos[i] = spos[i+1];
  }
  spos[spos.length - 1] = temp;

  drawStrokesOnMeter();
}

function ScaleUp() {

  let temp = spos[spos.length - 1];
  for(let i= spos.length - 1; i > 0;i --) {
    spos[i] = spos[i - 1];
  }
  spos[0] = temp;

  drawStrokesOnMeter();
}

function DrawDeflMeter1(x,y) {

  deflProperties1["x"] = x;
  deflProperties1["y"] = y;

  for(let i=0;i<12;i++) {

    spos[i] = y + 2 + i * 4;

  }

  deflectionMeter.attr("x",x + 5);
  deflectionMeter.attr("y",y);
  deflectionMeter.attr("width",deflProperties1.width);
  deflectionMeter.attr("height",deflProperties1.height);

  whiteMat.attr("x",x+21);
  whiteMat.attr("y",y);
  whiteMat.attr("width",deflProperties1.width/3);
  whiteMat.attr("height",deflProperties1.height);

  drawStrokesOnMeter();
  
  d = ["M", x + 5, (y + deflProperties1.height/2) -3
      ,"L", x + 15, (y + deflProperties1.height/2) -3
      ,"L", x + 20, (y + deflProperties1.height/2)
      ,"L", x + 15, (y + deflProperties1.height/2)+3
      ,"L", x + 5, (y + deflProperties1.height/2)+3,"Z"];

  deflPoiniter.attr("d",d.join(" "));

}

function drawMachineBody() {

  x = xStart;

  mbL.attr("x",x);
  mbL.attr("y",yStart);
  mbL.attr("width",mbl.width);
  mbL.attr("height",mbl.height);

  drawDlefMeter(middlePoint(x,x + parseInt(mbL.attr("width")))
                ,middlePoint(yStart,yStart + mbl.height)
                ,deflMeterRadius
              );

  x = xStart + parseInt(mbL.attr("width"));
  mbR.attr("x",x);
  mbR.attr("y",yStart);
  mbR.attr("width",mbr.width);
  mbR.attr("height",mbr.height);

  mSupport.attr("x",x - (support.width - mbr.width) / 2);
  mSupport.attr("y",SVG.height - (support.height + 10))
  mSupport.attr("width",support.width)
  mSupport.attr("height",support.height)
  
  mbRl.attr("x",x);
  mbRl.attr("y",yStart);
  mbRl.attr("width",mbrs.width);
  mbRl.attr("height",mbrs.height);

  x = middlePoint(x,x+parseInt(mbR.attr("width")));
  y = yStart

  d = ["M", x - springProp.xshift, y
      ,"L", x - springProp.xshift, y + 10
      ,"L", x - (springProp.xshift - 10), y + 10
      ,"L", x , y + 20
      ,"L", x + (springProp.xshift - 10), y + 10
      ,"L", x + springProp.xshift, y + 10
      ,"L", x + springProp.xshift, y,"Z"];

  sHolderUp.attr("d",d.join(" "));
  

  drawSpring(
              x,
              y,
            );

  x = parseInt(mbR.attr("x")) + parseInt(mbR.attr("width"));
  mbRr.attr("x",x - mbrs.width);
  mbRr.attr("y",yStart);
  mbRr.attr("width",mbrs.width);
  mbRr.attr("height",mbrs.height);

  DrawDeflMeter1(x - mbrs.width,deflProperties.cy);


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

  deflReading.text(meterReading);
  deflReading.attr('x',cx - 5);
  deflReading.attr('y',cy + (radius - 15));

  deflReadingBorder.attr("x",cx - radius/2);
  deflReadingBorder.attr("y",parseInt(deflReading.attr("y")) - 18);
  deflReadingBorder.attr("width",radius);
  deflReadingBorder.attr("height",radius/3 + 5);

}

const meterReadingShift = 1;

function MeterReadingWhileLoding() {

  deflReading.text(meterReading);
  meterReading += meterReadingShift

  if(readingPos < 5 && meterReading >= 10) {

    readingPos += 5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) - 6);

  } else if(readingPos < 10 && meterReading >= 100 ) {

    readingPos += 5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) - 6);

  }

  drawLine(innerNeedleR,innerNeedleAngle -= meterNeedleShift,deflProperties);
  drawLine(innerNeedleB,innerNeedleAngle,deflProperties);
  
}

function MeterReadingWhileUnLoding() {

  deflReading.text(meterReading);
  meterReading -= meterReadingShift;
  
  if(readingPos > 5 && meterReading <= 9) {

    readingPos -= 5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) + 6);

  } else if(readingPos > 10 && meterReading <= 99) {

    readingPos -= 5;
    deflReading.attr('x',parseInt(deflReading.attr('x')) + 6);

  }

  drawLine(innerNeedleR,innerNeedleAngle += meterNeedleShift,deflProperties);
  drawLine(innerNeedleB,innerNeedleAngle,deflProperties);
}

function expand() {

  springProp.yshift += springShift

  if(meterReading == tv[trail]["tlf"][index]) {

    fillObsTable(index,row);
    index ++;
    row ++;

    if(index >= 5) {

      lodUnLod = 1;
      lodUnLodText.text("Unloading");

      index --; // for contract function use

      Stop();
      EnableButton(unload);
      //console.log(index+"-------"+row);
    }
  }

  drawSpring(springProp.x,springProp.y);
  
  MeterReadingWhileLoding();
  ScaleUp();

}

function contract() {

  springProp.yshift -= springShift

  if(meterReading == tv[trail]["tuf"][index]) {

    //console.log(index+"<-->"+row)
    fillObsTable(index,row);
    index --;
    row --;

    if(index < 0) {

      lodUnLod = 0;
      lodUnLodText.text("Loading");

      Stop();
      EnableButton(next);
      
    }
  } else if(meterReading < 0) {
    stop();
    EnableButton(next);
  }

  drawSpring(springProp.x,springProp.y);

  MeterReadingWhileUnLoding();
  scaleDown();

}

/*function removeSpring(spring) {

  spring.attr("d","");

}

function drawSpringUp(yshift) {

  x = springProp.x;
  y = springProp.y + 20;

  d = ["M",  x, y,
       "L",  x, y + 10];
  y += 10;

  for (var i = 0; i < springProp.length/2; i++) {

      d.push("Q");
      if(i % 2 == 0) d.push(x + springProp.xshift);
      else d.push(x - springProp.xshift);
      y += yshift;
      d.push(y);
      d.push(x);
      y += yshift;
      d.push(y);

  }

  springUp.attr("d",d.join(" "));

}

function drawSpringDown(yshift) {

  x = springProp.x;
  y = springProp.yEnd - 10;

  d = ["M", x, springProp.yEnd
      ,"L", x, y];

  for (var i = 1; i < springProp.length/2+1; i++) {

    d.push("Q");
    if(i % 2 == 0) d.push(x + springProp.xshift);
    else d.push(x - springProp.xshift);
    y -= yshift;
    d.push(y);
    d.push(x);
    y -= yshift;
    d.push(y);

  }

  springDown.attr("d",d.join(" "));

}

function ReplaceSpring() {

  
  drawSpringUp(springProp.yshift);
  drawSpringDown(springProp.yshift);  

  drawSpringUp(5);
  drawSpringDown(5);

  setTimeout(function() {

    drawSpringUp(3);
    drawSpringDown(3);
    
  },100);

  setTimeout(function() {
    
    drawSpringUp(4);
    drawSpringDown(4);

  },200);

}*/

function Load() {

  if(areInstructionsShown) { toogleInstructions(); }

  DisableButton(load);

  index = 0;
  row = 3;

  intervalID = setInterval(function() {

    expand();

  } , 200 );

  play_audio();

}

function UnLoad() {

  if(areInstructionsShown) { toogleInstructions(); }

  DisableButton(unload);

  index = tv[trail]["tuf"].length - 1;
  row = obserTable.rows.length - 1;

  intervalID = setInterval(function() {

    contract();

  } , 200 );

  play_audio();
}


function Stop() {

  clearInterval(intervalID);

  pause_audio();
  
}

function Reset() {
  window.location.reload();
}


tv = [
  
  {

    "material" : "Mild Steel",
    "diameter_wire" : 2.72,
    "diameter_coil" : 19.45,
    "stroke-width" : 4,
    "Spring_xShift" : 35,
    "average":0,

    "dli" : [800,810,822,833,843],
    "dlf" : [810,822,833,843,852],
    "dui" : [810,821,832,842,851],
    "duf" : [800,810,821,832,842],

    "tli" : [0,30,63,105,148],
    "tlf" : [30,63,105,148,170],
    "tui" : [33,64,105,133,170],
    "tuf" : [0,33,64,105,133],

    "mr" : [0.52,0.48,0.55,0.51,0.45]

  },

  {

    "material" : "Mild Steel",
    "diameter_wire" : 2.61,
    "diameter_coil" : 18.70,
    "stroke-width" : 3,
    "Spring_xShift" : 30,
    "average":0,

    "dli" : [800,810,822,833,843],
    "dlf" : [810,822,833,843,852],
    "dui" : [810,821,832,842,851],
    "duf" : [800,810,821,832,842],

    "tli" : [0,35,65,100,140],
    "tlf" : [30,65,100,140,166],
    "tui" : [32,64,102,135,166],
    "tuf" : [0,32,64,102,135],

    "mr" : [0.52,0.50,0.57,0.60,0.53]

  },

  {
    
    "material" : "Mild Steel",
    "diameter_wire" : 2.54,
    "diameter_coil" : 17.89,
    "stroke-width" : 2.5,
    "Spring_xShift" : 25,
    "average":0,

    "dli" : [800,810,822,833,843],
    "dlf" : [810,822,833,843,852],
    "dui" : [810,821,832,842,851],
    "duf" : [800,810,821,832,842],

    "tli" : [0,24,45,58,81],
    "tlf" : [24,45,58,81,105],
    "tui" : [26,42,55,81,105],
    "tuf" : [0,26,45,55,81],

    "mr" : [0.67,0.53,0.32,0.54,0.65]

  }
]

tv.sort((a, b) => 0.5 - Math.random());

var minput = [verifyMR.mr1,verifyMR.mr2,verifyMR.mr3,verifyMR.mr4,verifyMR.mr5];

const pow10 = 5;

function fillObsTable(index,row) {

  if(lodUnLod == 0) {

    obserTable.rows[row].cells[1].innerHTML = tv[trail]["dli"][index];
    obserTable.rows[row].cells[2].innerHTML = tv[trail]["dlf"][index];
    obserTable.rows[row].cells[3].innerHTML = Math.abs(tv[trail]["dlf"][index] - tv[trail]["dli"][index]);

    obserTable.rows[row].cells[7].innerHTML = tv[trail]["tli"][index];
    obserTable.rows[row].cells[8].innerHTML = tv[trail]["tlf"][index];
    obserTable.rows[row].cells[9].innerHTML = Math.abs(tv[trail]["tlf"][index] - tv[trail]["tli"][index]);

  } else {

    obserTable.rows[row].cells[4].innerHTML = tv[trail]["dui"][index];
    obserTable.rows[row].cells[5].innerHTML = tv[trail]["duf"][index];
    obserTable.rows[row].cells[6].innerHTML = Math.abs(tv[trail]["dui"][index] - tv[trail]["duf"][index]);
  
    obserTable.rows[row].cells[10].innerHTML = tv[trail]["tui"][index];
    obserTable.rows[row].cells[11].innerHTML = tv[trail]["tuf"][index];
    obserTable.rows[row].cells[12].innerHTML = Math.abs(tv[trail]["tui"][index] - tv[trail]["tuf"][index]);

  }

  //obserTable.rows[row].cells[13].innerHTML = "" + mr[index] + " x 10<sup>3</sup>";

}

function clearObsTable() {

  let m = obserTable.rows.length;
  let n = obserTable.rows[3].cells.length;

  for(let i = 3;i < m;i++) {
    for(let j = 1;j < n;j++) {
      obserTable.rows[i].cells[j].innerHTML = "";
    }
  }

}

function calculateAverage() {

  showResults();

}

function showResults() {

    let av,rs;
    let avgMr = 0;
    let space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    av = space + "Average Rigidity Modulus <br>" + "= ( ";
    avgMr += mr[0];
    av += "" + mr[0] + " x 10<sup>"+pow10+"</sup>"
    for(let i=1; i < mr.length; i ++) {
      avgMr += mr[i];
      av += " + " + mr[i] + " x 10<sup>"+pow10+"</sup>"
    }
    avgMr /= mr.length;
    av += ") / "+mr.length;
    av += "<br>"+ space + " = " + avgMr.toFixed(2) + " x 10<sup>"+pow10+"</sup> &nbsp;";

    average.html(av);

    rs = space + "<h3><u>Result :- </u></h3>"+
        space + "The Modulus of Rigidity of the given Spring &nbsp;<u>"+
        avgMr.toFixed(2) + " x 10 </u> <sup>"+pow10+"</sup>&nbsp;<i>(N/mm<sup>2</sup>)</i>";

    result.html(rs);

}

function clearResults() {
  average.text("");
  result.text("");
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

  clearFormula();
  showSpringDetails();

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

var measuredVal = [];

function showResultTable() {

  for (var i = 0; i < minput.length; i++) {

    if(minput[i].value == "") {
      measuredVal.push(0);
    } else {
      measuredVal.push(parseFloat(minput[i].value))
    }

  }
  
  let average = 0;

  for (var i = 0; i < tv[trail]["mr"].length; i++) {

      average += tv[trail]["mr"][i];

      resultTable.rows[2 + i].cells[1].innerHTML = tv[trail]["mr"][i] + " x 10<sup>"+pow10+"</sup>";
      resultTable.rows[2 + i].cells[2].innerHTML = minput[i].value + " x 10<sup>"+pow10+"</sup>";
      resultTable.rows[2 + i].cells[3].innerHTML = percentageError(measuredVal[i],tv[trail]["mr"][i]);
    
  }

  average /= tv[trail]["mr"].length;
  tv[trail]["average"] = average;
  resultTable.rows[ resultTable.rows.length - 1 ].cells[0].innerHTML = "Average = " + average.toFixed(2) + " x 10 </u> <sup>"+pow10+"</sup>&nbsp;<i>(N/mm<sup>2</sup>)</i>";

  ObsTabDiv.css("display","none");
  VerifyDiv.css("display","none");
  ResultDiv.css("display","block");
  showdata.css("display","block");

  Next("Next","setNextTrail()");
  isVerified = true;

  showFormula();

}

function percentageError(measured,actual) {

  let m1 = (Math.abs(measured - actual) / actual).toFixed(3);

  return (parseFloat(m1) * 100).toFixed(2);
}

function showFormula() {

  let image = new Image(height=200);
  image.src = "../images/d.png";
  image.alt = "Modulus of Rigidity Formula";

  image.style.margin = "10px 0px 0px 50px";

  clearFormula();
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

const showSpringDetails = () => {

  let details = "";
  let space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

  details = space + "<b><u>Spring Details : -</u></b><br>" + 
            space + space + " Spring Material  is  " + tv[trail]["material"] + " <br>" +
            space + space + " Diameter of Spring Wire = " + tv[trail]["diameter_wire"] + " <i>mm</i><br>" +
            space + space + " Diameter of Spring Coil = " + tv[trail]["diameter_coil"] + " <i>mm</i>";
  
  result.html(details);

}

const clearSpringDetails = () => {
  result.html("");
}

const setNextTrail = () => {

  DisableButton(next);

  trail ++;

  if(trail < 3) {

    showData();
    clearObsTable();

    drawMainScene();
  
    return;
  }

  showFinalResult();
 
}

const showFinalResult = () => {

  DisableButton(instructions);
  DisableButton(showdata);

  ObsTabDiv.css("display","none");
  VerifyDiv.css("display","none");
  ResultDiv.css("display","none");
  FinalResultsDiv.css("display","block");

  for(let i = 0; i < finalResultsTable.rows.length - 1; i ++) {
    finalResultsTable.rows[1 + i].cells[1].innerHTML = tv[i]["average"].toFixed(2) + " x 10<sup>"+pow10+"</sup>";
  }

  let results = "";
  let avg = (tv[0]["average"]+tv[1]["average"]+tv[2]["average"]) / 3;

  let space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  results = space + "<h3><u>Final Result :-</u></h3>" + 
            "<p>"+space + "The Average Modulus of Rigidity of the given Spring <br>"+
            space + space + " = ( " + tv[0]["average"].toFixed(2) + " + " + tv[1]["average"].toFixed(2) + " + " + tv[2]["average"].toFixed(2) + " ) x 10 </u> <sup>"+pow10+"</sup> / 3<br>" +
            space + space + " = <u>" + avg.toFixed(2) + " x 10 </u> <sup>"+pow10+"</sup>&nbsp;<i>(N/mm<sup>2</sup>)</i></p>";

  finalResult.html(results);

}

