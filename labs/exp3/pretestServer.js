const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "Equipment used for measuring the modulus of rigidity of spring is :",
    "options": ["Spring Testing Machine", 
               "Universal Testing Machine", 
               "Compression Testing machine", 
               "All the above"],
    "correct_answer": "Spring Testing Machine",
  },
  {
    "question": "The spring used in spring testing is made of:",
    "options": ["Steel", 
                "Rubber", 
                "Copper", 
                "Iron"],
    "correct_answer": "Steel",
  },
  {
    "question": "Modulus of rigidity is also known as :",
    "options": ["Shear modulus", 
                "Young’s modulus", 
                "Spring stiffness", 
                "Lateral stiffness"],
    "correct_answer": "Shear modulus",
  },
  {
    "question": "Modulus of rigidity is defined as the ratio of:",
    "options": ["Lateral stress and strain", 
                "Shear stress and strain", 
                "Volumetric stress and strain", 
                "Longitudinal stress and strain"],
    "correct_answer": "Shear stress and strain",
  },
  {
    "question": "Length of spring is measured using :",
    "options": ["Scale", 
                "Vernier callipers", 
                "Screw gauge", 
                "Both A and B"],
    "correct_answer": "Both A and B",
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

