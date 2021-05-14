const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const pendingNumb = document.querySelector(".pendingNumber");
showTasks();

inputBox.onkeyup = () => {
  let userData = inputBox.value; //pega valor digitado pelo usuario
  if (userData.trim() != 0) {
    //checa se o input está vazio
    addBtn.classList.add("active"); //ativa o botão de adicionar
  } else {
    addBtn.classList.remove("active"); //desativa o botão de adicionar
  }
};

//evento do botão
addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo"); //pega o localstorage

  if (getLocalStorage == null) {
    //if localstorage for null
    listArr = []; //cria uma array vazia
  } else {
    listArr = JSON.parse(getLocalStorage); //transforma string json em objeto js
  }

  listArr.push(userData); //adicionando user data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforma um objeto js em uma string json
  showTasks(); //chama função de mostrar as tasks
  addBtn.classList.remove("active");
};

//função de adicionar tasks
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");

  if (getLocalStorage == null) {
    //if localstorage for null
    listArr = []; //cria uma array vazia
  } else {
    listArr = JSON.parse(getLocalStorage); //transforma string json em objeto js
  }

  pendingNumb.textContent = listArr.length; //passa a quantidade de elementos na array

  if (listArr.length > 0) {
    //ativa o botao de clear caso a array tenha algum elemento
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }

  let newLiTag = "";

  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });

  todoList.innerHTML = newLiTag; //adiciona litag dentro da ul
  inputBox.value = ""; //depois de adicionar a task, limpa o input
}

//função de deletar tasks
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //deleta ou remove um li

  //atualiza o local storage depois de deletar
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//função de deletar todos
deleteAllBtn.onclick = () => {
  listArr = [];
  //atualiza o local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};
