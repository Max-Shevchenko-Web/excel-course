import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '@core/dom';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    }
    );
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }
  toHTML() {
    return this.template;
  }

  // Подписываемся на изменения  между стилями ячеек и отрисовываем их в тулбаре
  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);

      // const key = Object.keys(value)[0];
      // this.setState({[key]: value[key]});
    }
  }
}

Toolbar.className = 'excel__toolbar';
