const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "Deflection in a simply supported beam can be measured using:",
    "options": ["Deflectometer", 
               "Accelerometer", 
               "Stop watch", 
               "Weighing balance"],
    "correct_answer": "Deflectometer",
  },
  {
    "question": "The Slope of simply supported beam at centre will be :",
    "options": ["One", 
                "Zero", 
                "Infinity", 
                "None"],
    "correct_answer": "Zero",
  },
  {
    "question": "A simply supported beam consists of :",
    "options": ["Two fixed supports", 
                "Two hinged supports", 
                "One fixed support and a free end", 
                "None of the Above"],
    "correct_answer": "Two hinged supports",
  },
  {
    "question": "Young’s Modulus is given as :",
    "options": ["Stress/strain", 
                "Load/area", 
                "Mass/volume", 
                "None"],
    "correct_answer": "Stress/strain",
  },
  {
    "question": "Position of the pan in set-up is :",
    "options": ["Near the first Beam", 
                "Near the second Beam", 
                "Equidistance from both Beams", 
                "Either A or B"],
    "correct_answer": "Equidistance from both Beams",
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

