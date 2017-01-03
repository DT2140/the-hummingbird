import Page from './Page';

export default class OnceUpon extends Page {
  preload() {
    //set sprites
    this.loadBackground('sky2.png');
    this.loadMiddleground('mountain-wide.png');
    this.loadForeground('tree.png');
  }

  create() {
    super.create();

    this.middleground.scale.setTo(1, 1);
    const proportion = this.game.height / this.middleground.height;

    this.middleground.scale.setTo(proportion, proportion);

    this.isTweened = false;


    // the lake falls into place when the mountain

    this.tweenImage(this.foreground, -500, 2000).onComplete.add(() => {
      this.isTweened = true;

      // tween completed, do what needs to be done after.

    });
  }
    //tween function
  tweenImage(sprite, position, time) {
    const tween = this.game.add.tween(sprite);
    tween.from({ y: position }, time, Phaser.Easing.Bounce.Out, true, 0);
    return tween;
  }
}
