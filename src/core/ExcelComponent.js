import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  // вызывается раньше метода init потому что вызывается в конструкторе
  prepare() { }

  //  Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Сюда приходят только изменения на те поля на которые мы подписались
  storeChange() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // мы не будем подписываться в каждом компоненте на изменения стора, а сделаем одну подпись и уже мониторя изменения будет отправлять нужные даные в нужное место
  // подписка происходит в Excel а точнее в StoreSubscriber
  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn);
  // }

  // место инициализации для каждого компонента
  init() {
    this.initDOMListerners();
  }

  // убираем подписку
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach( unsub => unsub());
    // this.storeSub.unsubscribe();
  }
}
