export default class RegexMatch extends HTMLElement {
  static get observedAttributes() {
    return [
      'pattern',
      'flags'
    ];
  }

  static get template() {
    return `
      <span id="target">
        <slot></slot>
      </span>
      <result-symbol></result-symbol>
      <span id="matched"></span>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = RegexMatch.template;

    this.addEventListener('input', this.update);

    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    const matched = this.shadowRoot.querySelector('#matched');
    const symbol = this.shadowRoot.querySelector('result-symbol');

    matched.textContent = this.matched.length ? `「${this.matched.join('、')}」` : '';
    symbol.setAttribute('value', this.matched.length);
    symbol.setAttribute('type', 'number');
  }

  get matched() {
    const pattern = this.getAttribute('pattern') || '';
    const flags = this.getAttribute('flags') || '';
    const regexp = new RegExp(pattern, flags);

    return this.textContent.match(regexp) || [];
  }
};
