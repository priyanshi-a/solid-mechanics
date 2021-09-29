const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "The units of strain is:",
    "options": ["N/mm<sup>2</sup>", 
               "Kg", 
               "N", 
               "No units"],
    "correct_answer": "No units",
  },
  {
    "question": "Units of stress is:",
    "options": ["N/m<sup>2</sup>", 
                "KN", 
                "m/s<sup>2</sup>", 
                "No units"],
    "correct_answer": "N/m<sup>2</sup>",
  },
  {
    "question": "Bending Stress of the cantilever beam is given by:",
    "options": ["<i>f = M/Iy</i>", 
                "<i>f = y/I</i>", 
                "<i>f = My/I</i>", 
                "<i>f = My/Il</i>"],
    "correct_answer": "<i>f = My/I</i>",
  },
  {
    "question": "The deflection of the cantilever beam at free end will be:",
    "options": ["<img src=\"images/1a.png\">", 
                "<img src=\"images/1b.png\">", 
                "<img src=\"images/1c.png\">", 
                "<img src=\"images/1d.png\">"],
    "correct_answer": "<img src=\"images/1a.png\">",
  },
  {
    "question": "Young’s modulus of a cantilever beam is given by:",
    "options": ["<img src=\"images/2a.png\">", 
                "<img src=\"images/2b.png\">", 
                "<img src=\"images/2c.png\">", 
                "<img src=\"images/2d.png\">"],
    "correct_answer": "<img src=\"images/2c.png\">",
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

