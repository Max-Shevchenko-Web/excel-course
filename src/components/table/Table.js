import { ExcelComponent } from './../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(20);
  }

  onClick() {
    console.log('click');
  }

  onMousedown(event) {
    resizeTable(event, this.$root);
  }

  onMousemove() {
    console.log('mousemove');
  }

  onMouseup() {
    console.log('mouseup');
  }
}

Table.className = 'excel__table';
