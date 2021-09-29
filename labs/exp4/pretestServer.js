const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "Maxwell Reciprocal theorem is applicable for :",
    "options": ["Simply supported beam", 
               "Cantilever Beam", 
               "Fixed beam", 
               "Propped Cantilever beam"],
    "correct_answer": "Simply supported beam",
  },
  {
    "question": "Displacements from the initial axes are called as",
    "options": ["Bending deflections", 
                "flexural deflection", 
                "Both A & B", 
                "None of the Above"],
    "correct_answer": "Both A & B",
  },
  {
    "question": "Choose the valid relation between load and deflections",
    "options": ["P<sub>1</sub>&delta;<sub>11</sub>=P<sub>2</sub>&delta;<sub>22</sub>", 
                "P<sub>2</sub>&delta;<sub>11</sub>=P<sub>1</sub>&delta;<sub>22</sub>", 
                "P<sub>1</sub>&delta;<sub>12</sub>=P<sub>2</sub>&delta;<sub>21</sub>", 
                "P<sub>2</sub>&delta;<sub>12</sub>=P<sub>1</sub>&delta;<sub>21</sub>"],
    "correct_answer": "P<sub>1</sub>&delta;<sub>12</sub>=P<sub>2</sub>&delta;<sub>21</sub>",
  },
  {
    "question": "Length of the beam and the modulus of elasticity are related as",
    "options": ["inversely proportional", 
                "directly proportional", 
                "no proportionality", 
                "Can not be determined"],
    "correct_answer": "directly proportional",
  },
  {
    "question": "Deflections of the beam is denoted by",
    "options": ["s", 
                "&delta;", 
                "&Delta;", 
                "8"],
    "correct_answer": "&delta;",
  },
  
];

const no_of_questions = questions.length;
var qset;
var temp;
var optionsIndex = -1;
var key = [];
var marks = 0;


function loadQuestionPaper() {

  qset = new Set();

  quizpage.style.display = "block";
  resultpage.style.display = "none";

  while(qset.size < no_of_questions) {
    qset.add(Math.floor(Math.random()*questionBank.length));
  }             //to get different random numbers;

  temp = qset.values();
  optionsIndex = -1;

  for(let i = 0; i < no_of_questions; i ++) {

    let qbank = questionBank[temp.next().value];

    questions[i].innerHTML = (i+1)+")"+qbank["question"]; //question

    key[i] = qbank["correct_answer"]; //key for valuation

    for(let j = 0; j < 4; j ++) {

      let index = ++ optionsIndex;
      options[index].innerHTML = qbank["options"][j]; //options
      radio[index].value = qbank["options"][j];  //values for radio buttons
      radio[index].checked = false;

    }
  }

}

function validatePreTeste() {

  marks = 0;
  let answers = [document.pretest.q1.value,
            document.pretest.q2.value,
            document.pretest.q3.value,
            document.pretest.q4.value,
            document.pretest.q5.value];
  
  for (let index = 0; index < key.length; index++) {
    if(answers[index] == key[index]) {
      marks ++;
    }
    
  }

  quizpage.style.display = "none";
  resultpage.style.display = "block";

  result.innerHTML = "Your Result is " + marks + "/"+no_of_questions+".";
  
}

