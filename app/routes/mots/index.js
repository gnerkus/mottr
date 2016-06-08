import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      mots: this.store.findAll('mot'),
      newMot: {},
    });
  },

  setupController(controller, models) {
    controller.set('mots', models.mots);
    controller.set('newMot', models.newMot);
  },

  actions: {

    saveMot(newMot) {
      console.log('Mot to be created: ', newMot);
      var noveauMot = this.store.createRecord('mot', newMot);
      noveauMot.save().then(() => this.transitionTo('mots'));
    },
  }
});
