import Ember from 'ember';

export default Ember.Service.extend({
  gameID: '',
  socketID: '',
  gameState: 'inactive',
  minUserCount: 2,
  curPlayerID: '',
  players: {}
});
