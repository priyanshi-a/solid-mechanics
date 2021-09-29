const quizpage = document.getElementById("quizpage");
const resultpage = document.getElementById("resultpage");
const result = document.getElementById("result");

const questions = document.getElementsByClassName("question");
const options = document.getElementsByClassName("option");
const radio = document.getElementsByClassName("radio");

const questionBank = [
  {
    "question": "The machine used for shear test is :",
    "options": ["Universal Testing machine", 
               "Spring testing machine", 
               "Compression Testing machine", 
               "Hardness testing machine"],
    "correct_answer": "Universal Testing machine",
  },
  {
    "question": "Type of shear we use in the experiment is :",
    "options": ["Single shear", 
                "Double shear", 
                "Multiple shear", 
                "None of the above"],
    "correct_answer": "Double shear",
  },
  {
    "question": "Specimen we use in the test is  :",
    "options": ["Wood", 
                "RCC bars", 
                "HYSD bars", 
                "Copper"],
    "correct_answer": "HYSD bars",
  },
  {
    "question": "HYSD bars means :",
    "options": ["High Yielding Strength Deformed bars", 
                "High Yielding Strain Deforming bars", 
                "High Yielding Stress Deforming bars", 
                "High Yielding Strength Deflective bars"],
    "correct_answer": "High Yielding Strain Deforming bars",
  },
  {
    "question": ". Shear force is ",
    "options": ["Vertical force", 
                "Horizontal force", 
                "Longitudinal force", 
                "Force acting perpendicular to the longitudinal axis"],
    "correct_answer": "Force acting perpendicular to the longitudinal axis",
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

