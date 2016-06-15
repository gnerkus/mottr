import Ember from 'ember';

export default Ember.Route.extend({
  websocket: Ember.inject.service('websocket'),

  init() {
    this.get('websocket').socket.on('new word', (newWord) => {
      const lastMot = {
        content: newWord
      };
      // Set the last word to the current word's content
      this.controller.set('lastMot', Ember.copy(lastMot));
    });
  },

  model() {
    return Ember.RSVP.hash({
      lastMot: { content: '?' },
      currentMot: {}
    });
  },

  setupController(controller, models) {
    controller.set('lastMot', models.lastMot);
    controller.set('currentMot', models.currentMot);
  },

  actions: {
    sendMot() {
      // Fetch the current word typed by the user
      const currentMot = this.controller.get('currentMot');
      this.get('websocket').sendMessage(currentMot.content);
      // Reset the form
      this.controller.set('currentMot', {});
    },
  }
});
