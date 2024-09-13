const urlApi = "https://opentdb.com/api.php?amount=10";
let preguntas = [];
function CallBack(result) {
  console.log("llegaron los resultados");
  return result.json();
}
function CallBack2(result) {
  console.log(result.results);
  preguntas = result.results;
}
function msitake(error) {
  console.log(error);
}
const difficulty = document.querySelector(".options-difficulty");
const type = document.querySelector(".options-type");
const category = document.querySelector(".options-category");
const accept = document.querySelector(".btn");
const contentStart = document.querySelector(".content-start");

accept.onclick = function () {
  if (
    difficulty.value != "null" &&
    type.value != "null" &&
    category.value != "null"
  ) {
    preguntas = createTrivia();
    contentStart.innerHTML = `<button class="start">Start Trivia</button>`;
    const start = document.querySelector(".start");
    start.onclick = function () {
      if (preguntas.length == 0) {
        alert("No available questions found");
        if (confirm("Riniciar")) {
          location.reload();
        }
      } else {
        localStorage.setItem("preguntas", JSON.stringify(preguntas));
        window.location = "../questions.html";
      }
    };
  } else {
    alert("todos los campos deben ser elejidos");
  }
};
function createTrivia() {
  fetch(
    `${urlApi}&type=${type.value}&difficulty=${difficulty.value}&category=${category.value}&encode=url3986`
  )
    .then(CallBack)
    .then(CallBack2)
    .catch(msitake);
}
