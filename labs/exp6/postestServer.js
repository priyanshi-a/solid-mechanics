const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "Slope is given by:",
    "options": ["sin&theta;", 
               "tan&theta;", 
               "cot&theta;", 
               "cos&theta;"],
    "correct_answer": "tan&theta;",
  },
  {
    "question": "Units of rigidity modulus is:",
    "options": ["N", 
                "Kg", 
                "N/mm<sup>2</sup>", 
                "m/s<sup>2</sup>"],
    "correct_answer": "N/mm<sup>2</sup>",
  },
  {
    "question": "Polar moment of inertia of the rod is given as J =",
    "options": ["<img src=\"images/1a.png\">", 
                "<img src=\"images/1b.png\">", 
                "<img src=\"images/1c.png\">", 
                "<img src=\"images/1d.png\">"],
    "correct_answer": "<img src=\"images/1b.png\">",
  },
  {
    "question": "Shear stress is given by :",
    "options": ["<img src=\"images/2a.png\">", 
                "<img src=\"images/2b.png\">", 
                "<img src=\"images/2c.png\">", 
                "None"],
    "correct_answer": "<img src=\"images/2a.png\">",
  },
  {
    "question": "Rigidity modulus is given by:",
    "options": ["<img src=\"images/3a.png\">", 
                "<img src=\"images/3b.png\">", 
                "<img src=\"images/3c.png\">", 
                "<img src=\"images/3d.png\">"],
    "correct_answer": "<img src=\"images/3b.png\">",
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

