import Page from './Page';

export default class OnceUpon extends Page {
  preload() {
    //set sprites
    
	this.loadSky('sky.png');
	this.loadBackground('mountain-wide.png');
    //this.loadMiddleground('...');
    //TODO add lake
	this.loadForeground('tree.png');
  }

  create() {
    super.create();

    this.background.scale.setTo(1, 1);
    this.background.x -=  (this.background.width - this.game.width ) / 2;

    this.isTweened = false;

    this.foreground.position.set(-this.foreground.width, 0);
	this.background.position.set(-this.background.width/10, 0);
	
	
    this.queue('showTree', done => {
      this.tweenImage(this.foreground, 0, 4000);
	  this.tweenImage(this.background, 0, 4000);
      done();  
	})
  }
//tween function
  tweenImage(sprite, position, time) {
    const tween = this.game.add.tween(sprite);
	tween.to({x: position}, time, 'Linear', true, 0);
	return tween;
  }
}
