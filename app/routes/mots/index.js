import Ember from 'ember';

export default Ember.Route.extend({
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
        // TODO: Play a sound here to indicate the player just sent a word.
        // Set the last word to the current word's content
        this.controller.set('lastMot', Ember.copy(currentMot));

        // Reset the form
        this.controller.set('currentMot', {});
      });
    },
  }
});
