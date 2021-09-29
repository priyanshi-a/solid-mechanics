const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "Torsion means :",
    "options": ["Twisting force", 
               "Tensile force", 
               "Compressive force", 
               "Elastic force"],
    "correct_answer": "Twisting force",
  },
  {
    "question": "RCC means :",
    "options": ["Road cement and concrete", 
                "Rod concrete and core", 
                "Reinforced cement concrete", 
                "Reinforced concrete cement"],
    "correct_answer": "Reinforced cement concrete",
  },
  {
    "question": "Units of torque:",
    "options": ["Kg/m<sup>2</sup>", 
                "N-m", 
                "N", 
                "N/m<sup>2</sup>"],
    "correct_answer": "N-m",
  },
  {
    "question": "Shear stress is denoted by:",
    "options": ["S", 
                "&delta;", 
                "&sigma;", 
                "&#120591;"],
    "correct_answer": "&#120591;",
  },
  {
    "question": "Units for twist is:",
    "options": ["Degrees", 
                "Radians", 
                "Newton", 
                "meters"],
    "correct_answer": "Radians",
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

