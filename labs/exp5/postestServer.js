const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "Crushing load is denoted by :",
    "options": ["P<sub>c</sub>", 
               "&sigma;<sub>c</sub>", 
               "A", 
               "H"],
    "correct_answer": "P<sub>c</sub>",
  },
  {
    "question": "Ultimate crushing stress is denoted by :",
    "options": ["P<sub>c</sub>", 
               "&sigma;<sub>c</sub>", 
               "A", 
               "H"],
    "correct_answer": "&sigma;<sub>c</sub>",
  },
  {
    "question": "Ultimate crushing stress is given by &sigma;<sub>c</sub> =",
    "options": ["P<sub>c</sub>/A", 
                "P<sub>c</sub>", 
                "0", 
                "1"],
    "correct_answer": "P<sub>c</sub>/A",
  },
  {
    "question": "Units for Ultimate crushing stress is:",
    "options": ["M", 
                "N", 
                "Kg", 
                "N/mm<sup>2</sup>"],
    "correct_answer": "N/mm<sup>2</sup>",
  },
  {
    "question": "In CTM (Compression Testing Machine), upper plate is",
    "options": ["Fixed", 
                "Movable", 
                "Both", 
                "None"],
    "correct_answer": "Fixed",
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

