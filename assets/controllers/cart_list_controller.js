import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static values = {
        cartRefreshUrl: String,
    }

    async removeItem(event) {
        event.currentTarget.classList.add('removing');
        const response = await fetch(this.cartRefreshUrlValue);
        this.element.innerHTML = await response.text();
    }
}
