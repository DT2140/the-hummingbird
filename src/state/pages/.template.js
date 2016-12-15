import Page from './page';

/**
 * This is your basic page template, see Phaser documentation for details
 * http://phaser.io/docs/2.6.2/Phaser.State.html#methods
 */

export default class Intro extends Page {
  constructor(...args) {
    super(...args);
    // Do object initialization stuff here or remove if not applicable
  }

  preload() {
    // Load sprites and such
    this.game.load.image('background', '/assets/backgrounds/<BACKGORUND_IMAGE>.png');
  }

  create() {
    // Call default create method (sets background color etc.)
    super.create();

    // Add the sprite to the game (i.e. story)
    const background = this.game.add.sprite(0, 0, 'background');

    // Center image and stretch to fill but keepin porportions
    this.fillCenter(background);
  }

  update() {
    // Do magic 🎉
  }
}
