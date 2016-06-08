import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('mot');
  },

  actions: {

    saveMot(newMot) {
      console.log('New mot:', newMot);
      newMot.save().then(() => this.transitionTo('mots'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
