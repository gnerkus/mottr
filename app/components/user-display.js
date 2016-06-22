import Ember from 'ember';

export default Ember.Component.extend({
  animationEnd: 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
  didUpdateAttrs() {
    const userScore = this.$().find('.user-score');
    userScore.addClass('pulse').one(this.animationEnd, () => {
      userScore.removeClass('pulse');
    });
  }
});
