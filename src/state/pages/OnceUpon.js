import Page from './Page';

export default class OnceUpon extends Page {
preload() {  
	//set sprites
    this.loadBackground('sky.png');
	this.loadMiddleground('mountain-wide.png');
	this.loadForeground('branch.png'); //this should be the lake.
  }
	
  create () {
	super.create();
	
	this.foreground.alpha = 1;
	this.middleground.scale.setTo(1, 1);
    const proportion = this.game.height / this.middleground.height;
	 
	this.middleground.scale.setTo(proportion, proportion);

	//check if tween is completed
	this.isTweened = false;
	
	
	// the lake falls into place when the mountain
	
	this.tweenImageAlpha(this.foreground, -500, 2000).onComplete.add(()=>{
		this.isTweened = true;
		
		/*here we will:
			1.fade in characters
			2.activate the speech recognition
		*/
	});
  }
  
  //tween function
  tweenImageAlpha(sprite, position, time) {
    const tween = this.game.add.tween(sprite);
	tween.from({alpha: 0}, time, Phaser.Easing.Bounce.Out, true, 0);
	
	return tween;
  }
    tweenImagePosition(sprite, position, time) {
    const tween = this.game.add.tween(sprite);
	tween.from({Y: position}, time, Phaser.Easing.Bounce.Out, true, 0);
	
	return tween;
  }
}

