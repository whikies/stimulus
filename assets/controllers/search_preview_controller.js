import { Controller } from '@hotwired/stimulus';
import { useClickOutside, useDebounce, useTransition } from 'stimulus-use';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['result'];

    static values = {
        url: String,
    }

    static debounces = ['search'];

    connect() {
        useClickOutside(this);
        useDebounce(this);
        useTransition(this, {
            element: this.resultTarget,
            enterActive: 'fade-enter-active',
            enterFrom: 'fade-enter-from',
            enterTo: 'fade-enter-to',
            leaveActive: 'fade-leave-active',
            leaveFrom: 'fade-leave-from',
            leaveTo: 'fade-leave-to',
            hiddenClass: 'd-none',
        });
    }

    async onSearchInput(event) {
        this.search({
            params: {
                query: event.currentTarget.value
            }
        });
    }

    clickOutside(event) {
        // this.resultTarget.innerHTML = '';
        this.leave();
    }

    async search(args) {
        const { params: p } = args;
        const { query } = p;
        const params = new URLSearchParams({
            q: query,
            preview: 1,
        });

        const response = await fetch(`${this.urlValue}?${params.toString()}`);
        this.resultTarget.innerHTML = await response.text();
        this.enter();
    }
}
