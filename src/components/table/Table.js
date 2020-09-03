import { ExcelComponent } from './../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeTableHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import * as actions from '@/redux/actions';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection;
  }

  init() {
    // перезаписываем метод init но не забываем вызвать родительский метод
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    // this.$subscribe( state => {
    //   console.log('TableState', state);
    // });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  async resizeTable(event) {
    try {
      const data = await resizeTableHandler(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell) {
      const $target = $(event.target);
      if (event.shiftKey) {
        // this.selection.selectGroup(target);
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  // Моя реализация
  // onKeydown(event) {
  //   if (event.code === 'Enter') {
  //     event.preventDefault();
  //   }
  //   const keyCode = event.code;
  //   const current = this.selection.current.id(true);
  //   console.log(current);
  //   const next = current;
  //   switch (keyCode) {
  //     case 'ArrowDown':
  //       next.row += 1;
  //       break;
  //     case 'ArrowUp':
  //       next.row -= 1;
  //       break;
  //     case 'ArrowRight':
  //       next.col += 1;
  //       break;
  //     case 'ArrowLeft':
  //       next.col -= 1;
  //       break;
  //     case 'Enter':
  //       next.row += 1;
  //       break;
  //     case 'Tab':
  //       next.col += 1;
  //       break;
  //     default:
  //   }
  //   const $cell = this.$root.find(`[data-id="${next.row}:${next.col}"]`);
  //   this.selection.select($cell);
  // }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}

Table.className = 'excel__table';
