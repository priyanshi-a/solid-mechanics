const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  
  {
    "question": "Slope of Load Vs Deformation graph is : ",
    "options": ["1", 
                "greater than 1",
                "less than 1", 
                "Lies in between 0 and 1"],
    "correct_answer": "greater than 1",
  },
  {
    "question": "How many dail indicators did we use : ",
    "options": ["1", 
                "2",
                "3",
                "4"],
    "correct_answer": "3",
  },
  {
    "question": "Units of Modulus of Elasticity/Young's modulus are:",
    "options": ["N-m",
                "N-m<sup>2</sup>", 
                "N/m",
                "N/m<sup>2</sup>"],
    "correct_answer": "N/m<sup>2</sup>",
  },
  {
    "question": "Which dail indicator shows the maximum reading in the end :",
    "options": ["Left indicator", 
                "Indicator at mid span", 
                "Right indicator", 
                "All show the same"],
    "correct_answer": "Indicator at mid span",
  },
  {
    "question": "What happens to the shape of specimen after completion of experiment?",
    "options": ["Temporarily changed", 
                "Permanently changed", 
                "Depends on type of specimen", 
                "specimen damaged/broke"],
    "correct_answer": "Permanently changed",
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

