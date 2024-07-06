import { startStimulusApp } from '@symfony/stimulus-bridge';
// import HelloController from './controllers/hello_controller.js';
// import CounterController from './controllers/counter_controller.js';
// import ColorSquareController from './controllers/color_square_controller.js';
// import SearchPreviewController from './controllers/search_preview_controller.js';
// import SubmitConfirmController from './controllers/submit_confirm_controller.js';
// import CartListController from './controllers/cart_list_controller.js';

// import { Autocomplete } from '@symfony/stimulus-bridge/lazy-controller-loader?lazy=true&export=Autocomplete!stimulus-autocomplete';

// Registers Stimulus controllers from controllers.json and in the controllers/ directory
export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!./controllers',
    true,
    /\.[jt]sx?$/
));
// register any custom, 3rd party controllers here
// app.register('some_controller_name', SomeImportedController);

// app.register('autocomplete', Autocomplete);

// app.register('hello', HelloController);
// app.register('counter', CounterController);
// app.register('color-square', ColorSquareController);
// app.register('search-preview', SearchPreviewController);
// app.register('submit-confirm', SubmitConfirmController);
// app.register('cart-list', CartListController);
