export class Emitter {
  constructor() {
    this.liseners = {};
  }

  // возсожные названия dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.liseners[event])) {
      return false;
    }
    this.liseners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  // возсожные названия on, listen ...
  // Подписываемся на уведомления, либо добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.liseners[event] = this.liseners[event] || [];
    this.liseners[event].push(fn);
    // возвращаем функцию для отписки от события
    return () => {
      this.liseners[event] =
          this.liseners[event].filter(listener => listener !== fn);
    // Оставляем только те слушатели которые не равны fn
    };
  }
}

// Example
// const emitter = new Emitter();
// unsub отписка от события
// const unsub = emitter.subscribe('vladilen', data => console.log('Subscribe', data));
// emitter.emit('vladilen', 42);

// setTimeout( () => {
//   emitter.emit('vladilen', 'After 2 seconds');
// }, 2000);

// setTimeout( () => {
//   unsub();
// }, 2000);

// setTimeout( () => {
//   emitter.emit('vladilen', 'After 4 seconds');
// }, 4000);

