export default class ResultSymbol extends HTMLElement {
  static get observedAttributes() {
    return [
      'value',
      'type'
    ];
  }

  static get template() {
    return `
      <style>
        span {
          font-size: 1em;
        }
      </style>
      <span></span>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = ResultSymbol.template;

    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    this.shadowRoot.querySelector('span').textContent = this.value ? '✅' : '❌';
  }

  get value() {
    const value = this.getAttribute('value');
    const type = this.getAttribute('type');

    switch (type) {
      case 'boolean':
        return value === 'true';
      case 'number':
        return Number(value);
      case 'string':
      default:
        return value;
    }
  }
};
