import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['colorSquare', 'select']

    /**
     * Valores recureparados de los atributos data
     */
    static values = {
        colorId: Number
    }

    // selectedColorId = null;

    connect() {
        this.selectTarget.classList.add('d-none')
        // console.log(this.colorIdValue);

        // if (this.colorIdValue) {
        //     this.setSelectedColor(this.colorIdValue);
        // }
    }

    /**
     * Evento changed del valor colorId
     */
    colorIdValueChanged() {
        // this.setSelectedColor(this.colorIdValue);
        this.selectTarget.value = this.colorIdValue;

        this.colorSquareTargets.forEach((element) => {
            if (element.dataset.colorId == this.colorIdValue) {
                element.classList.add('selected');
            } else {
                element.classList.remove('selected');
            }
        });
    }

    selectColor(event) {
        // this.setSelectedColor(event.currentTarget.dataset.colorId);
        const clickedColor = event.currentTarget.dataset.colorId;
        this.colorIdValue = clickedColor == this.colorIdValue ? null : clickedColor;
    }

    // setSelectedColor(newColorId) {
    //     this.colorSquareTargets.forEach((element) => {
    //         element.classList.remove('selected');
    //     });

    //     if (newColorId === this.selectedColorId) {
    //         this.findSelectedColorSquare()?.classList.remove('selected');
    //         this.selectedColorId = null;
    //         this.selectTarget.value = '';
    //         return;
    //     }

    //     this.selectedColorId = newColorId;
    //     this.selectTarget.value = this.selectedColorId;
    //     this.findSelectedColorSquare()?.classList.add('selected');
    // }

    /**
     * @return {Element|null}
     */
    // findSelectedColorSquare() {
    //     return this.colorSquareTargets.find((element) => element.dataset.colorId == this.selectedColorId);
    // }
}
