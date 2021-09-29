const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "Concrete is _______ in Compression",
    "options": ["Weak", 
               "Strong", 
               "Nuetral", 
               "Flexible"],
    "correct_answer": "Strong",
  },
  {
    "question": "Steel is ______ in compression",
    "options": ["Weak", 
               "Strong", 
               "Nuetral", 
               "Flexible"],
    "correct_answer": "Weak",
  },
  {
    "question": "The dimensions of a concrete block in mm:",
    "options": ["150 * 150 * 150", 
                "100 * 100 * 100", 
                "50 * 50 * 50", 
                "200 * 200 * 200"],
    "correct_answer": "150 * 150 * 150",
  },
  {
    "question": "In Compression Testing Machine, load is applied using:",
    "options": ["Box Loading", 
                "Hydraulic Loading", 
                "Shear loading", 
                "Tensile Loading"],
    "correct_answer": "Hydraulic Loading",
  },
  {
    "question": "The concrete cube is cured in water for ______ days , before testing",
    "options": ["20 days", 
                "14 days", 
                "30 days", 
                "28 days"],
    "correct_answer": "28 days",
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

