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
    this.game.load.image('bird', '/assets/characters/bird.png');
  }

  create() {
    // Call default create method (sets background color etc.)
    super.create();

    // Queue an action to be triggered when a keyword is read
    const bird = this.game.add.sprite(0, 0, 'bird');
    const tween = this.game.add.tween(bird);
    this.queue('myAction', done => {
      // Also, make sure to call the `done` callback when complete
      tween.to({ x: 400 }, 2000, 'Linear', true, 0).onComplete(done);
    });
  }

  update() {
    // Do magic 🎉
  }
}
