const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "The maximum deflection of a simply supported beam is observed at :",
    "options": ["Center", 
               "End of the span", 
               "1/4<sup>th</sup> of the span", 
               "None"],
    "correct_answer": "Center",
  },
  {
    "question": "Deflection of the simply supported beam at center is:",
    "options": ["0", 
                "WL<sup>3</sup>/48EI", 
                "1", 
                "WL<sup>3</sup>/8EI"],
    "correct_answer": "WL<sup>3</sup>/48EI",
  },
  {
    "question": "The units for Young’s Modulus is :",
    "options": ["No units", 
                "KN", 
                "M", 
                "N/m<sup>2</sup>"],
    "correct_answer": "N/m<sup>2</sup>",
  },
  {
    "question": "Deflection of the simply supported beam at supports is:",
    "options": ["0", 
                "WL<sup>3</sup>/48EI", 
                "1", 
                "WL<sup>3</sup>/8EI"],
    "correct_answer": "0",
  },
  {
    "question": "Moment of inertia of the beam is given by:",
    "options": ["bt<sup>3</sup>/12", 
                "bt<sup>2</sup>/6", 
                "bt<sup>2</sup>/12", 
                "bt<sup>3</sup>/6"],
    "correct_answer": "bt<sup>3</sup>/12",
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

