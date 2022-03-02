   let students = []
  
    fetch("http://127.0.0.1:8000/students")
  .then((res) => res.json())
     .then(function (result) {
    console.log('Result', result.length)
    for (let i = 0; i < result.length; i++) {
      students.push(result[i])
    }
        })
window.onload = function initializePage() {

  populateStudents();

  let items = document.querySelectorAll("input");
  let submitButton = document.querySelector("#btnSubmit");

  // add an event listener to all of the text fields
  for(let i = 0; i< items.length - 1; i++){
      items[i].addEventListener("input", checkTextField);
  }
  // add an event listener to the submit submitButton
  submitButton.addEventListener("click", processForm);
};

function retrieveStudentData(){
   
}

function processStudentData(){

}

// check if the text entered in the text field is valid
function checkTextField(event){
  let element = event.target;
  let items = document.querySelectorAll("input");

  if(element.id == "studentID" || element.id == "aGrade" || element.id == "tGrade" || element.id == "eGrade"){
    if(isNaN(element.value)){
      element.classList.add("error");
      element.classList.remove("valid");
    }
    else{
      element.classList.add("valid");
      element.classList.remove("error");
    }
  }

  // check if all the fields are filled
  let numFilled = 0;

  for(let i = 0; i< items.length-1; i++){
    if(items[i].value.length > 0 && !items[i].classList.contains("error")){
      numFilled++;
    }
  }
  if(numFilled == 6){
    document.querySelector("#btnSubmit").disabled = false;
  }
  else{
    document.querySelector("#btnSubmit").disabled = true;
  }

}
// process the submission of a form -- add a new row to the table
function processForm(event){
  // event.preventDefault(); // prevent default action of the submit button, which is to execute the value in the action field of the form
  let table = document.querySelector("table");
  let row = document.createElement("tr");
  let items = document.querySelectorAll("input");

  let newStudent = {
		fname: "",
		lname: "",
		snum: "",
		agrade: 0,
		tgrade: 0,
		egrade: 0
	};

  for(let i = 0; i< items.length-1; i++){
    let cell = document.createElement("td");
    cell.textContent = items[i].value;
    row.appendChild(cell);

    newStudent[i] = items[i].value;
  }
  students.push(newStudent);
  table.appendChild(row);
}

// populate the table with student data from students.js file. We're reading information
// from an on object and using that to populate the table
function populateStudents() {
  let table = document.querySelector("table");
  // let students = []
  
  //   fetch("http://127.0.0.1:8000/students")
  // .then((res) => res.json())
  //    .then(function (result) {
  //   console.log('Result', result.length)
  //   for (let i = 0; i < result.length; i++) {
  //     students.push(result[i])
  //   }
         for(let student of students){
    // save the information for the current in variables
    let studentID = student.snum;
    let firstName = student.fname;
    let lastName = student.lname;
    let assignmentGrade = student.agrade;
    let tutorialGrade = student.tgrade;
    let examGrade = student.egrade;

    // time to create a new HTML element!
    // 1). we first need to create a new row
    let row = document.createElement("tr");
           row.addEventListener('click', () => {
             document.getElementById('studentID').value = studentID
             document.getElementById('fname').value = firstName
             document.getElementById('lname').value = lastName
             document.getElementById('aGrade').value = assignmentGrade
             document.getElementById('tGrade').value = tutorialGrade
             document.getElementById('eGrade').value = examGrade
           });
    // create a cell for the student ID, update its text value, and append it to the row
    let iDCell = document.createElement("td");
    iDCell.textContent = studentID;
    iDCell.id = studentID;
    
    row.appendChild(iDCell);

    // create a cell for the first name, update its text value, and append it to the row
    let fNameCell = document.createElement("td");
    fNameCell.textContent = firstName;
    row.appendChild(fNameCell);

    // create a cell for the last name, update its text value, and append it to the row
    let lNameCell = document.createElement("td");
    lNameCell.textContent = lastName;
    row.appendChild(lNameCell);

    // create a cell for the assignment grade, update its text value, and append it to the row
    let aGradeCell = document.createElement("td");
    aGradeCell.textContent = assignmentGrade.toFixed(2);
    row.appendChild(aGradeCell);

    // create a cell for the tutorial grade, update its text value, and append it to the row
    let tGradeCell = document.createElement("td");
    tGradeCell.textContent = tutorialGrade.toFixed(2);
    row.appendChild(tGradeCell);

    // create a cell for the exam grade, update its text value, and append it to the row
    let eGradeCell = document.createElement("td");
    eGradeCell.textContent = examGrade.toFixed(2);
    row.appendChild(eGradeCell);

    // append the row to the table
    table.appendChild(row);
         }
   
  // })



}
