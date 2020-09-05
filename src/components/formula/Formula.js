import { ExcelComponent } from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value);
    });

    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text());
    // });

    // this.$subscribe( state => {
    //   console.log('formula update', state.currentText);
    //   this.$formula.text(state.currentText);
    // });
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div id="formula" class="formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    // text тоже самое $(event.target).text()
    // const text = event.target.textContent.trim();
    // родительский метод из Excel component
    this.$emit('formula:input', $(event.target).text());

    // Мой способ
    // document.onkeydown = e => {
    //   if (e.code === 'Enter') {
    //     e.preventDefault();
    //     this.$emit('formula:keydown', 'Enter');
    //     event.target.textContent = '';
    //   }
    // };
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}

Formula.className = 'excel__formula';
