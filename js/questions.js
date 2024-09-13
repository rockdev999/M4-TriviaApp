import Question from "./question.js";
let preguntas = JSON.parse(localStorage.getItem("preguntas"));
let puntaje = 0;

const reboot = document.querySelector(".reboot");
const content = document.querySelector(".content");
const next = document.querySelector(".next");
reboot.onclick = function () {
  window.location.href = "../index.html";
};

let i = 0;
function recorre() {
  const answer = answers(preguntas[i]);
  renderQustion(i + 1, preguntas[i].question, answer);
  document.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", (event) => {
      const respuesta = event.target.value;

      if (respuesta === preguntas[i].correct_answer) {
        puntaje += 100;

        event.target.style.backgroundColor = "#00ff00";
      } else {
        event.target.style.backgroundColor = "red";
      }
    });
  });
}

next.addEventListener("click", function () {
  i++;
  if (i < 10) {
    recorre();
  } else {
    content.innerHTML = `
      <section class="content-allScore">
          <div class="content-score">
            <p class="text-score">PUNTAJE FINAL</p>
            <p class="score">${puntaje} PTS.</p>
          </div>
        </section>
    `;
    const contentNext = document.querySelector(".content-next");
    contentNext.innerHTML = ``;
  }
});

recorre();
function answers(oneQuestion) {
  let answer = oneQuestion.incorrect_answers;
  answer.push(oneQuestion.correct_answer);
  return answer;
}

function renderQustion(i, titleQuestion, answer) {
  const question = new Question(titleQuestion, answer);
  let params = `<h2 class="question-number">PREGUNTA NRO ${i}</h2>`;
  params += question.createHTML();
  content.innerHTML = params;
}
