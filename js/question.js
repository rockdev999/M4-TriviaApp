class Question {
  constructor(questionWords, answers) {
    this.questionWords = questionWords;
    this.answers = answers;
  }
  createHTML() {
    this.answers = this.answers.sort(() => Math.random() - 0.5);
    let content = `
        <h3 class="question">${decodeURIComponent(this.questionWords)}?</h3>
        <div class="content-answers">`;
    this.answers.forEach((answer) => {
      content += `<button class="answer" value = '${answer}'>${decodeURIComponent(
        answer
      )}</button>`;
    });
    content += `
        </div>
    `;
    return content;
  }
}

export default Question;
