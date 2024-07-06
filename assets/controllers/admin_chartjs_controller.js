import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    onChartConnect(event) {
        this.chart = event.detail.chart;

        setTimeout(() => {
            this.setNewData();
        }, 5000)
    }

    setNewData() {
        this.chart.data.datasets[0].data[2] = 30;
        this.chart.update();
    }
}
