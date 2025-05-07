const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));
function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("Please enter a valid email id!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const today = new Date();
const maxDate = new Date();
const minDate = new Date();
maxDate.setFullYear(today.getFullYear() - 18);
let max = maxDate.toISOString().split("T")[0];
minDate.setFullYear(today.getFullYear() - 56);
minDate.setDate(minDate.getDate() + 1);
let min = minDate.toISOString().split("T")[0];
const dob = document.getElementById("dob");
dob.setAttribute("max", max);
dob.setAttribute("min", min);

const userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries
    .map((entry) => {
      const name = `<td class="border px-4 py-2">${entry.name}</td>`;
      const email = `<td class="border px-4 py-2">${entry.email}</td>`;
      const password = `<td class="border px-4 py-2">${entry.password}</td>`;
      const dob = `<td class="border px-4 py-2">${entry.dob}</td>`;
      const acceptTerms = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full"<tr>
    <th class="border px-4 py-2">Name</th>
    <th class="border px-4 py-2">Email</th>
    <th class="border px-4 py-2">Password</th>
    <th class="border px-4 py-2">DOB</th>
    <th class="border px-4 py-2">Accepted Terms?</th></tr>${tableEntries}</table>`;

  document.getElementById("user-entries").innerHTML = table;
};

const saveForm = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveForm);
displayEntries();
