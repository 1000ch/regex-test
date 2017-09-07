export default class RegexMatch extends HTMLElement {
  static get observedAttributes() {
    return [
      'pattern',
      'flags'
    ];
  }

  static get template() {
    return `
      <div>
        <slot></slot>
      </div>
      <div id="matched"></div>
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
    this.matched = this.shadowRoot.querySelector('#matched');

    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    const pattern = this.getAttribute('pattern') || '';
    const isNotMatched = !pattern.length || !this.result.length;
    this.matched.textContent = isNotMatched ? '❌ マッチしませんでした' : this.result.map(text => `✅ ${text}`).join('、');
  }

  get result() {
    const pattern = this.getAttribute('pattern') || '';
    const flags = this.getAttribute('flags') || '';
    const regexp = new RegExp(pattern, flags);

    return this.textContent.match(regexp) || [];
  }
};
