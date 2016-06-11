import Ember from 'ember';

export default Ember.Service.extend({
  _setup: function () {
    let socket = this.socket = io(`${window.location.hostname}:1337`);
  }.on('init'),

  sendMessage(message) {
    // Send the message to the Websocket server
    this.get('socket').emit('new word', message);
  }
});
