import { ExcelComponent } from './../../core/ExcelComponent';
import { createTable } from './table.template';
import {$} from '@core/dom';

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
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // const $parent = $resizer.$el.parentNode;//bad!
      // const $parent = $resizer.$el.closest('.column');//лучше нo всеравно привязано к верстке
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const type = $resizer.data.resize;
      const sideProp = type === 'col' ? 'bottom' : 'right';
      let value;

      this.$root.$el.classList.add('unselectable');

      // console.log($parent.data.col); // так как это гетер не пишем круглые скобки

      $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
      });

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({right: -delta + 'px'});
        } else {
          const delta = e.pageY - coords.bottom;
          value = coords.height + delta;
          $resizer.css({bottom: -delta + 'px'});
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.$root.$el.classList.remove('unselectable');
        if (type === 'col') {
          $parent.css({width: value + 'px'});
          // метод созданый в классе Dom//$root это корневой элемент, таблица
          this.$root.findAll(`[data-col="${$parent.data.col}"]`)
              .forEach(el => el.style.width = value + 'px');
        } else {
          $parent.css({height: value + 'px'});
        }

        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0
        });
      };
    }
  }

  onMousemove() {
    console.log('mousemove');
  }

  onMouseup() {
    console.log('mouseup');
  }
}

Table.className = 'excel__table';
