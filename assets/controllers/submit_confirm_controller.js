import { Controller } from '@hotwired/stimulus';
import Swal from 'sweetalert2';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static values = {
        title: String,
        text: String,
        icon: String,
        confirmButtonText: String,
        submitAsync: Boolean,
    }

    onSubmit(event) {
        event.preventDefault();

        Swal.fire({
            title: this.titleValue || null,
            text: this.textValue || null,
            icon: this.iconValue || null,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.confirmButtonTextValue || 'Yes',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                await this.submitForm();
            }
        })

        // Swal.fire({
        //     title: this.titleValue || null,
        //     text: this.textValue || null,
        //     icon: this.iconValue || null,
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: this.confirmButtonTextValue || 'Yes',
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire(
        //             'Deleted!',
        //             'Your file has been deleted.',
        //             'success',
        //         ).then((result) => {
        //             if (result.isConfirmed) {
        //                 this.element.submit();
        //             }
        //         })
        //     }
        // })
    }

    async submitForm() {
        if (!this.submitAsyncValue) {
            this.element.submit();

            return;
        }


        await new Promise(r => setTimeout(r, 2000));


        const response = fetch(this.element.action, {
            method: this.element.method,
            body: new URLSearchParams(new FormData(this.element)),
        });

        this.dispatch('async:submitted', {
            response,
        });
    }

}
