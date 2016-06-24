import Ember from 'ember';

export default Ember.Route.extend({
  websocket: Ember.inject.service('websocket'),
  variables: Ember.inject.service('variables'),

  setupController(controller) {
    controller.set('currentGameID', '');
  },

  actions: {
    sendGameID() {
      const gameID = this.controller.get('currentGameID');
      this.get('websocket').joinGame(gameID);
      this.transitionTo('game');
    }
  }
});
