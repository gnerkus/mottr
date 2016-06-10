import Ember from 'ember';
import soundManager from 'soundManager';

export default Ember.Component.extend({
  didUpdateAttrs() {
    const shouldPlay = this.get('play');
    if (shouldPlay) {
      this.playSound('chime_bell_ding');
    }
  },

  playSound(soundID) {
    this.getOrCreateSound(soundID).play();
  },

  getOrCreateSound(soundName) {
    let sound = this.get(soundName);

    if (!sound) {
      const url = `./sounds/${soundName}.wav`;
      sound = soundManager.createSound({
        url: url
      });
      this.set(soundName, sound);
    }

    return sound;
  }
});
