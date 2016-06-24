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
    const VARIABLES = this.get('variables');

    controller.set('lastMot', models.lastMot);
    controller.set('currentMot', models.currentMot);
    controller.set('curPlayerID', VARIABLES.curPlayerID);
    controller.set('players', Ember.copy(VARIABLES.players));
    controller.set('currentPlayer', controller.get('players')[VARIABLES.curPlayerID]);
    controller.set('canPlay', false);
    controller.set('gameReady', false);
    controller.set('gameID', VARIABLES.gameID);
    controller.set('minUserCount', VARIABLES.minUserCount);
  },

  bindEvents() {
    const GAME_SOCKET = this.get('websocket').socket;
    // When a user has sent a word
    GAME_SOCKET.on('new word', this.onNewWord.bind(this));
    GAME_SOCKET.on('playerJoinedRoom', this.playerJoinedRoom.bind(this));
  },

  onNewWord(newWordInfo) {
    this.controller.set('players', newWordInfo.players);

    const lastMot = {
      content: newWordInfo.word
    };
    // Set the last word to the current word's content
    this.controller.set('lastMot', Ember.copy(lastMot));
  },

  playerJoinedRoom(gameInfo) {
    const CTRL = this.controller;
    const GAME = gameInfo.game;
    const VARIABLES = this.get('variables');

    // Define app wide constants
    CTRL.set('players', GAME.players);

    // Update the game's ready state
    CTRL.set('canPlay', Object.keys(CTRL.get('players')) >= CTRL.get('minUserCount'));

    // Update the game's ready state
    CTRL.set('gameReady', Object.keys(CTRL.get('players')).length >= CTRL.get('minUserCount'));
    VARIABLES.set('gameID', GAME.gameID);
    VARIABLES.set('socketID', gameInfo.playerID);
    VARIABLES.set('players', GAME.players);
  },

  actions: {
    sendMot() {
      // Fetch the current word typed by the user
      const currentMot = this.controller.get('currentMot');
      const gameID = this.get('variables').get('gameID');
      const newWordMsg = {
        gameID: gameID,
        word: currentMot.content
      };
      this.get('websocket').sendMessage(newWordMsg);
      // Reset the form
      this.controller.set('currentMot', {});
    },
  }
});
