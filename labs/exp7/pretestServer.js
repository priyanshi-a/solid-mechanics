const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "The point where specimen shape starts changing is known as :",
    "options": ["Elastic limit", 
               "Proportional limit", 
               "Yeild Stress point", 
               "Ultimate Stress point"],
    "correct_answer": "Proportional limit",
  },
  {
    "question": "The point where specimen shape is permanentally is known as :",
    "options": ["Elastic limit", 
               "Proportional limit", 
               "Yeild Stress point", 
               "Ultimate Stress point"],
    "correct_answer": "Elastic limit",
  },
  {
    "question": "The type of Bending test we are using is :",
    "options": ["Two point bending test", 
                "Three point bending test", 
                "Four point bending test", 
                "Five point bending test"],
    "correct_answer": "Three point bending test",
  },
  {
    "question": "Load is applied at :",
    "options": ["Edges of the specimen", 
                "Center of specimen", 
                "1/3<sup>rd</sup> length of specimen", 
                "1/4<sup>th</sup> length of specimen"],
    "correct_answer": "1/3<sup>rd</sup> length of specimen",
  },
  {
    "question": "Modulus of elasticity is given by :",
    "options": ["Stress / Strain", 
                "Strain / Stress", 
                "Stress X Strain", 
                "None of the above"],
    "correct_answer": "Stress / Strain",
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

