import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    createMot(param) {
      this.sendAction('action', param);
    }

  }
});
