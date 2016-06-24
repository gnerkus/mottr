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
    const VARIABLES = this.get('variables');
    const GAME = gameInfo.game;

    // Define app wide constants
    VARIABLES.set('gameID', GAME.gameID);
    VARIABLES.set('gameState', GAME.state);
    VARIABLES.set('minUserCount', GAME.minUsers);
    VARIABLES.set('players', GAME.players);

    VARIABLES.set('curPlayerID', gameInfo.playerID);

    // Navigate to the room menu screen. You'll wait for other players to join
    this.transitionTo('game');
  }
});
