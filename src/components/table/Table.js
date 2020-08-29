import { ExcelComponent } from './../../core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  toHTML() {
    return createTable(1000);
  }
}

Table.className = 'excel__table';
