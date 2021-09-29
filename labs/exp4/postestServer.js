const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "When load is applied at centre, deflections are observed at :",
    "options": ["Center", 
               "Far End", 
               "1/4<sup>th</sup> of the span", 
               "1/3<sup>rd</sup> of the span"],
    "correct_answer": "1/4<sup>th</sup> of the span",
  },
  {
    "question": "When the load is applied at 1/4<sup>th</sup> of the span, deflections are observed at",
    "options": ["Center", 
                "1/4<sup>th</sup> of the span", 
                "1/3<sup>rd</sup> of the span", 
                "End of the span"],
    "correct_answer": "Center",
  },
  {
    "question": "Units for deflection are :",
    "options": ["Millimetre", 
                "Grams", 
                "Newton", 
                "Seconds"],
    "correct_answer": "Millimetre",
  },
  {
    "question": "Least count of deflectometer is",
    "options": ["0.01mm", 
                "0.02mm", 
                "0.1mm", 
                "0.2mm"],
    "correct_answer": "0.02mm",
  },
  {
    "question": "Law of reciprocal deflection was given by",
    "options": ["E bette", 
                "James clerk Maxwell", 
                "Newton", 
                "Einstein"],
    "correct_answer": "James clerk Maxwell",
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

