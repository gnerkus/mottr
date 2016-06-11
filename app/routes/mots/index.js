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
    saveMot() {
      // Fetch the current word typed by the user
      const currentMot = this.controller.get('currentMot');

      // Create the new Mot on the server
      const mot = this.store.createRecord('mot', currentMot);
      mot.save().then(() => {
        // Send the message to the Websocket server
        this.get('websocket').sendMessage(currentMot.content);
        // TODO: Play a sound here to indicate the player just sent a word.

        // Reset the form
        this.controller.set('currentMot', {});
      });
    },
  }
});
