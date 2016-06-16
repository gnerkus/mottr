import Ember from 'ember';

export default Ember.Component.extend({
  websocket: Ember.inject.service('websocket'),

  actions: {
    createRoom() {
      this.get('websocket').createRoom();
    },

    joinRoom() {

    },

    showHelp() {

    }
  }
});
