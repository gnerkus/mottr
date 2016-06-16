import Ember from 'ember';

export default Ember.Component.extend({
  animationEnd: 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
  classNames: ['animated', 'nav-item'],
  shouldPlay: false,

  mouseEnter() {
    this.set('shouldPlay', true);
    this.$().addClass('pulse highlight').one(this.animationEnd, () => {
      this.$().removeClass('pulse');
      this.set('shouldPlay', false);
    });
  },

  mouseLeave() {
    this.$().removeClass('highlight');
  },

  actions: {
    selectMenuItem() {
      this.get('onChoose')();
    }
  }
});
