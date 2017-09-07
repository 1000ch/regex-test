import ResultSymbol from './result-symbol.js';
import RegexInput from './regex-input.js';
import RegexMatch from './regex-match.js';

customElements.define('result-symbol', ResultSymbol);
customElements.define('regex-input', RegexInput);
customElements.define('regex-match', RegexMatch);

const regexInput = document.querySelector('regex-input');
regexInput.addEventListener('input', () => applyUpdate());
regexInput.addEventListener('change', () => applyUpdate());

function applyUpdate() {
  document.querySelectorAll('regex-match').forEach(regexMatch => {
    regexMatch.setAttribute('pattern', regexInput.pattern);
    regexMatch.setAttribute('flags', regexInput.flags);
  });
}
