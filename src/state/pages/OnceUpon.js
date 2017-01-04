import Page from './Page';

export default class OnceUpon extends Page {
  preload() {
    //set sprites

    this.loadSky('sky.png');
    this.loadMiddleground('lake.png');
    this.loadBackground('mountain.png');
    this.loadForeground('tree.png');
  }

  create() {
    super.create();

    this.background.scale.setTo(1, 1);
    this.middleground.scale.setTo(1, 1);

    this.isTweened = false;

    this.background.position.set(-this.background.width / 10, this.background.height / 10);
    this.foreground.position.set(-this.foreground.width, this.game.height - this.foreground.height);
    this.middleground.position.set(-this.middleground.width / 5, this.background.y + this.background.height/10*9);

    this.queue('showTree', done => {
      this.tweenImage(this.foreground, 0, 4000);
      this.tweenImage(this.background, 0, 4000);
      this.tweenImage(this.middleground, 0, 4000);
      done();
    });
  }

  //tween function
  tweenImage(sprite, position, time) {
    const tween = this.game.add.tween(sprite);
    tween.to({ x: position }, time, 'Linear', true, 0);
    return tween;
  }
}
