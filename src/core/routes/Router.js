import {$} from '@core/dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routers = routes;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.onload = this.changePageHandler();
    window.addEventListener('hashchange', this.changePageHandler);
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear();
    const nextPage = ActiveRoute.path.includes('excel') ? 'excel': 'dashboard';
    const Page = this.routers[nextPage];
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
