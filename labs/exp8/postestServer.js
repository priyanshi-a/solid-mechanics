const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "After the completion of experiment, the specimen is divided into ____ parts",
    "options": ["5", 
                "4",
                "3", 
                "2"],
    "correct_answer": "3",
  },
  {
    "question": "During the experiment, when maximum load is applied. The specimen",
    "options": ["Bends", 
                "Twists",
                "Breaks",
                "Remains same"],
    "correct_answer": "Breaks",
  },
  {
    "question": "Ultimate shear stress is given by ",
    "options": ["Ultimate load / original area",
                "stress / strain", 
                "Ultimate stress / load",
                "ultimate strain / original area"],
    "correct_answer": "Ultimate load / original area",
  },
  {
    "question": "Average Diameter of the rod is :",
    "options": ["5mm", 
                "6mm", 
                "7mm", 
                "8mm"],
    "correct_answer": "6mm",
  },
  {
    "question": "Area of cross section of the rod :",
    "options": ["9&pi;", 
                "54&pi;", 
                "108&pi;", 
                "18&pi;"],
    "correct_answer": "9&pi;",
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

