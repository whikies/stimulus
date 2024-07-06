import { Controller } from '@hotwired/stimulus';
import React from 'react';
import MadeWithLove from '../components/MadeWithLove';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    connect() {
        import('react-dom/client').then((ReactDOM) => {
            ReactDOM.createRoot(this.element).render(<MadeWithLove />)
        });
    }
}
