import Ember from 'ember';

export default Ember.Component.extend({
  animationEnd: 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
  classNames: ['row'],
  didUpdateAttrs() {
    const userScore = this.$().find('.user-score');
    userScore.addClass('pulse high-score').one(this.animationEnd, () => {
      userScore.removeClass('pulse high-score');
    });
  }
});
