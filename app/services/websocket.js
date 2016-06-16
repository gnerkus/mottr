import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  _setup: function () {
    let socket = this.socket = io(`${config.API_HOST}`);
  }.on('init'),

  sendMessage(message) {
    // Send the message to the Websocket server
    this.get('socket').emit('new word', message);
  },

  // This is called when the 'New Game' button is clicked
  createRoom() {
    this.get('socket').emit('hostCreateNewGame');
  }
});
