import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  // Game page
  this.route('game');

  // Join game page
  this.route('join');

  // Main menu
  this.route('menus', function() {
    this.route('room');
  });

  // About page.
  this.route('about');

  // Help page
  this.route('help');
});

export default Router;
