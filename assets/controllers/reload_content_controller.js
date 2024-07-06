import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['content'];

    static values = {
        url: String,
    }

    // event.currentTarget.classList.add('removing');
    async refreshContent(event) {
        const target = this.hasContentTarget ? this.contentTarget : this.element;
        target.style.opacity = .5;
        const response = await fetch(this.urlValue);
        target.innerHTML = await response.text();
        target.style.opacity = 1;
    }
}
