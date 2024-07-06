import { Controller } from '@hotwired/stimulus';
// import { createRoot } from 'react-dom/client';
import React from 'react';
import FeaturedProduct from '../components/FeaturedProduct';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static values = {
        product: Object
    }

    connect() {
        // const root = createRoot(this.element);
        // root.render(<FeaturedProduct product={this.productValue} />);
        import('react-dom/client').then((ReactDOM) => {
            ReactDOM.createRoot(this.element).render(<FeaturedProduct product={this.productValue} />)
        });
    }
}
