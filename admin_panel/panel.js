// Получение данных о пользователях и постах
const users = JSON.parse(localStorage.getItem("users"));


// Отображение данных о пользователях в таблице
const userTable = document.getElementById('userTable');
const userTableBody = userTable.getElementsByTagName('tbody')[0];

users.forEach((user) => {
  const row = document.createElement('tr');

  const nickCell = document.createElement('td');
  nickCell.textContent = user.nick;

  const emailCell = document.createElement('td');
  emailCell.textContent = user.email;

  const telephoneCell = document.createElement('td');
  telephoneCell.textContent = user.telephone;

  const birhDateCell = document.createElement('td');
  birhDateCell.textContent = user.birth_date;

  const firstNameCell = document.createElement('td');
  firstNameCell.textContent = user.first_name;

  const lastNameCell = document.createElement('td');
  lastNameCell.textContent = user.last_name;

  const middleNameCell = document.createElement('td');
  middleNameCell.textContent = user.middle_name;

  const passwordCell = document.createElement('td');
  passwordCell.textContent = user.password;

  const roleCell = document.createElement('td');
  roleCell.textContent = user.role;

  row.appendChild(nickCell);
  row.appendChild(emailCell);
  row.appendChild(telephoneCell);
  row.appendChild(birhDateCell);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(middleNameCell);
  row.appendChild(passwordCell);
  row.appendChild(roleCell);
  userTableBody.appendChild(row);
});

function goBack() {
  window.history.back()
}

/*------------Order-------------*/

let dir = "desc"

document.getElementById("userTable").onclick = function (e) {
  if (e.target.tagName != 'TH') return
  let th = e.target;
  sortTable(th.cellIndex, th.dataset.type);
}

function sortTable(colNum, type) {
  let tbody = document.getElementById("userTable").querySelector('tbody');
  let rowsArray = Array.from(tbody.rows);
  let compare;
  switch (type) {
    case 'number':
      if (dir == "asc") {
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        }
        dir = "desc";
      }
      else {
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML + rowB.cells[colNum].innerHTML;
        }
        dir = "asc"
      }
      break;
    case 'string':
      if (dir == "asc") {
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
        }
        dir = "desc";
      }
      else {
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML ? 1 : -1;
        }
        dir = "asc";
      }
      break;
  }
  rowsArray.sort(compare);
  tbody.append(...rowsArray);
}