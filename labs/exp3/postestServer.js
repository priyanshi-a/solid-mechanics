const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  
  {
    "question": "The graph is drawn between ",
    "options": ["Stress Vs Strain", 
                "Force Vs Deflection",
                "Stress Vs Deflection", 
                "Force Vs Strain"],
    "correct_answer": "Force Vs Deflection",
  },
  {
    "question": "Mean diameter of the spring is given by",
    "options": ["D<sub>m</sub> = D - d", 
                "D<sub>m</sub> = d - D",
                "D<sub>m</sub> = D - t",
                "D<sub>m</sub> = 0"],
    "correct_answer": "D<sub>m</sub> = D - d",
  },
  {
    "question": "Stiffness of spring is given by",
    "options": ["k = f/&delta;",
                "k = &delta;/f", 
                "k = 0",
                "k = 1"],
    "correct_answer": "k = f/&delta;",
  },
  {
    "question": "Spring index will be given by",
    "options": ["D<sub>m</sub>/D", 
                "D<sub>m</sub>", 
                "D", 
                "D/D<sub>m</sub>"],
    "correct_answer": "D<sub>m</sub>/D",
  },
  {
    "question": "Modulus of rigidity of a spring can be determined using",
    "options": ["<img src=\"images/a.png\">", 
                "<img src=\"images/b.png\">", 
                "<img src=\"images/c.png\">", 
                "<img src=\"images/d.png\">"],
    "correct_answer": "<img src=\"images/d.png\">",
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

