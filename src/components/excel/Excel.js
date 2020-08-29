import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map( Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // // DEBUG
      // if (component.name) {
      //   window['c'+component.name] = component;
      // }
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
}
