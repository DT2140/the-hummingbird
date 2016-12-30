import Page from './page';

/**
 * This is your basic page template, see Phaser documentation for details
 * http://phaser.io/docs/2.6.2/Phaser.State.html#methods
 */

export default class MyPage extends Page {
  constructor(...args) {
    super(...args);
    // Do object initialization stuff here or remove if not applicable
  }

  preload() {
    // Load sprites and such
    this.loadBackground('<BACKGORUND_IMAGE>.png');
  }

  create() {
    // Call default create method (sets background color etc.)
    super.create();
  }

  update() {
    // Do magic 🎉
  }
}
