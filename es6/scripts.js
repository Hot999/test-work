import "babel-polyfill";

const mainBlockCreate = document.querySelector(".main_block_create");
const presentList = document.querySelector(".presentList");
const quittingList = document.querySelector(".quittingList");
const tableThree = document.querySelector(".header-table_three");
const presentListLength = document.querySelector(".presentList_length");
const quittingListLength = document.querySelector(".quittingList_length");
const presonName = document.querySelector('.preson-name');
const presonAge = document.querySelector('.preson-age');
const presonDiagnosis = document.querySelector('.preson-diagnosis');
const presonDopInfo = document.querySelectorAll('.preson_dop_info');
const urlQiting = "./quittingList.json";
const urlPresent = "./presentList.json";

const createCardPresent = (option, id) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="container-block_header-table" data-name="${option.firstName +' '+ option.lastName}" data-age="${option.birthDate}" data-diagnosis="${option.diagnosis}">
  <div class="header-table_first">
    ${id}
  </div>
    <div class="header-table_second">
      ${option.firstName} ${option.lastName}
    </div>
    <div class="header-table_three">
      ${option.bedNumber}
    </div>
  </div>`;
  mainBlockCreate.appendChild(div);
};

const createCardQiting = (option, id) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="container-block_header-table" data-name="${option.firstName +' '+ option.lastName}" data-age="${option.birthDate}" data-diagnosis="${option.diagnosis}">
  <div class="header-table_first">
    ${id}
  </div>
    <div class="header-table_second">
      ${option.firstName} ${option.lastName}
    </div>
    <div class="header-table_three">
      ${option.cause}
    </div>
  </div>`;
  mainBlockCreate.appendChild(div);
};

async function fetchAsyncQiting(url) {
  const response = await fetch(url);
  const data = await response.json();
  let id = 1;
  data.forEach(element => {
    createCardQiting(element, id);
    id++;
  });
  let length = data.length;
  quittingListLength.textContent = `(${length})`;
}

async function fetchAsyncPresent(url) {
  const response = await fetch(url);
  const data = await response.json();
  let id = 1;
  data.forEach(element => {
    createCardPresent(element, id);
    id++;
  });
  let length = data.length;
  presentListLength.textContent = `(${length})`;
}
async function getAllPerson() {
  const response = await fetch(urlQiting);
  const data = await response.json();
  let length = data.length;
  quittingListLength.textContent = `(${length})`;
  fetchAsyncPresent(urlPresent);
}
getAllPerson();

presentList.addEventListener("click", () => {
  fetchAsyncPresent(urlPresent);
  tableThree.textContent = "Палата";
  mainBlockCreate.textContent = "";
  presentList.classList.add("present-list_back_active");
  quittingList.classList.remove("present-list_back_active");
});

quittingList.addEventListener("click", () => {
  fetchAsyncQiting(urlQiting);
  tableThree.textContent = "Причина выбытия";
  mainBlockCreate.textContent = "";
  quittingList.classList.add("present-list_back_active");
  presentList.classList.remove("present-list_back_active");
});

mainBlockCreate.addEventListener("click", e => {
  let tg = e.target;
  let active = document.querySelectorAll('.active_item');
  if (active) {
    for (let i = 0; i < active.length; i++) {
      const element = active[i];
      element.classList.remove('active_item');
    }
    presonDopInfo.forEach((elem) => elem.textContent = " ")
    
  }
  if (tg.classList.contains("container-block_header-table")) {
    tg.classList.add('active_item');
    let today = new Date();
    let year = today.getFullYear();
    let namePerson = tg.dataset.name;
    let agePerson = year - tg.dataset.age.slice(0, 4);
    let diagnosisPerson = tg.dataset.diagnosis;
    presonName.textContent = namePerson;
    presonAge.textContent = agePerson;
    presonDiagnosis.textContent = diagnosisPerson;
  }
});
