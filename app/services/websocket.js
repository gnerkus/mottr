import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  _setup: function () {
    let socket = this.socket = io(`${config.API_HOST}:1337`);
  }.on('init'),

  sendMessage(message) {
    // Send the message to the Websocket server
    this.get('socket').emit('new word', message);
  }
});
