import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('mot');
  },

  actions: {
    createMot() {
      const controller = this.get('controller');

      const mot = this.store.createRecord('mot', {
        content: controller.get('newContent'),
      });

      mot.save().then(() => {
        controller.set('newContent', '');
      });

      ['catch']((error) => {
        console.error(error);
      });
    },
  },
});
