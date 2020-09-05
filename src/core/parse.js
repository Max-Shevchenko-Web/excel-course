export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      const avalValue = eval(value.slice(1)) || '';
      return avalValue;
    } catch (e) {
      return value;
    }
  }
  return value;
}

// не работает взаимосвязь между функцией и таблицей
