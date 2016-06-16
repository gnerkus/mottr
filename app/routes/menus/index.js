import Ember from 'ember';

export default Ember.Route.extend({
  websocket: Ember.inject.service('websocket'),
  variables: Ember.inject.service('variables'),

  init() {
    const GAME_SOCKET = this.get('websocket').socket;
    // When a room has been created
    GAME_SOCKET.on('newGameCreated', this.onNewGameCreated.bind(this));
  },

  onNewGameCreated (gameInfo) {
    // Define app wide constants
    this.get('variables').set('gameID', gameInfo.gameID);
    this.get('variables').set('socketID', gameInfo.socketID);

    // Navigate to the room menu screen. You'll wait for other players to join
    this.transitionTo('menus.room');
  }
});
