import Ember from 'ember';

export default Ember.Component.extend({
  animationEnd: 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
  classNames: ['animated'],
  shouldPlay: false,

  didUpdateAttrs() {
    // When the attributes change, change a property that the child Component
    // is observing.

    // The sound should play when this component's text changes
    this.set('shouldPlay', true);

    // Animate this component when its text changes.
    this.$().addClass('fadeInDown').one(this.animationEnd, () => {
      this.$().removeClass('fadeInDown');
      this.set('shouldPlay', false);
    });
  },
});
