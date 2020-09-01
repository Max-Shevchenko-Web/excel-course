import { ExcelComponent } from './../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';
import { TableSelection } from './TableSelection';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
      listeners: ['mousedown', 'keydown']
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection;
  }

  init() {
    // перезаписываем метод init но не забываем вызвать родительский метод
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root);
    } else if (isCell) {
      const $target = $(event.target);
      console.log($target);
      if (event.shiftKey) {
        // this.selection.selectGroup(target);
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
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

      this.selection.select($next);
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
}

Table.className = 'excel__table';
