import Page from './Page';

export default class OnceUpon extends Page {
  preload() {
    //set sprites
    
	this.loadSky('sky.png');
	//this.loadBackground('...');
    this.loadMiddleground('mountains.png');
    this.loadForeground('tree.png');
    //TODO add lake
  }

  create() {
    super.create();

	
    this.middleground.scale.setTo(1, 1);
    this.middleground.x -=  (this.middleground.width - this.game.width ) / 2;
    //const proportion = this.game.height / this.middleground.height;

    //this.middleground.scale.setTo(proportion, proportion);

    this.isTweened = false;

    this.foreground.position.set(0, -this.foreground.height);
	
    this.queue('showTree', done => {
      this.tweenImage(this.foreground, 0, 2000).onComplete.add(() => {
        this.isTweened = true;
        done();
      });
	})
  }
//tween function
  tweenImage(sprite, position, time) {
    const tween = this.game.add.tween(sprite);
	tween.to({y: position}, time, Phaser.Easing.Bounce.Out, true, 0);
	return tween;
  }
}
