const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "A cantilever beam has:",
    "options": ["Both ends fixed", 
               "Both ends hinged", 
               "One end is fixed and other end is free", 
               "One end is fixed and other end is hinged"],
    "correct_answer": "One end is fixed and other end is free",
  },
  {
    "question": "For a simply supported beam, the load is applied at:",
    "options": ["Center", 
                "At fixed end", 
                "At free end", 
                "At 1/4th of the span"],
    "correct_answer": "At free end",
  },
  {
    "question": "The slope of the cantilever beam will be minimum at:",
    "options": ["Fixed end", 
                "Free end", 
                "center", 
                "No where"],
    "correct_answer": "Fixed end",
  },
  {
    "question": "The deflection of the cantilever beam at free end will be:",
    "options": ["0", 
                "maximum", 
                "1", 
                "minimum"],
    "correct_answer": "maximum",
  },
  {
    "question": "Thickness of the beam can be calculated using:",
    "options": ["Screw gauge", 
                "Vernier callipers", 
                "Scale", 
                "Compass"],
    "correct_answer": "Vernier callipers",
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

