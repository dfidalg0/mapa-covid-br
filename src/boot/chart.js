import { Chart, registerables } from 'chart.js';
import { boot } from 'quasar/wrappers';

export default boot(() => {
    Chart.register(...registerables);
});
