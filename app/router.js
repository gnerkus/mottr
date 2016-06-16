import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  // Game page
  this.route('game');

  // Main menu
  this.route('menus', function() {
    this.route('room');
  });

  // About page.
  this.route('about');
});

export default Router;
