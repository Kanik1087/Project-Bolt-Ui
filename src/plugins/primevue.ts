import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';

// Import PrimeVue styles
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export function setupPrimeVue(app: App) {
  // Install PrimeVue plugin
  app.use(PrimeVue);

  // Register PrimeVue components globally
  app.component('PrimeButton', Button);
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('Dialog', Dialog);
  app.component('InputText', InputText);
  app.component('InputNumber', InputNumber);
  app.component('Dropdown', Dropdown);
  app.component('TabView', TabView);
  app.component('TabPanel', TabPanel);
  app.component('Tag', Tag);
}