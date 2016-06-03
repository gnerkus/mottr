import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  // Mots resource
  this.route('mots', function () {
    this.route('mot', { path: ':id' });
  });

  // About page.
  this.route('about');
});

export default Router;
