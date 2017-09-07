export default class RegexInput extends HTMLElement {
  static get template() {
    return `
      <div>
        <label>
          パターン
          <input type="text" id="input">
        </label>
      </div>
      <div>
        <label>
          グローバルマッチ
          <input type="checkbox" checked id="global">
        </label>
      </div>
      <div>
        <label>
          大文字・小文字を区別しない
          <input type="checkbox" checked id="ignore">
        </label>
      </div>
      <div>
        <label>
          複数行マッチ
          <input type="checkbox" id="multi">
        </label>
      </div>
      <div>
        <label>
          スティッキーマッチ
          <input type="checkbox" id="sticky">
        </label>
      </div>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = RegexInput.template;

    this.input = this.shadowRoot.querySelector('#input');
    this.global = this.shadowRoot.querySelector('#global');
    this.ignore = this.shadowRoot.querySelector('#ignore');
    this.multi = this.shadowRoot.querySelector('#multi');
    this.sticky = this.shadowRoot.querySelector('#sticky');
  }

  get pattern() {
    return this.input.value;
  }

  get flags() {
    let flags = '';

    if (this.global.checked) {
      flags += 'g';
    }

    if (this.ignore.checked) {
      flags += 'i';
    }

    if (this.multi.checked) {
      flags += 'm';
    }

    if (this.sticky.checked) {
      flags += 'y';
    }

    return flags;
  }

  get value() {
    return new RegExp(this.pattern, this.flags);
  }
};
