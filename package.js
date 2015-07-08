Package.describe({
  name: 'meteorblackbelt:autoform-datetime-inputs',
  summary: 'Custom sate/time inputs for AutoForm',
  version: '0.0.3',
  documentation: null
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.use('aldeed:autoform-bs-datepicker@1.1.1');
  api.use('rajit:bootstrap3-datepicker@1.4.1');
  api.use('reactive-dict@1.1.0');
  api.use('bigdsk:inputmask@3.1.42');
  api.use('momentjs:moment@2.10.3');
  api.use('random@1.0.3');
  api.addFiles([
    'autoform-datetime-inputs.html',
    'autoform-datetime-inputs.js',
    'autoform-datetime-inputs.css'
  ], 'client');
});
