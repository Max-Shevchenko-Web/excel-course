import { Router } from './core/routes/Router';
import { DashboardPage } from './pages/DashboardPages';
import { ExcelPage } from './pages/ExcelPage';
import './scss/index.scss';


new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});

