import {$} from '@core/dom';
import { Emitter } from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter;
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter
    };

    this.components = this.components.map( Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    // добавляем компонент родителю
    this.$el.append(this.getRoot());
    // eslint-disable-next-line max-len
    // после добавления компонента в DOM инициализируем его, в соответсвии с его подписками и тп
    this.components.forEach( component => component.init());
  }

  destroy() {
    this.components.forEach( component => {
      component.destroy();
    });
  }
}
