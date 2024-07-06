import { Autocomplete } from 'stimulus-autocomplete';
import { addFadeTransition } from '../util/add-transition';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Autocomplete {

    static targets = ['results'];

    areResultsShown = false;

    connect() {
        addFadeTransition(this, this.resultsTarget);
        super.connect();
    }

    set resultsShown(value) {
        this.areResultsShown = value;
    }

    get resultsShown() {
        return this.areResultsShown
    }

    open() {
        super.open();
        this.enter();
    }
    close() {
        super.close();
        this.leave();
    }
}
