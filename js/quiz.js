// Five-question quiz rendered into #quiz-root, one question at a time. State lives only in this module.
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function initQuiz({ quiz }) {
  const root = document.getElementById('quiz-root');
  if (!root || !quiz.length) return;
  const state = { index: 0, score: 0 };

  root.classList.add('quiz');
  root.innerHTML = `<h3 class="quiz-title">Check what you learned</h3><div class="quiz-body"></div>`;
  const body = root.querySelector('.quiz-body');

  function renderQuestion() {
    const item = quiz[state.index];
    const name = `quiz-q${state.index}`;
    body.innerHTML = `
      <p class="quiz-progress">Question ${state.index + 1} of ${quiz.length}</p>
      <form class="quiz-form">
        <fieldset>
          <legend>${esc(item.q)}</legend>
          ${item.options.map((opt, i) => `<label class="quiz-option"><input type="radio" name="${name}" value="${i}"><span>${esc(opt)}</span></label>`).join('')}
        </fieldset>
        <button type="submit" class="quiz-button" disabled>Check</button>
      </form>
      <div class="quiz-feedback" aria-live="polite" tabindex="-1"></div>`;
    const form = body.querySelector('form');
    const check = form.querySelector('button');
    const feedback = body.querySelector('.quiz-feedback');
    form.addEventListener('change', () => { check.disabled = false; });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const chosen = Number(form.querySelector('input:checked').value);
      const right = chosen === item.answer;
      if (right) state.score += 1;
      form.querySelectorAll('input').forEach((input) => { input.disabled = true; });
      const options = form.querySelectorAll('.quiz-option');
      options[item.answer].classList.add('is-correct');
      options[item.answer].insertAdjacentHTML('beforeend', '<span class="quiz-mark" aria-hidden="true">✓</span>');
      if (!right) {
        options[chosen].classList.add('is-wrong');
        options[chosen].insertAdjacentHTML('beforeend', '<span class="quiz-mark" aria-hidden="true">✗</span>');
      }
      check.remove();
      const last = state.index === quiz.length - 1;
      feedback.innerHTML = `
        <p class="quiz-verdict ${right ? 'is-correct' : 'is-wrong'}"><span aria-hidden="true">${right ? '✓' : '✗'}</span> ${right ? 'Correct.' : `Not quite. The answer is: ${esc(item.options[item.answer])}.`}</p>
        <p>${esc(item.explain)}</p>
        <button type="button" class="quiz-button">${last ? 'See result' : 'Next'}</button>`;
      feedback.focus();
      feedback.querySelector('button').addEventListener('click', () => {
        if (last) renderResult(); else { state.index += 1; renderQuestion(); body.querySelector('input').focus(); }
      });
    });
  }

  function renderResult() {
    const all = state.score === quiz.length;
    const message = all ? 'Every one right. You have the whole story.'
      : state.score >= quiz.length / 2 ? 'Nicely done. Scroll back up for the parts you missed.'
        : 'This is a tricky topic. A second read of the sections above will help.';
    body.innerHTML = `
      <div class="quiz-feedback" aria-live="polite" tabindex="-1">
        <p class="quiz-score">You scored ${state.score} out of ${quiz.length}.</p>
        <p>${message}</p>
        <button type="button" class="quiz-button">Try again</button>
      </div>`;
    const box = body.querySelector('.quiz-feedback');
    box.focus();
    box.querySelector('button').addEventListener('click', () => {
      Object.assign(state, { index: 0, score: 0 });
      renderQuestion();
      body.querySelector('input').focus();
    });
  }

  renderQuestion();
}
