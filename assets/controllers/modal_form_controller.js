import { Controller } from '@hotwired/stimulus';
import { Modal } from 'bootstrap';
import $ from 'jquery';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static targets = ['modal', 'modalBody'];

    static values = {
        formUrl: String,
    }

    modal = null;

    async openModal(event) {

        if (this.formUrlValue) {
            this.modalBodyTarget.innerHTML = 'Loading...';
            this.modalBodyTarget.innerHTML = await $.ajax(this.formUrlValue);
        }

        this.modal = new Modal(this.modalTarget);
        this.modal.show();
    }

    async submitForm(event) {
        event.preventDefault();
        const $form = $(this.modalBodyTarget).find('form');

        try {
            this.modalBodyTarget.innerHTML = await $.ajax({
                url: this.formUrlValue,
                method: $form.prop('method'),
                data: $form.serialize(),
            });
            this.modal.hide();
            this.dispatch('success');
        } catch (e) {
            console.log(e)
            if (e?.responseText) {
                this.modalBodyTarget.innerHTML = e.responseText;
            }
        }
    }

    modalHidden() {
        console.log('it was hidden!');
    }
}
