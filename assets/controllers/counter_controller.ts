import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller<HTMLFormElement> {
  static targets = ["count", "template", "inner"];
  static values = {
    number: Number,
  };

  declare count: number;
  declare template: string;

  declare numberValue: number;
  declare hasNumberValue: boolean;

  declare hasCountTarget: boolean;
  declare countTarget: HTMLDivElement;
  declare countTargets: HTMLDivElement[];

  declare hasInnerTarget: boolean;
  declare innerTarget: HTMLDivElement;
  declare innerTargets: HTMLDivElement[];

  connect() {
    this.count = 1;
  }

  less() {
    this.count--;
    this.countTarget.innerText = this.count.toString();
  }

  more() {
    this.count++;
    this.countTarget.innerText = this.count.toString();
  }

  addItem() {
    this.template = `${this.element.dataset.template}`;
    this.innerTarget.innerHTML = this.template;
    this.innerTarget.children[0].setAttribute("data-template", this.template);
  }
}
