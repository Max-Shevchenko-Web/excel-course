import { ExcelComponent } from './../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div class="formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(this.$root);
    console.log('Formula-input', event.target.textContent.trim());
  }

  onClick(event) {
    console.log('click');
  }
}

Formula.className = 'excel__formula';
