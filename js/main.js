const btnAdd = document.getElementById("btn-add");
const btnEdit = document.getElementById("btn-edit");
const btnDelete = document.getElementById("btn-delete");
const btnSave = document.getElementById("btn-save");

const studentsData = document.getElementById("students-data");
const studentsForm = document.getElementById("student-form");

const inputSearch = document.getElementById("search");
const inputFilter = document.getElementById("filter");
// ///
const inputTypeFilter = document.getElementById("typeFilter");
const inputIssMarried = document.getElementById("issMarried");
// ///
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
// ////
const inputAddress = document.getElementById("address");
const inputBirthDate = document.getElementById("birthDate");
// /////
const inputPosition = document.getElementById("position");
const inputTypePosition = document.getElementById("typePosition");
// ......
const searchInput = document.getElementById("search-input");
// ////
const inputSalary = document.getElementById("salary");
// ////
const inputIsMarried = document.getElementById("isMarried");

let students = JSON.parse(localStorage.getItem("students")) || [];
let studentToEdit = null;

function saveStudent() {
  students = JSON.parse(localStorage.getItem("students")) || [];
  let newStudents;
  let newStudent;
  if (studentToEdit) {
    newStudent = {
      id: studentToEdit.id,
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      birthDate: inputBirthDate.value,
      position: inputPosition.value,
      typePosition: inputTypePosition.value,
      salary: inputSalary.value,
      isMarried: inputIsMarried.checked,
    };
    newStudents = students.map((student) =>
      student.id !== studentToEdit.id ? student : newStudent
    );
  } else {
    newStudent = {
      id: Math.floor(Math.random() * 100000),
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      birthDate: inputBirthDate.value,
      position: inputPosition.value,
      typePosition: inputTypePosition.value,
      salary: inputSalary.value,
      isMarried: inputIsMarried.checked,
    };
    newStudents = [...students, newStudent];
  }
  localStorage.setItem("students", JSON.stringify(newStudents));
  displayStudents(newStudents);
  studentsForm.reset();
  studentToEdit = null;
}

function deleteStudent(id) {
  students = JSON.parse(localStorage.getItem("students")) || [];
  if (window.confirm("Are you sure you want to delete this student?")) {
    let filteredStudents = students.filter((student) => student.id !== id);
    localStorage.setItem("students", JSON.stringify(filteredStudents));
    displayStudents(filteredStudents);
    students = JSON.parse(localStorage.getItem("students"));
  }
}

function editStudent(id) {
  let student = students.find((student) => student.id === id);
  studentToEdit = { ...student };
  inputFirstName.value = studentToEdit.firstName;
  inputLastName.value = studentToEdit.lastName;
  inputAddress.value = studentToEdit.address;
  inputBirthDate.value = studentToEdit.birthDate;
  inputPosition.value = studentToEdit.position;
  inputTypePosition.value = studentToEdit.typePosition;
  inputSalary.value = studentToEdit.salary;
  inputIsMarried.checked = studentToEdit.isMarried;
}

btnSave.addEventListener("click", saveStudent);

inputFilter.addEventListener("change", function (e) {
  students = JSON.parse(localStorage.getItem("students")) || [];
  let val = e.target.value;
  let filteredNewStudents =
    val === "position"
      ? students
      : students.filter((student) => student.position === val);
  displayStudents(filteredNewStudents);
});

inputTypeFilter.addEventListener("change", function (e) {
  students = JSON.parse(localStorage.getItem("students")) || [];
  let val = e.target.value;
  let filteredNewStudent =
    val === "typePosition"
      ? students
      : students.filter((student) => student.typePosition === val);
  displayStudents(filteredNewStudent);
});

inputIssMarried.addEventListener("change", function (e) {
  students = JSON.parse(localStorage.getItem("students")) || [];
  let val = e.target.value;
  let filteredNewStudents =
    val === "issMarried"
      ? students
      : students.filter((student) => student.isMarried === val);
  displayStudents(filteredNewStudents);
});

function displayStudents(students) {
  let str = "";
  students.map((student, index) => {
    str += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.address}</td>
      <td>${student.birthDate}</td>
      <td>${student.position}</td>
      <td>${student.typePosition}</td>
      <td>${student.salary}</td>
      <td>${student.isMarried ? "Yes" : "No"}</td>
      <td>
        <button id="btn-edit" class="btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick="editStudent(${
          student.id
        })">Edit</button>
        <button id="btn-delete" class="btn btn-danger" onclick="deleteStudent(${
          student.id
        })">Delete</button>
      </td>
    </tr>
    `;
  });
  studentsData.innerHTML = str;
}

displayStudents(students);

// function displaySearchedProducts(query) {
//   const filteredProducts = students.filter(
//     (p) =>
//       p.firstName.toLowerCase().includes(query.toLowerCase()) ||
//       p.lastName.toLowerCase().includes(query.toLowerCase())
//   );
//   displayStudents(filteredProducts);
// }

// searchInput.addEventListener("keyup", function (e) {
//   displaySearchedProducts(e.target.value);
// });
