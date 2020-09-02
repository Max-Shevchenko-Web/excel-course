import {$} from '@core/dom';

export function resizeTableHandler(event, $root) {
  // return new Promise(resolve => {
    const $resizer = $(event.target);
    // const $parent = $resizer.$el.parentNode;//bad!
    // const $parent = $resizer.$el.closest('.column');//лучше нo всеравно привязано к верстке
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $root.addClass('unselectable');

    // console.log($parent.data.col); // так как это гетер не пишем круглые скобки

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta - 4 + 'px'});
      } else {
        const delta = e.clientY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta - 4 + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      $root.$el.classList.remove('unselectable');
      if (type === 'col') {
        $parent.css({width: value + 'px'});
        // метод созданый в классе Dom//$root это корневой элемент, таблица
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }

      // resolve({
      //   value,
      //   id: type === 'col' ? $parent.data.col : null
      // });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
    };
  // });
}
