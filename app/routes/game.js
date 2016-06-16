import Ember from 'ember';

export default Ember.Route.extend({
  websocket: Ember.inject.service('websocket'),
  variables: Ember.inject.service('variables'),

  init() {
    this.bindEvents();
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

  bindEvents() {
    const GAME_SOCKET = this.get('websocket').socket;
    // When a user has sent a word
    GAME_SOCKET.on('new word', this.onNewWord.bind(this));
  },

  onNewWord(newWord) {
    const lastMot = {
      content: newWord
    };
    // Set the last word to the current word's content
    this.controller.set('lastMot', Ember.copy(lastMot));
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
