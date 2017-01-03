import Page from './Page';

export default class TryFly extends Page {
  preload(){

    this.loadBackground('sky2.png');
    this.loadForeground('branch.png');
	
    this.game.load.video('hummingbird','/assets/animations/02.Son.TryFly.webm')
  }
	
  create(){
      
    super.create();
	const hummingbird = this.game.add.video('hummingbird');
	
    this.foreground.y = this.game.height - this.foreground.height;
    this.foreground.x -= this.foreground.width / 10;
    this.foreground.y += this.foreground.height / 10;
			
	hummingbird.addToWorld(400, 550, 0.5, 0.5, 0.5, 0.5);
    hummingbird.alpha = 0;	
	
    this.queue('fadeInHummingbird', done => {
	   	this.tweenImage(hummingbird, 1, 2000).onComplete.add(() => {
	        this.isTweened = true;
			done();
		});
    });
	
	this.queue('hummingbirdFly', done => {
		hummingbird.play(true);
		done();
    });
  }
//tween function
  tweenImage(sprite, alpha, time) {
    const tween = this.game.add.tween(sprite);
	tween.to({alpha: alpha}, time, Phaser.Easing.Bounce.Out, true, 0);
	return tween;
  }
}