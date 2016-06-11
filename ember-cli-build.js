/* jshint node:true*/
/* global require, module */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  //
  // Import Socket.IO client library
  app.import(`${app.bowerDirectory}/socket.io-client/socket.io.js`);

  // Import Bootstrap and Tether (for tooltips)
  app.import(`${app.bowerDirectory}/bootstrap/dist/css/bootstrap.css`);
  app.import(`${app.bowerDirectory}/tether/dist/js/tether.js`);
  app.import(`${app.bowerDirectory}/bootstrap/dist/js/bootstrap.js`);

  // Import Animate.CSS for animations
  app.import(`${app.bowerDirectory}/animate.css/animate.css`);

  // Import SoundManager files
  app.import(`${app.bowerDirectory}/soundmanager/swf/soundmanager2.swf`);
  app.import(`${app.bowerDirectory}/soundmanager/script/soundmanager2.js`);
  app.import(`${app.bowerDirectory}/ember-cli-soundmanager-shim/soundmanager2-shim.js`, {
    exports: {
      soundManager: ['default']
    }
  });

  // Import Font Awesome
  app.import(`${app.bowerDirectory}/font-awesome/fonts/fontawesome-webfont.woff`, {
    destDir: 'fonts',
  });

  // Import sound files
  app.import('vendor/sounds/chime_bell_ding.wav');
  app.import('vendor/sounds/pop_drip.wav');

  return app.toTree();
};
