import {$} from '@core/dom';
import { Emitter } from '@core/Emitter';
import { StoreSubscribe } from './../../core/StoreSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter;
    this.subscriber = new StoreSubscribe(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
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

    this.subscriber.subscribeComponents(this.components);
    // eslint-disable-next-line max-len
    // после добавления компонента в DOM инициализируем его, в соответсвии с его подписками и тп
    this.components.forEach( component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach( component => {
      component.destroy();
    });
  }
}
